import React, { useMemo } from 'react'

const ColorsDetails = ({ product, showVariant }) => {
    // console.log("product from colors", product);
      let show = useMemo(
        () =>
          showVariant?.find((variant) => variant?.id === product?.product_sku)
            ?.show,
        [product?.product_sku, showVariant]
      );
  return (
    <div>
        <div className='h-[60px]'>
             
        </div>
      {show && (
        <div >
          <hr className="w-full" />
          {product?.variants?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] flex flex-col justify-center">
                <div className="flex space-x-2 items-center justify-center">
                  {variant?.colors?.map((colorObj, index) => {
                    const [key, value] = Object.entries(colorObj)[index];
                    return <div key={index}>{value}</div>;
                  })}
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

export default ColorsDetails