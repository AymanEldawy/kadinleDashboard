import React, { memo } from "react";
import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom";

import { getTableData } from "../../Api/globalActions";
import { TicketIdGen } from "../../Helpers/functions";
import { ChevronIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import { DisplayShippingPrices } from "../DisplayShippingPrices/DisplayShippingPrices";
import { FullImage } from "../Global/FullImage/FullImage";
import { UserInfo } from "../Global/UserInfo/UserInfo";
import { useGlobalOptions } from "./../../Context/GlobalOptions";
import { LanguageContext } from "./../../Context/LangContext";
import { fetchWord } from "./../lang/fetchWord";
import { CollectionProductsCol } from "./CollectionProductsCol";
// import { ChevronIcon, SortIcon } from "../Icons";
import Table from "./Table";
import TableBody from "./TableBody";
import TableCol from "./TableCol";
import TableHead from "./TableHead";
import TableHeadCol from "./TableHeadCol";
import TableRow from "./TableRow";
import { DisplayOrder } from "../DisplayOrder/DisplayOrder";
import { FullVideo } from "../Global/FullImage/FullVideo";

let reasons = {};
let sorting = {};

const SuperTable = ({
  columns,
  data,
  allowSelect,
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
  pageCount,
  itemOffset,
  hidePagination,
  handlePageClick,
  openDrawerMore,
  setOpenDrawerMore,
}) => {
  const location = useLocation();
  const { getData } = useFetch();
  const { defaultLanguage } = useGlobalOptions();
  const { lang } = useContext(LanguageContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [CACHED_TABLE, setCACHED_TABLE] = useState({});
  const [CACHE_REASONS, setCACHE_REASONS] = useState({});
  const [moreData, setMoreData] = useState({});
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
    setCurrentItems(data);
  }, [data]);

  useEffect(() => {
    if (columns?.includes("parent_id")) checkRefTable();
  }, [columns?.length]);
  useEffect(() => {
    if (columns?.includes("user") && location?.pathname === "/user")
      getAndCacheUserData();
  }, [location?.pathname, columns?.length, tableName]);

  useEffect(() => {
    if (!defaultLanguage?.id) return;
    if (tableName === "order_return_request") {
      getReasons();
    }
  }, [defaultLanguage?.id, tableName]);

  async function getReasons() {
    const response = await getTableData("return_reason_content", {
      languageId: defaultLanguage?.id,
    });
    let hash = {};
    for (const item of response?.data) {
      hash[item?.return_reason_id] = item?.reason;
    }
    setCACHE_REASONS(hash);
  }
  async function getAndCacheUserData() {
    const response = await getData("user");
    let hash = {};
    for (const user of response) {
      hash[user?.id] = user;
    }
    setCACHED_TABLE((prev) => {
      return {
        ...prev,
        ...hash,
      };
    });
  }
  async function checkRefTable() {
    if (!data?.length) return;
    const response = await getTableData(`${tableName}_content`, {
      languageId: defaultLanguage?.id,
    });
    let hash = {};
    for (const item of response?.data) {
      hash[item?.[`${tableName}_id`]] = item.name || item?.title;
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
          let uniqueKey = data?.[key]?.id
            ? data?.[key]?.id
            : data?.[key]?.email;
          if (count >= itemsPerPage) break;
          newList[uniqueKey] = uniqueKey;
          count++;
        }
        setSelectedList(newList);
      }
    },
    [selectedList, itemsPerPage, data]
  );

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

  useEffect(() => {
    if (openDrawerMore) {
      let moreData = data?.find((item) => item?.id === openDrawerMore);
      setMoreData(moreData);
    } else setMoreData({});
  }, [openDrawerMore, data]);

  return (
    <div className="flex">
      <div key={itemOffset} className="flex-1 overflow-auto">
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
              {columns?.map((column, index) => {
                let col = column?.header;
                if (col === "id") return null;
                else
                  return (
                    <TableHeadCol
                      contentClassName={`${classes?.colHeadContentClassName} ${
                        col === "description" || col === "name"
                          ? "min-w-[160px]"
                          : ""
                      }`}
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
                            checked={
                              !!selectedList?.[row?.id ? row?.id : row?.email]
                            }
                            onChange={() => handelSelect(row?.id || row?.email)}
                          />
                        </TableCol>
                      ) : null}
                      {columns?.map((column, index) => {
                        let col = column.accessorKey;
                        let tableNameContent = `${tableName}_content`;
                        if (col === "id") return null;

                        if (col === "banner_video" && row?.banner_video) {
                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 border ${classes?.colBody}`}
                            >
                              <FullVideo
                                src={row?.banner_video}
                                height={50}
                                width={70}
                                className="block mx-auto cursor-pointer w-20 h-16 object-contain"
                              />
                            </TableCol>
                          );
                        }
                        if (col === "attachment") {
                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 min-w-[200px] border  ${
                                row?.archive ? " grayscale" : ""
                              } ${classes?.colBody}`}
                            >
                              <div className="flex flex-wrap gap-4 justify-between">
                                <div className="flex gap-2 items-center">
                                  <img
                                    src="https://www.learningcontainer.com/wp-content/plugins/download-manager/assets/file-type-icons/pdf.svg"
                                    alt="pdf"
                                    className="w-8 h-8 object-contain"
                                  />
                                  <a
                                    download
                                    href={row?.pdf_source}
                                    className={`bg-green-500 text-white text-xs py-1 px-3 rounded-md`}
                                  >
                                    Download
                                  </a>
                                </div>
                              </div>
                            </TableCol>
                          );
                        } else if (
                          col === "cause" &&
                          tableName === "user_point"
                        ) {
                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 border text-green-500 ${classes?.colBody}`}
                            >
                              {row?.point?.point_content?.[0]?.cause}
                            </TableCol>
                          );
                        } else if (col === "suggestion" || col === "ticket") {
                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 border ${classes?.colBody}`}
                            >
                              {TicketIdGen()}
                            </TableCol>
                          );
                        } else if (tableName === "shipping_price") {
                          let value = "";
                          switch (col) {
                            case "normal_price":
                            case "fast_price":
                              value = Object.values(row?.[col])?.[0];
                              break;
                            case "weight":
                              value = Object.keys(row?.normal_price)?.[0];
                              break;
                            default:
                              value = row?.[col];
                              break;
                          }

                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 border ${classes?.colBody}`}
                            >
                              {value}
                            </TableCol>
                          );
                        } else if (
                          col === "reason" &&
                          tableName === "order_return_request"
                        ) {
                          return (
                            <TableCol
                              key={row?.id}
                              classes={`!py-4 border ${classes?.colBody}`}
                            >
                              {CACHE_REASONS?.[row?.return_reason_id]}
                            </TableCol>
                          );
                        }
                        //  else if (col === 'products')
                        //   return (
                        //     <TableCol
                        //       key={row?.id}
                        //       classes={`!py-4 border ${classes?.colBody}`}
                        //     >
                        //       <CollectionProductsCol collectionId={row?.id} tableName={tableName} />
                        //     </TableCol>
                        //   );
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
                                <>
                                  {typeof row?.[col] === "object" &&
                                  col === "images" ? (
                                    <>
                                      {row?.[col]?.map((img) => (
                                        <FullImage
                                          key={img}
                                          src={img}
                                          alt="image description"
                                          height={40}
                                          width={40}
                                          className="inline-block mx-auto cursor-pointer w-8 h-10 object-contain"
                                        />
                                      ))}
                                    </>
                                  ) : (
                                    <FullImage
                                      src={
                                        row?.[col] ||
                                        row?.collection_content?.[0]?.image ||
                                        row?.category_content?.[0]?.[col]
                                      }
                                      alt="image"
                                      height={50}
                                      width={70}
                                      className="block mx-auto cursor-pointer w-20 h-16 object-contain"
                                    />
                                  )}
                                </>
                              ) : (
                                <span
                                  className="block min-h-[30px] w-full h-full border border-gray-200"
                                  style={{ background: row?.[col] }}
                                ></span>
                              )}
                            </TableCol>
                          );
                        else if (col === "user" || col === "admin") {
                          return (
                            <TableCol
                              classes={`min-w-[120px] !py-4 border ${classes?.colBody}`}
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
                          return (
                            <TableCol>{row?.[col] ? "Yes" : "No"}</TableCol>
                          );
                        else if (
                          col?.toLowerCase() === "created_at" ||
                          col?.toLowerCase() === "end_date"
                        )
                          return (
                            <TableCol
                              classes={`!py-4 border ${classes?.colBody}`}
                              key={index}
                            >
                              {new Date(row?.[col])?.toLocaleDateString(
                                "en-UK"
                              )}
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
                          let content = row?.[col][`${col}_content`]?.[0];
                          // col === "size"
                          //   ? row?.[col][`${col}_content`]?.find(
                          //       (c) => c?.region_id === uuidRegionEn
                          //     )
                          //   : row?.[col][`${col}_content`]?.find(
                          //       (c) => c?.language_id === uuidLanguageEn
                          //     );
                          value = {
                            name: content?.name || content?.title,
                            path: col,
                            id: content?.[`${col}_id`],
                            link: true,
                          };
                          // content
                        }
                        if (col === "variant") {
                          let content = {};
                          let product_content = !!row?.hasOwnProperty(
                            "product_variant"
                          )
                            ? row?.product_variant?.product?.product_content
                            : row?.order_content?.[0]?.product_variant?.product
                                ?.product_content;
                          content = product_content?.[0];
                          // ?.find(
                          //   (c) => c?.language_id === uuidLanguageEn
                          // );
                          let variants = !!row?.hasOwnProperty(
                            "product_variant"
                          )
                            ? row?.product_variant
                            : row?.order_content?.[0]?.product_variant;
                          value = {
                            name: variants?.sku,
                            path: col,
                            id: variants?.product_id,
                            link: true,
                          };
                          // content
                        }
                        if (typeof row[col] === "object" && row?.[col]?.name) {
                          value = {
                            name: row?.[col]?.name,
                            path: col,
                            id: row?.[col]?.id,
                          };
                        }
                        if (
                          tableName === "order" &&
                          (row?.order_status?.[col] || col === "order_status")
                        ) {
                          let content = row?.order_status?.status_content?.[0];
                          // ?.find(
                          //   (c) => c?.language_id === uuidLanguageEn
                          // );
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
                          let content = row?.[tableNameContent]?.[0];
                          if (
                            typeof content?.[col] !== "object" &&
                            typeof content?.[col] === "string"
                          ) {
                            if (content?.[col]?.indexOf("kadinle.com") !== -1) {
                              value = {
                                path: col,
                                image: content?.[col],
                                id: content?.[col]?.id,
                                name: content?.[col]?.name,
                              };
                            } else {
                              let quantity =
                                col === "quantity"
                                  ? row?.[tableNameContent]?.reduce(
                                      (accumulator, currentItem) => {
                                        return (
                                          accumulator + currentItem.quantity
                                        );
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
                            }
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
                              {col === "url" ||
                              col === "media" ||
                              value?.image ? (
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
                                      to={
                                        col !== "variant"
                                          ? `/update/${value?.path}/${value?.id}`
                                          : `/products/update/product/${value?.id}`
                                      }
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
                              {typeof row?.[col] !== "object"
                                ? row?.[col]
                                : null}
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
        {pageCount && !loading && !hidePagination ? (
          <>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <span className="flex  scale-75 ltr:rotate-180 rtl:-rotate-180">
                  <ChevronIcon />
                </span>
              }
              onPageChange={({ selected }) => handlePageClick(selected)}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              forcePage={itemOffset}
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
      </div>
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

export default memo(SuperTable);
