import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useGlobalOptions } from "../../Context/GlobalOptions";


const Countries = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_country || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="country"
      columns={columns}
      title="Country"
      onAddClick={ADMIN?.role?.number === 3 ? () => navigate(`/add-country`) : null}
      hideDelete={ADMIN?.role?.number === 3}
      hideAction={ADMIN?.role?.number === 3}
    />
  );
};

export default Countries;
