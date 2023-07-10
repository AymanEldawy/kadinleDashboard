import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "./../../hooks/useUpdate";

const DynamicForm = ({ SUPABASE_TABLE_NAME, title, layout }) => {
  const params = useParams();
  const { addItem, status } = useAdd();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [data, setData] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const { name: tableName, id } = params;

  const fields = DB_API?.[layout ? tableName : SUPABASE_TABLE_NAME];
  const fields_content =
    DB_API?.[
      layout ? tableName + "_content" : SUPABASE_TABLE_NAME + "_content"
    ];
  const fetchData = async (table, id) => {
    const response = await getData(table, id);
    console.log(response?.[0]);
    setData(response?.[0]);
  };
  useEffect(() => {
    if (layout === "update") fetchData(tableName, id);
  }, [id, tableName]);

  const onSubmit = async (data) => {
    if (layout === "update") {
      await updateItem(tableName, data);
    } else {
      await addItem(SUPABASE_TABLE_NAME, data);
      if (status === "success") setResetForm(true);
    }
  };

  return (
    <>
      <BlockPaper
        title={
          layout === "update"
            ? `Update ${tableName} / ${data?.name || data?.title || data?.id}`
            : title
        }
      >
        <SuperForm
          initialFields={fields}
          onSubmit={onSubmit}
          resetForm={resetForm}
          layout={layout}
          oldValues={data}
        />
      </BlockPaper>
      <BlockPaper
        title={
          layout === "update"
            ? `Update ${tableName} / ${data?.name || data?.title || data?.id}`
            : title
        }
      >
        <SuperForm
          initialFields={fields_content}
          onSubmit={onSubmit}
          resetForm={resetForm}
          layout={layout}
          oldValues={data}
        />
      </BlockPaper>
    </>
  );
};

export default DynamicForm;
