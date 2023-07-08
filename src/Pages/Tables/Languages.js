import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteItems, getTableData } from "../../Api/globalActions";
import { deleteLanguage, getLanguages } from "../../Api/LanguagesData";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useDelete } from "../../hooks/useDelete";
import { useUpdate } from "../../hooks/useUpdate";
import DynamicList from "../Dynamics/DynamicList";
import { useFetch } from "./../../hooks/useFetch";

const SUPABASE_TABLE_NAME = "language";

const Languages = () => {
  const navigate = useNavigate();
  const { loading, getData } = useFetch();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const columns = DB_API.language?.map((col) => col?.name);
  useEffect(() => {
    (async () => {
      setData(await getData(SUPABASE_TABLE_NAME));
    })();
  }, [refresh]);

  return (
    <BlockPaper title={"languages"}>
      <DynamicList
        tableName={SUPABASE_TABLE_NAME}
        columns={columns}
        data={data}
        loading={loading}
        onAddClick={() => navigate("/add-language")}
        setRefresh={setRefresh}
      />
    </BlockPaper>
  );
};

export default Languages;
