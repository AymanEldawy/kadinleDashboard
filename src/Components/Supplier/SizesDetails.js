import React, { useEffect, useMemo, useRef, useState } from "react";

const SizesDetails = ({ product, showVariant }) => {
  const [visibleItems, setVisibleItems] = useState(1); // Number of initially visible items
  const containerRef = useRef(null);

 useEffect(() => {
   const updateVisibleItems = () => {
     if (containerRef.current) {
       const containerWidth = containerRef.current.clientWidth;
       const newVisibleItems = Math.floor(containerWidth / 29); // Assuming each item takes about 50px
       setVisibleItems(newVisibleItems);
     }
   };

   updateVisibleItems();
   window.addEventListener("resize", updateVisibleItems);

   return () => window.removeEventListener("resize", updateVisibleItems);
 }, []);
  //   console.log("product from sizes", product);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  // Array to store unique sizes
  const uniqueSizes = [];

  // Loop through each variant
  product?.variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      // Add the size if it's not already in the array
      if (!uniqueSizes.includes(size)) {
        uniqueSizes.push(size);
      }
    });
  });

  // Determine if there are more items to show
  const isTruncated = uniqueSizes.length > visibleItems;

  // console.log(uniqueSizes);
  return (
    <div>
      <div
        ref={containerRef}
        className="h-[60px] flex justify-center items-center overflow-hidden"
      >
        <span>
          {uniqueSizes.slice(0, visibleItems).join(", ")}
          {isTruncated && "..."}
        </span>
      </div>
      {show && (
        <div>
          <hr className="w-full" />
          {product?.variants?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] flex flex-col justify-center">
                <div className="flex space-x-2 items-center justify-center">
                  {variant?.sizes?.map((size, index) => {
                    const isLast = index === variant.sizes.length - 1;
                    return (
                      <span key={index}>
                        {size}
                        {isLast ? "." : ","}
                      </span>
                    );
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
export default SizesDetails;
