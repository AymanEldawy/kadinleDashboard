import React, { useMemo } from "react";

const StockDetails = ({ product, showVariant }) => {
//   console.log("product from stock", product);
const totalStock = product?.variants.reduce((acc, variant) => {
  return acc + variant.stock.stock;
}, 0);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );
  return (
    <div>
      <div className="h-[60px] flex justify-center items-center"><span>{totalStock}</span></div>
      {show && (
        <div>
          <hr className="w-full" />
          {product?.variants?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] flex flex-col justify-center">
                <div className="flex space-x-2 items-center justify-center">
                  <span>{variant?.stock?.stock}</span>
                </div>
              </div>
              <hr className="w-full" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockDetails;
