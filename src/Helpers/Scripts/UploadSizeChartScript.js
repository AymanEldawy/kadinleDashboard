// import readXlsxFile from "read-excel-file";
// import { supabase } from "../SupabaseConfig/SupabaseConfig";

// // Caches
// let PRODUCT_IDS = {};
// let SIZES_IDS = {};
// let CHART_IDS = {};

// // ******** load & cache previous data ********** //

// const getProducts = async () => {
//   const res = await supabase.from("product").select("*");
//   res?.data?.forEach((product) => {
//     PRODUCT_IDS[product?.product_sku?.toString()?.trim()] = product?.id;
//   });
// };

// const getSizes = async () => {
//   const res = await supabase.from("size_content").select("*");
//   res?.data?.forEach((size) => {
//     SIZES_IDS[size?.name] = size?.size_id;
//   });
// };

// const getCharts = async () => {
//   const res = await supabase.from("chart").select("*");
//   res?.data?.forEach((chart) => {
//     CHART_IDS[chart?.number] = chart?.id;
//   });
// };

// async function handelChange(file, setLogs) {
//   const data = await readXlsxFile(file);
//   const sliceData = data?.slice(3);
//   let lenParent = sliceData?.length;
//   for (let i = 0; i < lenParent; i++) {
//     const chartNumber = sliceData?.[i]?.[0];
//     const productSKU = sliceData?.[i]?.[3];
//     const sizeName = sliceData?.[i]?.[4];
//     const regionId = "761b26bc-1d55-4d42-8980-43e161ebd494";

//     let chartId = CHART_IDS[chartNumber];
//     if (!chartId) {
//       const chartInfo = await supabase
//         .from("chart")
//         .select("id")
//         .eq("number", chartNumber);
//       chartId = chartInfo.data?.[0]?.id;
//       CHART_IDS[chartNumber] = chartId;
//       if (chartInfo?.error) {
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "error",
//             msg: `Failed insert chart in row: ${i} Reason: ${chartInfo?.error}`,
//           },
//         ]);
//       } else
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "success",
//             msg: `successfully insert chart in row: ${i}`,
//           },
//         ]);
//     }

//     let productId = PRODUCT_IDS[productSKU];
//     if (!productId) {
//       const productInfo = await supabase
//         .from("product")
//         .select("id")
//         .eq("product_sku", productSKU);
//       productId = productInfo.data?.[0]?.id;
//       PRODUCT_IDS[productSKU] = productId;
//       if (productInfo?.error) {
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "error",
//             msg: `Failed insert product chart in row: ${i} Reason: ${productInfo?.error}`,
//           },
//         ]);
//       } else
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "success",
//             msg: `successfully insert product chart in row: ${i}`,
//           },
//         ]);
//     }

//     let sizeId = SIZES_IDS[sizeName];
//     if (!sizeId) {
//       const sizeInfo = await supabase
//         .from("size_content")
//         .select("size_id")
//         .eq("name", sizeName)
//         .eq("region_id", regionId);
//       sizeId = sizeInfo.data?.[0]?.size_id;
//       SIZES_IDS[sizeName] = sizeId;
//       if (sizeInfo?.error) {
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "error",
//             msg: `Failed insert product chart in row: ${i} Reason: ${sizeInfo?.error}`,
//           },
//         ]);
//       } else
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "success",
//             msg: `successfully insert product chart in row: ${i}`,
//           },
//         ]);
//     }

//     if (productId) {
//       const { error } = await supabase.from("chart_data").insert({
//         chart_id: chartId,
//         product_id: productId,
//         size_id: sizeId,
//         column1: parseFloat(sliceData?.[i][5]) || null,
//         column2: parseFloat(sliceData?.[i][6]) || null,
//         column3: parseFloat(sliceData?.[i][7]) || null,
//         column4: parseFloat(sliceData?.[i][8]) || null,
//         column5: parseFloat(sliceData?.[i][9]) || null,
//         column6: parseFloat(sliceData?.[i][10]) || null,
//         column7: parseFloat(sliceData?.[i][11]) || null,
//         column8: parseFloat(sliceData?.[i][12]) || null,
//       });
//       if (error) {
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "error",
//             msg: `Failed insert product chart data in row: ${i} Reason: ${error}`,
//           },
//         ]);
//       } else
//         setLogs((prev) => [
//           ...prev,
//           {
//             status: "success",
//             msg: `successfully insert product chart data in row: ${i}`,
//           },
//         ]);
//     } else {
//       setLogs((prev) => [
//         ...prev,
//         {
//           status: "error",
//           msg: `product not found`,
//         },
//       ]);
//     }
//   }

//   return 0;
// }

// export const UploadSizesChartScript = async (file, setLogs) => {
//   setLogs((prev) => [
//     ...prev,
//     { status: "loading", msg: "Starting Process..." },
//   ]);
//   Promise.all([getProducts(), getSizes(), getCharts()]).then((res) => {
//     handelChange(file, setLogs);
//   });
// };
