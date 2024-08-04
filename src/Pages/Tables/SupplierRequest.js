import React from "react";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const SupplierRequest = (props) => {
  const { user: ADMIN } = useGlobalOptions();
  const columns = COMBINE_DB_API.supplier_request || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="supplier_request"
      columns={columns}
      title="supplier_request"
      hideDelete={ADMIN?.role?.number !== 4}
      hideAction={ADMIN?.role?.number !== 4}
      // renderTableAction={(data) => {
      //   return <div className="flex gap-4 items-center"></div>;
      // }}
    />
  );
};

export default SupplierRequest;
