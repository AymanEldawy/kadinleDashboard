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
import CopyButton from "../Supplier/CopyButton";
import { useLocation, useNavigate } from "react-router-dom";

const WarehouseFrom = ({
  order,
  setClicked,
  showVariant,
  setShowVariant,
  checkedId,
  setCheckedId,
}) => {
  // console.log("order from warehouse", order);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === order?.order?.order_id)
        ?.show || false,
    [order?.order?.order_id, showVariant]
  );
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = "https://kadinle.com/en/product/";


  const checkedStates = useRef([]);
  console.log("checkedStates", checkedStates);

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

  const storedChecked = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedCheckedValue = searchParams.get("checked");
    return storedCheckedValue ? JSON.parse(storedCheckedValue) : null;
  }, [location]);

  useEffect(() => {
    if (storedChecked) {
      checkedStates.current = storedChecked;
    }

    checkedStates.current = [...new Set(checkedStates.current)];


  }, [storedChecked]);

const handleSaveCheckedInURL = (checked) => {
  let updatedChecked;

  if (checkedStates.current.includes(checked)) {
    updatedChecked = checkedStates.current.filter((item) => item !== checked);
  } else {
    updatedChecked = [...checkedStates.current, checked];
  }

  checkedStates.current = updatedChecked;

  const queryString = new URLSearchParams({
    checked: JSON.stringify(updatedChecked),
  }).toString();
  navigate(`?${queryString}`);
};



  const handleShowVariants = useCallback(() => {
    setClicked((pre) => !pre);
    setShowVariant((prevVariants) =>
      prevVariants?.map((variant) =>
        variant?.id === order?.order?.order_id
          ? { ...variant, show: !variant.show }
          : variant
      )
    );
  }, [setClicked, setShowVariant, order?.order?.order_id]);

  return (
    <div className="flex flex-col space-y-4 pl-6 pr-1">
      <div className="flex w-full space-x-2 relative">
        <Checkbox
        // checked={checkedId.includes(order?.id) ? true : false}
        // onChange={handleMainCheckboxChange}
        />
        <a
          href={`${baseURL}${order?.order_content?.at(0)?.variant_id}`}
          title={order?.warehouse?.name}
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
            title={order?.warehouse?.name}
            target="_blank"
            rel="noopener noreferrer"
            ref={linkRef}
          >
            <h3 className="font-semibold truncate">{order?.warehouse?.name}</h3>
          </div>
          {/* <p>
            product sku:{" "}
            <span>
              {product?.product_sku}{" "}
              <CopyButton textToCopy={product?.product_sku} />
            </span>
          </p> */}
        </div>
        {order?.order_content && (
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
        )}
      </div>
      {show && (
        <div>
          <SupplierLine />
          {order?.order_content?.map((variant, index) => (
            <div key={variant?.id}>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center relative">
                <div className="absolute -left-6">
                  <Checkbox
                    checked={checkedStates.current.includes(
                      variant?.variant_sku
                    )? true: false}
                    onChange={() =>
                      // handleChildCheckboxChange(index, variant?.id)
                      handleSaveCheckedInURL(variant?.variant_sku)
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
                <div className="flex gap-3 justify-start items-center px-3">
                  <a
                    href={`${baseURL}${variant?.variant_sku}`}
                    // title={order?.warehouse?.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={linkRef}
                  >
                    <img
                      src={variant?.image}
                      alt={variant?.variant_sku}
                      className="h-16 w-12 object-cover"
                    />
                  </a>
                  <div>
                    <p>
                      <span className="font-semibold">quantity: </span>
                      <span className="mr-1">{variant?.quantity}</span>
                    </p>
                    <p>
                      <span className="font-semibold">price: </span>
                      <span className="mr-1">{variant?.price}</span>
                    </p>
                    <p>
                      <span className="font-semibold">variant sku: </span>
                      <span className="mr-1">
                        {variant?.variant_sku ? variant?.variant_sku : 0}
                      </span>
                      <CopyButton
                        textToCopy={
                          variant?.variant_sku ? variant?.variant_sku : 0
                        }
                      />
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
                </div>
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
