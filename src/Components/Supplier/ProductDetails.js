import React, { useEffect, useMemo, useRef, useState } from "react";
import NextArrow from "../icons/NextArrow";
import CopyButton from "./CopyButton";
import SupplierLine from "./SupplierLine";
import Checkbox from "./Checkbox";

const ProductDetails = ({ product, showVariant, setShowVariant }) => {
  console.log("product", product);

  const baseURL = "https://kadinle.com/en/product/";

  // Load the initial state from localStorage or use default values
  const initialMainChecked =
    JSON.parse(localStorage.getItem("mainChecked")) || false;
  const initialCheckedStates =
    JSON.parse(localStorage.getItem("checkedStates")) ||
    product?.variants?.map(() => false);

  const [updateProductsIdArr, setUpdateProductsIdArr] = useState([]);
  // console.log("updateProductsIdArr", updateProductsIdArr);
  const [mainChecked, setMainChecked] = useState(initialMainChecked);
  const [checkedStates, setCheckedStates] = useState(initialCheckedStates);
  // console.log("checkedStates", checkedStates);
  const [index, setIndex] = useState(null);
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

  useEffect(() => {
    const trueCheckedIndices = checkedStates
      .map((checked, index) => (checked ? index : null))
      .filter((index) => index !== null);

    const updatedArray = trueCheckedIndices.map(
      (element) => product?.variants[element].id
    );

    setUpdateProductsIdArr(() => {
      const storedArray =
        JSON.parse(localStorage.getItem("updateProductsIdArr")) || [];

      const newArray = [...new Set([...storedArray, ...updatedArray])];

      localStorage.setItem("updateProductsIdArr", JSON.stringify(newArray));

      return newArray;
    });
  }, [checkedStates, product?.variants]);

  useEffect(() => {
    // Update localStorage when the state changes
    localStorage.setItem("mainChecked", JSON.stringify(mainChecked));
    localStorage.setItem("checkedStates", JSON.stringify(checkedStates));
  }, [mainChecked, checkedStates]);

  const handleMainCheckboxChange = () => {
    const newMainChecked = !mainChecked;
    setMainChecked(newMainChecked);
    setCheckedStates(checkedStates.map(() => newMainChecked));
  if (
    !newMainChecked &&
    updateProductsIdArr.includes(product?.variants[0].id)
  ) {
    const variantIds = product?.variants.map((variant) => variant.id);

    const updatedArray = updateProductsIdArr.filter(
      (element) => !variantIds.includes(element)
    );

    localStorage.setItem("updateProductsIdArr", JSON.stringify(updatedArray));
  }

  };

  const handleChildCheckboxChange = (index, id) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    // Update the main checkbox state based on child checkboxes
    if (newCheckedStates.every((checked) => checked)) {
      setMainChecked(true);
    } else {
      setMainChecked(false);
      // Remove the product id from the updateProductsIdArr if it's unchecked
      if (updateProductsIdArr.includes(id)) {
        const updatedArray = updateProductsIdArr.filter(
          (element) => element !== id
        );
        localStorage.setItem(
          "updateProductsIdArr",
          JSON.stringify(updatedArray)
        );
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 pl-6 pr-1">
      <div className="flex w-full space-x-2 relative">
        {/* Main (Parent) Checkbox */}
        <Checkbox checked={mainChecked} onChange={handleMainCheckboxChange} />
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
          {product?.variants?.map((variant, index) => (
            <div key={variant.id}>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center relative">
                <div className="absolute -left-6">
                  <Checkbox
                    checked={checkedStates[index]}
                    onChange={() =>
                      handleChildCheckboxChange(index, variant.id)
                    }
                  />
                </div>
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
