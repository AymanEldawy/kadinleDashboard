import React, { memo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ChevronIcon from "../../Helpers/Icons/ChevronIcon";
import CheckboxField from "../CustomForm/CheckboxField";
import Checkbox from "../CustomForm/Checkbox";
import Table from "./Table";
import TableBody from "./TableBody";
import TableCol from "./TableCol";
import TableHead from "./TableHead";
import TableHeadCol from "./TableHeadCol";
import TableRow from "./TableRow";
import TableUniqueCol from "./TableUniqueCol";
let sorting = {};
const SuperTable = ({
  columns,
  data,
  allowSelect,
  searchValue,
  itemsPerPage,
  selectedList,
  setSelectedList,
  table,
  searchKey,
}) => {
  const [filterList, setFilterList] = useState(data);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setFilterList(data);
  }, []);
  useEffect(() => {
    const endOffset = itemOffset + parseInt(itemsPerPage);
    setCurrentItems(filterList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterList?.length / parseInt(itemsPerPage)));
  }, [filterList, itemsPerPage, itemOffset]);
  useEffect(() => {}, [refresh]);
  useEffect(() => {
    if (searchValue) {
      let newList = data?.filter((item) => {
        if (typeof item[searchKey] === "string")
          return item[searchKey]
            ?.toLowerCase()
            ?.startsWith(searchValue?.toLowerCase());
        else
          return item[searchKey]
            ?.toString()
            ?.toLowerCase()
            ?.startsWith(searchValue?.toLowerCase());
      });
      setItemOffset(1);
      setCurrentItems(newList?.slice(0, itemsPerPage));
    } else {
      setFilterList(data);
      setCurrentItems(data?.slice(0, itemsPerPage));
    }
  }, [searchValue]);
  useEffect(() => {
    console.log("rendering");
  }, []);
  // useEffect(() => {
  //   if (searchValue !== "") {
  //     let newList = data?.filter((item) => {
  //       return columns.every((key) => {
  //         return (
  //           item.hasOwnProperty(key) &&
  //           item[key]?.toLowerCase()?.includes(searchValue?.toLowerCase())
  //         );
  //       });
  //     });
  //     setItemOffset(1);
  //     setFilterList(newList);
  //     setCurrentItems(filterList?.slice(0, itemsPerPage));
  //   } else {
  //     setFilterList(data);
  //     setCurrentItems(filterList?.slice(0, itemsPerPage));
  //   }
  // }, [searchValue]);

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
          newList[data?.[key]?.Guid] = data?.[key]?.Guid;
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
      <Table>
        <TableHead>
          {allowSelect ? (
            <TableHeadCol>
              <input
                type="checkbox"
                className="w-4 h-4 "
                onChange={handleSelectedAll}
              />
            </TableHeadCol>
          ) : null}
          {columns?.map((col) => (
            <TableHeadCol key={col} sort sortBy={sortBy}>
              {col}
            </TableHeadCol>
          ))}
        </TableHead>
        <TableBody>
          {currentItems?.map((row) => {
            return (
              <TableRow
                key={row?.Name}
                classes={`border-b dark:border-borderdark whitespace-nowrap ${
                  !!selectedList[row?.Guid] ? "bg-gray-100 dark:bg-[#1115]" : ""
                }`}
              >
                {allowSelect ? (
                  <TableCol>
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={!!selectedList[row?.Guid]}
                      onChange={() => handelSelect(row?.Guid)}
                    />
                  </TableCol>
                ) : null}
                {columns?.map((col, index) => {
                  if (col === "CDate") {
                    let date = new Date(row[col]).toLocaleDateString("en-UK", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      weekday: "short",
                    });
                    let time = new Date(row[col]).toLocaleTimeString("en-UK", {
                      timeStyle: "short",
                    });
                    return (
                      <TableCol classes="whitespace-nowrap" key={index}>
                        {date} | {time}
                      </TableCol>
                    );
                  } else if (col?.toLowerCase()?.indexOf("guid") !== -1) {
                    return <TableUniqueCol key={index} val={row[col]} />;
                  } else return <TableCol key={index}>{row[col]}</TableCol>;
                })}
                <TableCol>
                  <Link
                    className="hover:underline text-blue-500"
                    to={`/update/${table}/${row?.Guid}`}
                    state={{ row, table }}
                  >
                    Edit
                  </Link>
                </TableCol>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex  scale-75 -rotate-90">
            <ChevronIcon />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <span className="flex scale-75  rotate-90">
            <ChevronIcon />
          </span>
        }
        renderOnZeroPageCount={null}
        className="pagination flex gap-6 items-center shadow p-3"
        activeClassName="bg-blue-500 p-1 px-2 rounded text-sm text-white"
        previousClassName="rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
        nextClassName="rounded-md dark:bg-borderdark dark:text-gray-50 text-gray-500 bg-gray-100 shadow px-1"
        disabledClassName="text-gray-200 dark:text-gray-600"
      />
    </>
  );
};

export default memo(SuperTable);
