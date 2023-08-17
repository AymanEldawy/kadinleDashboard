import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getRowsById } from "../../Api/globalActions";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import DynamicForm from "../Dynamics/DynamicForm";
import ShippingPriceTable from "./ShippingPricesComponents/ShippingPriceTable";

const AddShippingPrice = () => {
  const navigate = useNavigate();
  const params = useParams()
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const { updateItem } = useUpdate();
  const { addItem } = useAdd();
  const { getData } = useFetch()
  const [values, setValues] = useState({});
  const [pricesValues, setPricesValues] = useState({})
  const [rowLength, setRowLength] = useState(1);


  const getShippingPrices = async () => {
    const response = await getRowsById('shipping_price', 'id', params?.id);
    let data = response?.data?.[0];
    setValues(data);
    let hash = {};
    let length = Object.keys(data?.fast_price)?.length;
    const weights = Object.keys(data?.fast_price);
    const fast = Object.values(data?.fast_price);
    const normal = Object.values(data?.normal_price);
    for (let i = 0; i < length; i++) {
      let weight = weights?.[i]
      let fast_price = fast?.[i]
      let normal_price = normal?.[i]
      hash = {
        ...hash,
        [i + 1]: {
          weight,
          normal_price,
          fast_price,
        }
      }
    }
    setPricesValues(hash);
    setRowLength(Object.keys(hash)?.length)
  }

  useEffect(() => {
    if (!params?.id) return;

    getShippingPrices()
  }, [params?.id])

  const handleChangeField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setValues(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let loading = toast.loading("Please wait...");
    let listPrices = Object.values(pricesValues);
    let normal_price = {}
    let fast_price = {}
    for (const price of listPrices) {
      if (price?.normal_price)
        normal_price[price?.weight] = price?.normal_price
      if (price?.fast_price)
        fast_price[price?.weight] = price?.fast_price
    }
    let newValues = {
      ...values,
      normal_price,
      fast_price
    }

    const response = params?.id ? updateItem('shipping_price', newValues) : await addItem('shipping_price', newValues);
    if (!response?.error) {
      setValues({});
      toast.update(loading, {
        render: params?.id === 'update' ? 'Successfully updated' : "Great! successfully added",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      if (!params?.id)
        navigate(-1);
    } else {
      toast.update(loading, {
        render: params?.id === 'update' ? 'Oops! Failed to updates' : "Oops! Failed to added new",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    // <DynamicForm SUPABASE_TABLE_NAME="shipping_price" title="Add Shipping price" />
    <BlockPaper title="Add shipping price">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {/* <SelectField
            name="area"
            label="Area"
            value={values?.area}
            list={areas}
            keyLabel="area"
            onChange={handleChangeField}
          /> */}
          <InputField
            type="number"
            name="area"
            label="area"
            value={values?.area}
            onChange={handleChangeField}
            required
          />
          <InputField
            type="number"
            step="any"
            name="min_normal_duration"
            label="min_normal_duration"
            value={values?.min_normal_duration}
            onChange={handleChangeField}
          />
          <InputField
            type="number"
            step="any"
            name="max_normal_duration"
            label="max_normal_duration"
            value={values?.max_normal_duration}
            onChange={handleChangeField}
          />
          <InputField
            type="number"
            step="any"
            name="min_fast_duration"
            label="min_fast_duration"
            value={values?.min_fast_duration}
            onChange={handleChangeField}
            required
          />
          <InputField
            type="number"
            step="any"
            name="max_fast_duration"
            label="max_fast_duration"
            value={values?.max_fast_duration}
            onChange={handleChangeField}
            required
          />
        </div>
        <ShippingPriceTable
          rowLength={rowLength}
          setRowLength={setRowLength}
          grid={pricesValues}
          setGrid={setPricesValues}
          layout={params?.id && 'update'}
        />
        <Button title="Submit" classes="mt-4" />
      </form>
    </BlockPaper>
  );
};

export default AddShippingPrice;
