import React, { useMemo } from 'react'
import SupplierLine from './SupplierLine';

const ColorsDetails = ({ product, showVariant }) => {
  // console.log("product from colors", product);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  // Array to store unique colors
  const uniqueColors = [];

  // Loop through each variant
  product?.variants.forEach((variant) => {
    variant.colors.forEach((colorObj) => {
      // Get the color name
      const colorName = Object.values(colorObj)[0];
      // Add the color if it's not already in the array
      if (!uniqueColors.includes(colorName)) {
        uniqueColors.push(colorName);
      }
    });
  });

  // console.log(uniqueColors); 
  return (
    <div>
      <div className="product-hight flex justify-center items-center">
        <span>{uniqueColors}</span>
      </div>
      {show && (
        <div>
          <SupplierLine />
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
              <SupplierLine />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorsDetails