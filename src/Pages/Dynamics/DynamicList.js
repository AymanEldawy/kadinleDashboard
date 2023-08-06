import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalOptions } from "./../../Context/GlobalOptions";

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
  outerDelete
}) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { loading, getDataWithPagination } = useFetch();
  const { deleteItem } = useDelete();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('')
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterCategory, setFilterCategory] = useState();

  const handleDeleteItem = async (selectedList) => {
    await deleteItem(tableName, Object.values(selectedList));
    setSelectedList({})
    setRefresh((p) => !p);
  };

  const fetchData = async () => {
    let filter = filterCategory?.indexOf("Choose") !== -1 ? "" : filterCategory;
    const response = await getDataWithPagination(
      tableName,
      itemOffset + 1,
      itemsPerPage,
      {
        languageId: defaultLanguage?.id,
        regionId: defaultRegion?.id,
        filter,
        search: { key: selectedColumn, value: searchValue },
        ...additionalData
      }
    );
    setTotalCount(response?.count);
    setPageCount(Math.ceil(response?.count / parseInt(itemsPerPage)));
    setData(response?.data);
  };
  useEffect(() => {
    if (defaultLanguage?.id && defaultRegion?.id) fetchData();
  }, [
    pageCount,
    itemsPerPage,
    itemOffset,
    refresh,
    filterCategory,
    defaultLanguage?.id,
    defaultRegion?.id,
    // selectedColumn,
    additionalData,
    searchValue
  ]);

  const handlePageClick = (index) => {
    setItemOffset(index);
  };
  return (
    <>
      <ConfirmModal
        onConfirm={() => {
          if (!!outerDelete) {
            outerDelete(selectedList)
          } else {
            // handleDeleteItem(selectedList);
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
        <SuperTable
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
        />
      </div>
    </>
  );
};

export default DynamicList;
