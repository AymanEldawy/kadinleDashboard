import React from "react";

export const StepsBar = ({ items, activeIndex }) => {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto">
      {items?.map((item, index) => (
        <>
          <div className="flex items-center justify-between flex-col gap-2">
            <span
              className={`
            h-10 w-10 flex items-center justify-between rounded-full overflow-hidden relative shadow
            before:absolute before:h-[60%] before:w-[60%] before:bg-gray-100 before:shadow before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
            ${activeIndex >= index ? "bg-blue-400" : "bg-gray-200"}
            `}
            ></span>
            <span
              className={`${
                activeIndex >= index ? "text-blue-400" : "text-gray-400"
              }`}
            >
              {item?.name}
            </span>
          </div>
          {index < items?.length - 1 ? (
            <div
              className={`
               h-[2px] flex-1 -mt-8 shadow
               ${activeIndex > index ? "bg-blue-400" : "bg-gray-200"}
              `}
            />
          ) : null}
        </>
      ))}
    </div>
  );
};
