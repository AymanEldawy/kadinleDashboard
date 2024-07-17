import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalOptions } from "./../../Context/GlobalOptions";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { useQuery } from "@tanstack/react-query";

let columnBeingDragged;

const DynamicList = ({
  tableName,
  columns,
  onAddClick,
  oldData,
  allowFilter,
  renderTableAction,
  setSelectedList,
  selectedList,
  hideBar,
  hideAction,
  hideSelect,
  hideDelete,
  hidePagination,
  customBarButtons,
  additionalData,
  outerDelete,
  openDrawerMore,
  setOpenDrawerMore,
}) => {
  const { defaultLanguage, defaultRegion, user } = useGlobalOptions();
  const { loading, getDataWithPagination } = useFetch();
  const { deleteItem: onDelete } = useDelete();
  // const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [filterCategory, setFilterCategory] = useState();
  const [rowSelection, setRowSelection] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 50,
  });

  console.log(pagination?.pageSize,'pagination?.pageSize');

  const { data, isLoading, refetch } = useQuery({
    queryKey: [tableName, "list", defaultLanguage?.id, defaultRegion?.id],
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
      let filter =
        filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
      const response = await getDataWithPagination(
        tableName,
        pagination?.pageIndex + 1,
        pagination?.pageSize,
        {
          languageId: defaultLanguage?.id,
          regionId: defaultRegion?.id,
          filter,
          search: { key: selectedColumn, value: searchValue },
          ...additionalData,
        }
      );
      setPageCount(Math.ceil(response?.count / parseInt(pagination?.pageSize)));
      return response?.data;
    },
  });

  const table = useReactTable({
    columns: columns({
      hideAction,
    }),
    data: isLoading ? [] : data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    pageCount,
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      columnOrder,
      columnVisibility,
      pagination,
    },
  });

  const handleDeleteItem = async () => {
    let ids = [];
    let list = [];
    let selected = table.getFilteredSelectedRowModel();

    for (const row of selected.rows) {
      list.push(row.original);
      ids.push(row.original.id);
    }
    
    await onDelete(tableName, ids);
    setRowSelection({})
    setRefresh((p) => !p);
  };

  useEffect(() => {
    if (defaultLanguage?.id && defaultRegion?.id) refetch();
  }, [
    pagination?.pageIndex,
    refresh,
    filterCategory,
    defaultLanguage?.id,
    defaultRegion?.id,
    // selectedColumn,
    additionalData,
    searchValue,
    pagination?.pageSize,
  ]);

  return (
    <>
      <ConfirmModal
        onConfirm={() => {
          if (!!outerDelete) {
            outerDelete(selectedList);
          } else {
            handleDeleteItem(selectedList);
          }
          setOpenConfirmation(false);
        }}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <div className="">
        {hideBar ? null : (
          <TableBar
            onDeleteClick={() => setOpenConfirmation(true)}
            onAddClick={onAddClick}
            setSearchValue={setSearchValue}
            onSelectChange={setItemsPerPage}
            itemsPerPage={itemsPerPage}
            selectedList={selectedList}
            hideDelete={hideDelete}
            allowFilter={allowFilter}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            customBarButtons={customBarButtons}
            columns={columns}
            searchValue={searchValue}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            rowSelection={rowSelection}
          />
        )}
        <CustomTable
          columns={columns}
          table={table}
          tableName={tableName}
          isLoading={isLoading}
          data={data}
        />

        {/* <SuperTable
          itemOffset={itemOffset}
          itemsPerPage={itemsPerPage}
          setPageCount={setPageCount}
          pageCount={pageCount}
          deleteItem={deleteItem}
          handlePageClick={handlePageClick}
          columns={columns}
          data={data}
          allowSelect={hideSelect || hideDelete ? false : true}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          loading={loading}
          tableName={tableName}
          allowActions={hideAction ? false : true}
          hidePagination={hidePagination}
          actionKey="Actions"
          actionsContent={(data) => {
            if (!!renderTableAction) return renderTableAction(data);
            return (
              <Link
                to={`/update/${tableName}/${data?.id}`}
                state={data}
                className="text-blue-400 underline"
              >
                Edit
              </Link>
            );
          }}
          openDrawerMore={openDrawerMore}
          setOpenDrawerMore={setOpenDrawerMore}
        /> */}
      </div>
    </>
  );
};

export default DynamicList;
