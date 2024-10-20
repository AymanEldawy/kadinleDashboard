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

const SaleSlider = () => {
  const params = useParams();
  const { addItem } = useAdd();
  const { updateItem, upsertItem } = useUpdate();
  const { getData } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const [rowSelection, setRowSelection] = useState([]);
  const [sale, setSale] = useState({
    category_id: null,
    start_date: null,
    end_date: null,
    amount: 0,
    percentage: false,
  });

  const { data: saleProducts } = useQuery({
    queryKey: ["sale", "data", params?.id, defaultLanguage?.id],
    queryFn: async () => {
      const response = await getData("sale");
      let CACHE_ids = [];
      let CACHE_DATE = {};
      for (const item of response) {
        let productIds = item?.products_ids || [];
        CACHE_ids.push(...productIds);
        for (const product of productIds) {
          CACHE_DATE[product] = item?.end_date;
        }
      }
      return {
        CACHE_ids,
        CACHE_DATE,
      };
    },
  });

  const { data: saleSlider } = useQuery({
    queryKey: ["sale_slider"],
    queryFn: async () => {
      const response = await getData("sale_slider");
      let CACHE_SALE_IDS = {};
      let selections = {};
      let sortedSale = response?.sort((a, b) => a?.sku - b?.sku);
      for (const product of sortedSale) {
        selections[product?.product_id] = true;
        CACHE_SALE_IDS[product?.product_id] = product?.id;
      }
      setRowSelection(selections);
      return response;
    },
  });

  const handleChoose = async () => {
    const loading = toast.loading("loading...");
    let list = Object.keys(rowSelection);
    let data = [];
    let item = {};
    for (let i = 0; i < list.length; i++) {
      let id = saleSlider?.CACHE_SALE_IDS?.[list?.[i]];
      item = {
        end_date: saleProducts?.CACHE_DATE?.[list?.[i]],
        product_id: list?.[i],
        sku: i + 1,
      };
      if (id) item.id = id;
      data.push(item);
    }
    const response = await upsertItem(`sale_slider`, data);

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
        onSaveChanges={handleChoose}
        tableName={"sale"}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        showIndex
        saleProducts={saleProducts?.CACHE_ids}
      />
    </BlockPaper>
  );
};

export default SaleSlider;
