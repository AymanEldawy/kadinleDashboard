import { getTableContentDataById } from "../../Api/globalActions";
import { PopupFormOne } from "../../Components/CustomForm/PopupFormOne";
import SuperForm from "../../Components/CustomForm/SuperForm";
import Modal from "../../Components/Modal/Modal";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { useUpdate } from "../../hooks/useUpdate";
import DynamicList from "../Dynamics/DynamicList";
import EditIcon from "./../../Helpers/Icons/EditIcon";
import React, { useEffect } from "react";
import { useState } from "react";

const productFeatures = [
  "fabric",
  "material",
  "lining",
  "collar",
  "sleeve",
  "season",
  "feature",
  "pattern",
  "fabric_information",
  "environment",
  "style",
  "package",
  "sleeve_type",
  "waist",
  "belt_condition",
  "pocket",
  "leg_type",
  "closure_type",
  "thickness",
  "printing_technique",
  "embroidery_type",
  "washing_instructions",
];

const CACHE_COLUMNS = {};
const CACHE_DATA = {};
const CACHE_FIELDS = {};

const ProductFeatures = () => {
  const { addItem } = useAdd();
  const { updateItem } = useUpdate();
  const [activeStage, setActiveStage] = useState(productFeatures[0]);
  const [oldValues, setOldValues] = useState({});
  const [initialFields, setInitialFields] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openFeaturesForm, setOpenFeaturesForm] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [layout, setLayout] = useState("");

  const fetchData = async (tableName) => {
    const data = await getTableContentDataById(tableName);
    CACHE_DATA[tableName] = data;
  };
  useEffect(() => {
    for (let table of productFeatures) {
      fetchData(table);
      let columns = COMBINE_DB_API?.[`combine_${table}`];
      let fields = DB_API?.[`${table}_content`];
      CACHE_COLUMNS[table] = columns;
      CACHE_FIELDS[table] = fields;
    }
    setRefresh((p) => !p);
  }, []);

  const onClickAddNew = () => {
    setInitialFields(CACHE_FIELDS[activeStage]);
    setOpenFeaturesForm(true);
  };
  const onClickEdit = (data) => {
    setInitialFields(CACHE_FIELDS[activeStage]);
    setOldValues(data);
    setOpenFeaturesForm(true);
    setLayout("update");
  };

  useEffect(() => {}, [refresh]);
  const onSubmit = async (data) => {
    if (layout === "update") {
      const response = await updateItem(activeStage, {});
      if (!response?.error) setResetForm({});
    } else {
      const response = addItem(activeStage, {});
      const itemId = response?.data?.[0]?.id;
      if (itemId) {
        // const response = addItem(activeStage, {});
        let filterData = {};
        let fields = CACHE_FIELDS[activeStage];
        for (const item of Object.keys(data)) {
          if (fields?.find((field) => field?.name === item)) {
            filterData[item] = data[item];
          }
        }
      }
    }
  };

  return (
    <>
      <PopupFormOne
        setInitialFields={setInitialFields}
        setOldValues={setOldValues}
        open={openFeaturesForm}
        setOpen={setOpenFeaturesForm}
        oldValues={oldValues}
        table={activeStage}
        layout={layout}
        setLayout={setLayout}
        initialFields={initialFields}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />
      <div>
        <div className="mb-4 dark:bg-bgmaindark bg-white shadow-sm my-4 w-full p-4">
          <h2 className="text-primary-blue font-semibold mb-4 text-lg">
            Product Features
          </h2>
          <div className=" border-b flex flex-wrap ">
            {productFeatures
              ?.sort((a, b) => a?.localeCompare(b))
              ?.map((stage, index) => (
                <button
                  key={index}
                  className={`text-gray-500 px-4 text-sm border-b-2 -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                    stage === activeStage
                      ? "border-primary-red text-primary-red font-medium"
                      : ""
                  }`}
                  onClick={() => setActiveStage(stage)}
                >
                  {stage}
                </button>
              ))}
          </div>
        </div>
        <div key={activeStage}>
          <DynamicList
            SUPABASE_TABLE_NAME={`${activeStage}_content`}
            columns={
              CACHE_COLUMNS[activeStage] ||
              DB_API?.[productFeatures[0]]?.map((col) => col?.name) ||
              []
            }
            title={activeStage?.replace("_", " ")}
            // oldValue={CACHE_DATA[activeStage]}
            onAddClick={onClickAddNew}
            renderTableAction={(data) => {
              return (
                <button
                  className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
                  onClick={() => onClickEdit(data)}
                >
                  <EditIcon className="w-4 h-4" />
                  Edit
                </button>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFeatures;
