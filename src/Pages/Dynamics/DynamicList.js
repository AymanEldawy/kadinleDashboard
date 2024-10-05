import React from "react";
import { useState } from "react";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalOptions } from "./../../Context/GlobalOptions";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { useQuery } from "@tanstack/react-query";

const DynamicList = ({
  tableName,
  columns,
  onAddClick,
  allowFilter,
  selectedList,
  hideBar,
  hideAction,
  outerSelectedId,
  hideDelete,
  customBarButtons,
  additionalData,
  outerDelete,
}) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getDataWithPagination } = useFetch();
  const { deleteItem: onDelete } = useDelete();
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [filterCategory, setFilterCategory] = useState();
  const [rowSelection, setRowSelection] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      tableName,
      "list",
      defaultLanguage?.id,
      defaultRegion?.id,
      refresh,
      filterCategory,
      additionalData,
      searchValue,
      pagination?.pageIndex,
      pagination?.pageSize,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id || !defaultRegion?.id) return;
      const response = await getDataWithPagination(
        tableName,
        pagination?.pageIndex + 1,
        pagination?.pageSize,
        {
          languageId: defaultLanguage?.id,
          regionId: defaultRegion?.id,
          filter: filterCategory,
          search: { key: selectedColumn, value: searchValue },
          ...additionalData,
        }
      );
      setPageCount(Math.ceil(response?.count / parseInt(pagination?.pageSize)));
      return response?.data;
    },
  });

  const handleDeleteItem = async () => {
    await onDelete(tableName, Object.keys(rowSelection));
    setRowSelection({});
    setRefresh((p) => !p);
  };

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
          tableName={tableName}
          isLoading={isLoading}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          setPagination={setPagination}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          hideAction={hideAction}
          outerSelectedId={outerSelectedId}
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
