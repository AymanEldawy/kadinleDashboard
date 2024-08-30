import React, { useEffect, useMemo, useRef, useState } from "react";
import NextArrow from "../icons/NextArrow";
import CopyButton from "./CopyButton";

const ProductDetails = ({ product, showVariant, setShowVariant }) => {
  // console.log("product", product);
  const baseURL = "https://kadinle.com/en/product/";

    const [visibleLength, setVisibleLength] = useState(20); // Initial length of visible characters
    const linkRef = useRef(null);


  useEffect(() => {
    const updateVisibleLength = () => {
      if (linkRef.current) {
        const containerWidth = linkRef.current.clientWidth;
        // Estimate character width. Adjust based on your font and design
        const charWidth = 7.2;
        const maxLength = Math.floor(containerWidth / charWidth);
        setVisibleLength(maxLength);
      }
    };

    // Create a ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(updateVisibleLength);
    if (linkRef.current) {
      resizeObserver.observe(linkRef.current);
    }

    // Initial update
    updateVisibleLength();

    // Clean up the ResizeObserver on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  // console.log("show",typeof show);
  return (
    <div className="flex flex-col space-y-4 pl-6 min-w-[220px]">
      <div className="flex w-full space-x-2 relative ">
        <img
          width={50}
          height={100}
          className="object-cover"
          src={product?.image}
          alt="product"
        />
        <div className="text-[12px] pl-2 flex flex-col space-y-1 w-full">
          <a
            href={`${baseURL}${product?.product_sku}`}
            className="font-semibold underline truncate w-full"
            title={product?.name}
            target="_blank"
            rel="noopener noreferrer"
            ref={linkRef}
          >
            {product?.name?.length > visibleLength
              ? `${product?.name?.slice(0, visibleLength)}...`
              : product?.name}
          </a>
          <p>
            product sku:{" "}
            <span>
              {product?.product_sku}{" "}
              <CopyButton textToCopy={product?.product_sku}></CopyButton>
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            setShowVariant((prevVariants) =>
              prevVariants?.map((variant) =>
                variant?.id === product?.product_sku
                  ? { ...variant, show: !variant.show }
                  : variant
              )
            );
          }}
          className="absolute -left-7 top-0 bottom-0 font-bold"
        >
          {show ? (
            <NextArrow className="h-4 w-4 -rotate-90" />
          ) : (
            <NextArrow className="h-4 w-4 rotate-90" />
          )}
        </button>
      </div>
      {show && (
        <div>
          <hr className="w-full" />
          {product?.variants?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center">
                <div className="flex space-x-2 items-center">
                  <div className="font-semibold">Colors:</div>
                  {variant?.colors?.map((colorObj, index) => {
                    const [key, value] = Object.entries(colorObj)[index];
                    return <div key={index}>{value}</div>;
                  })}
                </div>
                <p className="">
                  <span className="font-semibold">variant sku: </span>
                  <span className="mr-1">{variant?.variant_sku}</span>
                  <CopyButton textToCopy={variant?.variant_sku}></CopyButton>
                </p>
                <p className="">
                  <span className="font-semibold">barcode: </span>
                  <span className="mr-1">
                    {product?.barcode ? product?.barcode : 123456789}
                  </span>
                  <CopyButton
                    textToCopy={product?.barcode ? product?.barcode : 123456789}
                  ></CopyButton>
                </p>
                {/* <hr /> */}
              </div>
              <hr className="w-full" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
