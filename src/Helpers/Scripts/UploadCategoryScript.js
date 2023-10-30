// import readXlsxFile from "read-excel-file";
// import { supabase } from "../SupabaseConfig/SupabaseConfig";

// const sheetsArray = [];

// // ******** load previous data ********** //

// // ******** cache previous data ********** //

// // ******** creation functions ********** //

// const handelChange = async (file, setLogs) => {
//   // ******* body ********* //
//   const data = await readXlsxFile(file);
//   const sliceData = data?.slice(5);

//   async function category() {
//     for (i in sheetsArray[0]?.data) {
//       if (i != 0 && sheetsArray[0]?.data?.[i]?.[0]) {
//         const { data, error } = await supabase
//           .from("category")
//           .select("id")
//           .eq("numeric", sheetsArray?.[0]?.data?.[i]?.[1]);
//         const parent_id = data?.[0]?.id;
//         if (parent_id) {
//           const { data, error } = await supabase.from("category").insert({
//             numeric: sheetsArray[0]?.data?.[i]?.[0],
//             parent_id: parent_id,
//           });
//           console.log(`${i} done`, error ? error : "success");
//         } else {
//           const { data, error } = await supabase.from("category").insert({
//             numeric: sheetsArray[0]?.data?.[i]?.[0],
//           });
//           console.log(`${i} done`, error ? error : "success");
//         }
//       }
//     }
//     return;
//   }

//   async function categoryContent() {
//     for (i in sheetsArray[1].data) {
//       if (i != 0 && sheetsArray[1].data?.[i]?.[0]) {
//         const { data, error } = await supabase
//           .from("category")
//           .select("id")
//           .eq("numeric", sheetsArray[1].data?.[i]?.[0]);
//         const category_id = data?.[0]?.id;
//         if (category_id) {
//           const { data, error } = await supabase
//             .from("category_content")
//             .insert({
//               title: sheetsArray[1].data?.[i][1],
//               language_id: languages[sheetsArray[1].data?.[i][4]],
//               category_id: category_id,
//             });
//           console.log(`${i} done`, error ? error : "success");
//         }
//       }
//     }
//     return;
//   }
// };

// export const UploadCategoryScript = async (file, setLogs) => {
//   setLogs((prev) => [
//     ...prev,
//     { status: "loading", msg: "Starting Process..." },
//   ]);
//   // Promise.all(promiseList).then((res) => {
//   // });
//   handelChange(file, setLogs);
// };
