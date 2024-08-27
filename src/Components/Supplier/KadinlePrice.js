import { useMemo, useState } from "react";
import Popup from "./Popup";

const KadinlePrice = ({ product, showVariant }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  return (
    <>
      <Popup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        productPrice={product?.price}
      />

      <div>
        {/* <div className="text-[12px]  !h-[80px] flex flex-col justify-center items-center space-y-2">
           <div
             className="flex items-center space-x-1 cursor-pointer border border-gray-400 pr-6 pl-2 py-1 text-gray rounded-md min-w-[70px]"
             onClick={() => setIsPopupVisible(true)}
           >
             <span className="font-semibold">{product?.price} </span>
             <span>$</span>
           </div>

        
         </div> */}
        <div className="h-[60px]"></div>
        {show && (
          <div className="text-center w-full">
            <hr className="" />
            {product?.variants?.map((variant) => (
              <>
                <div
                  onClick={() => setIsPopupVisible(true)}
                  className="cursor-pointer h-28 lg:h-24 text-[12px] ml-3 flex items-center  space-x-1 relative"
                >
                  <div className="absolute left-0-0 h-6 w-12 border border-gray-400 text-gray rounded-md" />
                  <div className="">
                    <span className="font-semibold">
                      {variant?.purchase_price}{" "}
                    </span>
                    {/* <span>$</span> */}
                  </div>
                </div>
                <hr className="" />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default KadinlePrice;
