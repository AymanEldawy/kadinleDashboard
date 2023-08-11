import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { signup } from "../../Api/auth";
import { handleUploadAvatarImage, handleUploadCategoryImages, handleUploadCollectionImage, handleUploadColorImage, handleUploadOfferImage, handleUploadReviewerImage } from "../../Api/DynamicUploadHandler";
import { uploadCategoryImage } from "../../Api/upload";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";

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
    let loading = toast.loading("Please wait...");
    if (SUPABASE_TABLE_NAME === "home_reviews") {
      await handleUploadReviewerImage(values);
    } else if (SUPABASE_TABLE_NAME === "user") {
      const response = await signup(values);
      if (!response?.error) {
        if (values?.profile_img) {
          await handleUploadAvatarImage(values, "update");
        }
        setResetForm(true);
        toast.success("Successfully add new user");
      }
    } else {
      if (SUPABASE_TABLE_NAME === 'shipping_price') {
        let newValue = values
        newValue.fast_price = { [values?.weight]: values?.fast_price }
        newValue.normal_price = { [values?.weight]: values?.normal_price }
        delete newValue?.weight
        const response = await addItem(SUPABASE_TABLE_NAME, values);
        if (!response?.error) {
          toast.update(loading, {
            render: "Great! successfully added",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          navigate(-1);
        }
      } else {
        const response = await addItem(SUPABASE_TABLE_NAME, values);
        if (!response?.error) {
          const itemId = response?.data?.[0]?.id;
          if (SUPABASE_TABLE_NAME === "color")
            await handleUploadColorImage({
              ...values,
              id: itemId,
            });
          const list = Object.values(contentValues);
          if (list?.length) {
            for (const item of list) {
              if (SUPABASE_TABLE_NAME === "category") {
                await handleUploadCategoryImages(item, itemId, CACHE_LANGUAGES);
              } else if (SUPABASE_TABLE_NAME === "offer") {
                await handleUploadOfferImage(item, itemId, CACHE_LANGUAGES);
              } else if (SUPABASE_TABLE_NAME === "collection") {
                await handleUploadCollectionImage(item, itemId, CACHE_LANGUAGES);
              } else {
                await addItem(`${SUPABASE_TABLE_NAME}_content`, {
                  ...item,
                  [`${SUPABASE_TABLE_NAME}_id`]: itemId,
                });
              }
            }
          }
          setValues({});
          setContentValues({});
          toast.update(loading, {
            render: "Great! successfully added",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          navigate(-1);
        } else {
          toast.update(loading, {
            render: "Oops! failed to added new",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      }
    }
  };
  return (
    <>
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
