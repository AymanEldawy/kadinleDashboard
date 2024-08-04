import React from "react";

import Table from "../CustomTable/Table";
import TableBody from "../CustomTable/TableBody";
import TableCol from "../CustomTable/TableCol";
import TableHead from "../CustomTable/TableHead";
import TableHeadCol from "../CustomTable/TableHeadCol";
import TableRow from "../CustomTable/TableRow";

const columns = ["order_number", "price", "shipping_type", "shipping_date"];

export const DisplayOrder = ({ data }) => {
  return (
    <div>
      <div className="bg-gray-200 grid grid-cols-2 dark:bg-bgmaindark shadow rounded-md overflow-hidden">
        <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
          Created At:{" "}
          <span className="bg-white flex items-center dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
            {new Date(data?.created_at)?.toLocaleDateString("en-US")}
          </span>
        </p>
        {columns?.map((col) => (
          <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
            {col}:{" "}
            <span className="bg-white flex items-center dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
              {data?.[col]}
            </span>
          </p>
        ))}
        <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
          status:{" "}
          <span className="bg-white flex items-center dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
            {data?.order_status?.status_content?.at(0)?.order_status || ""}
          </span>
        </p>
        <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
          discount:{" "}
          <span className="bg-white flex items-center dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
            {data?.discount || 0}
          </span>
        </p>
        <p className="border-b dark:border-[#121212] px-2 py-2 border-l-4 capitalize justify-between pl-4 border-gray-400 flex">
          coupon:{" "}
          <span className="bg-white flex items-center dark:bg-[#111] dark:text-white dark:border-[#111] text-gray-500 px-2 py-1 rounded-md border border-gray-500 text-xs">
            {data?.coupon || "No"}
          </span>
        </p>
      </div>
      <p className="text-gray-500 mb-2 mt-4 font-medium ">
        Number of variants: <span>{data?.order_content?.length}</span>
      </p>
      <div className="overflow-auto">
        <Table containerClassName="!rounded-none">
          <TableHead>
            <TableHeadCol>#</TableHeadCol>
            <TableHeadCol>product</TableHeadCol>
            <TableHeadCol>Variant sku</TableHeadCol>
            <TableHeadCol>quantity</TableHeadCol>
            <TableHeadCol>price</TableHeadCol>
            <TableHeadCol>barcode</TableHeadCol>
          </TableHead>
          <TableBody>
            {data?.order_content?.map((product, index) => {
              let currentProduct = product?.product_variant?.product;
              return (
                <TableRow key={product?.weight}>
                  <TableCol classes="border">{index + 1}</TableCol>
                  <TableCol classes="border min-w-[140px]">
                    <div className="flex gap-2">
                      <p className="whitespace-nowrap">
                        {currentProduct?.product_content?.at(0)?.name}
                      </p>
                    </div>
                  </TableCol>
                  <TableCol classes="border min-w-[120px] whitespace-nowrap">
                    {product?.product_variant?.sku}
                  </TableCol>
                  <TableCol classes="border min-w-[90px]">
                    {product?.quantity}
                  </TableCol>
                  <TableCol classes="border min-w-[90px]">
                    {currentProduct?.price}
                  </TableCol>
                  <TableCol classes="border min-w-[90px]">
                    {currentProduct.barcode}
                  </TableCol>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
