import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const HomeReviews = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_home_reviews || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="home_reviews"
      columns={columns}
      title="Home Reviews"
      onAddClick={() => navigate(`/add-review`)}
    />
  );
};

export default HomeReviews;
