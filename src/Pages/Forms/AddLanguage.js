import React, { useState } from "react";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";

let getCachedList = {};
const AddLanguage = () => {
  const { addItem, status } = useAdd();
  const [resetForm, setResetForm] = useState(false);

  const SUPABASE_TABLE_NAME = "language";
  const fields = DB_API.language;

  const onSubmit = async (data) => {
    await addItem(SUPABASE_TABLE_NAME, data);
    if (status === "success") setResetForm(true);
  };

  return (
    <BlockPaper title={"add language"}>
      <SuperForm
        initialFields={fields}
        onSubmit={onSubmit}
        resetForm={resetForm}
        getCachedList={getCachedList}
      />
    </BlockPaper>
  );
};

export default AddLanguage;
