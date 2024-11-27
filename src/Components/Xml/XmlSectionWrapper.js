import React from "react";

export const XmlSectionWrapper = ({
  children,
  bodyClassName,
  containerClassName,
  title,
  extraContent,
}) => {
  return (
    <div className={`shadow p-4 rounded-md bg-gray-100 overflow-auto max-h-[350px] ${containerClassName}`}>
      <div className={`${bodyClassName}`}>
        <h3 className="text-xl mb-4 font-bold capitalize">{title}</h3>
        {extraContent}
      </div>
      {children}
    </div>
  );
};
