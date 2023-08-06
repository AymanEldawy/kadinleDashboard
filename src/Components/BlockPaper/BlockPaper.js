import React from "react";

import Layout from "../../Layout";

const BlockPaper = ({
  title,
  contentBar,
  children,
  fullWidth,
  containerClassName,
  subTitle,
  headerClassName
}) => {
  return (
    <div
      className={`!mb-8 pb-4 shadow overflow-auto relative bg-white ${containerClassName}`}
    >
      <div className={`overflow-hidden`}>
        <div className={`p-4 border-b mb-4 pb-2 dark:border-[#333] bg-white  dark:bg-bgmaindark rounded-md ${headerClassName}`}>
          {title ? (
            <div className="">
              <h3 className="capitalize text-lg lg:tex-xl font-medium text-gray-600 dark:border-[#333] dark:text-white">
                {" "}
                {title}{" "}
              </h3>
              {subTitle ? subTitle : null}
            </div>
          ) : null}
          {contentBar ? contentBar : null}
        </div>
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default BlockPaper;
