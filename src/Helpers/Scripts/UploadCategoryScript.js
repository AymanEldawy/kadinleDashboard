// import readXlsxFile from "read-excel-file";
// import { supabase } from "../SupabaseConfig/SupabaseConfig";
// import { languages } from "./constants";

// const CATEGORIES_ID = {};
// let CONTENT = {};

// // ******** load & cache previous data ********** //
// const getCategories = async () => {
//   const res = await supabase.from("category").select("*");
//   res?.data?.forEach((category) => {
//     CATEGORIES_ID[category?.numeric] = category?.id;
//   });
// };

// // ******** creation functions ********** //
// const createCategory = async (data, index, setLogs = []) => {
//   const res = await supabase.from("category").insert(data).select("id");
//   if (res?.error) {
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "error",
//         msg: `Failed insert category in row: ${index} Reason: ${res?.error}`,
//       },
//     ]);
//     return res?.data?.[0]?.id;
//   } else
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "success",
//         msg: `successfully insert category in row: ${index}`,
//       },
//     ]);
// };

// const createCategoryContent = async (data, index, setLogs = []) => {
//   const res = await supabase.from("category_content").insert(data).select("id");
//   if (res?.error)
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "error",
//         msg: `Failed insert category content in row: ${index} Reason: ${res?.error}`,
//       },
//     ]);
//   else
//     setLogs((prev) => [
//       ...prev,
//       {
//         status: "success",
//         msg: `successfully insert category content in row: ${index}`,
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
//     let title = sliceData2?.[i]?.[1];
//     let description = sliceData2?.[i]?.[2];
//     let image = sliceData2?.[i]?.[3];
//     let language = sliceData2?.[i]?.[4];
//     if (CONTENT?.[id]) {
//       CONTENT[id] = {
//         ...CONTENT?.[id],
//         [language]: title,
//         description,
//         image,
//       };
//     } else {
//       CONTENT[id] = {
//         [language]: title,
//         description,
//         image,
//       };
//     }
//   }
//   handelChange(file, setLogs);
// };

// const handelChange = async (file, setLogs) => {
//   const data = await readXlsxFile(file, { sheet: 1 });
//   const sliceData = data?.slice(1);
//   let lenParent = sliceData?.length;
//   for (let i = 0; i < lenParent; i++) {
//     let categoryNumber = sliceData?.[i]?.[0];
//     let parent_id = sliceData?.[i]?.[1];
//     let category_id = CATEGORIES_ID?.[categoryNumber];

//     if (category_id) {
//       setLogs((prev) => [
//         ...prev,
//         {
//           status: "error",
//           msg: `Failed insert category in row: ${i} Reason: Category is already exist`,
//         },
//       ]);
//       continue;
//     }

//     const categoryData = {
//       numeric: categoryNumber,
//       parent_id: CATEGORIES_ID?.[parent_id],
//     };

//     const newCategory = await createCategory(categoryData, i, setLogs);
//     category_id = newCategory?.data?.id;

//     if (category_id) {
//       CATEGORIES_ID[categoryNumber] = category_id;

//       const categoryContentDataEN = {
//         category_id,
//         title: CONTENT?.[categoryNumber]?.English,
//         language_id: languages?.English,
//         description: CONTENT?.[categoryNumber]?.description,
//         image: CONTENT?.[categoryNumber]?.image,
//       };
//       const categoryContentDataTR = {
//         category_id,
//         title: CONTENT?.[categoryNumber]?.Turkish,
//         language_id: languages?.Turkish,
//         description: CONTENT?.[categoryNumber]?.description,
//         image: CONTENT?.[categoryNumber]?.image,
//       };
//       const categoryContentDataAR = {
//         category_id,
//         title: CONTENT?.[categoryNumber]?.Arabic,
//         language_id: languages?.Arabic,
//         description: CONTENT?.[categoryNumber]?.description,
//         image: CONTENT?.[categoryNumber]?.image,
//       };

//       await createCategoryContent(
//         [categoryContentDataEN, categoryContentDataTR, categoryContentDataAR],
//         i,
//         setLogs
//       );
//     }
//   }
//   setLogs((prev) => [
//     ...prev,
//     {
//       status: "info",
//       msg: `completed insert process.`,
//     },
//   ]);
// };

// export const UploadCategoryScript = async (file, setLogs) => {
//   setLogs((prev) => [
//     ...prev,
//     { status: "loading", msg: "Starting Process..." },
//   ]);

//   getCategories().then((res) => {
//     collectionData(file, setLogs);
//   });
// };
