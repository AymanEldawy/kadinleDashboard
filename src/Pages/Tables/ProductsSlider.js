import React from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const ProductsSlider = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.products_slider;

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="products_slider"
      columns={columns}
      title="Products Slider"
      onAddClick={() => navigate(`/add-products-slider`)}
    />
  );
};

export default ProductsSlider;
