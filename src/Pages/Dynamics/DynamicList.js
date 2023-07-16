import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";

const DynamicList = ({
  tableName,
  columns,
  onAddClick,
  oldData,
  renderTableAction,
  setSelectedList,
  selectedList,
  hideBar,
  hideAction,
  hideSelect,
  hidePagination,
}) => {
  const { loading, getDataWithPagination } = useFetch();
  const { deleteItem } = useDelete();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(1);

  const handleDeleteItem = async (selectedList) => {
    await deleteItem(tableName, selectedList);
    setRefresh((p) => !p);
  };

  const fetchData = async () => {
    const response = await getDataWithPagination(
      tableName,
      itemOffset,
      itemsPerPage
    );
    setData(response?.data);
    setTotalCount(response?.count);
    setRefresh((p) => !p);
    setPageCount(Math.ceil(totalCount / parseInt(itemsPerPage)));
  };
  useEffect(() => {}, [refresh, itemOffset]);

  useEffect(() => {
    fetchData();
    setRefresh((p) => !p);
  }, [pageCount, itemsPerPage, itemOffset]);

  const handlePageClick = (index) => {
    // const newOffset = (event.selected * itemsPerPage) % filterList?.length;
    setItemOffset(index);
  };
  return (
    <>
      <ConfirmModal
        onConfirm={() => {
          handleDeleteItem(selectedList);
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
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            onSelectChange={setItemsPerPage}
            itemsPerPage={itemsPerPage}
            selectedList={selectedList}
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
          allowSelect={hideSelect}
          searchValue={searchValue}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          loading={loading}
          tableName={tableName}
          allowActions={!hideAction}
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
