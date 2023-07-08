import React, { memo } from "react";
import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { getTableContentName } from "../../Helpers/functions";
import { ChevronIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import { FullImage } from "../Global/FullImage/FullImage";
import { LanguageContext } from "./../../Context/LangContext";
import { fetchWord } from "./../lang/fetchWord";
// import { ChevronIcon, SortIcon } from "../Icons";
import Table from "./Table";
import TableBody from "./TableBody";
import TableCol from "./TableCol";
import TableHead from "./TableHead";
import TableHeadCol from "./TableHeadCol";
import TableRow from "./TableRow";

let sorting = {};
let CACHED_TABLE = {};

const SuperTable = ({
  columns,
  data,
  allowSelect,
  searchValue,
  itemsPerPage,
  selectedList,
  setSelectedList,
  classes: classesProps,
  allowActions,
  actionKey,
  actionsContent,
  primaryStyles,
  loading,
  tableName,
}) => {
  const { getData } = useFetch();
  const { lang } = useContext(LanguageContext);
  const [filterList, setFilterList] = useState(data);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [refresh, setRefresh] = useState(false);
  let defaultPrimaryStyle = primaryStyles
    ? {
        table: "!border-none !rounded-none",
        headRow: "border-b !border-primary",
        colHead: "border-b !border-primary !py-4",
        colBody:
          "ltr:first:border-l-0  rtl:first:border-r-0 ltr:last:border-r-0 rtl:last:border-l-0",
      }
    : {};
  let classes = {
    colHead: "!py-3",
    ...classesProps,
    ...defaultPrimaryStyle,
    containerClassName: "!rounded-none",
  };
  useEffect(() => {
    setFilterList(data);
  }, [data]);

  useEffect(() => {
    // Needed more work
    const endOffset = itemOffset + parseInt(itemsPerPage);
    setCurrentItems(filterList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterList?.length / parseInt(itemsPerPage)));
  }, [filterList, itemsPerPage, itemOffset]);
  useEffect(() => {}, [refresh]);
  useEffect(() => {
    if (searchValue) {
      let newList = [];
      for (const col of columns) {
        for (const item of data) {
          if (typeof item[col] == "string") {
            if (
              item[col]?.toLowerCase()?.startsWith(searchValue?.toLowerCase())
            )
              newList.push(item);
          } else {
            if (
              item[col]
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(searchValue?.toLowerCase())
            )
              newList.push(item);
          }
        }
      }
      // setItemOffset(1);
      setCurrentItems(newList?.slice(0, itemsPerPage));
    } else {
      // setItemOffset(1);
      setFilterList(data);
      setCurrentItems(data?.slice(0, itemsPerPage));
    }
  }, [searchValue, data]);

  useEffect(() => {
    CACHED_TABLE = {};
    checkRefTable(columns);
  }, [columns?.length]);

  async function checkRefTable(fields) {
    if (!fields?.length) return;
    for (const col of columns) {
      if (col === "parent_id" || col === "country" || col?.includes("_id")) {
        let table =
          col === "parent_id"
            ? tableName
            : col === "country"
            ? col
            : col?.replace("_id", "");

        // pass table name and return where is the content name and the name id for content name
        // example referenceTableName = [table || table_content]
        // referenceId referenceId = [id || table_id]
        const { referenceTableName, referenceId } = getTableContentName(table);
        const data = await getData(referenceTableName);

        let hashList = {};
        for (const item of data) {
          hashList[item?.[referenceId]] = item?.name || item?.title;
        }
        CACHED_TABLE[col] = hashList;
      }
    }
  }

  const getCachedList = (tableName, value) => {
    console.log(tableName, value, CACHED_TABLE);
    return CACHED_TABLE?.[tableName]?.[value];
  };
  const handelSelect = useCallback(
    (itemId) => {
      if (selectedList[itemId]) {
        let newSelectedList = selectedList;
        delete newSelectedList[itemId];
        setSelectedList((prev) => {
          return {
            ...prev,
            ...newSelectedList,
          };
        });
      } else {
        setSelectedList((prev) => {
          return {
            ...prev,
            [itemId]: itemId,
          };
        });
      }
    },
    [selectedList]
  );
  const handleSelectedAll = useCallback(
    (e) => {
      if (!e?.target?.checked) {
        setSelectedList({});
      } else {
        let newList = {};
        for (const key in data) {
          newList[data?.[key]?.id] = data?.[key]?.id;
        }
        setSelectedList(newList);
      }
    },
    [selectedList]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterList?.length;
    setItemOffset(newOffset);
  };
  const sortBy = async (col) => {
    const list = [...currentItems];
    const newSortOrder = sorting[col] === "asc" ? "desc" : "asc";
    let newList = list.sort((a, b) => {
      const valueA = a[col];
      const valueB = b[col];
      if (typeof valueA === "string") {
        return newSortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
    setCurrentItems(newList);
    setRefresh((prev) => !prev);
    sorting[col] = newSortOrder;
  };
  return (
    <>
      <Table
        containerClassName={classes?.containerClassName}
        tableClassName={classes?.table}
      >
        <TableHead classes={classes?.head}>
          <TableRow classes={classes?.headRow}>
            {allowSelect ? (
              <TableHeadCol
                contentClassName={` ${classes?.colHeadContentClassName} flex justify-center `}
                classes={`${classes?.colHead}  !w-[50px]`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 "
                  onChange={handleSelectedAll}
                />
              </TableHeadCol>
            ) : null}
            {columns?.map((col, index) => {
              if (col === "id") return null;
              else
                return (
                  <TableHeadCol
                    contentClassName={classes?.colHeadContentClassName}
                    classes={classes?.colHead}
                    key={`${col}-${index}`}
                    sort
                    sortBy={sortBy}
                  >
                    {/* {fetchWord(col, lang)} */}
                    {col}
                  </TableHeadCol>
                );
            })}
            {allowActions ? (
              <TableHeadCol
                contentClassName={classes?.colHeadContentClassName}
                classes={classes?.colHead}
              >
                {fetchWord(actionKey, lang)}
              </TableHeadCol>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody classes={classes?.body}>
          {loading ? (
            <tr className="h-16">
              <td colSpan={columns.length + 1}>
                <p className="flex items-center justify-center text-blue-500">
                  Loading...
                </p>
              </td>
            </tr>
          ) : (
            <>
              {currentItems?.map((row, index) => {
                return (
                  <TableRow
                    key={`${row?.Name}-${index}`}
                    classes={`border-b dark:border-borderdark ${
                      !!selectedList?.[row?.id]
                        ? "bg-gray-100 dark:bg-[#1115]"
                        : ""
                    } ${classes?.row}`}
                  >
                    {allowSelect ? (
                      <TableCol classes={`!py-4 border ${classes?.colBody}`}>
                        <input
                          className="w-4 h-4 mx-auto block"
                          type="checkbox"
                          checked={!!selectedList?.[row?.id]}
                          onChange={() => handelSelect(row?.id)}
                        />
                      </TableCol>
                    ) : null}
                    {columns?.map((col, index) => {
                      if (col === "id") return null;
                      if (
                        col?.indexOf("img") !== -1 ||
                        col?.indexOf("image") !== -1 ||
                        col?.toLowerCase() === "hex"
                      )
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                          >
                            {col?.indexOf("image") !== -1 ||
                            col?.indexOf("img") !== -1 ? (
                              <FullImage
                                src={row?.[col]}
                                alt="image description"
                                height={50}
                                width={70}
                                className="block mx-auto cursor-pointer"
                              />
                            ) : (
                              <span
                                className="block min-h-[30px] w-full h-full border border-gray-200"
                                style={{ background: row?.[col] }}
                              ></span>
                            )}
                          </TableCol>
                        );
                      else if (
                        col === "parent_id" ||
                        col === "country" ||
                        col?.includes("_id")
                      ) {
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            <Link
                              className="text-blue-600"
                              to={`/update/${col?.replace("_id", "")}/${
                                row?.[col]
                              }`}
                            >
                              {getCachedList(col, row?.[col]) || row?.[col]}
                            </Link>
                          </TableCol>
                        );
                      } else if (typeof row?.[col] === "boolean")
                        return <TableCol>{row?.[col] ? "Yes" : "No"}</TableCol>;
                      else if (col?.toLowerCase() === "created_at")
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            {new Date(row?.[col])?.toLocaleDateString("en-UK")}
                          </TableCol>
                        );
                      else
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            {row?.[col]}
                          </TableCol>
                        );
                    })}
                    {allowActions ? (
                      <TableCol classes={`!py-4 border ${classes?.colBody}`}>
                        {actionsContent(row)}
                      </TableCol>
                    ) : null}
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
      {currentItems?.length && !loading ? (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <span className="flex  scale-75 ltr:rotate-180 rtl:-rotate-180">
                <ChevronIcon />
              </span>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <span className="flex scale-75 rtl:rotate-180">
                <ChevronIcon />
              </span>
            }
            renderOnZeroPageCount={null}
            className="pagination flex gap-6 items-center shadow p-3 bg-white"
            activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
            previousClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
            nextClassName="ltr:rotate-90 rtl:-rotate-90 rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
            disabledClassName="text-gray-200 dark:text-gray-600"
          />
        </>
      ) : null}
      {!loading && !currentItems?.length ? (
        <div className="text-red-500 text-center mt-2">
          {fetchWord("no_results", lang)}
        </div>
      ) : null}
    </>
  );
};

export default SuperTable;
