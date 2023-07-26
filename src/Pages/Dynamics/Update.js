import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { signup } from "../../Api/auth";
import {
  handleUploadAvatarImage,
  handleUploadCategoryImages,
  handleUploadCollectionImage,
  handleUploadColorImage,
  handleUploadOfferImage,
  handleUploadReviewerImage,
} from "../../Api/DynamicUploadHandler";
import { uploadCategoryImage } from "../../Api/upload";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";

const MEDIA_NAMES = ["web_image", "mobile_image", "media", "image"];

const DynamicForm = ({ SUPABASE_TABLE_NAME, title }) => {
  const params = useParams();
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const { updateItem } = useUpdate();
  const { getData } = useFetch();
  const location = useLocation();
  const { name: tableName, id } = params;

  const [values, setValues] = useState();
  const [contentValues, setContentValues] = useState();
  const [errors, setErrors] = useState();
  const [contentErrors, setContentErrors] = useState();
  const [oldList, setOldList] = useState(false);

  const fields = DB_API?.[tableName];
  const fields_content = DB_API?.[tableName + "_content"];
  // Handel Submit
  const fetchData = async () => {
    const response = await getData(tableName, id);
    setValues(response?.[0]);
  };
  const fetchDataContent = async () => {
    const response = await getData(tableName, id, "content");
    let contentsObject = {};
    for (const item of response) {
      contentsObject[CACHE_LANGUAGES?.[item?.language_id]] = item;
    }
    setContentValues(contentsObject);
    setOldList((p) => !p);
  };
  useEffect(() => {
    fetchData();
  }, [id, tableName]);

  useEffect(() => {
    if (DB_API?.[`${tableName}_content`]) fetchDataContent();
  }, [fields_content?.length, id, tableName]);

  const onSubmit = async () => {
    let loading = toast.loading("Loading ...");

    if (tableName === "user") {
      await handleUploadAvatarImage(values, "update");
    } else if (tableName === "home_reviews") {
      await handleUploadReviewerImage(values, "update");
    } else {
      const response = await updateItem(tableName, values);
      if (response) {
        if (tableName === "color") await handleUploadColorImage(values);
        const list = Object.values(contentValues);
        for (const item of list) {
          if (tableName === "category") {
            await handleUploadCategoryImages(
              item,
              item?.category_id || id,
              CACHE_LANGUAGES,
              "update"
            );
          } else if (tableName === "offer") {
            await handleUploadOfferImage(
              item,
              item?.offer_id || id,
              CACHE_LANGUAGES,
              "update"
            );
          } else if (tableName === "collection") {
            await handleUploadCollectionImage(
              item,
              item?.collection_id || id,
              CACHE_LANGUAGES,
              "update"
            );
          } else {
            await updateItem(`${tableName}_content`, item);
          }
        }
        toast.update(loading, {
          render: "Great! Content has been updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        toast.update(loading, {
          render: "Oops! failed to update the content",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    }
  };
  return (
    <>
      <BlockPaper title={tableName}>
        <SuperForm
          initialFields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
      </BlockPaper>
      {fields_content?.length ? (
        <BlockPaper title={tableName + " Content"}>
          <FormIncreasable
            initialFields={fields_content}
            maxCount={languages?.length}
            values={contentValues}
            setValues={setContentValues}
            errors={contentErrors}
            setErrors={setContentErrors}
            layout={"update"}
            oldList={oldList}
          />
        </BlockPaper>
      ) : null}
      <Button title="Submit" onClick={onSubmit} />
    </>
  );
};

export default DynamicForm;
