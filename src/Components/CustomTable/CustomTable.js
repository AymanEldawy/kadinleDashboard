import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { getTableData } from "../../Api/globalActions";
import { useFetch } from "../../hooks/useFetch";
import { DisplayShippingPrices } from "../DisplayShippingPrices/DisplayShippingPrices";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { LanguageContext } from "../../Context/LangContext";
import { fetchWord } from "../lang/fetchWord";
// import { ChevronIcon, SortIcon } from "../Icons";
import { DisplayOrder } from "../DisplayOrder/DisplayOrder";
import { TablePagination } from "./TablePagination";
import { SortIcon } from "../../Helpers/Icons";
import { ResizeBar } from "./TableResizeBar";
import { flexRender } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

let columnBeingDragged;

const CustomTable = ({
  columns,
  data,
  loading,
  tableName,
  openDrawerMore,
  setOpenDrawerMore,
  table,
  containerClassName,
  tableClassName,
  tableHeadClassName,
  thClassName,
  tableBodyClassName,
  tdClassName,
}) => {
  console.log("🚀 ~ data:", data)
  const { t } = useTranslation();
  const location = useLocation();
  const { getData } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const { lang } = useContext(LanguageContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [CACHED_TABLE, setCACHED_TABLE] = useState({});
  const [CACHE_REASONS, setCACHE_REASONS] = useState({});
  const [moreData, setMoreData] = useState({});

  useEffect(() => {
    setCurrentItems(data);
  }, [data]);

  // useEffect(() => {
  //   if (columns?.includes("parent_id")) checkRefTable();
  // }, [columns?.length]);

  // useEffect(() => {
  //   if (columns?.includes("user") && location?.pathname === "/user")
  //     getAndCacheUserData();
  // }, [location?.pathname, columns?.length, tableName]);

  // useEffect(() => {
  //   if (!defaultLanguage?.id) return;
  //   if (tableName === "order_return_request") {
  //     getReasons();
  //   }
  // }, [defaultLanguage?.id, tableName]);

  // async function getReasons() {
  //   const response = await getTableData("return_reason_content", {
  //     languageId: defaultLanguage?.id,
  //   });
  //   let hash = {};
  //   for (const item of response?.data) {
  //     hash[item?.return_reason_id] = item?.reason;
  //   }
  //   setCACHE_REASONS(hash);
  // }
  // async function getAndCacheUserData() {
  //   const response = await getData("user");
  //   let hash = {};
  //   for (const user of response) {
  //     hash[user?.id] = user;
  //   }
  //   setCACHED_TABLE((prev) => {
  //     return {
  //       ...prev,
  //       ...hash,
  //     };
  //   });
  // }
  // async function checkRefTable() {
  //   if (!data?.length) return;
  //   const response = await getTableData(`${tableName}_content`, {
  //     languageId: defaultLanguage?.id,
  //   });
  //   let hash = {};
  //   for (const item of response?.data) {
  //     hash[item?.[`${tableName}_id`]] = item.name || item?.title;
  //   }
  //   setCACHED_TABLE((prev) => {
  //     return {
  //       ...prev,
  //       ...hash,
  //     };
  //   });
  // }

  const onDragStart = (e) => {
    columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newPosition = Number(e.currentTarget.dataset.columnIndex);
    const currentCols = table.getVisibleLeafColumns().map((c) => c.id);
    const colToBeMoved = currentCols.splice(columnBeingDragged, 1);

    currentCols.splice(newPosition, 0, colToBeMoved[0]);
    table.setColumnOrder(currentCols);
  };

  useEffect(() => {
    if (openDrawerMore) {
      let moreData = data?.find((item) => item?.id === openDrawerMore);
      setMoreData(moreData);
    } else setMoreData({});
  }, [openDrawerMore, data]);

  return (
    <div className="">
      <div className={`relative overflow-x-auto w-full  ${containerClassName}`}>
        <table
          className={`w-[${table.getTotalSize()}] w-full ${tableClassName}`}
          // style={{ width: table.getTotalSize() }}
        >
          <thead className={`${tableHeadClassName} bg-gray-100  text-sm`}>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      draggable={
                        !table.getState().columnSizingInfo.isResizingColumn
                      }
                      data-column-index={header.index}
                      onDragStart={onDragStart}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={onDrop}
                      style={{ width: header.getSize() }}
                      className={`w-[${header.getSize()}] text-gray-700 whitespace-nowrap  font-medium capitalize relative  group border-b border-gray-200  px-4 py-2 cursor-move ${thClassName}
                      ${
                        header.column.getIsSorted()
                          ? "sorting-hover [&_span]:visible bg-gray-300 "
                          : ""
                      }
                      `}
                      onClick={() => {
                        // if (header.column.getCanSort())
                        header.column.getToggleSortingHandler();
                        // header.column.getToggleSortingHandler();
                      }}
                    >
                      {/* {header.column.columnDef.header} */}
                      <div className="flex relative items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <span className="text-xs ltr:ml-4 rtl:mr-4 inline-block invisible group-hover:visible cursor-pointer">
                            <SortIcon />
                          </span>
                        )}
                      </div>
                      <ResizeBar header={header} />
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody className={`${tableBodyClassName}`}>
            {loading ? (
              <></>
            ) : (
              // <TableSkeleton columns={columns} />
              <>
                {table.getRowModel()?.rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={`border-b last:border-none even:bg-gray-100 border-gray-100 `}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell?.id}
                              className={`w-[${cell.column.getSize()}] px-4 py-2 ${tdClassName}`}
                              style={{ width: cell.column.getSize() }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-red-500 h-28 bg-[#f1f1f1e8] p-1 rounded-sm text-center mt-2">
                    <td
                      colSpan={columns?.length}
                      rowSpan={5}
                      className="ltr:text-left rtl:text-right relative"
                    >
                      <span className="sticky left-1/2 -translate-x-1/2">
                        {t("empty_result")}
                      </span>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination table={table} />

      {!loading && !currentItems?.length ? (
        <div className="text-red-500 text-center mt-2">
          {fetchWord("no_results", lang)}
        </div>
      ) : null}
      {openDrawerMore ? (
        <>
          <div
            onClick={() => setOpenDrawerMore(false)}
            className="bg-[#00000060] fixed top-0 left-0 w-full h-full z-[100]"
          />
          <div className="shadow p-4 w-[80%] sm:min-w-[350px] max-w-[500px] fixed overflow-auto h-screen top-0 z-[101] right-0 bg-white dark:bg-bgmaindark">
            <div className="overflow-auto ">
              {tableName === "order" ? (
                <DisplayOrder data={moreData} />
              ) : (
                <DisplayShippingPrices data={moreData} />
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CustomTable;
