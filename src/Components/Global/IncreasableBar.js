import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useGlobalOptions } from "../../Context/GlobalOptions";
import { CloseIcon, PlusIcon } from "../../Helpers/Icons";

export const IncreasableBar = ({
  list,
  setList,
  maxCount,
  title,
  values,
  activeTab,
  setActiveTab,
  onDecrease,
  onIncrease,
}) => {
  const { CACHE_LANGUAGES } = useGlobalOptions();
  const increase = () => {
    if (maxCount && list?.length >= maxCount) return;
    let lastElement = uuidv4();
    setList((prev) => [...prev, lastElement]);
    setActiveTab(lastElement);
    if (!!onIncrease) onIncrease(list, lastElement);
  };
  const decrease = (item, index) => {
    if (!!onDecrease) {
      onDecrease(item, index);
    }
    if (activeTab === item) {
      if (index === 0) {
        setActiveTab(list[index + 1]);
      } else {
        setActiveTab(list[index - 1]);
      }
    }
    setList((prev) => prev?.filter((currentItem, i) => currentItem !== item));
  };
  return (
    <div className="mb-4 border-b flex flex-wrap w-full">
      {list?.map((item, index) => {
        return (
          <button
            key={index}
            type="button"
            className={`text-gray-500 pb-2 text-xs border-b-2 -mb-[2px] !gap-1 !px-1 p-2 capitalize flex items-center ${
              item === activeTab
                ? "border-primary-blue text-primary-blue font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(item)}
          >
            {title
              ? `${title} ${index + 1}`
              : values && values?.[item]?.language_id
              ? CACHE_LANGUAGES[values?.[item]?.language_id]
              : "choose language"}
            {list.length === 1 ? null : (
              <CloseIcon
                className="!text-red-500 w-4 h-4"
                onClick={(e) => {
                  e.stopPropagation();
                  decrease(item, index);
                }}
              />
            )}
          </button>
        );
      })}
      <button
        type="button"
        disabled={list?.length === maxCount}
        onClick={() => increase()}
        className="bg-primary-blue rounded-full disabled:bg-gray-400 cursor-not-allowed text-white mx-1 w-6 h-6 flex items-center justify-center mt-1 text-xs"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
