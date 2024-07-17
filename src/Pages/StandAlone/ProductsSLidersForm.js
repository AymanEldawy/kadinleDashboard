import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import DB_API from "../../Helpers/Forms/databaseApi";
import { toast } from "react-toastify";
import { addNewItem, updateItem } from "../../Api/globalActions";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import CheckboxField from "../../Components/CustomForm/CheckboxField";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import { useParams } from "react-router-dom";

let CACHE_SLIDERS = {};

const ProductsSLidersForm = () => {
  let name = "products_slider";
  const { getData } = useFetch();
  const params = useParams();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedList, setSelectedList] = useState({});
  const [productsLength, setProductLength] = useState(0);

  const { isLoading, refetch } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await getData(name, params?.id);
      let data = response?.at(0)
      setValues(data);
      if (data?.products_sku?.length) {
        let hash = {};
        for (const item of data?.products_sku) {
          hash[item] = item;
        }
        setSelectedList(hash);
      }
    },
  });

  const insertIntoErrors = (name, value) => {
    if (value === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: "Field is required",
        };
      });
    } else {
      let newErrors = errors;
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handelChangeField = (name, value, required) => {
    if (required) {
      insertIntoErrors(name, value);
    }
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (list) => {
    const loading = toast.loading("loading...");
    let response = null;
    if (values?.id) {
      response = await updateItem(name, {
        ...values,
        products_sku: Object.keys(list),
      });
    } else {
      response = await addNewItem(name, {
        ...values,
        products_sku: Object.keys(list),
      });
    }
    if (response?.error) {
      toast.update(loading, {
        render: response.error || "Field to products slider, please try again",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(loading, {
        render: "Successfully save products slider",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <BlockPaper
      title={"Products slider"}
      contentBar={<span>Selected products {productsLength}</span>}
    >
      <div className="flex gap-4 items-center mb-4">
        <InputField
          value={values?.sku}
          label={"sku"}
          required={true}
          error={errors.sku ? errors.sku : null}
          onChange={(e) => handelChangeField("sku", +e.target.value, true)}
        />
        <CheckboxField
          defaultChecked={values?.display_home}
          value={values?.display_home}
          label={"display_home"}
          required={true}
          error={errors.display_home ? errors.display_home : null}
          onChange={(e) =>
            handelChangeField("display_home", e.target.checked, true)
          }
        />
      </div>
      <SelectedProductTable
        setProductLength={setProductLength}
        insertMany={onSubmit}
        tableName={"products slider"}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        hideSearch
      />
    </BlockPaper>
  );
};

export default ProductsSLidersForm;
