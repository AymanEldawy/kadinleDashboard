import React, { useCallback, useEffect, useState } from "react";
import Field from "../../CustomForm/Field";
import InputField from "../../CustomForm/InputField";
import Table from "../../CustomTable/Table";
import TableBody from "../../CustomTable/TableBody";
import TableCol from "../../CustomTable/TableCol";
import TableHead from "../../CustomTable/TableHead";
import TableHeadCol from "../../CustomTable/TableHeadCol";
import TableRow from "../../CustomTable/TableRow";
import { Button } from "../../Global/Button";

const TableForm = ({
  onOpen,
  initialFields,
  setIndex,
  oldValues,
  onSubmit,
  goBack,
  goNext,
  steps,
}) => {
  const [grid, setGrid] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    let names = initialFields?.map((_) => _.name);
    setColumns(names);
  }, [initialFields]);

  useEffect(() => {
    setGrid((prev) => {
      return {
        ...prev,
        ...oldValues,
      };
    });
  }, [oldValues]);

  const handelChangeField = useCallback(
    (index, name, value) => {
      setGrid((prev) => {
        return {
          ...prev,
          [index]: { ...prev?.[index], [name]: value },
        };
      });
    },
    [grid]
  );
  const submit = () => {
    onSubmit(grid);
  };

  return (
    <>
      <Table
        className={`${
          columns?.length > 5 ? "" : "max-w-[900px]"
        } mx-auto pb-8 overflow-auto max-h-[420px] dark:border-borderdark`}
      >
        <TableHead classes="dark:bg-[#555] dark:text-gray-200">
          <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3 !text-center">
            <div className="text-center w-full block">#</div>
          </TableHeadCol>
          {columns?.map((col) => (
            <TableHeadCol
              classes="border border-gray-300 dark:border-borderdark !py-3"
              key={col}
            >
              {col}
            </TableHeadCol>
          ))}
        </TableHead>
        <TableBody>
          {Array(20)
            .fill(0)
            .map((r, index) => (
              <TableRow>
                <TableCol classes="max-w-fit !p-0 border dark:border-borderdark text-center">
                  <button
                    className="hover:bg-gray-200 hover:font-medium block w-full p-2"
                    onClick={() => {
                      onOpen();
                      setIndex(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </TableCol>
                {initialFields?.map((field) => (
                  <TableCol classes="!p-0 border" key={field?.name}>
                    {field?.key === "unique" ? (
                      <Field
                        value={grid?.[index + 1]?.[field?.name]}
                        className="min-w-[140px] border-0"
                        table={field?.table}
                        name={field?.name}
                        getSelectedValueWithIndex={handelChangeField}
                      />
                    ) : (
                      <InputField
                        value={grid?.[index + 1]?.[field?.name]}
                        className="border-0"
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
                    )}
                  </TableCol>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-between gap-4 items-center mt-4">
        {steps?.length ? (
          <>
            <Button title="Back" onClick={goBack} type="button" />
            <Button
              title="Next"
              onClick={() => {
                goNext();
                submit();
              }}
              type="button"
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default TableForm;
