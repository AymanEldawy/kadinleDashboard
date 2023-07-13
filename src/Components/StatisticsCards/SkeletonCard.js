import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-[2px] p-4 text-[#212529] animate-pulse">
      <div className="flex justify-between items-center gap-1">
        <div className="w-1/2 h-6 bg-gray-200 rounded" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <p className="text-[#495057] text-[22px] font-semibold mb-5 bg-gray-200 rounded"></p>
          <div className="text-sm underline first-letter:capitalize bg-gray-200 rounded h-5 w-24"></div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
