import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useForm } from "react-hook-form";
import UploadFile from "../../Components/CustomForm/UploadFile";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import Loading from "../../Components/Loading/Loading";
import { Button } from "../../Components/Global/Button";
import { toast } from "react-toastify";
import { handleUploadSlider } from "../../Api/DynamicUploadHandler";
import { addNewItem, updateItem } from "../../Api/globalActions";
import { useParams } from "react-router-dom";

let CACHE_SLIDERS = {};

const HomeSlider = () => {
  const params = useParams();
  const { getData } = useFetch();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const name = params?.name;

  const { isLoading, refetch } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      if (params?.id) {
        const data = await getData(name, params?.id);
        console.log("🚀 ~ queryFn: ~ data:", data);
        if (data?.length) {
          let hash = {};
          for (const item of data) {
            hash[item?.id] = item;
          }
          setValues(hash);
          CACHE_SLIDERS = hash;
        }
      }
    },
  });

  const fields = useMemo(() => DB_API[name], []);

  const onSubmit = async () => {
    if (JSON.stringify(CACHE_SLIDERS) === JSON.stringify(values)) {
      toast.error(`data isn't change`);
      return;
    }

    for (const value of Object.values(values)) {
      const loading = toast.loading("loading...");
      let additional = {};
      if (name !== "definitions") {
        const web_image = await handleUploadSlider(value, "web_image", name);
        const mobile_image = await handleUploadSlider(value, "mobile_image", name);
        additional = {
          web_image,
          mobile_image,
        };
      } else {
        const image = await handleUploadSlider(value, "image", name);
        additional = {
          image,
        };
      }

      let response = null;
      if (value?.id) {
        response = await updateItem(name, {
          ...value,
          additional,
        });
      } else {
        response = await addNewItem(name, {
          ...value,
          additional,
        });
      }
      if (response?.error) {
        toast.update(loading, {
          render: response.error || "Field to sort sections, please try again",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(loading, {
          render: "Successfully sorted home page sections",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FormIncreasable
            oldList={!isLoading}
            initialFields={fields}
            increasableTitle={"slider"}
            values={values}
            setValues={setValues}
            customGrid="grid grid-cols-5 gap-4 mt-8 p-4 border rounded-md bg-white"
            errors={errors}
            setErrors={setErrors}
            maxCount={3}
          />
          <Button
            title="Submit"
            onClick={onSubmit}
            disabled={JSON.stringify(CACHE_SLIDERS) === JSON.stringify(values)}
          />
        </>
      )}
    </div>
  );
};

export default HomeSlider;
