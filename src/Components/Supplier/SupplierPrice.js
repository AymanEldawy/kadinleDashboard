import { useEffect, useMemo, useState } from "react";
import Popup from "./Popup";
import { useUpdate } from "../../hooks/useUpdate";

const SupplierPrice = ({
  product,
  showVariant,
  selectedCurrency,
  getFormatPrice,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);
  const minPrice = Math.min(
    ...(product?.variants?.map((variant) => variant.purchase_price) || [])
  );
  const maxPrice = Math.max(
    ...(product?.variants?.map((variant) => variant.purchase_price) || [])
  );
  //   console.log("index: ", index)
  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  // example of updated data
  const updateAllData = product?.variants.map((variant) => ({
    product_id: variant.id,
    color_id: variant.colors[0],
    price: 8,
    percentage: Math.round(variant?.percentage * 100),
  }));

  // console.log("updateAllData", updateAllData);
  const updateSingleItem = async () => {
    // await upsertItem("product_variant", data);
  };


  return (
    <>
      <Popup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        setUpdateItem={setUpdateItem}
        updateAllData={updateAllData}
        productPrice={
          getFormatPrice(
            product?.variants[index]?.purchase_price,
            selectedCurrency
          )[0]
        }
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
        <div className="h-[60px] flex justify-center items-center gap-2">
          <div>{getFormatPrice(minPrice, selectedCurrency)}</div>
          <div>/</div>
          <div>{getFormatPrice(maxPrice, selectedCurrency)}</div>
        </div>
        {show && (
          <div className="text-center w-full">
            <hr className="hr-line w-full" />
            {product?.variants?.map((variant, index) => (
              <>
                <div
                  onClick={() => {
                    setIndex(index);
                    setIsPopupVisible(true);
                  }}
                  className="cursor-pointer h-28 lg:h-24 text-[12px] ml-3 flex items-center  space-x-1 relative"
                >
                  <div className="absolute left-0-0 h-6 w-16 border border-gray-400 text-gray rounded-md" />
                  <div className="">
                    <span className="font-semibold">
                      {
                        getFormatPrice(
                          variant?.purchase_price,
                          selectedCurrency
                        )[0]
                      }
                    </span>
                    <span className="ml-1">
                      {
                        getFormatPrice(
                          variant?.purchase_price,
                          selectedCurrency
                        )[1]
                      }
                    </span>
                  </div>
                </div>
                <hr className="hr-line w-full" />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default SupplierPrice;
