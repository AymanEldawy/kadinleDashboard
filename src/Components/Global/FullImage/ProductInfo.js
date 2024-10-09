import React from "react";
import { FullImage } from "./FullImage";
import { Link } from "react-router-dom";

export const ProductInfo = ({
  image,
  name,
  nameClassName,
  product_sku,
  variant_id,
}) => {
  return (
    <div className="flex gap-2" >
      <FullImage src={image} alt={"image"} />
      <Link className="flex flex-col" to={`https://kadinle.com/product/${variant_id}`} target="_blank">
        <small>{product_sku}</small>
        <p className={`min-w-[140px] hover:underline ${nameClassName}`}>{name}</p>
      </Link>
    </div>
  );
};
