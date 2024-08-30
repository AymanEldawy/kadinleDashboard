import React, { useEffect, useMemo, useRef, useState } from "react";
import NextArrow from "../icons/NextArrow";
import CopyButton from "./CopyButton";
import SupplierLine from "./SupplierLine";

const ProductDetails = ({ product, showVariant, setShowVariant }) => {
  console.log("product", product);
  const baseURL = "https://kadinle.com/en/product/";

  const [visibleLength, setVisibleLength] = useState(20); // Initial length of visible characters
  const linkRef = useRef(null);

  useEffect(() => {
    const updateVisibleLength = () => {
      if (linkRef.current) {
        const containerWidth = linkRef.current.clientWidth;
        // Estimate character width. Adjust based on your font and design
        const charWidth = 7.1;
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
    <div className="flex flex-col space-y-4 pl-6">
      <div className="flex w-full space-x-2 relative">
        <a
          href={`${baseURL}${product?.product_sku}`}
          className=""
          title={product?.name}
          target="_blank"
          rel="noopener noreferrer"
          ref={linkRef}
        >
          <img
            src={product?.image}
            alt={product?.name}
            className="h-16 w-12 object-cover"
          />
        </a>
        <div className="flex flex-col space-y-1 flex-1 text-[13px]">
          <a
            href={`${baseURL}${product?.product_sku}`}
            className=""
            title={product?.name}
            target="_blank"
            rel="noopener noreferrer"
            ref={linkRef}
          >
            <h3 className="font-semibold underline truncate">
              {product?.name?.length > visibleLength
                ? `${product?.name?.slice(0, visibleLength)}...`
                : product?.name}
            </h3>
          </a>
          <p>
            product sku:{" "}
            <span className="">
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
          {/* <hr className="bg-[#cacbce] h-[1px] w-full" /> */}
          <SupplierLine />
          {product?.variants?.map((variant) => (
            <div key={variant.id}>
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
              </div>
              <SupplierLine />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
