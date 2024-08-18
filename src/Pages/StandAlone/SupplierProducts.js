import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import EditableField from "../../Components/Supplier/EditableField";
import Filters from "../../Components/Supplier/Filters";
import FilterPopover from "../../Components/Supplier/FilterPopover";
import { supabase } from "../../Helpers/SupabaseConfig/SupabaseConfig";
import ProductDetails from "../../Components/Supplier/ProductDetails";
import Pagination from "../../Components/Supplier/Pagination";
import Loading from "../../Components/Loading/Loading";
import Variant from "../../Components/Supplier/Variant";
import KadinlePrice from "../../Components/Supplier/KadinlePrice";

const SupplierProducts = () => {
  // const DATA = [
  //   {
  //     one: "Product 1",
  //     two: "Supplier 1",
  //     three: "2022-01-01",
  //     percentage: "100",
  //     price: "10",
  //     six: "5",
  //   },
  //   {
  //     one: "Product 2",
  //     two: "Supplier 2",
  //     three: "2022-02-01",
  //     percentage: "150",
  //     price: "20",
  //     six: "10",
  //   },
  //   {
  //     one: "Product 3",
  //     two: "Supplier 3",
  //     three: "2022-03-01",
  //     percentage: "200",
  //     price: "25",
  //     six: "15",
  //   },
  //   {
  //     one: "Product 4",
  //     two: "Supplier 4",
  //     three: "2022-04-01",
  //     percentage: "120",
  //     price: "20",
  //     six: "10",
  //   },
  //   {
  //     one: "Product 5",
  //     two: "Supplier 5",
  //     three: "2022-05-01",
  //     percentage: "170",
  //     price: "25",
  //     six: "15",
  //   },
  // ];

  // states
  const originalDataRef = useRef([]);
  const [data, setData] = useState([]);
  // console.log("data", data);
  const [showVariant, setShowVariant] = useState([]);
  // console.log("showVariant", showVariant);
  const [columnFilters, setColumnFilters] = useState([
    // {
    //   id: "one",
    //   value:"Add"
    // }
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const getSuppliersProduct = useCallback(async (userId) => {
    const products = await supabase.from("product").select(
      `*,
      product_content(*),
      product_image(*),
      product_variant(*)`
    );
    return products;
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const initialVariants = data.map((item) => ({
        id: item.id,
        show: false,
      }));
      setShowVariant(initialVariants);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const suppliersProduct = (await getSuppliersProduct(11002)).data;
      originalDataRef.current = suppliersProduct;
      setData(suppliersProduct);
    };

    fetchData();
  }, [getSuppliersProduct]);
  const STATUSES = [
    "product",
    "category",
    "color",
    "size",
    "stock",
    "variant",
    "brand",
    "supplier price",
    "kadinle price",
    "percentage",
    "supplier",
  ];
  const columns = [
    {
      accessorKey: "product",
      header: "product",
      cell: (props) => (
        <ProductDetails
          product={props.row.original}
          showVariant={showVariant}
          setShowVariant={setShowVariant}
        />
      ),
    },
    {
      accessorKey: "category",
      header: "category",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "color",
      header: "color",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "size",
      header: "size",
      // cell: (props) => <EditableField initial={props.getValue()} />,
    },
    {
      accessorKey: "stock",
      header: "stock",
      // cell: (props) => <EditableField initial={props.getValue()} />,
    },
    {
      accessorKey: "variant",
      header: "variant",
      cell: (props) => (
        <Variant product={props.row.original} showVariant={showVariant} />
      ),
    },
    {
      accessorKey: "brand",
      header: "brand",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "supplier price",
      header: "supplier price",
      // cell: (props) => <EditableField initial={props.getValue()} />,
    },
    {
      accessorKey: "kadinle price",
      header: "kadinle price",
      cell: (props) => (
        <KadinlePrice product={props.row.original} showVariant={showVariant} />
      ),
    },
    {
      accessorKey: "percentage",
      header: "percentage",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "supplier",
      header: "supplier",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });
  // console.log("table", table.getHeaderGroups());
  // console.log("columnFilters", columnFilters);
  return (
    <BlockPaper title="Products Supplier">
      <div className="flex justify-between items-center">
        <div className="flex">
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            selectedStatus={selectedStatus}
            data={data}
            setData={setData}
            originalDataRef={originalDataRef}
          />
          <FilterPopover
            STATUSES={STATUSES}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
        <div className="m-4 max-sm:hidden">
          <Pagination
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            goToPage={(page) => {
              table.setPageIndex(page);
            }}
          />
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 rounded-md">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-gray-200 text-gray-700 font-medium text-xs leading-4 tracking-wider group"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-4 py-4 text-center relative`}
                        style={{ width: header.getSize() }}
                      >
                        {header.column.columnDef.header}
                        {/* {header.column.getCanSort() && (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="rotate-90 mx-3 hidden group-hover:inline-block absolute right-2 lg:right-8"
                        >
                          ⇆
                        </button>
                      )} */}
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
                          className={`absolute flex items-center right-0 top-0 bottom-0 h-full cursor-col-resize px-1.5 select-none invisible group-hover:visible`}
                        >
                          &#x2502;
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="odd:bg-white even:bg-[#e9edf1]">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="pl-6 pr-4 py-2 text-start">
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
          <div className="m-4">
            <Pagination
              pageIndex={table.getState().pagination.pageIndex}
              pageCount={table.getPageCount()}
              goToPage={(page) => {
                table.setPageIndex(page);
              }}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </BlockPaper>
  );
};

export default SupplierProducts;
