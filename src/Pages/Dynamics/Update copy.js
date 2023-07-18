import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
  handleUploadCategoryImages,
  handleUploadCollectionImage,
  handleUploadColorImage,
  handleUploadOfferImage,
  handleUploadReviewerImage,
} from "../../Api/DynamicUploadHandler";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";
import { Button } from "../../Components/Global/Button";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";

const Update = () => {
  const params = useParams();
  const { CACHE_LANGUAGES } = useGlobalOptions();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const { name: tableName, id } = params;

  const [values, setValues] = useState();
  const [contentValues, setContentValues] = useState();
  const [errors, setErrors] = useState();
  const [contentErrors, setContentErrors] = useState();

  const [tableData, setTableData] = useState(false);
  const [tableContentData, setTableContentData] = useState(false);
  // Handel Submit
  const fields = DB_API?.[tableName];
  const fields_content = DB_API?.[`${tableName}_content`];
  const fetchData = async () => {
    const response = await getData(tableName, id);
    setTableData(response?.[0]);
  };
  const fetchDataContent = async () => {
    const response = await getData(tableName, id, "content");
    setTableContentData(response);
  };
  useEffect(() => {
    fetchData();
  }, [id, tableName]);

  useEffect(() => {
    if (DB_API?.[`${tableName}_content`]) fetchDataContent();
  }, [fields_content?.length, id, tableName]);
  useEffect(() => {}, [tableContentData]);

  const onSubmit = async (data) => {
    const response = await updateItem(tableName, data);
    if (tableName === "home_reviews") {
      await handleUploadReviewerImage(data, "update");
    } else {
      const response = await updateItem(tableName, data);
      if (response) {
        if (tableName === "color") await handleUploadColorImage(data);
      }
    }
  };
  const onSubmitContent = async (data, index) => {
    if (!data?.id) return;
    if (tableName === "category") {
      await handleUploadCategoryImages(
        data,
        data?.category_id || id,
        CACHE_LANGUAGES,
        "update"
      );
    } else if (tableName === "offer") {
      await handleUploadOfferImage(
        data,
        data?.offer_id || id,
        CACHE_LANGUAGES,
        "update"
      );
    } else if (tableName === "collection") {
      await handleUploadCollectionImage(
        data,
        data?.collection_id || id,
        CACHE_LANGUAGES,
        "update"
      );
    } else {
      await updateItem(`${tableName}_content`, data);
    }
    // }
  };
  return (
    <>
      <BlockPaper title={tableName}>
        <SuperForm
          oldValues={tableData}
          initialFields={fields}
          onSubmit={onSubmit}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
      </BlockPaper>
      {tableContentData?.length ? (
        <div>
          {tableContentData?.map((item, index) => {
            return (
              <div key={item?.id}>
                <BlockPaper>
                  <FormIncreasable
                    oldValues={item}
                    initialFields={fields_content}
                    // resetForm={resetContentForm}
                    // maxCount={languages?.length}
                    contentValues={contentValues}
                    setContentValues={setContentValues}
                    contentErrors={contentErrors}
                    setContentErrors={setContentErrors}
                  />
                </BlockPaper>
              </div>
            );
          })}
        </div>
      ) : null}
      <Button title="Save" onClick={onSubmit} />
    </>
  );
};

export default Update;
