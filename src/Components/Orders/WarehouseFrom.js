import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Checkbox from "../Supplier/Checkbox";
import NextArrow from "../icons/NextArrow";
import SupplierLine from "../Supplier/SupplierLine";


const WarehouseFrom = ({
  order,
  setClicked,
  showVariant,
  setShowVariant,
  checkedId,
  setCheckedId,
}) => {
//   console.log("order from warehouse", order);
  const baseURL = "https://kadinle.com/en/product/";

  const initialMainChecked = useMemo(
    () => JSON.parse(localStorage.getItem("mainCheckedOrder")) || false,
    []
  );

  const initialCheckedStates = useMemo(
    () =>
      JSON.parse(localStorage.getItem("checkedStatesOrder")) ||
      (order?.order_content ? order.order_content.map(() => false) : []),
    [order?.order_content]
  );

  const [updateOrdersIdArr, setUpdateOrdersIdArr] = useState([]);
  const [mainChecked, setMainChecked] = useState(initialMainChecked);
  console.log("out side mainChecked", mainChecked);
  const [checkedStates, setCheckedStates] = useState(initialCheckedStates);

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
      showVariant?.find((variant) => variant?.id === order?.id)?.show || false,
    [order?.id, showVariant]
  );

  useEffect(() => {
    if (!order?.order_content) return;

    const trueCheckedIndices = checkedStates
      ?.map((checked, index) => (checked ? index : null))
      .filter((index) => index !== null);

    const updatedArray = trueCheckedIndices
      ?.map((element) => order?.order_content[element]?.id)
      .filter((id) => id != null);

    setUpdateOrdersIdArr((prevArr) => {
      const storedArray =
        JSON.parse(localStorage.getItem("updateOrdersIdArr")) || [];
      const newArray = [...new Set([...storedArray, ...updatedArray])];

      localStorage.setItem("updateOrdersIdArr", JSON.stringify(newArray));
      return newArray;
    });
  }, [checkedStates, order?.order_content]);

  useEffect(() => {
    localStorage.setItem("checkedId", JSON.stringify(checkedId));
  }, [checkedId]);


  useEffect(() => {
    setCheckedStates(checkedStates.map(() => checkedId.includes(order?.id)));
  }, [checkedId, order?.id]);

  const handleChildCheckboxChange = useCallback(
    (index, id) => {
      const newCheckedStates = [...checkedStates];
      newCheckedStates[index] = !newCheckedStates[index];
      setCheckedStates(newCheckedStates);
      console.log("newCheckedStates", newCheckedStates);
      if (newCheckedStates.every((checked) => checked)) {
        
        setMainChecked(true);
        console.log("mainChecked", mainChecked);
      } else {
        setMainChecked(false);
        if (updateOrdersIdArr.includes(id)) {
          const updatedArray = updateOrdersIdArr.filter(
            (element) => element !== id
          );
          localStorage.setItem(
            "updateOrdersIdArr",
            JSON.stringify(updatedArray)
          );
        }
      }
    },
    [checkedStates]
  );

  const handleMainCheckboxChange = useCallback(() => {
    setCheckedId((prevCheckedId) => {
      if (prevCheckedId.includes(order?.id)) {
        const updatedId = prevCheckedId.filter((id) => id !== order?.id);

        return updatedId;
      } else {
        const updatedId = [...prevCheckedId, order?.id];
        return updatedId;
      }
    });

    const newMainChecked = checkedId.includes(order?.id);
    setMainChecked(newMainChecked);
  }, [checkedId, order?.id, setCheckedId]);

  const handleShowVariants = useCallback(() => {
    setClicked((pre) => !pre);
    setShowVariant((prevVariants) =>
      prevVariants?.map((variant) =>
        variant?.id === order?.id
          ? { ...variant, show: !variant.show }
          : variant
      )
    );
  }, [setClicked, setShowVariant, order?.id]);


  return (
    <div className="flex flex-col space-y-4 pl-6 pr-1">
      <div className="flex w-full space-x-2 relative">
        <Checkbox
          checked={checkedId.includes(order?.id) ? true : false}
          onChange={handleMainCheckboxChange}
        />
        <a
          href={`${baseURL}${order?.order_content?.at(0)?.id}`}
          title={order?.warehouse_from}
          target="_blank"
          rel="noopener noreferrer"
          ref={linkRef}
        >
          {/* <img
            src={order?.image}
            alt={order?.name}
            className="h-16 w-12 object-cover"
          /> */}
        </a>
        <div className="flex flex-col space-y-1 flex-1 text-[13px]">
          <div
            href=""
            title={order?.warehouse_from}
            target="_blank"
            rel="noopener noreferrer"
            ref={linkRef}
          >
            <h3 className="font-semibold underline truncate">
              {order?.warehouse_from?.length > visibleLength
                ? `${order?.warehouse_from?.slice(0, visibleLength)}...`
                : order?.warehouse_from}
            </h3>
          </div>
          {/* <p>
            product sku:{" "}
            <span>
              {product?.product_sku}{" "}
              <CopyButton textToCopy={product?.product_sku} />
            </span>
          </p> */}
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
          {order?.order_content?.map((variant, index) => (
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
                {/* <div className="flex space-x-2 items-center">
                  <div className="font-semibold">Colors:</div>
                  {variant?.colors?.map((colorObj, idx) => {
                    const [key, value] = Object.entries(colorObj)[0];
                    return <div key={idx}>{value}</div>;
                  })}
                </div> */}
                <p>
                  <span className="font-semibold">quantity: </span>
                  <span className="mr-1">{variant?.quantity}</span>
                </p>
                {/* <p>
                  <span className="font-semibold">barcode: </span>
                  <span className="mr-1">
                    {product?.barcode ? product?.barcode : 123456789}
                  </span>
                  <CopyButton
                    textToCopy={product?.barcode ? product?.barcode : 123456789}
                  />
                </p> */}
              </div>
              <SupplierLine />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(WarehouseFrom);
