import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Product = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_product || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="product"
      columns={columns}
      title="Product"
      allowFilter
      onAddClick={() => navigate(`/add-product`)}
      renderTableAction={(data) => {
        return (
          <Link
            className="text-primary-blue hover:underline"
            to={`/products/update/product/${data?.id}`}
          >
            Edit
          </Link>
        );
      }}
    />
  );
};

export default Product;
