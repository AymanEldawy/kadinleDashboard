import React from "react";

import Layout from "../../Layout";

const BlockPaper = ({
  title,
  contentBar,
  children,
  fullWidth,
  containerClassName,
  subTitle,
}) => {
  return (
    <div
      className={`!mb-8 overflow-hidden shadow relative ${containerClassName}`}
    >
      <div className={`overflow-hidden`}>
        <div className="p-4 shadow bg-white  dark:bg-bgmaindark rounded-md">
          {title ? (
            <div className=" border-b mb-4 pb-2 dark:border-[#333]">
              <h3 className="capitalizetext-lg font-medium text-gray-600 dark:border-[#333] dark:text-white">
                {" "}
                {title}{" "}
              </h3>
              {subTitle ? subTitle : null}
            </div>
          ) : null}
          {contentBar ? contentBar : null}
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BlockPaper;
