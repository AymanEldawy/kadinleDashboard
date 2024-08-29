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
import ColorsDetails from "../../Components/Supplier/ColorsDetails";
import SizesDetails from "../../Components/Supplier/SizesDetails";
import StockDetails from "../../Components/Supplier/StockDetails";
import Percentage from "../../Components/Supplier/Percentage";
import SupplierPrice from "../../Components/Supplier/SupplierPrice";

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
  const [error, setError] = useState();
  console.log("error", error);
  const [showVariant, setShowVariant] = useState([]);
  // console.log("showVariant", showVariant);
  const [columnFilters, setColumnFilters] = useState([
    // {
    //   id: "one",
    //   value:"Add"
    // }
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const getSuppliersProduct = useCallback(async () => {
    // const products = await supabase.from("product").select(
    //   `*,
    //   product_content(*),
    //   product_image(*),
    //   product_variant(*)`
    // );
    let { data, error } = await supabase.rpc("get_products_with_variants", {
      param_lang_id: "c1a063e3-8f21-4526-8302-453b705ed27d",
      param_category_id: null,
      param_seller_file_id: 74,
      param_offset: 0,
      param_limit: 2,
    });
    setError(error);
    return data;
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // console.log("data from variant", data);
      const initialVariants = data.map((item) => ({
        id: item?.product_sku,
        show: false,
      }));
      setShowVariant(initialVariants);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const suppliersProduct = await getSuppliersProduct();
      // console.log("suppliersProduct", suppliersProduct);
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
      cell: (props) => <div className="text-center">{props.getValue()}</div>,
    },
    {
      accessorKey: "color",
      header: "color",
      cell: (props) => (
        <ColorsDetails product={props.row.original} showVariant={showVariant} />
      ),
    },
    {
      accessorKey: "size",
      header: "size",
      cell: (props) => (
        <SizesDetails product={props.row.original} showVariant={showVariant} />
      ),
    },
    {
      accessorKey: "stock",
      header: "stock",
      cell: (props) => (
        <StockDetails product={props.row.original} showVariant={showVariant} />
      ),
    },
    {
      accessorKey: "variant",
      header: "variant",
      cell: (props) => <Variant product={props.row.original} />,
    },
    {
      accessorKey: "brand",
      header: "brand",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "supplier price",
      header: "supplier price",
      cell: (props) => (
        <SupplierPrice product={props.row.original} showVariant={showVariant} />
      ),
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
      cell: (props) => (
        <Percentage product={props.row.original} showVariant={showVariant} />
      ),
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
      {data?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="table-auto border border-gray-300 rounded-md">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-gray-200 text-gray-700 font-medium text-xs leading-4 tracking-wider group"
                    >
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={header.id}
                          className={`px-4 py-4 text-center relative border border-gray-300 ${
                            index === 0 ? "sticky left-0 bg-gray-200 z-10" : ""
                          }`}
                          style={{
                            minWidth: header.getSize() + 1,
                            width: header.getSize(),
                          
                            // borderRight:
                            //   index === 0 ? "1px solid gray" : "1px solid black",
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
                            // borderRight:
                            //   index === 0 ? "1px solid gray" : "none",
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
