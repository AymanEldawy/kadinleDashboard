import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const News = () => {
  const navigate = useNavigate();
  const columns = DB_API.news?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="news"
      columns={columns}
      title="News"
      onAddClick={() => navigate(`/add-news`)}
    />
  );
};

export default News;
