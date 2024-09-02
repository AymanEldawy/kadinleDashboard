import React from "react";

export const LoadingProcess = ({ isFull }) => {
  return (
    <div
      className={`${
        isFull ? "fixed" : "absolute"
      } top-0 left-0 w-full h-full z-10 flex pt-36 text-primary-blue bg-[#ffffff81] justify-center text-4xl dark:bg-[#00000021]`}
    >
      <svg
        class="animate-spin h-9 w-9 mr-3 bg-primary-blue rounded-md"
        viewBox="0 0 24 24"
      ></svg>
      Processing...
    </div>
  );
};
