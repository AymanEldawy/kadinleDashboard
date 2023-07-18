import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";

const tablesWithContent = [
  "category",
  "chart",
  "collar",
  "collection",
  "color",
  "fabric",
  "feature",
  "lining",
  "material",
  "offer",
  "order",
  "order_status",
  "pattern",
  "payment_status",
  "point",
  "product",
  "return_status",
  "season",
  "size",
  "sleeve",
];
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
  hideDelete,
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
  const [itemOffset, setItemOffset] = useState(0);

  const handleDeleteItem = async (selectedList) => {
    console.log("call", selectedList, tableName);
    // if (tableName === "product") {
    //   await deleteItem(tableName, Object.values(selectedList));
    //   await deleteItem(`product_content`, Object.values(selectedList));
    //   await deleteItem(`product_image`, Object.values(selectedList));
    //   await deleteItem(`product_variant`, Object.values(selectedList));
    // } else if (tablesWithContent?.includes(tableName)) {
    //   await deleteItem(`${tableName}_content`, Object.values(selectedList));
    //   await deleteItem(tableName, Object.values(selectedList));
    // } else if (tableName === "user") {
    //   await deleteItem("user_address", Object.values(selectedList));
    //   await deleteItem("user_cart", Object.values(selectedList));
    //   await deleteItem("user_invite", Object.values(selectedList));
    //   await deleteItem("user_like", Object.values(selectedList));
    //   await deleteItem("user_point", Object.values(selectedList));
    //   await deleteItem("user_suggestion", Object.values(selectedList));
    //   await deleteItem("user_ticket", Object.values(selectedList));
    //   await deleteItem("user_wallet", Object.values(selectedList));
    //   await deleteItem("user_type", Object.values(selectedList));
    //   await deleteItem("user", Object.values(selectedList));
    // } else {
    // }
    await deleteItem(tableName, Object.values(selectedList));
    setRefresh((p) => !p);
  };

  const fetchData = async () => {
    const response = await getDataWithPagination(
      tableName,
      itemOffset + 1,
      itemsPerPage
    );
    setData(response?.data);
    setTotalCount(response?.count);
    setPageCount(Math.ceil(totalCount / parseInt(itemsPerPage)));
  };
  useEffect(() => {
    fetchData();
  }, [pageCount, itemsPerPage, itemOffset, refresh]);

  const handlePageClick = (index) => {
    // const newOffset = (event.selected * itemsPerPage) % filterList?.length;
    setItemOffset(index);
  };
  console.log(itemOffset, pageCount);
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
            hideDelete={hideDelete}
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
          searchValue={searchValue}
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
