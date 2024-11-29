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
  const { addItem } = useAdd();
  const { updateItem } = useUpdate();
  const { getData } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const [sale, setSale] = useState({
    category_id: null,
    start_date: null,
    end_date: null,
    amount: 0,
    percentage: false,
  });
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
      setSale({
        id: data?.id,
        end_date: new Date(data?.end_date)?.toISOString().split("T")[0],
        start_date: new Date(data?.start_date)?.toISOString().split("T")[0],
        category_id: data?.category_id,
      });
      return data;
    },
  });

  const handleChoose = async () => {
    if (!sale?.start_date || !sale?.end_date || !sale?.category_id || !sale?.amount) {
      toast.error("Please Fill Required Data");
      return;
    }

    const loading = toast.loading("loading...");
    let response = null;

    if (params?.id) {
      await updateItem(`sale`, {
        ...sale,

        products_ids: Object.keys(rowSelection),
        product_id: Object.keys(rowSelection)?.[0],
      });
    } else {
      await addItem(`sale`, {
        ...sale,
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

  const handleChangeField = (name, value) => {
    setSale((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              value={sale?.start_date}
              onChange={(e) => handleChangeField("start_date", e.target.value)}
              className="p-1"
            />
            <InputField
              containerClassName="mb-0"
              required
              type="date"
              label="End date"
              value={sale?.end_date}
              onChange={(e) => handleChangeField("end_date", e.target.value)}
              className="p-1"
            />
            <InputField
              containerClassName="mb-0"
              required
              type="number"
              label="Amount"
              value={sale?.amount}
              onChange={(e) => handleChangeField("amount", e.target.value)}
              className="p-1"
            />
            <InputField
              containerClassName="mb-0"
              required
              type="checkbox"
              label="Percentage"
              value={sale?.percentage}
              onChange={(e) => handleChangeField("percentage", e.target.value)}
              className="p-1"
            />
          </div>
        }
        onSaveChanges={handleChoose}
        tableName={"sale"}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        setSelectedCategory={(value) => {
          handleChangeField("category_id", value);
        }}
      />
    </BlockPaper>
  );
};

export default SaleForm;
