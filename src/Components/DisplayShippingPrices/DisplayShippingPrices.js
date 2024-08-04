import React, { useMemo } from "react";

import Table from "../CustomTable/Table";
import TableBody from "../CustomTable/TableBody";
import TableCol from "../CustomTable/TableCol";
import TableHead from "../CustomTable/TableHead";
import TableHeadCol from "../CustomTable/TableHeadCol";
import TableRow from "../CustomTable/TableRow";

export const DisplayShippingPrices = ({ data }) => {
  const shippingData = useMemo(() => {
    if (!data) return [];

    const weights = data?.fast_price && Object.keys(data?.fast_price);
    const fast = data?.fast_price && Object.values(data?.fast_price);
    const normal = data?.normal_price && Object.values(data?.normal_price);
    let rows = [];
    for (let i = 0; i < fast?.length; i++) {
      let weight = weights?.[i];
      let fast_price = fast?.[i];
      let normal_price = normal?.[i];
      rows.push({
        weight,
        normal_price,
        fast_price,
      });
    }
    return rows;
  }, [data]);

  return (
    <div>
      <div className="bg-gray-200 dark:bg-bgmaindark shadow rounded-md overflow-hidden">
        {data?.area ? (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
            area:{" "}
            <span className="bg-white dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.area}
            </span>
          </p>
        ) : null}
        {data?.min_fast_duration ? (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
            min_fast_duration:{" "}
            <span className="bg-white dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.min_fast_duration}
            </span>
          </p>
        ) : null}
        {data?.max_fast_duration ? (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 last:mb-0 capitalize justify-between pl-4 border-gray-400 flex">
            max_fast_duration:{" "}
            <span className="bg-white dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.max_fast_duration}
            </span>
          </p>
        ) : null}
        {data?.min_normal_duration ? (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 last:mb-0 capitalize justify-between pl-4 border-gray-400 flex">
            min_normal_duration:{" "}
            <span className="bg-white dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.min_normal_duration}
            </span>
          </p>
        ) : null}
        {data?.min_normal_duration ? (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 last:mb-0 capitalize justify-between pl-4 border-gray-400 flex">
            min_normal_duration:{" "}
            <span className="bg-white dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.min_normal_duration}
            </span>
          </p>
        ) : null}
      </div>
      <p className="text-gray-500 mb-2 mt-4 font-medium ">
        Rows of prices: <span>{shippingData?.length}</span>
      </p>
      <Table containerClassName="!rounded-none">
        <TableHead>
          <TableHeadCol>#</TableHeadCol>
          <TableHeadCol>Weight</TableHeadCol>
          <TableHeadCol>Fast_price</TableHeadCol>
          <TableHeadCol>Normal_price</TableHeadCol>
        </TableHead>
        <TableBody>
          {shippingData?.map((item, index) => (
            <TableRow key={item?.weight}>
              <TableCol>{index + 1}</TableCol>
              <TableCol>{item?.weight}</TableCol>
              <TableCol>{item?.fast_price}</TableCol>
              <TableCol>{item?.normal_price}</TableCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
