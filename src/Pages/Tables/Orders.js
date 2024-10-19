import React, { useEffect } from "react";
import { useState } from "react";
import { getOrderData, getRecentOrders } from "../../Api/statictes";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import WarehouseFrom from "../../Components/Orders/WarehouseFrom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import Loading from "../../Components/Loading/Loading";
import Pagination from "../../Components/Supplier/Pagination";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import OrderUser from "../../Components/Orders/OrderUser";
import { useLocation, useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { defaultLanguage } = useGlobalOptions();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showVariant, setShowVariant] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [checkedId, setCheckedId] = useState([]);

  const languageID = JSON.parse(
    localStorage.getItem("KADINLE_DEFAULT_LANGUAGE")
  )?.id;

  // const initialPageIndex = Number(localStorage.getItem("pageIndex")) || 0;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const getOrders = async () => {
    setLoading(true);
    // const response = await getRecentOrders();
    const response = await getOrderData(languageID);
    setData(response?.data?.orders);
    setLoading(false);
  };

  useEffect(() => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const initialVariants = data.map((item) => ({
        id: item?.order?.order_id,
        show: false,
      }));
      setShowVariant(initialVariants);
    }
  }, [data]);

  const columns = [
    {
      accessorKey: "warehouse_from",
      header: "warehouse from",
      cell: (props) => (
        <WarehouseFrom
          order={props.row.original}
          showVariant={showVariant}
          setShowVariant={setShowVariant}
          setClicked={setClicked}
          checkedId={checkedId}
          setCheckedId={setCheckedId}
        />
      ),
    },
    {
      accessorKey: "order.createdAt",
      header: "created at",
      cell: (props) => (
        <p className="min-w-[320px] text-center">
          <span className="">
            {new Date(props.getValue()).toLocaleDateString("en-US", options)}
          </span>
        </p>
      ),
    },
    {
      accessorKey: "order.order_number",
      header: "order number",
      cell: (props) => (
        <p className="text-center">
          <span className="">{props.getValue()}</span>
        </p>
      ),
    },
    {
      accessorKey: "order.status",
      header: "order status",
      cell: (props) => (
        <p className="text-center min-w-[200px]">
          <span className="">{props.getValue()}</span>
        </p>
      ),
    },
    {
      accessorKey: "order.price",
      header: "price",
      cell: (props) => (
        <p className="text-center">
          <span className="">{props.getValue()}</span>
        </p>
      ),
    },
    {
      accessorKey: "order.shipping_date",
      header: "shipping date",
      cell: (props) => (
        <p className="text-center">
          <span className="">{props.getValue()}</span>
        </p>
      ),
    },
    {
      accessorKey: "user",
      header: "user",
      cell: (props) => <OrderUser order={props.row.original} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });
  return (
    <BlockPaper title="Orders">
      {!loading ? (
        data?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <table className="table-auto border border-gray-300 rounded-md">
                  <thead className="sticky top-0">
                    {table?.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup?.id}
                        className="bg-gray-200 capitalize text-gray-700 font-medium text-base leading-4 tracking-wider group"
                      >
                        {headerGroup?.headers?.map((header, index) => (
                          <th
                            key={header?.id}
                            className={`px-4 py-4 text-center relative border border-gray-300 ${
                              index === 0
                                ? "sticky left-0 bg-gray-200 z-10 !min-w-[250px]"
                                : ""
                            }`}
                            style={{
                              minWidth: header.getSize() + 1,
                              width: header.getSize(),
                            }}
                          >
                            {header.column.columnDef.header}
                            <div className="absolute -left-1 top-4">
                              {
                                {
                                  asc: "🔼",
                                  desc: "🔽",
                                }[header.column.getIsSorted()]
                              }
                            </div>
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className="absolute flex items-center right-0 top-0 bottom-0 h-full cursor-col-resize px-1.5 select-none invisible group-hover:visible"
                            >
                              &#x2502;
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  {table.getRowModel().rows.length > 0 ? null : (
                    <div className="w-full h-[50px] flex justify-center items-center">
                      <Loading />
                    </div>
                  )}
                  <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                      <tr
                        key={row.id}
                        className="odd:bg-white even:bg-[#e9edf1] border-t border-gray-300"
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <td
                            key={cell.id}
                            className={`py-2 text-start border-r border-gray-300 ${
                              index === 0
                                ? `sticky left-0 z-10 ${
                                    rowIndex % 2 === 0
                                      ? "bg-white"
                                      : "bg-[#e9edf1]"
                                  }`
                                : ""
                            }`}
                            style={{
                              minWidth: cell.column.getSize(),
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center pt-9 h-[150px]">
            There is no products
          </div>
        )
      ) : (
        <Loading />
      )}
    </BlockPaper>
  );
};

export default Orders;
