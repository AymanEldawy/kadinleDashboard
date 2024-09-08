import React, { useMemo } from "react";
import SupplierLine from "./SupplierLine";

const ColorsDetails = ({ product, showVariant }) => {
  // console.log("product from colors", product);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  const combineColors = useMemo(() => {
    let hash = {};
    for (const variant of product?.variants) {
      let colorHex = Object.keys(variant?.colors?.at(0));
      let colorContent = Object.values(variant?.colors?.at(0));
      console.log("🚀 ~ combineColors ~ colorContent:", colorContent);
      hash[colorHex[0]] = colorContent[0];
    }

    return hash;
  }, [product?.variants]);

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
      <div className="product-hight flex justify-center items-center text-xs">
        {Object?.entries(combineColors)?.map(([hex, content]) => (
          <span className="px-1" style={{ color: hex, textShadow: '0 1px 1px #000' }}>
            {content}
          </span>
        ))}
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

export default ColorsDetails;
