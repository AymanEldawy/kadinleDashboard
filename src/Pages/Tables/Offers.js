import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { EyeIcon } from "../../Helpers/Icons";

const Offers = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_offer || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="offer"
      columns={columns}
      title="offers"
      onAddClick={() => navigate(`/add-offer`)}
      contentBar={
        <Link to={`/offers/products`} className="flex gap-2 items-center p-1 px-3 hover:bg-primary-blue hover:text-white rounded-md border text-primary-blue border-primary-blue">
          Show Products
          <EyeIcon className="h-5 w-5" />
        </Link>
      }
      headerClassName='flex justify-between gap-2 items-center'
    />
  );
};

export default Offers;
