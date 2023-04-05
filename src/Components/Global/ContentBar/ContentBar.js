import React from "react";

const ContentBar = ({ title, description, children }) => {
  return (
    <div className="flex justify-between items-center border-b mb-4 pb-2 dark:border-[#333]">
      <div className="">
        {title ? (
          <h3 className="capitalize text-lg font-medium text-gray-600 dark:text-white">
            {title}
          </h3>
        ) : null}
        {description ? description : null}
      </div>
      <div className="flex gap-4 items-center">{children}</div>
    </div>
  );
};

export default ContentBar;
