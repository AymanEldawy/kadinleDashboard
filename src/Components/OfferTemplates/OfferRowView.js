import React, { useState } from "react";
import InputField from "../CustomForm/InputField";
import { PlusIcon } from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";

export const OfferRowView = ({
  containerClassName,
  rowCount,
  fields,
  data,
  handleChangeRow,
  increasable = true,
}) => {
  const [count, setCount] = useState(rowCount || 1);
  return (
    <div className={`flex-1 ${containerClassName}`}>
      {Array(count)
        .fill(1)
        .map((row, i) => (
          <div className="flex gap-2 items-center" key={i}>
            {fields?.map((field, index) => {
              return (
                <InputField
                  key={field?.name}
                  containerClassName="flex-1 mb-1"
                  value={data?.[i]?.[field?.name]}
                  name={field?.name}
                  type={field?.type}
                  label={i > 0 ? null : field?.label}
                  required
                  onChange={(e) =>
                    handleChangeRow(
                      field?.name,
                      field?.type === "checkbox"
                        ? e.target.checked
                        : e.target.value,
                      i
                    )
                  }
                />
              );
            })}
          </div>
        ))}
      {increasable ? (
        <div className="flex gap-2 items-center justify-between bg-blue-50 py-1 px-2">
          <button
            disabled={count === 1}
            className="bg-blue-500 disabled:bg-gray-300 disabled:opacity-75 active:bg-blue-700 text-white rounded-md w-7 h-7 flex items-center justify-center"
            onClick={() => setCount((p) => (p -= 1))}
          >
            <MinusIcon className="w-5 h-5" />{" "}
          </button>
          <p>{count}</p>
          <button
            className="bg-blue-500 active:bg-blue-700 text-white rounded-md w-7 h-7 flex items-center justify-center"
            onClick={() => setCount((p) => (p += 1))}
          >
            <PlusIcon className="w-5 h-5" />{" "}
          </button>
        </div>
      ) : null}
    </div>
  );
};
