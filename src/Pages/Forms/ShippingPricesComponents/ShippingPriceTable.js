// fast_price
// normal_price
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";

import InputField from "../../../Components/CustomForm/InputField";
// import SelectField from "../../../Components/CustomForm/SelectField";
import Table from "../../../Components/CustomTable/Table";
import TableBody from "../../../Components/CustomTable/TableBody";
import TableCol from "../../../Components/CustomTable/TableCol";
import TableHead from "../../../Components/CustomTable/TableHead";
import TableHeadCol from "../../../Components/CustomTable/TableHeadCol";
import TableRow from "../../../Components/CustomTable/TableRow";

// import { EditIcon, FilterIcon, PlusIcon } from "../../../Helpers/Icons";
// import MinusIcon from "../../../Helpers/Icons/MinusIcon";
// import { useDelete } from "../../../hooks/useDelete";

const weights = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  40,
  50,
  0.5,
  1.5,
  2.5,
  3.5,
  4.5,
  5.5,
  6.5,
  7.5,
  8.5,
  9.5
]

const ShippingPriceTable = ({
  rowLength,
  setRowLength,
  oldValues,
  getValuesWithoutSubmit,
  grid,
  setGrid,
  layout,
}) => {
  const [refresh, setRefresh] = useState(false)

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

  useEffect(() => {
    let hash = {}
    for (let i = 0; i < weights.length; i++) {
      hash = {
        ...hash,
        [i + 1]: {
          'weight': weights[i]
        }
      }
    }
    setGrid(prev => {
      return {
        ...prev,
        ...hash
      }
    })

  }, [])

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
        containerClassName="!rounded-none mx-auto"
        tableClassName={` mx-auto pb-8 overflow-auto max-h-[420px] dark:border-borderdark`}
      >
        <TableHead classes="dark:text-gray-200">
          <TableHeadCol classes="border w-5 border-gray-300 dark:border-borderdark !py-3 !text-center">
            <div className="text-center w-full block">#</div>
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 w-fit px-4 dark:border-borderdark !py-3"

          >
            Weight
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 w-fit px-4 dark:border-borderdark !py-3"

          >
            normal_price
          </TableHeadCol>
          <TableHeadCol
            classes="border border-gray-300 w-fit px-4 dark:border-borderdark !py-3"

          >
            fast_price
          </TableHeadCol>
        </TableHead>
        <TableBody>
          {weights
            .sort((a, b) => a - b)
            .map((weight, index) => (
              <TableRow key={`${weight}-${index}`}>
                <TableCol classes="!p-0 w-10 border dark:!border-borderdark text-center">
                  {index + 1}
                </TableCol>
                <TableCol
                  classes="!p-0 border  dark:!border-borderdark text-center relative"
                >
                  <InputField
                    containerClassName="w-full"

                    defaultValue={weight}
                    value={grid?.[index + 1]?.weight}
                    readOnly
                    className={`!border-0 !bg-gray-100 dark:!bg-[#131313] dark:text-white font-medium !rounded-none text-center w-full`}
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
                  classes="!p-0 border   dark:!border-borderdark text-center"
                >
                  <InputField
                    containerClassName="w-full"

                    value={grid?.[index + 1]?.normal_price}
                    className={`!border-0 !rounded-none text-center  !bg-transparent w-full`}
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
                  classes="!p-0 border   dark:!border-borderdark text-center"
                >
                  <InputField
                    containerClassName="w-full"
                    value={grid?.[index + 1]?.fast_price}
                    className={`!border-0 !rounded-none text-center  !bg-transparent w-full`}
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
      {/* <div className="flex gap-4 items-center justify-between mt-1">
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
      </div> */}
    </>
  );
};

export default ShippingPriceTable;
