import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";

const DynamicForm = ({ SUPABASE_TABLE_NAME, title }) => {
  const location = useLocation();
  const { addItem, status } = useAdd();
  console.log(location);

  const [resetForm, setResetForm] = useState(false);
  const [resetContentForm, setResetContentForm] = useState(false);
  const [itemId, setItemId] = useState();

  const fields = DB_API?.[SUPABASE_TABLE_NAME];
  const fields_content = DB_API?.[SUPABASE_TABLE_NAME + "_content"];

  const onSubmit = async (data) => {
    const response = await addItem(SUPABASE_TABLE_NAME, data);
    if (response) {
      setItemId(response?.data?.[0].id);
      setResetForm(true);
    }
  };
  const onSubmitContent = async (data) => {
    const list = Object.values(data);
    if (list?.length && itemId) {
      for (const item of list) {
        await addItem(`${SUPABASE_TABLE_NAME}_content`, {
          ...item,
          [`${SUPABASE_TABLE_NAME}_id`]: itemId,
        });
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
          />
        </BlockPaper>
      ) : null}
    </>
  );
};

export default DynamicForm;
