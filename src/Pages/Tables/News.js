import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const News = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_news || [];

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
