import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { EyeIcon } from "../../Helpers/Icons";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ShippingPrices = () => {
  const { user: ADMIN } = useGlobalOptions();
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
        return (
          <div className="flex gap-2 items-center">
            <button
              className="bg-primary-red text-white p-1 rounded-md"
              onClick={() => setToggleMore((prev) => (prev ? "" : data?.id))}
            >
              <EyeIcon className={`w-5 h-5`} />
            </button>
            <Link
              className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
              to={`/update/shipping_price/${data?.id}`}
            >
              Edit
            </Link>
          </div>
        );
      }}
      openDrawerMore={toggleMore}
      setOpenDrawerMore={setToggleMore}
      // hideDelete={ADMIN?.role?.number !== 4}
      // hideAction={ADMIN?.role?.number !== 4}
    />
  );
};

export default ShippingPrices;
