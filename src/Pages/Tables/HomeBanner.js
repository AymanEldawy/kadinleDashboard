import React from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const HomeBanner = () => {
  const { user: ADMIN } = useGlobalOptions();
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.home_banners;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="home_banners"
      columns={columns}
      title="home banner"
      onAddClick={() => navigate("/add-home-banner")}
    />
  );
};

export default HomeBanner;
