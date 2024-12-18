import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  handleUploadAvatarImage,
  handleUploadCategoryImage,
  handleUploadCategoryImages,
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
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import {
  onOrderStatusChange,
  onReturnRequestStatusChange,
} from "../../Api/globalMail";
import { ImagesView } from "./ImagesView";
import { useAdd } from "../../hooks/useAdd";
import { ChevronIcon } from "../../Helpers/Icons";

const Update = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { CACHE_LANGUAGES, languages, defaultLanguage } = useGlobalOptions();
  const { updateItem } = useUpdate();
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const { name: tableName, id } = params;

  const [values, setValues] = useState();
  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState();
  const [contentErrors, setContentErrors] = useState();
  const [oldList, setOldList] = useState(false);

  const fields = DB_API?.[tableName];
  const fields_content =
    tableName !== "order" ? DB_API?.[tableName + "_content"] : [];
  // Handel Submit
  const fetchData = async () => {
    const response = await getData(tableName, id);
    setValues(response?.[0]);
  };
  const fetchDataContent = async () => {
    const response = await getData(tableName, id, "content");

    let contentsObject = {};
    for (const item of response) {
      contentsObject[
        item?.language_id ? CACHE_LANGUAGES?.[item?.language_id] : item?.id
      ] = item;
    }
    setContentValues(contentsObject);
    setOldList((p) => !p);
  };
  
  useEffect(() => {
    fetchData();
  }, [id, tableName]);

  useEffect(() => {
    if (!defaultLanguage?.id || tableName === "order") return;

    if (DB_API?.[`${tableName}_content`]) fetchDataContent();
  }, [fields_content?.length, id, tableName, defaultLanguage]);

  const onSubmit = async () => {
    let loading = toast.loading("Loading ...");

    if (tableName === "user") {
      await handleUploadAvatarImage(values, "update");
    } else if (tableName === "partner") {
      await handleUploadPartnerImage(values, "update");
    } else if (tableName === "home_reviews") {
      await handleUploadReviewerImage(values, "update");
    } else {
      if (tableName === "definitions") {
        const image = await handleUploadSlider(values, "image");
        setValues((prev) => ({
          ...prev,
          image,
        }));
      }
      if (tableName === "less_than" || tableName === "home_sliders") {
        const web_image = await handleUploadSlider(
          values,
          "web_image",
          tableName
        );
        const mobile_image = await handleUploadSlider(
          values,
          "mobile_image",
          tableName
        );
        setValues((prev) => ({
          ...prev,
          mobile_image,
          web_image,
        }));
      }

      const response = await updateItem(tableName, values);

      if (
        tableName === "offer" &&
        typeof values?.icon === "object"
      ) {
        await handleUploadOfferIcon(values?.icon, values?.id);
      }

      if (
        tableName === "category" &&
        values?.banner_video &&
        typeof values?.banner_video === "object"
      ) {
        await handleUploadCategoryVideo({
          id: values?.id,
          banner_video: values?.banner_video,
        });
      }
      if (
        tableName === "category" &&
        values?.image &&
        typeof values?.image === "object"
      ) {
        await handleUploadCategoryImage({
          id: values?.id,
          image: values?.image,
        });
      }

      if (tableName === "order") {
        onOrderStatusChange(values);
      }
      if (tableName === "order_return_request")
        onReturnRequestStatusChange(values);
      if (response) {
        if (tableName === "color") await handleUploadColorImage(values);
        const list = Object.values(contentValues);
        for (const item of list) {
          if (tableName === "less_than" || tableName === "home_sliders") {
            const web_image = await handleUploadSlider(
              item,
              "web_image",
              tableName
            );
            const mobile_image = await handleUploadSlider(
              item,
              "mobile_image",
              tableName
            );
            if (item?.id) {
              const res = await updateItem(`${tableName}_content`, {
                ...item,
                web_image,
                mobile_image,
              });
            } else {
              await addItem(`${tableName}_content`, {
                ...item,
                [`${tableName}_id`]: params?.id,
                web_image,
                mobile_image,
              });
            }
          } else if (tableName === "definitions") {
            const image = await handleUploadSlider(item, "image", tableName);
            if (item?.[[`${tableName}_id`]]) {
              await updateItem(`${tableName}_content`, {
                ...item,
                image,
              });
            } else {
              await addItem(`${tableName}_content`, {
                ...item,
                [`${tableName}_id`]: params?.id,
                image,
              });
            }
          } else if (tableName === "category") {
            await handleUploadCategoryImages(
              item,
              item?.category_id || params?.id,
              CACHE_LANGUAGES
            );
          } else if (tableName === "offer") {
            await handleUploadOfferImage(
              item,
              item?.id,
              CACHE_LANGUAGES,
              "update"
            );
          } else if (tableName === "collection") {
            await handleUploadCollectionImage(
              item,
              item?.collection_id,
              CACHE_LANGUAGES,
              "update"
            );
          } else {
            if (tableName !== "order")
              await updateItem(`${tableName}_content`, item);
          }
        }
        toast.update(loading, {
          render: "Great! Content has been updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(loading, {
          render: "Oops! failed to update the content",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
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
      <BlockPaper title={tableName}>
        <SuperForm
          initialFields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        {values?.images?.length ? <ImagesView images={values?.images} /> : null}
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
            tableName={tableName}
          />
        </BlockPaper>
      ) : null}
      <Button title="Submit" onClick={onSubmit} />
    </>
  );
};

export default Update;
