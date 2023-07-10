import React, { useContext } from "react";

const TabsList = ({
  direction,
  list,
  keyName,
  imgClassName,
  iconClassName,
  itemClassName,
  activeClassName,
  containerClassName,
  setActiveTab,
  activeTab,
  iconEndClassName,
  separated,
  separatedClassName,
  extraContentClassName,
  defaultNames,
  renderIconEnd,
}) => {
  return (
    <div
      className={`flex ${
        direction === "vertical" ? "flex-col" : ""
      }  ${containerClassName}`}
    >
      {list?.map((item, index) => (
        <>
          <button
            key={keyName ? item?.[keyName] : item}
            onClick={() => setActiveTab(item)}
            className={`flex items-center gap-3 px-4 py-2
             ${itemClassName} ${
              activeTab === item[keyName] || activeTab === item
                ? ` ${activeClassName}`
                : ""
            }`}
          >
            {item?.icon ? (
              <span className={iconClassName}>{item?.icon}</span>
            ) : null}
            {defaultNames ? defaultNames : keyName ? item?.[keyName] : item}
            {item?.extraContent ? (
              <span className={extraContentClassName}>
                {item?.extraContent}
              </span>
            ) : null}
            {item?.iconEnd ? (
              <span className={iconEndClassName}>{item?.iconEnd}</span>
            ) : null}
            {renderIconEnd ? renderIconEnd(item) : null}
          </button>
          {separated && index !== list?.length - 1 ? (
            <span
              className={`h-4 w-[1px] bg-gray-300  ${separatedClassName}`}
            />
          ) : null}
        </>
      ))}
    </div>
  );
};

export default TabsList;
