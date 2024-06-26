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
  const { getDataWithPagination } = useFetch();
  const { deleteItem: onDelete } = useDelete();
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [filterCategory, setFilterCategory] = useState();

  const [rowSelection, setRowSelection] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [tableName, "list"],
    queryFn: async () => {
      let filter =
        filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
      const response = await getDataWithPagination(
        tableName,
        table.getPageCount() + 1,
        table,
        {
          languageId: defaultLanguage?.id,
          regionId: defaultRegion?.id,
          filter,
          search: { key: selectedColumn, value: searchValue },
          ...additionalData,
        }
      );
      setTotalCount(response?.count);
    },
  });

  const table = useReactTable({
    columns,
    data,
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
    // onPaginationChange: setPagination,
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      columnOrder,
      columnVisibility,
    },
  });

  const deleteItem = async () => {
    let ids = [];
    let list = [];
    let selected = table.getFilteredSelectedRowModel();

    for (const row of selected.rows) {
      list.push(row.original);
      ids.push(row.original.id);
    }
    // let res = null;
    if (onDelete) {
      await onDelete(list, ids);
    }
  };

  const handleDeleteItem = async (selectedList) => {
    await onDelete(tableName, Object.values(selectedList));
    setSelectedList({});
    setRefresh((p) => !p);
  };

  useEffect(() => {
    if (defaultLanguage?.id && defaultRegion?.id) refetch();
  }, [
    pagination.pageIndex,
    filterCategory,
    defaultLanguage?.id,
    defaultRegion?.id,
    additionalData,
    searchValue,
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
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
          />
        )}
        <CustomTable
          columns={columns}
          data={[]}
          table={table}
          // loading={}
          tableName={tableName}
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
