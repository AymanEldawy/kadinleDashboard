import { supabase } from "../SupabaseConfig/SupabaseConfig";
import readXlsxFile from "read-excel-file";
import { languages } from "./constants";
const IGNORED_ROWS = [];


const warehouse_id = "f9f217d8-6e4b-4027-a8d6-7871d2fbeb15";
const country_id = "931186ea-83d2-4ad5-aebc-78f5cd455ec0";
const brand_id = "cd3069e9-5844-475e-9f88-f5e7026b31a1";

// Caches
let PRODUCT_IDS = {}; // for cache product sku to avoid inset the same product

// MUST LOAD DATA FROM TABLES AND PUT THEM INTO THESE OBJECTS WITH THIS STRUCTURE { (EnglishName): (tableName)_id }
let CATEGORIES_ID = {};
let SIZES_IDS = {};
let COLORS_IDS = {};
let IMAGES_NAME = {};

const getData = async (tableName, cacheObject) => {
  let key = `${tableName}_id`;
  const res = await supabase.from(`${tableName}_content`).select("*");
  res?.data?.forEach((item) => {
    cacheObject[item?.name] = item?.[key];
  });
};

const getProducts = async () => {
  const res = await supabase.from("product").select("*");
  res?.data?.forEach((product) => {
    PRODUCT_IDS[product?.product_sku?.toString()?.trim()] = product?.id;
  });
};
const getCategories = async () => {
  const res = await supabase.from("category_content").select("*");
  res?.data?.forEach((category) => {
    CATEGORIES_ID[category?.title?.trim()] = category?.category_id;
  });
};
const getColors = async () => {
  const res = await supabase.from("color").select("*");
  res?.data?.forEach((color) => {
    COLORS_IDS[color?.color_sku] = color?.id;
  });
};
const getSizes = async () => {
  const res = await supabase.from("size").select("*");
  res?.data?.forEach((size) => {
    SIZES_IDS[size?.size_sku] = size?.id;
  });
};

let PATTERN_IDS = {};
let FABRIC_IDS = {};
let MATERIAL_IDS = {};
let LINING_IDS = {};
let COLLAR_IDS = {};
let SLEEVE_IDS = {};
let SEASON_IDS = {};
let FEATURE_IDS = {};

// actions
const insertOne = async (
  tableName,
  nameAr,
  nameTr,
  nameEn,
  CACHE = {},
  setLogs = []
) => {
  if (!nameEn || !nameAr || !nameTr) return;
  if (CACHE[nameEn]) return CACHE[nameEn];
  const res = await supabase.from(tableName).insert({}).select("id");
  const itemId = res?.data?.[0]?.id;
  let data = [];
  let en = nameEn
    ? {
        [`${tableName}_id`]: itemId,
        language_id: languages["English"],
        name: nameEn,
      }
    : null;
  let ar = nameAr
    ? {
        [`${tableName}_id`]: itemId,
        language_id: languages["Arabic"],
        name: nameAr,
      }
    : null;
  let tr = nameTr
    ? {
        [`${tableName}_id`]: itemId,
        language_id: languages["Turkish"],
        name: nameTr,
      }
    : null;
  if (tr) data.push(tr);
  if (ar) data.push(ar);
  if (en) data.push(en);
  const resContent = await supabase
    .from(`${tableName}_content`)
    .insert(data)
    .select();
  if (!resContent?.error) {
    setLogs((prev) => [
      ...prev,
      { status: "success", msg: `successfully insert into ${tableName}` },
    ]);
  } else
    setLogs((prev) => [
      ...prev,
      { status: "error", msg: `Failed insert ${tableName}` },
    ]);
  CACHE[nameEn] = itemId;
  return itemId;
};

// const createCategory = async (name) => {
//   const res = await supabase
//     .from("category")
//     .insert({ parent_id: item.categoryParentId })
//     .select("id");
// };
const createProduct = async (product, index, setLogs = []) => {
  const res = await supabase.from("product").insert(product).select("id");
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert Product in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert product in row: ${index}`,
      },
    ]);
  return res?.data?.[0]?.id;
};
const createProductContent = async (productContent, index, setLogs = []) => {
  const res = await supabase.from("product_content").insert(productContent);
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert Product content in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert product content in row: ${index}`,
      },
    ]);
};

const createStock = async (stockContent, index, setLogs = []) => {
  const res = await supabase.from("stock").insert(stockContent);
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert Stock  in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else
    setLogs((prev) => [
      ...prev,
      { status: "success", msg: `successfully insert stock in row: ${index}` },
    ]);
};
const createVariant = async (variantContent, index, setLogs = []) => {
  const res = await supabase
    .from("product_variant")
    .insert(variantContent)
    .select("id");
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert Product Variant in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else {
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert Product Variant in row: ${index}`,
      },
    ]);
    return res?.data?.[0]?.id;
  }
};
const createProductMedia = async (mediaContent, index, setLogs = []) => {
  const res = await supabase.from("product_image").insert(mediaContent);
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert Product Image or Media in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else {
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert Product Image or Media in row: ${index}`,
      },
    ]);
  }
};

const handelChange = async (file, setLogs) => {
  const data = await readXlsxFile(file);
  const sliceData = data?.slice(5); // start from row 6
  let lenParent = sliceData?.length;
  for (let i = 0; i < lenParent; i++) {
    let colorSku = sliceData?.[i]?.[7];
    let color_id = COLORS_IDS?.[parseInt(colorSku)];
    let sizeSku = sliceData?.[i]?.[9];
    let size_id = SIZES_IDS?.[sizeSku?.toString()];
    let category_id = CATEGORIES_ID?.[sliceData?.[i]?.[3]?.trim()];
    let pattern_sku = sliceData?.[i]?.[13];
    const product_sku = sliceData?.[i]?.[0]?.toString()?.trim();
    if (PRODUCT_IDS?.[product_sku]) {
      setLogs((prev) => [
        ...prev,
        { status: "error", msg: `Product is Already exist row: ${i + 1}` },
      ]);
      IGNORED_ROWS.push(i + 1);
      continue;
    } else if (!category_id || !size_id || !color_id) {
      setLogs((prev) => [
        ...prev,
        {
          status: "error",
          msg: `row: ${
            i + 1
          } has been ignored because some of important data are null check color/category/size values in the sheet`,
        },
      ]);
      setLogs((prev) => [
        ...prev,
        {
          status: "error",
          msg: `row: ${i + 1} => ${product_sku} (${
            category_id ? "" : `category ${sliceData?.[i]?.[3]} not exist`
          } - ${size_id ? "" : `${sliceData?.[i]?.[9]} size not exist`} - ${
            color_id ? "" : `${colorSku} color not exist`
          })`,
        },
      ]);

      continue;
    } else {
      setLogs((prev) => [
        ...prev,
        { status: "loading", msg: `continue process` },
      ]);
    }
    let pattern_id = await insertOne(
      "pattern",
      sliceData?.[i]?.[10],
      sliceData?.[i]?.[11],
      sliceData?.[i]?.[12],
      PATTERN_IDS,
      i + 1,
      setLogs
    );
    let fabric_id = await insertOne(
      "fabric",
      sliceData?.[i]?.[17],
      sliceData?.[i]?.[18],
      sliceData?.[i]?.[19],
      FABRIC_IDS,
      i + 1,
      setLogs
    );
    let material_id = await insertOne(
      "material",
      sliceData?.[i]?.[20],
      sliceData?.[i]?.[21],
      sliceData?.[i]?.[22],
      MATERIAL_IDS,
      i + 1,
      setLogs
    );
    let lining_id = await insertOne(
      "lining",
      sliceData?.[i]?.[29],
      sliceData?.[i]?.[30],
      sliceData?.[i]?.[31],
      LINING_IDS,
      i + 1,
      setLogs
    );
    let collar_id = await insertOne(
      "collar",
      sliceData?.[i]?.[32],
      sliceData?.[i]?.[33],
      sliceData?.[i]?.[34],
      COLLAR_IDS,
      i + 1,
      setLogs
    );
    let sleeve_id = await insertOne(
      "sleeve",
      sliceData?.[i]?.[35],
      sliceData?.[i]?.[36],
      sliceData?.[i]?.[37],
      SLEEVE_IDS,
      i + 1,
      setLogs
    );
    let season_id = await insertOne(
      "season",
      sliceData?.[i]?.[38],
      sliceData?.[i]?.[39],
      sliceData?.[i]?.[40],
      SEASON_IDS,
      i + 1,
      setLogs
    );
    let feature_id = await insertOne(
      "feature",
      sliceData?.[i]?.[41],
      sliceData?.[i]?.[42],
      sliceData?.[i]?.[43],
      FEATURE_IDS,
      i + 1,
      setLogs
    );

    const product = {
      product_sku: product_sku,
      price: sliceData?.[i]?.[48] || 0,
      barcode: sliceData?.[i]?.[1],
      category_id: category_id,
      fabric_id,
      material_id,
      lining_id,
      collar_id,
      sleeve_id,
      season_id,
      feature_id,
      brand_id,
      pattern_id,
      display: false,
      origin_id: country_id,
    };
    let productId = null;
    if (PRODUCT_IDS?.[product_sku]) {
      productId = PRODUCT_IDS?.[product_sku];
    } else {
      productId = await createProduct(product, i + 1, setLogs);
      if (!productId) continue;
      PRODUCT_IDS[product_sku] = productId;
      const productContentEn = {
        product_id: productId,
        language_id: languages?.English,
        name: sliceData?.[i]?.[25],
        description: sliceData?.[i]?.[28],
        seo_title: sliceData?.[i]?.[55],
        seo_description: sliceData?.[i]?.[58],
        image_alt: "",
      };
      const productContentAr = {
        product_id: productId,
        language_id: languages?.Arabic,
        name: sliceData?.[i]?.[23],
        description: sliceData?.[i]?.[26],
        seo_title: sliceData?.[i]?.[53],
        seo_description: sliceData?.[i]?.[56],
        image_alt: "",
      };
      const productContentTr = {
        product_id: productId,
        language_id: languages?.Turkish,
        name: sliceData?.[i]?.[24],
        description: sliceData?.[i]?.[27],
        seo_title: sliceData?.[i]?.[54],
        seo_description: sliceData?.[i]?.[57],
        image_alt: "",
      };

      await createProductContent(productContentEn, i + 1, setLogs);
      await createProductContent(productContentAr, i + 1, setLogs);
      await createProductContent(productContentTr, i + 1, setLogs);
    }
    // create variant
    let variantSku = sliceData?.[i]?.[14];
    const variantContent = {
      sku: variantSku,
      weight: sliceData?.[i]?.[16],
      product_id: productId,
      size_id,
      color_id,
    };
    const variantId = await createVariant(variantContent, i + 1, setLogs);
    // create stock
    const stockContent = {
      variant_id: variantId,
      warehouse_id,
      stock: sliceData?.[i]?.[15],
    };
    await createStock(stockContent, i + 1, setLogs);
    for (let j = 59; j <= 67; j++) {
      if (sliceData?.[i]?.[j]) {
        let image = sliceData?.[i]?.[j];
        if (IMAGES_NAME?.[image]) {
          continue;
        }
        IMAGES_NAME[image] = image;
        let fileFormat = j === 67 ? ".mp4" : ".jpg";
        let fullPath = `http://products.kadinle.com/${product_sku}/${colorSku}/${image}${fileFormat}`;
        const productImageContent = {
          product_id: PRODUCT_IDS?.[product_sku],
          color_id,
          size_id,
          pattern_sku,
          image: fullPath,
        };
        await createProductMedia(productImageContent, i + 1, setLogs);
      }
    }
  }
  let ignoredRows = new Set(IGNORED_ROWS) || [];
  for (const row of ignoredRows) {
    setLogs((prev) => [
      ...prev,
      { status: "error", msg: `rows have been ignored ${row} ` },
    ]);
  }
};

const promiseList = [
  getProducts(),
  getSizes(),
  getCategories(),
  getColors(),
  getData("pattern", PATTERN_IDS),
  getData("fabric", FABRIC_IDS),
  getData("material", MATERIAL_IDS),
  getData("lining", LINING_IDS),
  getData("collar", COLLAR_IDS),
  getData("sleeve", SLEEVE_IDS),
  getData("season", SEASON_IDS),
  getData("feature", FEATURE_IDS),
];

export const UploadProductScript = async (file, setLogs) => {
  setLogs((prev) => [
    ...prev,
    { status: "loading", msg: "Starting Process..." },
  ]);
  Promise.all(promiseList).then((res) => {
    handelChange(file, setLogs);
  });
};
