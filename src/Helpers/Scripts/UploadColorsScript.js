import readXlsxFile from "read-excel-file";
import { supabase } from "../SupabaseConfig/SupabaseConfig";
import { languages } from "./constants";

const COLORS_IDS = {};
let CONTENT = {};
// ******** load & cache previous data ********** //
const getColors = async () => {
  const res = await supabase.from("color").select("*");
  res?.data?.forEach((color) => {
    COLORS_IDS[color?.numeric] = color?.id;
  });
};

// ******** creation functions ********** //
const createColor = async (data, index, setLogs = []) => {
  const res = await supabase.from("color").insert(data).select("id");
  if (res?.error) {
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert color in row: ${index} Reason: ${res?.error}`,
      },
    ]);
    return res?.data?.[0]?.id;
  } else
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert color in row: ${index}`,
      },
    ]);
};

const createColorContent = async (data, index, setLogs = []) => {
  const res = await supabase.from("color_content").insert(data).select("id");
  if (res?.error)
    setLogs((prev) => [
      ...prev,
      {
        status: "error",
        msg: `Failed insert color content in row: ${index} Reason: ${res?.error}`,
      },
    ]);
  else
    setLogs((prev) => [
      ...prev,
      {
        status: "success",
        msg: `successfully insert color content in row: ${index}`,
      },
    ]);
};
// ******** start process ********** //

const collectionData = async (file, setLogs) => {
  const data2 = await readXlsxFile(file, { sheet: 2 });
  const sliceData2 = data2?.slice(1);
  let lenParent = sliceData2?.length;
  for (let i = 0; i < lenParent; i++) {
    let id = sliceData2?.[i]?.[0];
    let language = sliceData2?.[i]?.[1];
    let name = sliceData2?.[i]?.[2];

    if (CONTENT?.[id]) {
      CONTENT[id] = {
        ...CONTENT?.[id],
        [language]: name,
      };
    } else {
      CONTENT[id] = {
        [language]: name,
      };
    }
  }
  handelChange(file, setLogs);
};

const handelChange = async (file, setLogs) => {
  const data = await readXlsxFile(file);
  const sliceData = data?.slice(5);
  let lenParent = sliceData?.length;
  for (let i = 0; i < lenParent; i++) {
    let numeric = sliceData?.[i]?.[0];
    let color_sku = sliceData?.[i]?.[1];
    let hex = sliceData?.[i]?.[2];
    let image = sliceData?.[i]?.[3];
    let parent_id = sliceData?.[i]?.[4];

    let color_id = COLORS_IDS?.[parseInt(numeric)];
    if (color_id) {
      setLogs((prev) => [
        ...prev,
        {
          status: "error",
          msg: `Failed insert color in row: ${i} Reason: color is already exist`,
        },
      ]);
      continue;
    }

    const colorData = {
      numeric,
      color_sku,
      hex,
      image,
      parent_id: COLORS_IDS?.[parseInt(parent_id)],
    };

    const newColor = await createColor(colorData, i, setLogs);
    color_id = newColor?.data?.id;

    if (color_id) {
      COLORS_IDS[numeric] = color_id;

      const colorContentDataEN = {
        color_id,
        name: CONTENT?.[numeric]?.English,
        language_id: languages?.English,
      };
      const colorContentDataTR = {
        color_id,
        name: CONTENT?.[numeric]?.Turkish,
        language_id: languages?.Turkish,
      };
      const colorContentDataAR = {
        color_id,
        name: CONTENT?.[numeric]?.Arabic,
        language_id: languages?.Arabic,
      };

      await createColorContent(
        [colorContentDataEN, colorContentDataTR, colorContentDataAR],
        i,
        setLogs
      );
    }
  }
};

export const UploadColorsScript = async (file, setLogs) => {
  setLogs((prev) => [
    ...prev,
    { status: "loading", msg: "Starting Process..." },
  ]);
  getColors().then((res) => {
    collectionData(file, setLogs);
  });
};
