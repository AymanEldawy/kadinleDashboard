import { useMemo } from "react";

const Variant = ({ product, showVariant }) => {
//   console.log("variant", variant);
     const show = useMemo(
       () => showVariant?.find((variant) => variant.id === product?.id)?.show,
       [product?.id, showVariant]
     );

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-[12px]  !h-[80px] flex items-center justify-center space-x-1">
        <span className="font-semibold">
          {product?.product_variant?.length}{" "}
        </span>
        <span>variant</span>
      </div>
      {show && (
        <div className="text-center">
          <hr className="" />
          {product?.product_variant?.map((variant) => (
            <>
              <div className="h-28 lg:h-24 text-[12px] ml-3 flex flex-col justify-center">
                2xl
              </div>
              <hr className="" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Variant;
