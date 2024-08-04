import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Currency = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_currency || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="currency"
      columns={columns}
      title="Currency"
      onAddClick={ADMIN?.role?.number === 4 ? () => navigate(`/add-currency`) : null}
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default Currency;
