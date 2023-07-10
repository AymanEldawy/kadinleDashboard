import React, { useState } from "react";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";

const DynamicForm = ({ SUPABASE_TABLE_NAME, title }) => {
  const { addItem, status } = useAdd();
  const [resetForm, setResetForm] = useState(false);

  const fields = DB_API?.[SUPABASE_TABLE_NAME];

  const onSubmit = async (data) => {
    await addItem(SUPABASE_TABLE_NAME, data);
    if (status === "success") setResetForm(true);
  };

  return (
    <BlockPaper title={title}>
      <SuperForm
        initialFields={fields}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />
    </BlockPaper>
  );
};

export default DynamicForm;
