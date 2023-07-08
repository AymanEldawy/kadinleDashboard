import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import DynamicList from "../Dynamics/DynamicList";
import { useFetch } from "./../../hooks/useFetch";

const DynamicLayout = ({ SUPABASE_TABLE_NAME, columns, title, onAddClick }) => {
  const { loading, getData } = useFetch();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setData(await getData(SUPABASE_TABLE_NAME));
    })();
  }, [refresh]);

  return (
    <BlockPaper title={title}>
      <DynamicList
        tableName={SUPABASE_TABLE_NAME}
        columns={columns}
        data={data}
        loading={loading}
        onAddClick={onAddClick}
        setRefresh={setRefresh}
      />
    </BlockPaper>
  );
};

export default DynamicLayout;
