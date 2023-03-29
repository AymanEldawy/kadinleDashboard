import React from "react";

const FormHeadingTitle = ({ title, classes }) => {
  return (
    <div className="flex items-center mb-8 text-left">
      <button
        className={` p-2 flex-1 font-medium capitalize border-l-4 dark:bg-borderdark text-left text-lg !text-blue-500 bg-blue-50 border-blue-500 ${classes}`}
      >
        {title}
      </button>
    </div>
  );
};

export default FormHeadingTitle;
