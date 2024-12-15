import React from "react";
import { Link } from "react-router-dom";
import { getFormatPrice } from "../../Helpers/functions";
import { useGlobalOptions } from "../../Context/GlobalOptions";

export const VariantsView = ({ variant }) => {
  const { currency } = useGlobalOptions();
  return (
    <Link
      to={`https://kadinle.com/product/${variant?.id}`}
      target="_blank"
      className="flex items-center gap-4 odd:bg-gray-100 p-2 text-sm hover:bg-blue-100"
    >
      {/* <div className="flex-1">
        
      </div> */}
      <ul className="flex-1 text-sm flex flex-col gap-2">
        <li className="flex gap-2 items-center">
          <span className="min-w-[130px]">International price:</span>
          <span className="bg-gray-200 rounded-md px-1 font-medium">
            {" "}
            {getFormatPrice(variant?.global_price, currency) || "0"}
          </span>
        </li>
        <li className="flex gap-2 items-center">
          <span className="min-w-[130px]">Turkey price:</span>
          <span className="bg-gray-200 rounded-md px-1 font-medium">
            {" "}
            {getFormatPrice(variant?.price, currency) || "0"}
          </span>
        </li>
        <li className="flex gap-2 items-center">
          <span className="min-w-[130px]">Supplier price:</span>
          <span className="bg-gray-200 rounded-md px-1 font-medium">
            {" "}
            {getFormatPrice(variant?.purchase_price, currency) || "0"}
          </span>
        </li>
      </ul>
      <div className="flex-1 flex-col gap-1 flex capitalize">
        <div className="flex items-center gap-2">
          <span className="min-w-[100px]">Supplier color:</span>
          <span className=" bg-gray-200 text-gray-500 border rounded-md p-1 text-xs">
            {variant?.color_details || "Nothing"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[100px]">color:</span>
          <span className=" bg-gray-200 text-gray-500 border rounded-md p-1 text-xs">
            {variant?.color?.color_content?.at(0)?.name}
          </span>
        </div>
      </div>
      <div className="flex-1 items-center">
        <span className=" bg-gray-200 text-gray-500 border rounded-md p-2">
          {variant?.size?.size_content?.at(0)?.name}
        </span>
      </div>
      <div className="flex-1 items-center">
        <span className=" bg-gray-200 text-gray-500 border rounded-md p-2">
          {variant?.stock?.at(0)?.stock}
        </span>
      </div>
    </Link>
  );
};
