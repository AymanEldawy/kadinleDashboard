import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
  handleUploadCategoryImages,
  handleUploadColorImage,
  handleUploadOfferImage,
  handleUploadReviewerImage,
} from "../../Api/DynamicUploadHandler";
import { uploadCategoryImage } from "../../Api/upload";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";

const MEDIA_NAMES = ["web_image", "mobile_image", "media", "image"];

const DynamicForm = ({ SUPABASE_TABLE_NAME, title }) => {
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const location = useLocation();
  const { addItem, status } = useAdd();

  const [resetForm, setResetForm] = useState(false);
  const [resetContentForm, setResetContentForm] = useState(false);
  const [itemId, setItemId] = useState();

  const fields = DB_API?.[SUPABASE_TABLE_NAME];
  const fields_content = DB_API?.[SUPABASE_TABLE_NAME + "_content"];

  const onSubmit = async (data) => {
    if (SUPABASE_TABLE_NAME === "home_reviews") {
      await handleUploadReviewerImage(data);
    } else {
      const response = await addItem(SUPABASE_TABLE_NAME, data);
      if (response) {
        setItemId(response?.data?.[0].id);
        if (SUPABASE_TABLE_NAME === "color")
          await handleUploadColorImage({
            ...data,
            id: response?.data?.[0].id,
          });

        setResetForm(true);
      }
    }
  };
  const onSubmitContent = async (data) => {
    if (!itemId && !data?.[`${SUPABASE_TABLE_NAME}_id`]) return;
    const list = Object.values(data);
    if (list?.length) {
      for (const item of list) {
        if (SUPABASE_TABLE_NAME === "category") {
          await handleUploadCategoryImages(item, itemId, CACHE_LANGUAGES);
        }
        if (SUPABASE_TABLE_NAME === "offer") {
          await handleUploadOfferImage(item, itemId, CACHE_LANGUAGES);
        }
        if (SUPABASE_TABLE_NAME === "collection") {
          await handleUploadOfferImage(item, itemId, CACHE_LANGUAGES);
        }
      }
    }
    setResetContentForm({});
  };

  return (
    <>
      <BlockPaper title={title}>
        <SuperForm
          initialFields={fields}
          onSubmit={onSubmit}
          resetForm={resetForm}
        />
      </BlockPaper>
      {fields_content?.length ? (
        <BlockPaper title={title + " Content"}>
          <FormIncreasable
            onSubmit={onSubmitContent}
            initialFields={fields_content}
            resetForm={resetContentForm}
            maxCount={languages?.length}
          />
        </BlockPaper>
      ) : null}
    </>
  );
};

export default DynamicForm;
