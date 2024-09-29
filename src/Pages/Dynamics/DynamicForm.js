import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signup } from "../../Api/auth";
import {
  handleUploadAvatarImage,
  handleUploadCategoryImage,
  handleUploadCategoryImages,
  handleUploadCategoryMedia,
  handleUploadCategoryVideo,
  handleUploadCollectionImage,
  handleUploadColorImage,
  handleUploadOfferIcon,
  handleUploadOfferImage,
  handleUploadPartnerImage,
  handleUploadReviewerImage,
  handleUploadSlider,
} from "../../Api/DynamicUploadHandler";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { ChevronIcon } from "../../Helpers/Icons";

const DynamicForm = ({ SUPABASE_TABLE_NAME, title }) => {
  const navigate = useNavigate();
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const { addItem } = useAdd();
  const [resetForm, setResetForm] = useState(false);
  const [values, setValues] = useState({});
  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState();
  const [contentErrors, setContentErrors] = useState();

  const fields = DB_API?.[SUPABASE_TABLE_NAME];
  const fields_content = DB_API?.[SUPABASE_TABLE_NAME + "_content"];

  const onSubmit = async () => {
    let response = null;
    let loading = toast.loading("Please wait...");
    if (SUPABASE_TABLE_NAME === "home_reviews") {
      response = await handleUploadReviewerImage(values);
    } else if (SUPABASE_TABLE_NAME === "offer") {
      response = await handleUploadPartnerImage(values);
    } else if (SUPABASE_TABLE_NAME === "partner") {
      response = await handleUploadPartnerImage(values);
    } else if (SUPABASE_TABLE_NAME === "user") {
      response = await signup(values);
      if (values?.profile_img) {
        await handleUploadAvatarImage(values, "update");
      }
    } else {
      if (SUPABASE_TABLE_NAME === "shipping_price") {
        let newValue = values;
        newValue.fast_price = { [values?.weight]: values?.fast_price };
        newValue.normal_price = { [values?.weight]: values?.normal_price };
        delete newValue?.weight;
        response = await addItem(SUPABASE_TABLE_NAME, values);
      } else {
        response = await addItem(SUPABASE_TABLE_NAME, values);
        if (!response?.error) {
          const itemId = response?.data?.[0]?.id;
          if (
            SUPABASE_TABLE_NAME === "category" &&
            typeof values?.banner_video === "object"
          ) {
            handleUploadCategoryVideo({
              id: itemId,
              banner_video: values?.banner_video,
            });
          }
          if (
            SUPABASE_TABLE_NAME === "offer" &&
            typeof values?.icon === "object"
          ) {
            await handleUploadOfferIcon(values?.icon, itemId);
          }

          if (
            SUPABASE_TABLE_NAME === "category" &&
            typeof values?.image === "object"
          ) {
            handleUploadCategoryImage({ id: itemId, image: values?.image });
          }
          if (SUPABASE_TABLE_NAME === "color")
            await handleUploadColorImage({
              ...values,
              id: itemId,
            });
          const list = Object.values(contentValues);
          if (list?.length) {
            for (const item of list) {
              if (
                SUPABASE_TABLE_NAME === "less_than" ||
                SUPABASE_TABLE_NAME === "home_sliders"
              ) {
                const web_image = await handleUploadSlider(
                  item,
                  "web_image",
                  SUPABASE_TABLE_NAME
                );
                const mobile_image = await handleUploadSlider(
                  item,
                  "mobile_image",
                  SUPABASE_TABLE_NAME
                );
                response = await addItem(`${SUPABASE_TABLE_NAME}_content`, {
                  ...item,
                  [`${SUPABASE_TABLE_NAME}_id`]: itemId,
                  web_image,
                  mobile_image,
                });
              } else if (SUPABASE_TABLE_NAME === "definitions") {
                const image = await handleUploadSlider(
                  item,
                  "image",
                  SUPABASE_TABLE_NAME
                );
                response = await addItem(`${SUPABASE_TABLE_NAME}_content`, {
                  ...item,
                  [`${SUPABASE_TABLE_NAME}_id`]: itemId,
                  image,
                });
              } else if (SUPABASE_TABLE_NAME === "category") {
                await handleUploadCategoryImages(item, itemId, CACHE_LANGUAGES);
              } else if (SUPABASE_TABLE_NAME === "offer") {
                await handleUploadOfferImage(item, itemId, CACHE_LANGUAGES);
              } else if (SUPABASE_TABLE_NAME === "collection") {
                await handleUploadCollectionImage(
                  item,
                  itemId,
                  CACHE_LANGUAGES
                );
              } else {
                await addItem(`${SUPABASE_TABLE_NAME}_content`, {
                  ...item,
                  [`${SUPABASE_TABLE_NAME}_id`]: itemId,
                });
              }
            }
          }
          console.log(response, '-2222ressssss');
        }
      }
    }
    console.log(response, '-ressssss');
    
    if (!response?.error) {
      setValues({});
      setContentValues({});
      toast.update(loading, {
        render: "Great! successfully added",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      // navigate(-1);
    } else {
      toast.update(loading, {
        render: "Oops! failed to added new",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
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
      <BlockPaper title={title}>
        <SuperForm
          initialFields={fields}
          onSubmit={onSubmit}
          resetForm={resetForm}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
      </BlockPaper>
      {fields_content?.length ? (
        <BlockPaper
          title={
            SUPABASE_TABLE_NAME === "size"
              ? "Choose Region"
              : title + " Content"
          }
        >
          <FormIncreasable
            initialFields={fields_content}
            maxCount={languages?.length}
            values={contentValues}
            setValues={setContentValues}
            errors={contentErrors}
            setErrors={setContentErrors}
            SUPABASE_TABLE_NAME={SUPABASE_TABLE_NAME}
          />
        </BlockPaper>
      ) : null}
      <Button title="Submit" onClick={onSubmit} />
    </>
  );
};

export default DynamicForm;
