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
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";

let CACHE_SLIDERS = {};

const ProductsSLidersForm = ({ layout }) => {
  let name = "products_slider";
  const { getData } = useFetch();
  const params = useParams();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [rowSelection, setRowSelection] = useState([]);
  const [productsLength, setProductLength] = useState(0);

  const { isLoading, refetch } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      if (layout !== "update") return;
      const response = await getData(name, params?.id);
      let data = response?.at(0);
      console.log("🚀 ~ queryFn: ~ data:", data);
      setValues(data);
      if (data?.products_sku?.length) {
        let hash = {};
        for (const item of data?.products_sku) {
          hash[item] = true;
        }
        setRowSelection(hash);
        setProductLength(data?.products_sku?.length);
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

  console.log(rowSelection);
  

  const onSubmit = async () => {
    const list = Object.keys(rowSelection)
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
  console.log(values);

  return (
    <BlockPaper
      title={"Products slider"}
      contentBar={
        <span>Selected products {Object.keys(rowSelection)?.length}</span>
      }
    >
      <div className="flex gap-4 items-center mb-4">
        <InputField
          value={values?.sku}
          label={"sku"}
          required={true}
          error={errors.sku ? errors.sku : null}
          onChange={(e) => handelChangeField("sku", +e.target.value, true)}
        />

        <div className="flex flex-col gap-1">
          <p>Select category</p>
          <CategoryMultiFilter
            name="category_link"
            setFilterCategory={(category) => {
              handelChangeField("category_id", category, true);
            }}
            filterCategory={values?.category_id}
          />
        </div>
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
      <div className="flex gap-4 my-4">
        <InputField
          containerClassName="flex-1"
          value={values?.en_text}
          label={"en_text"}
          required={true}
          error={errors.en_text ? errors.en_text : null}
          onChange={(e) => handelChangeField("en_text", e.target.value, true)}
        />
        <InputField
          containerClassName="flex-1"
          value={values?.tr_text}
          label={"tr_text"}
          required={true}
          error={errors.tr_text ? errors.tr_text : null}
          onChange={(e) => handelChangeField("tr_text", e.target.value, true)}
        />
        <InputField
          containerClassName="flex-1"
          value={values?.ar_text}
          label={"ar_text"}
          required={true}
          error={errors.ar_text ? errors.ar_text : null}
          onChange={(e) => handelChangeField("ar_text", e.target.value, true)}
        />
      </div>

      <SelectedProductTable
        onSaveChanges={onSubmit}
        tableName={"products slider"}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        layout="slider"
      />
    </BlockPaper>
  );
};

export default ProductsSLidersForm;
