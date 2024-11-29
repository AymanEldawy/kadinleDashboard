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
import { getSuppliersList } from "../../Api/data";
import Select from "react-select";
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
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import Brand from "../../Components/Supplier/Brand";
import ProductCategory from "../../Components/Supplier/ProductCategory";
import ProductSupplier from "../../Components/Supplier/ProductSupplier";
// border color #cacbce
const SupplierProducts = () => {
  const { defaultLanguage } = useGlobalOptions();
  // states
  const originalDataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(true);

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [showVariant, setShowVariant] = useState([]);
  const [checkedSku, setCheckedSku] = useState([]);
  const [dataCount, setDataCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [offset, setOffset] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currencyData, setCurrencyData] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [updateProductsIdArr, setUpdateProductsIdArr] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Retrieve the stored value from localStorage when the page loads for the first time
    const savedCurrency = localStorage.getItem("selectedCurrency");
    return savedCurrency && savedCurrency !== "undefined"
      ? JSON.parse(savedCurrency)
      : null;
  });

  const { data: suppliers } = useQuery({
    queryKey: ["list", "suppliers"],
    queryFn: async () => {
      const data = await getSuppliersList();
      return data;
    },
  });
  const numberOfPages = Math.ceil(dataCount / itemsPerPage);

  useEffect(() => {
    // Clear localStorage when the component mounts
    localStorage.removeItem("mainChecked");
    localStorage.removeItem("checkedStates");
    localStorage.removeItem("updateProductsIdArr");
    localStorage.removeItem("checkedSku");
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
      param_lang_id: defaultLanguage?.id,
      param_category_id: filterCategory,
      param_seller_file_id:
        +supplierId["seller_file_id"] || suppliers?.at(0)?.seller_file_id,
      param_offset: offset,
      param_limit: itemsPerPage,
    });
    setError(error);
    return data;
  }, [
    defaultLanguage?.id,
    filterCategory,
    itemsPerPage,
    offset,
    supplierId,
    suppliers,
  ]);

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
    const fetchData = async () => {
      setLoading(true);
      const suppliersProduct = await getSuppliersProduct();
      const currency = await getCurrencyData();
      originalDataRef.current = suppliersProduct;
      setCurrencyData(currency);
      setData(suppliersProduct?.products ? suppliersProduct?.products : []);
      setDataCount(suppliersProduct?.count);

      setLoading(false);
    };

    fetchData();
  }, [getSuppliersProduct, offset]);

  useEffect(() => {
    if (data.length > 0) {
      const initialVariants = data.map((item) => ({
        id: item?.product_sku,
        show: false,
      }));
      setShowVariant(initialVariants);
    }
  }, [data]);

  const columns = useMemo(() => [
    {
      accessorKey: "product",
      header: "product",
      cell: (props) => (
        <ProductDetails
          product={props.row.original}
          showVariant={showVariant}
          setShowVariant={setShowVariant}
          setClicked={setClicked}
          checkedSku={checkedSku}
          setCheckedSku={setCheckedSku}
        />
      ),
    },
    {
      accessorKey: "category",
      header: "category",
      cell: (props) => <ProductCategory product={props.row.original} />,
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
      cell: (props) => <Brand product={props.row.original} />,
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
      cell: (props) => <ProductSupplier product={props.row.original} />,
    },
  ]);

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

  // Items per page
  useEffect(() => {
    table.setPageSize(itemsPerPage || 50);
  }, [itemsPerPage]);

  // pageIndex in localStorage
  useEffect(() => {
    const pageIndex = table.getState().pagination.pageIndex;
    localStorage.setItem("pageIndex", pageIndex);
  }, [table.getState().pagination.pageIndex]);


  const initialPageIndex = Number(localStorage.getItem("pageIndex")) || 0;
  return (
    <BlockPaper title="Products Supplier">
      <div className="flex gap-4 items-center flex-wrap">
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
        <div className="flex items-center gap-2">
          <span className="font-medium">Supplier id</span>
          <Select
            menuPlacement="auto"
            menuPortalTarget={document?.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            placeholder="Select supplier"
            className=""
            value={suppliers?.find(
              (c) => c?.seller_file_id === suppliers?.at(0)?.seller_file_id
            )}
            options={suppliers}
            getOptionLabel={({ seller_file_id }) => seller_file_id}
            getOptionValue={({ seller_file_id }) => seller_file_id}
            onChange={(value) => {
              setSupplierId(value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Currency</span>
          {currencyData?.data?.length > 0 && (
            <CurrencyDropdown
              data={currencyData?.data}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
          )}
        </div>
        <div className="z-50 flex-1 max-w-fit">
          <CategoryMultiFilter
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="p-[6px] rounded border border-gray-300 bg-white text-gray-800"
          >
            <option value={50}> Items per page: 50</option>
            <option value={100}> Items per page: 100</option>
            <option value={150}> Items per page: 150</option>
            <option value={200}> Items per page: 200</option>
          </select>
        </div>

        <div className="m-4 max-sm:hidden ml-auto">
          <Pagination
            // numberOfPages={numberOfPages}
            pageIndex={initialPageIndex}
            // pageCount={table.getPageCount()}
            setOffset={setOffset}
            pageCount={numberOfPages}
            goToPage={(page) => {
              table.setPageIndex(page);
            }}
          />
        </div>
      </div>

      {!loading ? (
        data?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <div className="max-w-xl">
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

            <div className="max-sm:hidden ml-auto w-full mt-4 flex justify-end">
              <Pagination
                // numberOfPages={numberOfPages}
                pageIndex={initialPageIndex}
                // pageCount={table.getPageCount()}
                setOffset={setOffset}
                pageCount={numberOfPages}
                goToPage={(page) => {
                  table.setPageIndex(page);
                }}
              />
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

export default SupplierProducts;
