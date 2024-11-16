import React, { useState } from "react";
import InputField from "../CustomForm/InputField";
import { PlusIcon } from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";
import { v4 as uuidv4 } from "uuid";
import { TABLES_NAMES } from "../../Helpers/Scripts/constants";
import { useDelete } from "../../hooks/useDelete";

export const OfferRowView = ({
  containerClassName,
  rowCount,
  fields,
  data,
  handleChangeRow,
  setData,
  offer,
  increasable = true,
}) => {
  const { deleteItem } = useDelete();
  const [refresh, setRefresh] = useState(false);

  const increase = () => {
    let lastElement = uuidv4();
    setData((prev) => ({ ...prev, [lastElement]: {} }));
    setRefresh((p) => !p);
  };

  const decrease = async (item, value) => {
    const list = data;
    delete list[item];
    setData(list);
    setRefresh((p) => !p);
    if (value?.id && offer) {
      const tableName = TABLES_NAMES?.[offer?.offer_type];
      await deleteItem(tableName, [value?.id]);
    }
  };

  return (
    <div className={`flex-1 ${containerClassName}`}>
      {Object.entries(data).map(([key, value], index) => (
        <div className={`flex gap-2 items-center`} key={index + key}>
          {fields?.map((field, i) => {
            return (
              <InputField
                key={field?.name}
                containerClassName="flex-1 mb-1"
                value={value?.[field?.name]}
                name={field?.name}
                type={field?.type}
                label={index > 0 ? null : field?.label}
                required
                onChange={(e) =>
                  handleChangeRow(
                    field?.name,
                    field?.type === "checkbox"
                      ? e.target.checked
                      : e.target.value,
                    key
                  )
                }
              />
            );
          })}
          {increasable ? (
            <button
              // disabled={Object.keys(data).length === 1}
              className={`bg-blue-500 rounded-full disabled:bg-gray-300 disabled:opacity-75 active:bg-blue-700 text-white w-7 h-7 flex items-center justify-center ${
                index === 0 ? "mt-auto mb-2" : ""
              }`}
              onClick={() => decrease(key, value)}
            >
              <MinusIcon className="w-5 h-5" />{" "}
            </button>
          ) : null}
        </div>
      ))}
      {increasable ? (
        <div className="flex w-fit border rounded-md gap-2 items-center justify-between bg-blue-50 py-1 px-2">
          <p>Rows: {Object.keys(data).length}</p>
          <button
            className="bg-blue-500 active:bg-blue-700 text-white rounded-md w-7 h-7 flex items-center justify-center"
            onClick={increase}
          >
            <PlusIcon className="w-5 h-5" />{" "}
          </button>
        </div>
      ) : null}
    </div>
  );
};
