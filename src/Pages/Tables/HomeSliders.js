import React from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const HomeSliders = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.home_sliders;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="home_sliders"
      columns={columns}
      title="Home Sliders"
      onAddClick={() => navigate("/add-home-sliders")}
    />
  );
};

export default HomeSliders;
