import { useMemo, useState } from "react";
import SupplierLine from "./SupplierLine";
import Popup from "./Popup";

const KadinlePrice = ({
  product,
  showVariant,
  selectedCurrency,
  getFormatPrice,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [index, setIndex] = useState(null);
  console.log("index", index);
  const [variantId, setVariantId] = useState("");
  // console.log("product from kadinle", product);

  let show = useMemo(
    () =>
      showVariant?.find((variant) => variant?.id === product?.product_sku)
        ?.show,
    [product?.product_sku, showVariant]
  );

  const minPrice = Math.min(
    ...(product?.variants?.map((variant) => variant.price) || [])
  );
  const maxPrice = Math.max(
    ...(product?.variants?.map((variant) => variant.price) || [])
  );

  return (
    <>
      <Popup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        product={product}
        variantId={variantId}
        getFormatPrice={getFormatPrice}
        selectedCurrency={selectedCurrency}
        index={index}
        // setUpdateItem={setUpdateItem}
        // updateAllData={updateAllData}
        // productPrice={getFormatPrice(
        //   product?.variants[index]?.price,
        //   selectedCurrency
        // )}
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
        <div className="product-hight flex justify-center items-center gap-2">
          <div>{getFormatPrice(minPrice, selectedCurrency)}</div>
          <div>/</div>
          <div>{getFormatPrice(maxPrice, selectedCurrency)}</div>
        </div>
        {show && (
          <div className="text-center w-full">
            <SupplierLine />
            {product?.variants?.map((variant, inx) => (
              <>
                <div
                  onClick={() => {
                    setIndex(inx);
                    // console.log("clicked");
                    setVariantId(variant.id);
                    setIsPopupVisible(true);
                  }}
                  className="cursor-pointer h-28 lg:h-24 text-[12px] ml-3 flex items-center  space-x-1 relative"
                >
                  <div className="absolute left-0-0 h-6 w-16 border border-gray-400 text-gray rounded-md" />
                  <div className="">
                    <span className="font-semibold">
                      {getFormatPrice(variant?.price, selectedCurrency)[0]}
                    </span>
                    <span className="ml-1">
                      {getFormatPrice(variant?.price, selectedCurrency)[1]}
                    </span>
                  </div>
                </div>
                <SupplierLine />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default KadinlePrice;
