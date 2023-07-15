import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";

import { PlusIcon } from "../../../Helpers/Icons";
import MinusIcon from "../../../Helpers/Icons/MinusIcon";
import InputField from "../../CustomForm/InputField";
import SelectField from "../../CustomForm/SelectField";
import Table from "../../CustomTable/Table";
import TableBody from "../../CustomTable/TableBody";
import TableCol from "../../CustomTable/TableCol";
import TableHead from "../../CustomTable/TableHead";
import TableHeadCol from "../../CustomTable/TableHeadCol";
import TableRow from "../../CustomTable/TableRow";
import { Button } from "../../Global/Button";

const TableForm = ({
  hideIncreasable,
  rowLength,
  setRowLength,
  initialFields,
  oldValues,
  onSubmit,
  getCachedList,
  getValuesWithoutSubmit,
  setGetIndexOfRowUpdated,
  selectedChart,
}) => {
  const [grid, setGrid] = useState([]);
  useEffect(() => {}, [initialFields]);

  useEffect(() => {
    setGrid((prev) => {
      return {
        ...prev,
        ...oldValues,
      };
    });
  }, [oldValues]);

  useEffect(() => {
    if (getValuesWithoutSubmit) {
      getValuesWithoutSubmit(grid);
    }
  }, [grid]);

  const handelChangeField = useCallback(
    (index, name, value) => {
      setGrid((prev) => {
        return {
          ...prev,
          [index]: { ...prev?.[index], [name]: value },
        };
      });
      if (!!setGetIndexOfRowUpdated) {
        setGetIndexOfRowUpdated(index);
      }
      // console.log(index)
    },
    [grid]
  );
  const submit = () => {
    console.log("submit", grid);
    onSubmit(grid);
  };

  return (
    <>
      <Table
        tableClassName={`!rounded-none mx-auto pb-8 overflow-auto max-h-[420px] dark:border-borderdark`}
      >
        <TableHead classes="dark:text-gray-200">
          <TableHeadCol classes="border !w-[90px] border-gray-300 dark:border-borderdark !py-3 !text-center">
            <div className="text-center w-full block">#</div>
          </TableHeadCol>
          {initialFields?.map((col) => {
            if (col?.hide_in_add_form || col?.name === "id") return;
            else {
              return (
                <TableHeadCol
                  classes="border border-gray-300 !w-[90px] dark:border-borderdark !py-3"
                  key={col?.name}
                >
                  {selectedChart[col?.name] || col?.name}
                </TableHeadCol>
              );
            }
          })}
        </TableHead>
        <TableBody>
          {Array(hideIncreasable ? 1 : rowLength)
            .fill(0)
            .map((r, index) => (
              <TableRow key={`${r}-${index}`}>
                <TableCol classes="max-w-fit !p-0 !w-[90px] border dark:!border-borderdark text-center">
                  {index + 1}
                </TableCol>
                {initialFields?.map((field) => {
                  if (field?.hide_in_add_form || field?.name === "id")
                    return null;
                  if (field?.key === "ref") {
                    return (
                      <TableCol
                        classes="!p-0 border !w-[90px] dark:!border-borderdark text-center"
                        key={field?.name}
                      >
                        <SelectField
                          list={
                            !!getCachedList
                              ? getCachedList(field?.tableName)
                              : []
                          }
                          value={grid?.[index + 1]?.[field?.name]}
                          className={`!border-0 !rounded-none !bg-transparent`}
                          name={field?.name}
                          required={field?.required}
                          onChange={(e) => {
                            handelChangeField(
                              index + 1,
                              field?.name,
                              e.target.value
                            );
                          }}
                        />
                      </TableCol>
                    );
                  } else
                    return (
                      <TableCol
                        classes="!p-0 border  dark:!border-borderdark text-center"
                        key={field?.name}
                      >
                        <InputField
                          value={grid?.[index + 1]?.[field?.name]}
                          className={`!border-0 !rounded-none !bg-transparent `}
                          name={field?.name}
                          type={field?.type}
                          required={field?.required}
                          onChange={(e) => {
                            handelChangeField(
                              index + 1,
                              field?.name,
                              e.target.value
                            );
                          }}
                        />
                      </TableCol>
                    );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {hideIncreasable ? null : (
        <div className="flex gap-4 items-center justify-between mt-1">
          <button
            onClick={() => setRowLength((prev) => prev + 1)}
            className="dark:bg-[#5c5c5c] bg-gray-200 text-black dark:hover:bg-[#444] dark:text-white p-2 rounded-full h-7 w-7 flex items-center justify-center"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            disabled={rowLength === 1}
            onClick={() => setRowLength((prev) => (prev > 1 ? prev - 1 : prev))}
            className="dark:bg-[#5c5c5c] disabled:opacity-50 disabled:pointer-events-none bg-gray-200 text-black dark:hover:bg-[#444] dark:text-white p-2 rounded-full h-7 w-7 flex items-center justify-center"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex justify-between gap-4 items-center mt-4">
        <Button
          title="Submit"
          onClick={submit}
          type="button"
          classes="w-[140px] hover:bg-primary-blue"
        />
      </div>
    </>
  );
};

export default TableForm;
