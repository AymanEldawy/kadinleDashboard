import React, { useState } from "react";
import InputField from "../CustomForm/InputField";
import { PlusIcon } from "../../Helpers/Icons";
import MinusIcon from "../../Helpers/Icons/MinusIcon";
import { v4 as uuidv4 } from "uuid";
import { TABLES_NAMES } from "../../Helpers/Scripts/constants";
import { useDelete } from "../../hooks/useDelete";
import SelectField from "../CustomForm/SelectField";
import { getDiscountIcon } from "../../Helpers/functions";

export const OfferRowView = ({
  containerClassName,
  rowCount,
  fields,
  data,
  handleChangeRow,
  setData,
  offer,
  showIcon,
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
        <div
          className={`flex lg:flex-row flex-col gap-2 items-start lg:items-center`}
          key={index + key}
        >
          {fields?.map((field, i) => {
            if (field?.list) {
              return (
                <SelectField
                  {...field}
                  key={field?.name}
                  containerClassName="flex-1 mb-1 w-full"
                  value={value?.[field?.name]}
                  keyLabel="name"
                  keyValue="name"
                  labelClassName={`${
                    index > 0 && "lg:hidden"
                  } font-medium text-lg`}
                  onChange={(option) =>
                    handleChangeRow(field?.name, option?.name, key)
                  }
                />
              );
            } else {
              return (
                <InputField
                  {...field}
                  key={field?.name}
                  containerClassName="flex-1 mb-1 w-full"
                  value={value?.[field?.name]}
                  labelClassName={`${
                    index > 0 && "lg:hidden"
                  } font-medium text-lg`}
                  showIcon={field?.has_icon ? getDiscountIcon(value?.discount_type) : null}
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
            }
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
        <div className="flex w-fit border rounded-md gap-2 items-center justify-between bg-blue-50 py-1 px-2 mt-2">
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
