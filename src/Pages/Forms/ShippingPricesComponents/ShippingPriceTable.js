
// fast_price
// normal_price
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";

import { PlusIcon } from "../../../Helpers/Icons";
import MinusIcon from "../../../Helpers/Icons/MinusIcon";
import Table from "../../../Components/CustomTable/Table";
import TableCol from "../../../Components/CustomTable/TableCol";
import TableHead from "../../../Components/CustomTable/TableHead";
import TableHeadCol from "../../../Components/CustomTable/TableHeadCol";
import TableRow from "../../../Components/CustomTable/TableRow";
import { useDelete } from "../../../hooks/useDelete";
import TableBody from "../../../Components/CustomTable/TableBody";
import InputField from "../../../Components/CustomForm/InputField";

const ShippingPriceTable = ({
  rowLength,
  setRowLength,
  oldValues,
  getValuesWithoutSubmit,
  grid,
  setGrid,
  layout,
}) => {

  console.log(grid, 'gir');
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
          [index]: {
            ...prev?.[index],
            [name]: value
          },
        };
      });
    },
    [grid]
  );

  return (
    <>
      <Table
        containerClassName="!rounded-none"
        tableClassName={` mx-auto pb-8 overflow-auto max-h-[420px] dark:border-borderdark`}
      >
        <TableHead classes="dark:text-gray-200">
          <TableHeadCol classes="border w-5 border-gray-300 dark:border-borderdark !py-3 !text-center">
            <div className="text-center w-full block">#</div>
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 !w-[90px] dark:border-borderdark !py-3"

          >
            Weight
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 !w-[90px] dark:border-borderdark !py-3"

          >
            normal_price
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 !w-[90px] dark:border-borderdark !py-3"

          >
            fast_price
          </TableHeadCol>
        </TableHead>
        <TableBody>
          {Array(rowLength)
            .fill(0)
            .map((r, index) => (
              <TableRow key={`${r}-${index}`}>
                <TableCol classes="!p-0 w-6 border dark:!border-borderdark text-center">
                  {index + 1}
                </TableCol>
                <TableCol
                  classes="!p-0 border  dark:!border-borderdark text-center"
                >
                  <InputField
                    value={grid?.[index + 1]?.weight}
                    className={`!border-0 !rounded-none !bg-transparent w-full`}
                    name='weight'
                    type="number"
                    step="any"
                    onChange={(e) => {
                      handelChangeField(
                        index + 1,
                        'weight',
                        e.target.value
                      );
                    }}
                  />
                </TableCol>
                <TableCol
                  classes="!p-0 border  dark:!border-borderdark text-center"
                >
                  <InputField
                    value={grid?.[index + 1]?.normal_price}
                    className={`!border-0 !rounded-none !bg-transparent w-full`}
                    name='normal_price'
                    type="number"
                    step="any"
                    onChange={(e) => {
                      handelChangeField(
                        index + 1,
                        'normal_price',
                        e.target.value
                      );
                    }}
                  />
                </TableCol>
                <TableCol
                  classes="!p-0 border  dark:!border-borderdark text-center"
                >
                  <InputField
                    value={grid?.[index + 1]?.fast_price}
                    className={`!border-0 !rounded-none !bg-transparent w-full`}
                    name='fast_price'
                    type="number"
                    step="any"
                    onChange={(e) => {
                      handelChangeField(
                        index + 1,
                        'fast_price',
                        e.target.value
                      );
                    }}
                  />
                </TableCol>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex gap-4 items-center justify-between mt-1">
        <button
          type="button"
          onClick={() => setRowLength(prev => prev + 1)}
          className="dark:bg-[#5c5c5c] bg-gray-200 text-black dark:hover:bg-[#444] dark:text-white p-2 rounded-full h-7 w-7 flex items-center justify-center"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={rowLength === 1}
          onClick={async () => {
            setRowLength(prev => prev - 1);
          }}
          className="dark:bg-[#5c5c5c] disabled:opacity-50 disabled:pointer-events-none bg-gray-200 text-black dark:hover:bg-[#444] dark:text-white p-2 rounded-full h-7 w-7 flex items-center justify-center"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default ShippingPriceTable;
