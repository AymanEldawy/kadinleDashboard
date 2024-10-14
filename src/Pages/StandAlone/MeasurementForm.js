import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { CategoryFallbackForm } from "../../Components/CategoryComponents/CategoryFallbackForm";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import { getCacheCategory } from "../../Api/data";
import InputField from "../../Components/CustomForm/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdate } from "../../hooks/useUpdate";
import { useAdd } from "../../hooks/useAdd";
import { MeasurementIncreasable } from "../../Components/TableBar/MeasurementIncreasable";
import { getRowsById, getTableData } from "../../Api/globalActions";
import { PlusIcon } from "../../Helpers/Icons";
import { Button } from "../../Components/Global/Button";
import { toast } from "react-toastify";

const MeasurementForm = () => {
  const { defaultLanguage } = useGlobalOptions();
  const params = useParams();
  const navigate = useNavigate();
  const { updateItem } = useUpdate();
  const { addItem } = useAdd();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numeric, setNumeric] = useState(null);
  const [content, setContent] = useState({
    1: {},
  });
  const [categories, setCategories] = useState([]);

  const { data: measurement } = useQuery({
    queryKey: ["list", "measurement", params?.id],
    queryFn: async () => {
      if (!params?.id) return;
      const response = await getRowsById("measurement", "id", params?.id);
      let data = response?.data?.at(0);
      if (data?.id) {
        setContent(data?.content);
        setNumeric(data?.numeric);
      }
      return response?.data?.at(0) || [];
    },
  });

  const { data: CACHE_CATEGORIES } = useQuery({
    queryKey: ["CACHE_CATEGORIES", "category", defaultLanguage?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
      return await getCacheCategory(defaultLanguage?.id);
    },
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let response = null;
    if (params?.id) {
      response = await updateItem("measurement", {
        id: params?.id,
        categories_ids: categories,

        numeric,
        content,
      });
    } else {
      response = await addItem("measurement", {
        categories_ids: categories,

        numeric,
        content,
      });
    }
    if (response?.error) {
      toast.error("Failed to save data");
    } else {
      toast.success("Successfully save data");
    }
    setIsSubmitting(false);
  };
  const handleOnChangeContent = (index, name, value) => {
    setContent((prev) => ({
      ...prev,
      [index]: {
        ...prev?.[index],
        [name]: value,
      },
    }));
  };

  const onDeleteItem = (index) => {
    const list = content;
    delete list[index];
    setContent(list);
  };
  console.log(measurement, "------");

  return (
    <BlockPaper
      fullWidth
      headerClassName="flex justify-between"
      title={"Measurement"}
    >
      <CategoryFallbackForm
        name={
          <InputField
            name="numeric"
            label="Measurement numeric"
            value={numeric}
            className="py-[6px]"
            onChange={(e) => setNumeric(e.target.value)}
          />
        }
        oldCategories={
          measurement?.categories_ids?.length ? measurement?.categories_ids : []
        }
        CACHE_CATEGORIES={CACHE_CATEGORIES}
        onClickCancel={() => navigate(-1)}
        hideAction
        setSelectedCategories={setCategories}
      />
      <div className="mt-4 border">
        <div className="flex items-center w-full bg-gray-300 p-2">
          <p className="w-[60px] px-2">Sku</p>
          <p className="flex-1 px-2">AR description</p>
          <p className="flex-1 px-2">En description</p>
          <p className="flex-1 px-2">Tr description</p>
          <p className="w-[60px] px-2">Action</p>
        </div>
        {Object.entries(content)?.map(([sku, value]) => (
          <MeasurementIncreasable
            sku={sku}
            onChange={(e) =>
              handleOnChangeContent(sku, e.target.name, e.target.value)
            }
            content={value}
            onDeleteItem={() => onDeleteItem(sku)}
          />
        ))}
      </div>
      <button
        onClick={() =>
          setContent((p) => ({
            ...p,
            [Object.keys(content).length + 1]: {
              sku: Object.keys(content).length + 1,
            },
          }))
        }
        className="flex items-center gap-2 py-1 px-2 bg-blue-500 rounded-md text-white mt-2 ml-auto text-sm"
      >
        Add more <PlusIcon />
      </button>
      <div className={`flex items-center mt-4 pt-4 border-t gap-4`}>
        <button
          disabled={isSubmitting}
          onClick={() => navigate(-1)}
          className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-md hover:bg-red-500 hover:text-white duration-300"
        >
          Cancel
        </button>
        <Button
          title="Save Categories"
          classes="text-xs capitalize whitespace-nowrap"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !numeric ||
            !categories?.length ||
            !Object.keys(content)?.length
          }
        />
      </div>
    </BlockPaper>
  );
};

export default MeasurementForm;
