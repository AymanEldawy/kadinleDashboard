import React from "react";
import InputField from "../CustomForm/InputField";
import { TrashIcon } from "../../Helpers/Icons";

export const MeasurementIncreasable = ({

  content,
  onChange,
  onDeleteItem,
}) => {
  return (
    <div className="flex items-center w-full odd:bg-gray-100">
      <InputField
        name="sku"
        value={content?.sku}
        className="bg-transparent py-[6px] max-w-[60px] text-center"
        onChange={onChange}
      />
      <InputField
        containerClassName="flex-1 border-x"
        name="tr_description"
        value={content?.tr_description}
        className=" bg-transparent py-[6px]"
        onChange={onChange}
      />
      <InputField
        containerClassName="flex-1 border-l"
        name="en_description"
        value={content?.en_description}
        className=" bg-transparent py-[6px]"
        onChange={onChange}
      />
      <InputField
        containerClassName="flex-1 border-l"
        name="ar_description"
        value={content?.ar_description}
        className=" bg-transparent py-[6px]"
        onChange={onChange}
      />
      <div className="w-[60px] flex items-center justify-center">
        <button
          title="Delete all"
          className=" bg-red-500 scale-75 text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
          onClick={onDeleteItem}
        >
          <TrashIcon />
        </button>{" "}
      </div>
    </div>
  );
};
