// import XLSX from "xlsx";
// import { supabase } from "../SupabaseConfig/SupabaseConfig";
// const workbook = XLSX.readFile("1.xlsx"); // Replace 'example.xlsx' with the path to your XLSX file
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
// // ******** load previous data ********** //

// // ******** cache previous data ********** //

// // ******** creation functions ********** //

// const handelChange = async (file, setLogs) => {
//   // ******* body ********* //
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
// };

// export const UploadSizeChartScript = async (file, setLogs) => {
//   setLogs((prev) => [
//     ...prev,
//     { status: "loading", msg: "Starting Process..." },
//   ]);
//   // Promise.all(promiseList).then((res) => {
//   // });
//   handelChange(file, setLogs);
// };
