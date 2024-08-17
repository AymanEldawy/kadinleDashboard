import React, { useMemo } from "react";
import NextArrow from "../icons/NextArrow";
import CopyButton from "./CopyButton";

const ProductDetails = ({
  product,
  showVariant,
  setShowVariant,
}) => {
  //   console.log("product", product);
  const baseURL = "https://kadinle.com/en/product/";

  let show = useMemo(
    () => showVariant?.find((variant) => variant.id === product?.id)?.show,
    [product?.id, showVariant]
  );

  // console.log("show",typeof show);
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full space-x-2 relative">
        <img
          width={50}
          height={100}
          className="object-cover"
          src={product?.product_image[0]?.image}
          alt="product"
        />
        <div className="text-[12px] pl-2 flex flex-col space-y-1">
          <a
            href={`${baseURL}${product?.product_sku}`}
            className="font-semibold underline truncate"
            title={product?.product_content[0]?.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            {product?.product_content[0]?.name?.length > 20
              ? `${product?.product_content[0]?.name?.slice(0, 20)}...`
              : product?.product_content[0]?.name}
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
              prevVariants.map((variant) =>
                variant.id === product.id
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
          <hr className="" />
          {product?.product_variant?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center">
                <div className="flex space-x-2 items-center">
                  <div className="font-semibold">Colors:</div>
                  <div className=" text-pink-500">pink</div>
                  <div className="text-green-500">green</div>
                  <div className="text-blue-500">blue</div>
                </div>
                <p className="">
                  <span className="font-semibold">variant sku: </span>
                  <span className="mr-1">{variant?.variant_sku}</span>
                  <CopyButton textToCopy={variant?.variant_sku}></CopyButton>
                </p>
                <p className="">
                  <span className="font-semibold">barcode: </span>
                  <span className="mr-1">{product?.barcode}</span>
                  <CopyButton textToCopy={product?.barcode}></CopyButton>
                </p>
                {/* <hr /> */}
              </div>
              <hr className="" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
