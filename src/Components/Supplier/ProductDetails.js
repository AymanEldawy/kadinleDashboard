import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import NextArrow from "../icons/NextArrow";
import CopyButton from "./CopyButton";
import SupplierLine from "./SupplierLine";
import Checkbox from "./Checkbox";

const ProductDetails = ({
  product,
  setClicked,
  showVariant,
  setShowVariant,
  checkedSku,
  setCheckedSku,
}) => {
  // console.log(product);
  const baseURL = "https://kadinle.com/en/product/";

  const initialMainChecked = useMemo(
    () => JSON.parse(localStorage.getItem("mainChecked")) || false,
    []
  );
  const initialCheckedStates = useMemo(
    () =>
      JSON.parse(localStorage.getItem("checkedStates")) ||
      (product?.variants ? product.variants.map(() => false) : []),
    [product?.variants]
  );

  // const initialCheckedSku =
  //   JSON.parse(localStorage.getItem("initialCheckedSku")) || [];
  const [updateProductsIdArr, setUpdateProductsIdArr] = useState([]);
  const [mainChecked, setMainChecked] = useState(initialMainChecked);
  const [checkedStates, setCheckedStates] = useState(initialCheckedStates);

  // console.log("checkedSku", checkedSku);
  const [visibleLength, setVisibleLength] = useState(20);
  const linkRef = useRef(null);

  useEffect(() => {
    const updateVisibleLength = () => {
      if (linkRef.current) {
        const containerWidth = linkRef.current.clientWidth;
        const charWidth = 7.1;
        const maxLength = Math.floor(containerWidth / charWidth);
        setVisibleLength(maxLength);
      }
    };

    const resizeObserver = new ResizeObserver(updateVisibleLength);
    if (linkRef.current) {
      resizeObserver.observe(linkRef.current);
    }

    updateVisibleLength();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show || false,
    [product?.product_sku, showVariant]
  );

  useEffect(() => {
    if (!product?.variants) return;

    const trueCheckedIndices = checkedStates
      ?.map((checked, index) => (checked ? index : null))
      .filter((index) => index !== null);

    const updatedArray = trueCheckedIndices
      ?.map((element) => product?.variants[element]?.id)
      .filter((id) => id != null);

    setUpdateProductsIdArr((prevArr) => {
      const storedArray =
        JSON.parse(localStorage.getItem("updateProductsIdArr")) || [];
      const newArray = [...new Set([...storedArray, ...updatedArray])];

      localStorage.setItem("updateProductsIdArr", JSON.stringify(newArray));
      return newArray;
    });
  }, [checkedStates, product?.variants]);

  useEffect(() => {
    localStorage.setItem("checkedSku", JSON.stringify(checkedSku));
  }, [checkedSku]);

  useEffect(() => {
    localStorage.setItem("mainChecked", JSON.stringify(mainChecked));
    localStorage.setItem("checkedStates", JSON.stringify(checkedStates));
  }, [mainChecked, checkedStates]);

  useEffect(()=>{
      setCheckedStates(
        checkedStates.map(() => checkedSku.includes(product?.product_sku))
      );
  },[checkedSku, product?.product_sku])

  // const handleMainCheckboxChange = useCallback(
  //   (e) => {
  //     e.stopPropagation();

  //     const newMainChecked = !mainChecked;
  //     setMainChecked(newMainChecked);
  //     setCheckedStates(checkedStates.map(() => newMainChecked));

  //     // Handle updateProductsIdArr logic
  //     if (!newMainChecked && product?.variants?.length) {
  //       const variantIds = product.variants.map((variant) => variant.id);
  //       const updatedArray = updateProductsIdArr.filter(
  //         (element) => !variantIds.includes(element)
  //       );
  //       localStorage.setItem(
  //         "updateProductsIdArr",
  //         JSON.stringify(updatedArray)
  //       );
  //     }
  //   },
  //   [mainChecked, checkedStates, product, updateProductsIdArr]
  // );

  const handleChildCheckboxChange = useCallback(
    (index, id) => {
      const newCheckedStates = [...checkedStates];
      newCheckedStates[index] = !newCheckedStates[index];
      setCheckedStates(newCheckedStates);
      if (newCheckedStates.every((checked) => checked)) {
        setMainChecked(true);
      } else {
        setMainChecked(false);
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
    },
    [checkedStates, updateProductsIdArr]
  );

    const handleMainCheckboxChange = useCallback(() => {
      // Toggle product?.product_sku in checkedSku array
      setCheckedSku((prevCheckedSku) => {
        // console.log("Before update:", prevCheckedSku);

        if (prevCheckedSku.includes(product?.product_sku)) {
          const updatedSku = prevCheckedSku.filter(
            (sku) => sku !== product.product_sku
          );
          // console.log("Updated checkedSku (removed):", updatedSku);
          return updatedSku;
        } else {
          const updatedSku = [...prevCheckedSku, product?.product_sku];
          // console.log("Updated checkedSku (added):", updatedSku);
          return updatedSku;
        }
      });

      const newMainChecked = checkedSku.includes(product?.product_sku);
      setMainChecked(newMainChecked);

      console.log("checkedStates", checkedStates);
    }, [checkedSku, checkedStates, product.product_sku, setCheckedSku]);
    
  const handleShowVariants = useCallback(() => {
    setClicked((pre) => !pre);
    setShowVariant((prevVariants) =>
      prevVariants?.map((variant) =>
        variant?.id === product?.product_sku
          ? { ...variant, show: !variant.show }
          : variant
      )
    );
  }, [setClicked, setShowVariant, product?.product_sku]);

  // console.log(
  //   "product?.product_sku",
  //   checkedSku.includes(product?.product_sku)
  // );
  return (
    <div className="flex flex-col space-y-4 pl-6 pr-1">
      <div className="flex w-full space-x-2 relative">
        <Checkbox
          checked={checkedSku.includes(product?.product_sku) ? true : false}
          onChange={handleMainCheckboxChange}
        />
        <a
          href={`${baseURL}${product?.product_sku}`}
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
            <span>
              {product?.product_sku}{" "}
              <CopyButton textToCopy={product?.product_sku} />
            </span>
          </p>
        </div>
        <button
          onClick={handleShowVariants}
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
          <SupplierLine />
          {product?.variants?.map((variant, index) => (
            <div key={variant?.id}>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center relative">
                <div className="absolute -left-6">
                  <Checkbox
                    checked={checkedStates[index]}
                    onChange={() =>
                      handleChildCheckboxChange(index, variant?.id)
                    }
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="font-semibold">Colors:</div>
                  {variant?.colors?.map((colorObj, idx) => {
                    const [key, value] = Object.entries(colorObj)[0];
                    return <div key={idx}>{value}</div>;
                  })}
                </div>
                <p>
                  <span className="font-semibold">variant sku: </span>
                  <span className="mr-1">{variant?.variant_sku}</span>
                  <CopyButton textToCopy={variant?.variant_sku} />
                </p>
                <p>
                  <span className="font-semibold">barcode: </span>
                  <span className="mr-1">
                    {product?.barcode ? product?.barcode : 123456789}
                  </span>
                  <CopyButton
                    textToCopy={product?.barcode ? product?.barcode : 123456789}
                  />
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

export default memo(ProductDetails);
