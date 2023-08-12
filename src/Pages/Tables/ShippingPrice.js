import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { EyeIcon } from "../../Helpers/Icons";

const ShippingPrices = () => {
  const { user: ADMIN } = useGlobalOptions()
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_shipping_price || [];
  const [toggleMore, setToggleMore] = useState(false);

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="shipping_price"
      columns={columns}
      title="shipping prices"
      onAddClick={() => navigate(`/add-shipping-price`)}
      renderTableAction={(data) => {
        return <div className="flex gap-2 items-center">
          <button onClick={() => setToggleMore(prev => prev ? '' : data?.id)}><EyeIcon className={`${toggleMore === data?.id ? 'text-primary-blue' : 'text-black'} w-5 h-5`} /></button>
          <button>Edit </button>
        </div>
      }}
      openDrawerMore={toggleMore}
      setOpenDrawerMore={setToggleMore}
    // hideDelete={ADMIN?.role?.number !== 4}
    // hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default ShippingPrices;
