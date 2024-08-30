import React, { useMemo } from 'react'

const Percentage = ({ product, showVariant }) => {
  //   console.log("product from stock", product);
    const minPer = Math.min(
      ...(product?.variants?.map((variant) => variant.percentage) || [])
    );
    const maxPer = Math.max(
      ...(product?.variants?.map((variant) => variant.percentage) || [])
    );
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );
  return (
    <div>
      <div className="h-[60px] flex justify-center items-center gap-2">
        <div>{minPer} </div>
        <div>/</div>
        <div> {maxPer}</div>
      </div>
      {show && (
        <div>
          <hr className="hr-line w-full" />
          {product?.variants?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] flex flex-col justify-center">
                <div className="flex space-x-2 items-center justify-center">
                  <span>{variant?.percentage}</span>
                </div>
              </div>
              <hr className="hr-line w-full" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Percentage