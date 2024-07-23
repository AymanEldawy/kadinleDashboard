import React from "react";

import Layout from "../../Layout";
import { ChevronIcon } from "../../Helpers/Icons";
import { useNavigate } from "react-router-dom";

const BlockPaper = ({
  title,
  contentBar,
  children,
  fullWidth,
  containerClassName,
  subTitle,
  headerClassName,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 my-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white duration-100 py-1 px-2 rounded-md"
      >
        <ChevronIcon className="h-5 w-5 rotate-90" /> Back
      </button> */}

      <div
        className={`!mb-8 pb-4 shadow overflow-auto relative dark:bg-bgmaindark bg-white ${containerClassName}`}
      >
        <div className={`overflow-hidden`}>
          <div
            className={`p-4 border-b mb-4 pb-2 dark:border-[#333] bg-white  dark:bg-bgmaindark rounded-md ${headerClassName}`}
          >
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
    </>
  );
};

export default BlockPaper;
