import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";

const Update = () => {
  const params = useParams();
  const location = useLocation();
  const { getData, loading } = useFetch();
  const { updateItem } = useUpdate();
  const { name: tableName, id } = params;

  const [open, setOpen] = useState(false);
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
    console.log(response);
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
    console.log(response);
  };
  const onSubmitContent = async (data, index) => {
    console.log(data, index);
    const response = await updateItem(`${tableName}_content`, data);
    console.log(response);
  };
  console.log(tableData);
  return (
    <>
      <BlockPaper title={tableName}>
        <SuperForm
          oldValues={tableData}
          initialFields={fields}
          onSubmit={onSubmit}
        />
      </BlockPaper>
      {tableContentData?.length ? (
        <div>
          {tableContentData?.map((item, index) => {
            console.log(item);
            return (
              <div key={item?.id}>
                <BlockPaper>
                  <SuperForm
                    oldValues={item}
                    initialFields={fields_content}
                    onSubmit={(data) => onSubmitContent(data, index)}
                  />
                </BlockPaper>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Update;
