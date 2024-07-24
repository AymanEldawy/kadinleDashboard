// import readXlsxFile from "read-excel-file";
// import { supabase } from "../SupabaseConfig/SupabaseConfig";
// import { regions } from "./constants";

// const CATEGORIES_ID = {};
// const SIZES_IDS = {};
// let CONTENT = {};

// // ******** load & cache previous data ********** //
// const getSizes = async () => {
//   const res = await supabase.from("size").select("*");
//   res?.data?.forEach((size) => {
//     SIZES_IDS[size?.numeric] = size?.id;
//   });
// };

// const getCategories = async () => {
//   const res = await supabase.from("category").select("*");
//   res?.data?.forEach((category) => {
//     CATEGORIES_ID[+category?.numeric] = category?.id;
//   });
// };

// // ******** creation functions ********** //
// const createSize = async (data, index, setLogs = []) => {
//   const res = await supabase.from("size").insert(data).select("id");
//   if (res?.error) {
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "error",
//         msg: `Failed insert size in row: ${index} Reason: ${res?.error}`,
//       },
//     ]);
//     return res?.data?.[0]?.id;
//   } else
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "success",
//         msg: `successfully insert size in row: ${index}`,
//       },
//     ]);
// };

// const createSizeContent = async (data, index, setLogs = []) => {
//   const res = await supabase.from("size_content").insert(data).select("id");
//   if (res?.error)
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "error",
//         msg: `Failed insert size content in row: ${index} Reason: ${res?.error}`,
//       },
//     ]);
//   else
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "success",
//         msg: `successfully insert size content in row: ${index}`,
//       },
//     ]);
// };

// // ******** start process ********** //

// const collectionData = async (file, setLogs) => {
//   const data2 = await readXlsxFile(file, { sheet: 2 });
//   const sliceData2 = data2?.slice(1);
//   let lenParent = sliceData2?.length;
//   for (let i = 0; i < lenParent; i++) {
//     let id = sliceData2?.[i]?.[0];
//     let region = sliceData2?.[i]?.[1];
//     let name = sliceData2?.[i]?.[2];

//     if (CONTENT?.[id]) {
//       CONTENT[id] = {
//         ...CONTENT?.[id],
//         [region]: name,
//         region,
//       };
//     } else {
//       CONTENT[id] = {
//         [region]: name,
//         region,
//       };
//     }
//   }
//   handelChange(file, setLogs);
// };

// const handelChange = async (file, setLogs) => {
//   const data = await readXlsxFile(file);
//   const sliceData = data?.slice(5);
//   let lenParent = sliceData?.length;
//   for (let i = 0; i < lenParent; i++) {
//     let numeric = sliceData?.[i]?.[0];
//     let category_id = sliceData?.[i]?.[1];
//     let size_sku = sliceData?.[i]?.[2];
//     let size_id = SIZES_IDS?.[numeric];

//     if (size_id) {
//       setLogs((prev) => [
//         ...prev,
//         {
//           status: "error",
//           msg: `Failed insert size in row: ${i} Reason: size is already exist`,
//         },
//       ]);
//       continue;
//     }

//     const sizeData = {
//       numeric: parseInt(numeric),
//       size_sku,
//       category_id: CATEGORIES_ID?.[category_id],
//     };

//     const newSize = await createSize(sizeData, i, setLogs);
//     size_id = newSize?.data?.id;

//     if (size_id) {
//       SIZES_IDS[numeric] = size_id;

//       const sizeContentDataAR = {
//         size_id,
//         name: CONTENT?.[numeric]?.AR,
//         region_id: regions?.AR,
//       };
//       const sizeContentDataEU = {
//         size_id,
//         name: CONTENT?.[numeric]?.EU,
//         region_id: regions?.EU,
//       };
//       const sizeContentDataTR = {
//         size_id,
//         name: CONTENT?.[numeric]?.TR,
//         region_id: regions?.TR,
//       };
//       const sizeContentDataUK = {
//         size_id,
//         name: CONTENT?.[numeric]?.UK,
//         region_id: regions?.UK,
//       };
//       const sizeContentDataUS = {
//         size_id,
//         name: CONTENT?.[numeric]?.US,
//         region_id: regions?.US,
//       };

//       await createSizeContent(
//         [
//           sizeContentDataAR,
//           sizeContentDataEU,
//           sizeContentDataTR,
//           sizeContentDataUK,
//           sizeContentDataUS,
//         ],
//         i,
//         setLogs
//       );
//     }
//   }
// };

// export const UploadSizesScript = async (file, setLogs) => {
//   setLogs((prev) => [
//     ...prev,
//     { status: "loading", msg: "Starting Process..." },
//   ]);
//   Promise.all([getSizes(), getCategories()]).then((res) => {
//     collectionData(file, setLogs);
//   });
// };
