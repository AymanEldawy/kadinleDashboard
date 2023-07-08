import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Product = () => {
  const navigate = useNavigate();
  const columns = DB_API.product?.map((col) => col?.name) || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="product"
      columns={columns}
      title="Product"
      onAddClick={() => navigate(`/add-product`)}
    />
  );
};

export default Product;
