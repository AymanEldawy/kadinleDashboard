import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import DynamicList from "../Dynamics/DynamicList";
import { useFetch } from "../../hooks/useFetch";
import UPLOAD_DB_API from "../../Helpers/Forms/databaseUpload";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { EditIcon } from "../../Helpers/Icons";
import SelectField from "../../Components/CustomForm/SelectField";
import { toast } from "react-toastify";
import { useAdd } from "../../hooks/useAdd";
import InputField from "../../Components/CustomForm/InputField";

const SELECTED_TABLE = ["offer", "collection", "sale"];
const product_columns = [
  "id",
  "product_sku",
  "name",
  "description",
  "category",
  "price",
  "barcode",
  "discount",
  "views",
  "brand",
  "pattern",
];
let CACHE_DATA = [];
let CACHE_FIELDS = {};
const SelectProduct = ({}) => {
  const { getData } = useFetch();
  const { addItem } = useAdd();
  const [activeStage, setActiveStage] = useState(SELECTED_TABLE[0]);
  const [refresh, setRefresh] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [id, setId] = useState();

  const fetchData = async (tableName) => {
    const data = await getData(
      tableName === "sale" ? tableName : `${tableName}_content`
    );
    CACHE_DATA[tableName] = data;
  };
  useEffect(() => {
    for (let table of SELECTED_TABLE) {
      fetchData(table);
      let fields = UPLOAD_DB_API?.[`${table}_content`];
      CACHE_FIELDS[table] = fields;
    }
    setRefresh((p) => !p);
  }, []);

  const handleChoose = async () => {
    if (!id) {
      toast.error(`You must select an ${activeStage}_id`);
      return;
    } else {
      for (const productId of Object.values(selectedList)) {
        const response = await addItem(
          activeStage === "sale" ? activeStage : `${activeStage}_product`,
          {
            [`${activeStage}_id`]: id,
            product_id: productId,
          }
        );
        // add
      }
    }
  };

  useEffect(() => {
    setId("");
  }, [activeStage]);
  console.log(id);

  return (
    <div>
      <div className="mb-4 bg-white shadow-sm my-4 w-full p-4">
        <h2 className="text-primary-blue capitalize text-xl font-semibold mb-4">
          select product for {activeStage}
        </h2>
        <div className=" border-gray-300 flex flex-wrap  border rounded-lg overflow-hidden">
          {SELECTED_TABLE?.map((stage, index) => (
            <button
              className={`text-gray-500 px-4 flex-1 border-x border-gray-300 justify-center text-center -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                stage === activeStage
                  ? "bg-gray-100 text-gray-500 font-medium"
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
        <div className=" my-4 flex gap-4 items-end">
          <SelectField
            containerClassName="w-full max-w-lg"
            className="p-3"
            name={`${activeStage}_id`}
            label={`${activeStage}_id`}
            list={CACHE_DATA[activeStage]}
            refId={activeStage !== "sale" ? `${activeStage}_id` : "id"}
            onChange={(e) => setId(e.target.value)}
          />
          <InputField
            label={"Products Selected"}
            value={Object.keys(selectedList)?.length}
            className="p-3"
            readOnly
          />
          <button
            onClick={handleChoose}
            className="p-3 ltr:ml-auto rtl:mr-auto w-full max-w-[200px] rounded-lg px-6 bg-primary-blue text-white"
          >
            Save Choices
          </button>
        </div>
        <DynamicLayout
          SUPABASE_TABLE_NAME={"product"}
          columns={product_columns}
          getSelectedList={setSelectedList}

          // renderTableAction={(data) => {
          //   return;
          // }}
        />
      </div>
    </div>
  );
};

export default SelectProduct;
