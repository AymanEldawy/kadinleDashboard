import React from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Addresses = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_address;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="address"
      columns={columns}
      title="Addresses"
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
    // onAddClick={
    //   ADMIN?.role?.title === "admin"
    //     ? () => navigate(`/add-warehouse`)
    //     : undefined
    // }
    />
  );
};

export default Addresses;
