/**
 * This file is responsible for uploading products from an Excel file or xml data to supabase
 *
 * The main functionality includes:
 * 1. Reading an Excel file containing list of products.
 * 2. Fetching XML files from seller's url
 * 3. Mapping the product attributes from the file to the required format for each seller.
 * 4. Upload products to supabase
 */

const fs = require("fs/promises");
const xlsx = require("xlsx");
const xml2js = require("xml2js");
const xmldom = require("xmldom");
const axios = require("axios");
const ns = require("node-schedule");
const { SupabaseConfiguration } = require("./supabaseConfig");

// config supabase
const supabaseConfig = new SupabaseConfiguration();

const xmlUrls_TEST = [
  {
    id: 1,
    url: "https://www.modacizgi.com/xml/?R=5842&K=9c16&AltUrun=1&TamLink=1&Dislink=1&Seo=1&Imgs=1&start=0&limit=99999&pass=7RfC4FkJ",
  },
  {
    id: 2,
    url: "https://www.radiasbayi.com/xml/requests-xml?username=Kadinle&password=6d9g5y2r9e&access_key=3r6k4f9p1h",
  },
];
/**
 * Renames the properties of product object based on a mapping object
 *
 * @param {Object} data - The object of the product to be renamed.
 * @param {Object} mapping - seller's template [keys: the main names] and [values:the names in seller file].
 * @returns {Object} A new object with the keys renamed according to the mapping.
 */
const renameAttributes = (data, mapping) => {
  const result = {};
  for (const key in data) {
    const newKey = Object.keys(mapping).find(
      (mappedKey) => mapping[mappedKey] === key
    );
    if (newKey) {
      result[newKey] = data[key];
    } else {
      result[key] = data[key];
    }
  }
  return result;
};

/**
 * Renames the properties of product object based on a mapping object
 *
 * @param {Object} data - The object of the product to be renamed.
 * @param {Object} mapping - seller's template [keys: the main names] and [values:the names in seller file].
 * @returns {Object} A new object with the keys renamed according to the mapping containing other
 * entries as list of features {name:featureName, value:featureValue}.
 */

const renameAttributesWithFeatures = (data, mapping) => {
  const result = {};
  const features = [];
  for (const key in data) {
    const newKey = Object.keys(mapping).find(
      (mappedKey) => mapping[mappedKey] === key
    );
    if (newKey) {
      result[newKey] = data[key];
    } else {
      features.push({ name: key, value: data[key] });
    }
  }
  return { ...result, moreInformation: features };
};

/**
 * Handles main logic for parsing xml file
 * @param {string} xmlData - The XML data to be processed.
 * @param {Object} mappingAttributes - seller's template [keys: the main names] and [values:the names in seller file]
 * @returns {Promise<Object[]>}
 */
const processXML = async (
  xmlData,
  mappingAttributes,
  sellerId,
  categoriesMapping
) => {
  const str = new xmldom.DOMParser().parseFromString(xmlData);
  const parser = new xml2js.Parser({
    explicitArray: false,
    trim: true,
    explicitChildren: false,
    explicitRoot: false,
  });

  return new Promise((resolve, reject) => {
    parser.parseString(str, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          // convert parsed object to list and rename properties
          responsObjectToList(result).map(async (product) => {
            fixChainingChildren(product);
            return {
              sellerId,
              ...(await renameCategoyProperty(
                renameAttributesWithFeatures(product, mappingAttributes),
                categoriesMapping
              )),
            };
          })
        );
      }
    });
  });
};

const renameCategoyProperty = async (product, categoriesMapping) => {
  if (product.category) {
    const newCategory = categoriesMapping[product.category];
    if (newCategory) {
      product.category = newCategory;
    }
  }
  return product;
};

/**
 * fix the chaining problem in Parsed Object
 * @example Before: {subs:{sub:[object, object]}} After: {subs:[object, object]}
 * @param {Object} productObj - parsed product object
 * @returns {Object} modified object
 */
const fixChainingChildren = (productObj) => {
  for (const key in productObj) {
    if (typeof productObj[key] === "object") {
      const innerKeys = Object.keys(productObj[key]);
      if (innerKeys.length === 1) {
        productObj[key] = productObj[key][innerKeys[0]];
      } else {
        productObj[key] = productObj[key][key.substring(0, key.length - 1)];
      }
    }
  }
  return productObj;
};

/**
 * Fetches the XML data from the seller's provided URL and processes it.
 * @param {string} url - The URL to fetch the XML data from.
 * @param {Object} mappingAttributes - seller's template [keys: the main names] and [values:the names in seller file].
 * @returns {Promise<Object[]>} - The processed XML data as an array of objects.
 */
const fetchAndParseXML = async (
  url,
  mappingAttributes,
  sellerId,
  categoriesMapping
) => {
  try {
    const response = await axios.get(url, { responseType: "text" });
    const xmlData = response.data;
    return processXML(xmlData, mappingAttributes, sellerId, categoriesMapping);
  } catch (error) {
    console.error("Error fetching the page:", error);
  }
};

/**
 * converts xml response data to a list
 * @param {Object} data - convert the parsed object to a list of products
 * @returns {Array} list of products or an empty list
 */
const responsObjectToList = (data) => {
  return Object.entries(data).at(0).at(1) ?? [];
};

/**
 * Converts an excel file to a json format and rename properties keys
 *
 * @param {string} excelFile - The excel file to convert
 * @param {object} options - An Object contains any additional information
 * @param {object} options.mappingTemplate - An object defining how to rename attributes (required).
 * @returns {array} An array of objects contains the data extracted from the Excel sheet.
 * @throws {Error} If there's an error while reading the Excel file or renaming keys
 */
const handleExcelSource = (excelFile, options) => {
  try {
    const workbook = xlsx.read(excelFile);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData.map((item) =>
      renameAttributesWithFeatures(item, options.mappingTemplate)
    );
  } catch (error) {
    console.error(`ERROR[handleExcelSource] => ${error}`);
  }
};
/**
 * The entrypoint for integrating products from all sources
 *
 * @param {string} sourceType - The type of data source ("XML" or "EXCEL").
 * @param {object} options - An Object contains any additional information
 * @param {string} options.filePath - Path to the Excel file (if sourceType is "EXCEL").
 * @param {string} template.url - The url to fetch the XML data.
 * @param {string} template.template - Mapping attributes object used for parsing the XML data.
 * @param {string} template.categoriesTemplate - Mapping object used to rename categories
 * @returns {Promise<void>}
 * @throws {Error} If there's an error while reading data from file, supabase, or processing data
 */
const entryMethod = async () => {
  const templates = await supabaseConfig.getSellersTemplates();

  let products = [];

  for (const template of templates) {
    if (template.template_type == "XML") {
      products.push(
        ...(await fetchAndParseXML(
          template.url,
          template.template,
          template.supplier_id,
          template.categoriesTemplate
        ))
      );
    } else if ((template.template_type = "XLSX")) {
    }
  }

  console.log(products);

  // extract and insert categories to supabase
  // const categories = await extractCategories(products);
  // await supabaseConfig.insertCategories(categories);

  // insert products to supabase
  // await supabaseConfig.insertProducts(products);
};

/**
 * Extracts a set of unique categories from the provided products.
 *
 * @param {Promise<any>[] | any[]} products - An array of product objects or promises that resolve to product objects.
 * @returns {Promise<Set<string>>} - A promise that resolves to a Set of unique category strings.
 */
async function extractCategories(products) {
  const categoriesSet = new Set();

  const categoriesPromises = products.map((product) =>
    product.then((product) => product.category)
  );

  return Promise.all(categoriesPromises)
    .then((categories) => {
      categories.forEach((category) => {
        categoriesSet.add(category);
      });

      return categoriesSet;
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
}

// for testing
entryMethod().catch((error) => console.log(error));

// ns.scheduleJob("0 0 * * *", () => {
//   console.log("TASK IS RUNNING AT: ", new Date());
//   entryMethod().catch((error) => console.log(error));
// });
