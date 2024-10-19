import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import InputField from "../../Components/CustomForm/InputField";
import { useQuery } from "@tanstack/react-query";
import { useUpdate } from "../../hooks/useUpdate";
import { getSaleData } from "../../Api/data";

const SaleForm = () => {
  const params = useParams();
  console.log("🚀 ~ SaleForm ~ params:", params);
  const { addItem } = useAdd();
  const { updateItem } = useUpdate();
  const { getData } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const [category_id, setCategory_id] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);

  const { data } = useQuery({
    queryKey: ["sale", "slider-form", params?.id, defaultLanguage?.id],
    queryFn: async () => {
      if (!params?.id || !defaultLanguage?.id) return;
      const response = await getSaleData(params?.id, defaultLanguage?.id);
      const data = response?.data?.at(0);
      if (data?.products_ids?.length) {
        let hash = {};
        for (const item of data?.products_ids) {
          hash[item] = true;
        }
        setRowSelection(hash);
      }
      setEnd_date(new Date(data?.end_date)?.toISOString().split("T")[0]);
      setStart_date(new Date(data?.start_date)?.toISOString().split("T")[0]);
      setCategory_id(data?.category_id);
      return data;
    },
  });

  const handleChoose = async () => {
    if (!start_date || !end_date || !category_id) {
      toast.error("Please Fill Required Data");
      return;
    }

    const loading = toast.loading("loading...");
    let response = null;

    if (params?.id) {
      await updateItem(`sale`, {
        id: params?.id,
        category_id,
        start_date,
        end_date,
        products_ids: Object.keys(rowSelection),
        product_id: Object.keys(rowSelection)?.[0],
      });
    } else {
      await addItem(`sale`, {
        category_id,
        start_date,
        end_date,
        products_ids: Object.keys(rowSelection),
        product_id: Object.keys(rowSelection)?.[0],
      });
    }

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
  };

  console.log(data, "---sdsdsd");

  return (
    <BlockPaper
      title="Flash Sale"
      headerClassName="flex items-center justify-between"
      contentBar={
        <p className="ml-auto">
          Selected Products:{" "}
          <span className="font-extrabold text-lg">
            {Object.keys(rowSelection)?.length}
          </span>{" "}
        </p>
      }
    >
      <SelectedProductTable
        categoryTitle={data?.category?.category_content?.at(0)?.title}
        extraContent={
          <div className="flex gap-2 items-center">
            <InputField
              containerClassName="mb-0"
              required
              type="date"
              label="Start date"
              value={start_date}
              onChange={(e) => setStart_date(e.target.value)}
              className="p-1"
            />
            <InputField
              containerClassName="mb-0"
              required
              type="date"
              label="End date"
              value={end_date}
              onChange={(e) => setEnd_date(e.target.value)}
              className="p-1"
            />
          </div>
        }
        onSaveChanges={handleChoose}
        tableName={"sale"}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        setSelectedCategory={setCategory_id}
      />
    </BlockPaper>
  );
};

export default SaleForm;
