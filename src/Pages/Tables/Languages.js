import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useGlobalOptions } from "../../Context/GlobalOptions";


const Languages = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_language || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="language"
      columns={columns}
      title="Languages"
      onAddClick={ADMIN?.role?.number === 3 ? () => navigate(`/add-language`) : null}
      hideDelete={ADMIN?.role?.number === 3}
      hideAction={ADMIN?.role?.number === 3}
    />
  );
};

export default Languages;
