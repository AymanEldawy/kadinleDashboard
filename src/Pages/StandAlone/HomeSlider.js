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

let CACHE_SLIDERS = {};

const HomeSlider = () => {
  const { getData } = useFetch();
  const name = "home_sliders";
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const { isLoading, refetch } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const data = await getData(name);
      if (data?.length) {
        let hash = {};
        for (const item of data) {
          hash[item?.id] = item;
        }
        setValues(hash);
        CACHE_SLIDERS = hash;
      }
    },
  });

  const fields = useMemo(() => DB_API.home_sliders, []);

  console.log(values);
  const onSubmit = async () => {
    if (JSON.stringify(CACHE_SLIDERS) === JSON.stringify(values)) {
      toast.error(`data isn't change`);
      return;
    }

    for (const value of Object.values(values)) {
      await handleUploadSlider(value);
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
