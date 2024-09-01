import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import CurrencyDropdown from "../../Components/Supplier/CurrencyDropdown";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
// border color #cacbce
const SupplierProducts = () => {
  // states
  const originalDataRef = useRef([]);
  const [data, setData] = useState([]);
  console.log("data", data);
  const [error, setError] = useState();
  console.log("error", error);
  const [showVariant, setShowVariant] = useState([]);
  // console.log("showVariant", showVariant);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currencyData, setCurrencyData] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [updateProductsIdArr, setUpdateProductsIdArr] = useState(null);
  // console.log("updateProductsIdArr", updateProductsIdArr);
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Retrieve the stored value from localStorage when the page loads for the first time
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return savedCurrency ? JSON.parse(savedCurrency) : null;
  });


  useEffect(() => {
    // Clear localStorage when the component mounts
    localStorage.removeItem("mainChecked");
    localStorage.removeItem("checkedStates");
     localStorage.removeItem("updateProductsIdArr");
  }, []); 

  useEffect(() => {
    // Check if there is a value in localStorage
    const storedCurrency = localStorage.getItem("selectedCurrency");

    if (!storedCurrency && currencyData?.data) {
      // If no value is stored, set the default currency
      const defaultCurrency = currencyData.data.find(
        (currency) => currency.name === "United States Dollar"
      );
      setSelectedCurrency(defaultCurrency || null);
    } else if (selectedCurrency !== null) {
      // If selectedCurrency is set, store it in localStorage
      localStorage.setItem(
        "selectedCurrency",
        JSON.stringify(selectedCurrency)
      );
    }
  }, [currencyData, selectedCurrency]);

  const getSuppliersProduct = useCallback(async () => {
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

  console.log("filterCategory", filterCategory);

  const getCurrencyData = async () =>
    await supabase.from("currency").select("*");

  const getFormatPrice = useMemo(() => {
    return (price, currency) => {
      let calculatePrice = (price * currency?.rate).toFixed(2);
      if (!calculatePrice || isNaN(calculatePrice)) calculatePrice = price;
      return [calculatePrice, currency?.short_code];
    };
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
      const currency = await getCurrencyData();
      originalDataRef.current = suppliersProduct;
      setCurrencyData(currency);
      setData(suppliersProduct);
    };

    fetchData();
  }, []);

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
        <SupplierPrice
          product={props.row.original}
          showVariant={showVariant}
          selectedCurrency={selectedCurrency}
          getFormatPrice={getFormatPrice}
        />
      ),
    },
    {
      accessorKey: "kadinle price",
      header: "kadinle price",
      cell: (props) => (
        <KadinlePrice
          product={props.row.original}
          showVariant={showVariant}
          selectedCurrency={selectedCurrency}
          getFormatPrice={getFormatPrice}
          currencyData={currencyData?.data}
        />
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

  return (
    <BlockPaper title="Products Supplier">
      <div className="flex justify-between items-center">
        {/* <div className="flex">
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
        </div> */}
        <div className="z-50 flex-1 max-w-[50%]">
          <CategoryMultiFilter
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>
        <div className="mb-1">
          {currencyData?.data?.length > 0 && selectedCurrency && (
            <CurrencyDropdown
              data={currencyData?.data}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
          )}
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
                            index === 0
                              ? "sticky left-0 bg-gray-200 z-10 !min-w-[250px]"
                              : ""
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
