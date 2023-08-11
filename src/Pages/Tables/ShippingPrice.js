import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ShippingPrices = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_shipping_price || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="shipping_price"
      columns={columns}
      title="shipping prices"
      onAddClick={() => navigate(`/add-shipping-price`)}
    // hideDelete={ADMIN?.role?.number !== 4}
    // hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default ShippingPrices;
