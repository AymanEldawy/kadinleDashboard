import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { ChevronIcon } from "../../Helpers/Icons";
import { SelectCountries } from "../../Components/OfferTemplates/SelectCountries";
import InputField from "../../Components/CustomForm/InputField";
import { useUpdate } from "../../hooks/useUpdate";
import { useQuery } from "@tanstack/react-query";
import { getHomeBannerCountry } from "../../Api/data";
import { processBatch } from "../../Helpers/functions";
import { useDelete } from "../../hooks/useDelete";
import { handleUploadSlider } from "../../Api/DynamicUploadHandler";
import { useFetch } from "../../hooks/useFetch";

const HomeBannerForm = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param?.id;
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const { addItem } = useAdd();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [values, setValues] = useState({});
  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState();
  const [contentErrors, setContentErrors] = useState();
  const [countries, setCountries] = useState([]);

  const fields = DB_API?.home_sliders;
  const fields_content = DB_API?.home_sliders_content;

  const { data: oldOfferData } = useQuery({
    queryKey: ["home_banners", id],
    queryFn: async () => {
      const response = await getData("home_banners", id);
      const content = await getData("home_banners", id, "content");
      const home_banners = response?.at(0);
      setValues(home_banners);
      if (content) {
        let hash = {};
        for (const item of content) {
          hash[item?.language_id] = item;
        }
        setContentValues(hash);
      }
    },
    enabled: !!id,
  });

  const { data: oldCountries } = useQuery({
    queryKey: ["home_banners", "country", id],
    queryFn: async () => {
      const response = await getHomeBannerCountry(id);
      let hashCountry = {};
      for (const country of response?.data) {
        hashCountry[country?.country_id] = country;
      }
      setCountries(Object.keys(hashCountry));
      return hashCountry;
    },
    enabled: !!id,
  });
  console.log(countries, "--sd");

  const onSubmit = async () => {
    let response = null;
    let loading = "";

    try {
      // if (!values?.sku) {
      //   toast.error("sku is required");
      //   return;
      // }

      // if (Object.keys(contentValues).length < 3) {
      //   toast.error("Content must be with all languages");
      //   return;
      // }
      loading = toast.loading("Please wait...");

      if (id) {
        response = await updateItem("home_banners", values);
      } else {
        response = await addItem("home_banners", values);
      }

      let home_banners_id = id || response?.data?.at(0)?.id;

      for (const content of Object.values(contentValues)) {
        const web_image = await handleUploadSlider(
          content,
          "web_image",
          "home_banners"
        );
        const mobile_image = await handleUploadSlider(
          content,
          "mobile_image",
          "home_banners"
        );

        let item = {
          ...content,
          home_banners_id,
          mobile_image,
          web_image,
        };
        if (item?.id) {
          await updateItem(`home_banners_content`, item);
        } else {
          await addItem(`home_banners_content`, item);
        }
      }

      if (!response?.error) {
        setValues({});
        setContentValues({});
        toast.update(loading, {
          render: "Great! successfully added",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
      await insertIntoCountries(home_banners_id);
      // navigate(-1);
    } catch (error) {
      toast.update(loading, {
        render: "Oops! failed to added new",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  console.log("🚀 ~ insertIntoCountries ~ newList:", countries);
  const insertIntoCountries = async (home_banners_id) => {
    let newList = countries;
    if (!newList) return;
    let insertedList = [];
    let updatedList = [];
    let list = oldCountries || {};

    for (let i = 0; i < newList?.length; i++) {
      let item = newList?.[i];
      if (list?.[item]) {
        delete list[item];
      } else {
        insertedList.push({
          home_banners_id,
          country_id: item,
        });
      }
    }

    let deletedList = Object.keys(list);

    try {
      await Promise.all([
        insertedList.length > 0 &&
          processBatch(insertedList, async (batchList) => {
            await addItem("home_banners_countries", batchList);
          }),
        deletedList.length > 0 &&
          processBatch(deletedList, async (batchList, i, totalBatches) => {
            console.log("should delete", batchList);

            await deleteItem(
              "home_banners_countries",
              batchList,
              "home_banners_id",
              false
            );
            toast.success(`Processing batch ${i + 1} of ${totalBatches}...`);
          }),
      ]);
      console.log(list, "list --fd");

      console.log("Category fallback product list processing completed.");
    } catch (error) {
      console.error("Error processing Category fallback product list:", error);
      throw error;
    }
  };
  return (
    <>
      <div className="my-2">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 duration-300 px-3 py-1 text-sm rounded-md"
        >
          <ChevronIcon className="rotate-90 w-4 h-4" /> Back
        </button>
      </div>
      <BlockPaper title={"Home banner"}>
        <div className="flex gap-8 items-start">
          <div className="flex flex-col bg-gray-100 p-4 gap-2 items-center w-1/3">
            <InputField
              containerClassName="w-full"
              name="sku"
              label="sku"
              value={values?.sku}
              required
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  sku: e.target.value,
                }));
              }}
            />

            <InputField
              containerClassName="w-full"
              name="url"
              label="url"
              value={values?.url}
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  url: e.target.value,
                }));
              }}
            />
            <InputField
              containerClassName="w-full"
              name="not_include"
              label="not_include"
              value={values?.not_include}
              type="checkbox"
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  not_include: e.target.checked,
                }));
              }}
            />
            <SelectCountries
              countries={countries}
              setCountries={setCountries}
            />
          </div>
          <div className="w-2/3">
            <FormIncreasable
              initialFields={fields_content}
              maxCount={languages?.length}
              values={contentValues}
              setValues={setContentValues}
              errors={contentErrors}
              setErrors={setContentErrors}
              SUPABASE_TABLE_NAME={"home_banners_content"}
              customGrid="grid grid-cols-2 gap-4"
            />
          </div>
        </div>
      </BlockPaper>

      <Button title="Submit" onClick={onSubmit} />
    </>
  );
};

export default HomeBannerForm;
