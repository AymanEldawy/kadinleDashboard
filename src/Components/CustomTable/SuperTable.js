import React, { memo } from "react";
import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom";

import { uuidLanguageEn, uuidRegionEn } from "../../Api/data";
import { ChevronIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import { FullImage } from "../Global/FullImage/FullImage";
import { UserInfo } from "../Global/UserInfo/UserInfo";
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
  const location = useLocation();
  const { getData } = useFetch();
  const { lang } = useContext(LanguageContext);
  const [filterList, setFilterList] = useState(data);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [CACHED_TABLE, setCACHED_TABLE] = useState({});
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
          let stringItem = JSON.stringify(item);
          if (
            stringItem
              ?.toLocaleLowerCase()
              ?.indexOf(searchValue?.toLowerCase()) !== -1
          )
            newList.push(item);
          console.log(JSON.stringify(item));
          // if(item[col] === 'object')
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
    if (columns?.includes("parent_id")) checkRefTable(columns);
  }, [columns?.length]);
  useEffect(() => {
    if (columns?.includes("user") && location?.pathname === "/user")
      getAndCacheUserData();
  }, [location?.pathname, columns?.length, tableName]);

  async function getAndCacheUserData() {
    const response = await getData("user");
    let hash = {};
    for (const user of response) {
      hash[user?.id] = user;
    }
    console.log(hash);
    setCACHED_TABLE((prev) => {
      return {
        ...prev,
        ...hash,
      };
    });
  }
  async function checkRefTable(fields) {
    if (!data?.length) return;
    let hash = {};
    for (const item of data) {
      let content = `${tableName}_content`;
      hash[item?.id] = content
        ? item?.[content]?.[0]?.name || item?.[content]?.[0]?.title
        : item?.name || item?.title;
    }
    setCACHED_TABLE((prev) => {
      return {
        ...prev,
        ...hash,
      };
    });
  }

  const handelSelect = (itemId) => {
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
  };
  //   [selectedList]
  // );
  const handleSelectedAll = useCallback(
    (e) => {
      if (!e?.target?.checked) {
        setSelectedList({});
      } else {
        let newList = {};
        let count = 0;
        for (const key in data) {
          let uniqueKey = data?.[key]?.id ? data?.[key]?.id : data?.[key].email;
          if (count >= itemsPerPage) break;
          newList[uniqueKey] = uniqueKey;
          count++;
        }
        setSelectedList(newList);
      }
    },
    [selectedList, itemsPerPage, data]
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
  useEffect(() => {}, [CACHED_TABLE]);

  console.log(CACHED_TABLE, "cache");
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
                    {col}
                  </TableHeadCol>
                );
            })}
            {allowActions ? (
              <TableHeadCol
                contentClassName={`${classes?.colHeadContentClassName}`}
                classes={`${classes?.colHead} w-[90px]`}
              >
                {actionKey}
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
              {currentItems?.slice(0, 25)?.map((row, index) => {
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
                          checked={
                            !!selectedList?.[row?.id ? row?.id : row?.email]
                          }
                          onChange={() => handelSelect(row?.id || row?.email)}
                        />
                      </TableCol>
                    ) : null}
                    {columns?.map((col, index) => {
                      let tableNameContent = `${tableName}_content`;
                      if (col === "id") return null;
                      else if (
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
                      else if (col === "user") {
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                          >
                            <UserInfo
                              user={CACHED_TABLE?.[row?.user_id] || row?.user}
                            />
                          </TableCol>
                        );
                      } else if (col === "parent_id") {
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
                              {CACHED_TABLE[row?.[col]] || row?.[col]}
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
                      else if (col === "number" && tableName === "chart")
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            {row?.chart?.number}
                          </TableCol>
                        );
                      let value = null;
                      if (
                        typeof row[col] === "object" &&
                        row?.[col]?.[`${col}_content`]
                      ) {
                        let content =
                          col === "size"
                            ? row?.[col][`${col}_content`]?.find(
                                (c) => c?.region_id === uuidRegionEn
                              )
                            : row?.[col][`${col}_content`]?.find(
                                (c) => c?.language_id === uuidLanguageEn
                              );
                        value = {
                          name: content?.name,
                          path: col,
                          id: content?.[`${col}_id`],
                          link: true,
                        };
                        // content
                      }
                      if (col === "variant") {
                        console.log("herr");
                        let content = {};
                        let product_content = !!row?.hasOwnProperty(
                          "product_variant"
                        )
                          ? row?.product_variant?.product?.product_content
                          : row?.order_content?.[0].product_variant?.product
                              ?.product_content;
                        content = product_content?.find(
                          (c) => c?.language_id === uuidLanguageEn
                        );
                        let variants = !!row?.hasOwnProperty("product_variant")
                          ? row?.product_variant
                          : row?.order_content?.[0].product_variant;
                        console.log(variants);
                        value = {
                          name: variants?.sku,
                          path: col,
                          id: content?.product_id,
                          link: true,
                        };
                        // content
                      }
                      if (typeof row[col] === "object" && row?.[col]?.name) {
                        value = {
                          name: row?.[col]?.name,
                          path: col,
                          id: row?.[col].id,
                        };
                      }
                      if (
                        tableName === "order" &&
                        (row?.order_status?.[col] || col === "order_status")
                      ) {
                        let content = row?.order_status?.status_content?.find(
                          (c) => c?.language_id === uuidLanguageEn
                        );
                        value = {
                          name:
                            col === "order_status"
                              ? content?.order_status
                              : row?.order_status?.[col],
                          path: "order",
                          // id: row?.[col]?.id,
                        };
                      }
                      if (
                        tableName === "comment" &&
                        row?.comment_media?.[0]?.[col]
                      ) {
                        value = {
                          name: row?.comment_media?.[0]?.[col],
                          path: "comment",
                          id: row?.[col]?.id,
                        };
                      }
                      if (row?.currency?.[col]) {
                        value = {
                          name: row?.currency?.[col],
                          path: "currency",
                          id: row?.[col]?.id,
                        };
                      }

                      if (row?.[tableNameContent]?.[0]?.hasOwnProperty(col)) {
                        let content = row?.[tableNameContent]?.find(
                          (c) => c?.language_id === uuidLanguageEn
                        );
                        if (typeof content?.[col] !== "object") {
                          let quantity =
                            col === "quantity"
                              ? row?.[tableNameContent]?.reduce(
                                  (accumulator, currentItem) => {
                                    return accumulator + currentItem.quantity;
                                  },
                                  0
                                )
                              : null;
                          value = {
                            name: quantity || content?.[col],
                            path: tableName,
                            id: content?.[`${tableName}_id`],
                            link: col === "name",
                          };
                        } else {
                          value = {
                            name: content?.[col]?.name,
                            path: col,
                            id: content?.[col]?.id,
                          };
                        }
                      }

                      if (value) {
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            {col === "url" || col === "media" ? (
                              <FullImage
                                src={value?.name}
                                alt="image description"
                                height={50}
                                width={70}
                                className="block mx-auto cursor-pointer w-[70px] h-[60px] object-contain"
                              />
                            ) : (
                              <>
                                {value?.link ? (
                                  <Link
                                    className="text-blue-600"
                                    to={`/update/${value?.path}/${value?.id}`}
                                  >
                                    {value?.name}
                                  </Link>
                                ) : (
                                  <span>{value?.name}</span>
                                )}
                              </>
                            )}
                          </TableCol>
                        );
                      } else
                        return (
                          <TableCol
                            classes={`!py-4 border ${classes?.colBody}`}
                            key={index}
                          >
                            {typeof row?.[col] !== "object" ? row?.[col] : null}
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
            className="pagination flex gap-6 items-center shadow p-3 bg-white dark:bg-bgmaindark"
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
