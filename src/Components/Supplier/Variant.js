import { useMemo } from "react";

const Variant = ({ product }) => {
// console.log("product from Variant", product);
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-[12px]  !h-[80px] flex items-center justify-center space-x-1">
        <span>{product?.variant_count}</span>
      </div>
    </div>
  );
};

export default Variant;
