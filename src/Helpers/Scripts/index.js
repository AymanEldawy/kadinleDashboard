// const XLSX = require("xlsx");
// const workbook = XLSX.readFile("1.xlsx"); // Replace 'example.xlsx' with the path to your XLSX file
// const { createClient } = require("@supabase/supabase-js");

// const supabase = createClient(
//   "http://kadinle.com:8000",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg4MjQ1MjAwLAogICAgImV4cCI6IDE4NDYwOTgwMDAKfQ.HDK-rOGDvAX5VVXWG9dOVOC61Ey__kZWYuoEeBJATL4"
// );
// const sheetNames = workbook.SheetNames;
// const sheetsArray = [];

// for (let i = 0; i < sheetNames.length; i++) {
//   const sheetName = sheetNames[i];
//   const worksheet = workbook.Sheets[sheetName];
//   const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//   sheetsArray.push({
//     name: sheetName,
//     data: sheetData,
//   });
// }

// const languages = {
//   English: "c53d7987-f51a-4b47-9ee0-3215becdce17",
//   Turkish: "c1a063e3-8f21-4526-8302-453b705ed27d",
//   Arabic: "35ed73f2-5923-4d55-b48c-9c4198b63409",
// };

// const regions = {
//   US: "44650daa-9c58-4939-93e1-447345e74459",
//   UK: "e27e38c7-954f-42e7-937b-aef1e4e9a02b",
//   AR: "761b26bc-1d55-4d42-8980-43e161ebd494",
//   TR: "608a4779-64dd-4d06-8500-ac6d653c57f7",
//   EU: "83f4acbc-d93b-4b3d-9c78-11d1b353517a",
// };


// async function color() {
//   for (i in sheetsArray[2].data) {
//     if (i != 0 && sheetsArray[2].data?.[i]?.[0]) {
//       const { data, error } = await supabase
//         .from("color")
//         .select("id")
//         .eq("numeric", sheetsArray[2].data?.[i][4]);
//       const parent_id = data?.[0]?.id;
//       if (parent_id) {
//         const { data, error } = await supabase.from("color").insert({
//           numeric: sheetsArray[2].data?.[i]?.[0],
//           color_sku: sheetsArray[2].data?.[i][1],
//           hex: sheetsArray[2].data?.[i][2],
//           parent_id: parent_id,
//         });
//         console.log(`${i} done`, error ? error : "success");
//       } else {
//         const { data, error } = await supabase.from("color").insert({
//           numeric: sheetsArray[2].data?.[i]?.[0],
//           color_sku: sheetsArray[2].data?.[i][1],
//           hex: sheetsArray[2].data?.[i][2],
//         });
//         console.log(`${i} done`, error ? error : "success");
//       }
//     }
//   }
//   return;
// }

// async function colorContent() {
//   for (i in sheetsArray[3].data) {
//     if (i != 0 && sheetsArray[3].data?.[i]?.[0]) {
//       const { data, error } = await supabase
//         .from("color")
//         .select("id")
//         .eq("numeric", sheetsArray[3].data?.[i]?.[0]);
//       const color_id = data?.[0]?.id;
//       if (color_id) {
//         const { data, error } = await supabase.from("color_content").insert({
//           name: sheetsArray[3].data?.[i][2],
//           language_id: languages[sheetsArray[3].data?.[i][1]],
//           color_id: color_id,
//         });
//         console.log(`${i} done`, error ? error : "success");
//       }
//     }
//   }
//   return;
// }

// async function size() {
//   for (i in sheetsArray[4].data) {
//     if (i != 0 && sheetsArray[4].data?.[i]?.[0]) {
//       const { data, error } = await supabase
//         .from("category")
//         .select("id")
//         .eq("numeric", sheetsArray[4].data?.[i][1]);
//       const category_id = data?.[0]?.id;
//       if (category_id) {
//         const { data, error } = await supabase.from("size").insert({
//           numeric: sheetsArray[4].data?.[i]?.[0],
//           size_sku: sheetsArray[4].data?.[i][2],
//           category_id: category_id,
//         });
//         console.log(`${i} done`, error ? error : "success");
//       } else {
//         const { data, error } = await supabase.from("size").insert({
//           numeric: sheetsArray[4].data?.[i]?.[0],
//           size_sku: sheetsArray[4].data?.[i][2],
//         });
//         console.log(`${i} done`, error ? error : "success");
//       }
//     }
//   }
//   return 0;
// }

// async function sizeContent() {
//   for (i in sheetsArray[5].data) {
//     if (i != 0 && sheetsArray[5].data?.[i]?.[0]) {
//       const { data, error } = await supabase
//         .from("size")
//         .select("id")
//         .eq("numeric", sheetsArray[5].data?.[i]?.[0]);
//       const size_id = data?.[0]?.id;
//       if (size_id) {
//         const { data, error } = await supabase.from("size_content").insert({
//           name: sheetsArray[5].data?.[i][3],
//           region_id: regions[sheetsArray[5].data?.[i][2]],
//           size_id: size_id,
//         });
//         console.log(`${i} done`, error ? error : "success");
//       }
//     }
//   }
//   return 0;
// }

// async function chart() {
//   const chartCache = {};
//   const productCache = {};
//   const sizeCache = {};
//   for (const i in sheetsArray[0]?.data) {
//     if (i > 2 && sheetsArray[0]?.data?.[i]?.[0]) {
//       const chartNumber = sheetsArray[0]?.data?.[i]?.[0];
//       const productSKU = sheetsArray[0]?.data?.[i][3];
//       const sizeName = sheetsArray[0]?.data?.[i][4];
//       const regionId = "761b26bc-1d55-4d42-8980-43e161ebd494";

//       let chartId = chartCache[chartNumber];
//       if (!chartId) {
//         const chartInfo = await supabase
//           .from("chart")
//           .select("id")
//           .eq("number", chartNumber);
//         chartId = chartInfo.data?.[0]?.id;
//         chartCache[chartNumber] = chartId;
//       }

//       let productId = productCache[productSKU];
//       if (!productId) {
//         const productInfo = await supabase
//           .from("product")
//           .select("id")
//           .eq("product_sku", productSKU);
//         productId = productInfo.data?.[0]?.id;
//         productCache[productSKU] = productId;
//       }

//       let sizeId = sizeCache[sizeName];
//       if (!sizeId) {
//         const sizeInfo = await supabase
//           .from("size_content")
//           .select("size_id")
//           .eq("name", sizeName)
//           .eq("region_id", regionId);
//         sizeId = sizeInfo.data?.[0]?.size_id;
//         sizeCache[sizeName] = sizeId;
//       }

//       if (productId) {
//         const { error } = await supabase.from("chart_data").insert({
//           chart_id: chartId,
//           product_id: productId,
//           size_id: sizeId,
//           column1: parseFloat(sheetsArray[0]?.data?.[i][5]) || null,
//           column2: parseFloat(sheetsArray[0]?.data?.[i][6]) || null,
//           column3: parseFloat(sheetsArray[0]?.data?.[i][7]) || null,
//           column4: parseFloat(sheetsArray[0]?.data?.[i][8]) || null,
//           column5: parseFloat(sheetsArray[0]?.data?.[i][9]) || null,
//           column6: parseFloat(sheetsArray[0]?.data?.[i][10]) || null,
//           column7: parseFloat(sheetsArray[0]?.data?.[i][11]) || null,
//           column8: parseFloat(sheetsArray[0]?.data?.[i][12]) || null,
//         });
//         console.log(`${i} done`, error ? error : "success");
//       } else {
//         console.log(`${i} done`, "product not found");
//       }
//     }
//   }

//   return 0;
// }

// async function main() {
//   console.log("Generating chart data");
//   await chart();
//   // console.log('Generating categories');
//   // await category();
//   // console.log('Generating category content');
//   // await categoryContent();
//   // console.log('Generating colors');
//   // await color();
//   // console.log('Generating color content');
//   // await colorContent();
//   // console.log('Generating sizes');
//   // await size();
//   // console.log('Generating size content');
//   // await sizeContent();
//   // console.log('Done');
// }

// main();
