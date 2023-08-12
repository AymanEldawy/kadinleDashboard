import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getTableData } from "../../Api/globalActions";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import UPLOAD_DB_API from "../../Helpers/Forms/databaseUpload";
import { EditIcon } from "../../Helpers/Icons";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import DynamicLayout from "../Dynamics/DynamicLayout";
import DynamicList from "../Dynamics/DynamicList";

const SELECTED_TABLE = ['sale', "offer", "collection"];
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
const SelectProduct = ({ }) => {
  const { addItem } = useAdd();
  const { defaultLanguage } = useGlobalOptions();
  const [activeStage, setActiveStage] = useState(SELECTED_TABLE[0]);
  const [refresh, setRefresh] = useState(false);
  const [selectedList, setSelectedList] = useState({});
  const [id, setId] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async (tableName) => {
    const response = await getTableData(
      tableName === "sale" ? tableName : `${tableName}_content`,
      {
        languageId: defaultLanguage?.id,
      }
    );
    CACHE_DATA[tableName] = response?.data;
  };

  useEffect(() => {
    if (!defaultLanguage?.id) return;

    for (let table of SELECTED_TABLE) {
      fetchData(table);
      let fields = UPLOAD_DB_API?.[`${table}_content`];
      CACHE_FIELDS[table] = fields;
    }
    setRefresh((p) => !p);
  }, [defaultLanguage?.id]);

  const handleChoose = async () => {
    if (activeStage !== 'sale' && !id) {
      toast.error(`You must select a ${activeStage}_id`);
      return;
    }
    if (activeStage === 'sale' && !endDate) {
      toast.error(`You must choose an End Date`);
      return;
    }


    let records = []
    for (const productId of Object.values(selectedList)) {
      let record = {}
      if (activeStage === 'sale')
        record.end_date = endDate
      else
        record[`${activeStage}_id`] = id
      records.push({
        product_id: productId,
        ...record
      })
    }
    if (records?.length) {
      const loading = toast.loading('loading...')
      const response = await addItem(
        activeStage === "sale" ? activeStage : `${activeStage}_product`,
        records
      );
      if (response?.error) {
        toast.update(loading, {
          render: response.error || "Field to add, please try again",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(loading, {
          render: "Successfully set products",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }

  };

  useEffect(() => {
    setId("");
  }, [activeStage]);

  return (
    <div>
      <div className="mb-4 bg-white shadow-sm my-4 w-full p-4">
        <h2 className="text-primary-blue capitalize text-xl font-semibold mb-4">
          select product for {activeStage}
        </h2>
        <div className=" border-gray-300 flex flex-wrap  border rounded-lg overflow-hidden">
          {SELECTED_TABLE?.map((stage, index) => (
            <button
              className={`text-gray-500 px-4 flex-1 border-x border-gray-300 justify-center text-center -mb-[2px] !gap-1 p-2 capitalize flex items-center ${stage === activeStage
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
          {
            activeStage === 'sale' ? (
              <InputField
                type="date"
                label="End date"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-3"
              />
            ) : (
              <SelectField
                containerClassName="w-full max-w-lg"
                className="p-3"
                name={`${activeStage}_id`}
                label={`${activeStage}_id`}
                list={CACHE_DATA[activeStage]}
                keyValue={activeStage !== "sale" ? `${activeStage}_id` : "id"}
                onChange={(e) => setId(e.target.value)}
              />
            )
          }
          <InputField
            label={"Products Selected"}
            value={
              typeof selectedList === "object"
                ? Object.keys(selectedList)?.length
                : null
            }
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
        <div className="">

        </div>
        <DynamicLayout
          SUPABASE_TABLE_NAME={"product"}
          columns={product_columns}
          getSelectedList={setSelectedList}
        />
      </div>
    </div>
  );
};

export default SelectProduct;
