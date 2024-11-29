import React, { useCallback, useMemo } from "react";
import { FullImage } from "./FullImage";
import { Link } from "react-router-dom";

export const ProductInfo = ({
  image,
  name,
  nameClassName,
  product_sku,
  variant_id,
  product_id,
  showIndex,
  rowSelection = {},
  seller_sku,
}) => {
  const index = (Object.keys(rowSelection) || []).indexOf(product_id);
  return (
    <div className="flex gap-2">
      {index + 1 > 0 && showIndex ? (
        <span className="py-1 px-2 rounded-md bg-gray-200 h-fit my-auto">
          {index + 1}{" "}
        </span>
      ) : null}
      <FullImage src={image} alt={"image"} />
      <Link
        className="flex flex-col"
        to={`https://kadinle.com/product/${variant_id}`}
        target="_blank"
      >
        <p className={`min-w-[140px] hover:underline ${nameClassName}`}>
          {name}
        </p>
        <small>Product SKU: {product_sku}</small>
        {seller_sku ? <small>Seller SKU: {seller_sku}</small> : null}
      </Link>
    </div>
  );
};
