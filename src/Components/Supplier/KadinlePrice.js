import { useMemo, useState } from "react";
import Popup from "./Popup";

const KadinlePrice = ({ product, showVariant }) => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
        const show = useMemo(
          () =>
            showVariant?.find((variant) => variant.id === product?.id)?.show,
          [product?.id, showVariant]
        );
  
   return (
     <>
       <Popup
         isVisible={isPopupVisible}
         onClose={() => setIsPopupVisible(false)}
         productPrice={product?.price}
       />
       <div className="flex flex-col space-y-4">
         <div className="text-[12px]  !h-[80px] flex flex-col justify-center items-center space-y-2">
           <div
             className="flex items-center space-x-1 cursor-pointer border border-gray-400 pr-6 pl-2 py-1 text-gray rounded-md min-w-[70px]"
             onClick={() => setIsPopupVisible(true)}
           >
             <span className="font-semibold">{product?.price} </span>
             <span>$</span>
           </div>

           {/* <button
             onClick={() => setIsPopupVisible(true)}
             className=" rotate-90 w-8 h-8 bg-blue-500 text-white rounded hover:text-blue-500 hover:bg-white border border-blue-500"
           >
             ✎
           </button> */}
         </div>

         {show && (
           <div className="text-center w-full">
             <hr className="" />
             {product?.product_variant?.map((variant) => (
               <>
                 <div className="h-28 lg:h-24 text-[12px] ml-3 flex items-center  space-x-1 relative">
                   <div className="absolute left-0-0 h-6 w-12 border border-gray-400 text-gray rounded-md" />
                   <div className="">
                     <span className="font-semibold">{variant?.price} </span>
                     <span>$</span>
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

export default KadinlePrice