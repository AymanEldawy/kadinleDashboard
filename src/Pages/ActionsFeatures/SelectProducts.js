import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getTableData, removeItemsFrom } from "../../Api/globalActions";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import UPLOAD_DB_API from "../../Helpers/Forms/databaseUpload";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { CalenderIcon } from "../../Helpers/Icons";
import { useDelete } from "../../hooks/useDelete";

const SelectProduct = ({ tableName }) => {
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const { removeItems } = useDelete();
  const { defaultLanguage } = useGlobalOptions();
  const [selectedList, setSelectedList] = useState({});
  const [id, setId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [listContent, setListContent] = useState([]);
  const [sale, setSale] = useState({});
  const [productsLength, setProductLength] = useState(0);

  const fetchData = async () => {
    if (tableName === "sale") {
      const response = await getData("sale");
      setSale(response?.[0]);
      setEndDate(response?.[0]?.end_date);
    } else {
      const response = await getTableData(`${tableName}_content`, {
        languageId: defaultLanguage?.id,
      });
      setListContent(response?.data);
    }
  };

  useEffect(() => {
    if (!defaultLanguage?.id) return;
    fetchData(tableName);
  }, [defaultLanguage?.id]);

  const handleChoose = async (list = selectedList) => {
    if (tableName !== "sale" && !id) {
      toast.error(`You must select a ${tableName}_id`);
      return;
    }
    if (tableName === "sale" && !endDate) {
      toast.error(`You must choose an End Date`);
      return;
    }
    let records = [];
    for (const productId of Object.values(list)) {
      let record = {};
      if (tableName === "sale") record.end_date = endDate;
      else record[`${tableName}_id`] = id;
      records.push({
        product_id: productId,
        ...record,
      });
    }
    if (records?.length) {
      const loading = toast.loading("loading...");
      const response = await addItem(
        tableName === "sale" ? "sale" : `${tableName}_product`,
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

  return (
    <div>
      <div className=" mb-4 -mt-4 flex gap-4 items-end justify-between bg-gray-100 -mx-5 shadow p-4">
        {tableName === "sale" ? (
          <div className="relative">
            <InputField
              containerClassName="flex !flex-row gap-2 w-fit"
              labelClassName="whitespace-nowrap w-14"
              type="date"
              label="End date"
              name="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-1"
            />
            {endDate ? (
              <span className="absolute top-0 right-0 bg-white dark:bg-bgmaindark dark:text-gray-100 pointer-events-none p-[6px] border-gray-200 border left-14 ml-1 flex items-center justify-between">
                {new Date(endDate).toLocaleDateString("en-UK")}
                <CalenderIcon className="h-5 w-5 text-primary-blue" />
              </span>
            ) : null}
          </div>
        ) : (
          <SelectField
            containerClassName="flex !flex-row gap-2 w-fit"
            labelClassName="whitespace-nowrap"
            className="p-1"
            name={`${tableName}_id`}
            label={`${tableName}_id`}
            list={listContent}
            keyValue={tableName !== "sale" && `${tableName}_id`}
            onChange={(option) =>
              setId(option[tableName !== "sale" && `${tableName}_id`])
            }
          />
        )}
        <span className="flex gap-2 font-medium items-center ">
          Products Selected:
          <span className="read-only:!bg-blue-100 p-1 px-4 rounded-md text-primary-blue">
            {productsLength}
          </span>
        </span>
      </div>
      {endDate || (id && id !== "Choose...") ? (
        <SelectedProductTable
          setProductLength={setProductLength}
          insertMany={handleChoose}
          tableName={tableName}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          id={id}
        />
      ) : null}
    </div>
  );
};

export default SelectProduct;
