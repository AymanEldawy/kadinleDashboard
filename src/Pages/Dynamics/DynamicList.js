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
    if (tableName === "product") {
      await deleteItem(tableName, selectedList);
      await deleteItem(`product_content`, selectedList);
      await deleteItem(`product_image`, selectedList);
      await deleteItem(`product_variant`, selectedList);
    } else if (tablesWithContent?.include(tableName)) {
      await deleteItem(`${tableName}_content`, selectedList);
      await deleteItem(tableName, selectedList);
    } else if (tableName === "user") {
      await deleteItem("user_address", selectedList);
      await deleteItem("user_cart", selectedList);
      await deleteItem("user_invite", selectedList);
      await deleteItem("user_like", selectedList);
      await deleteItem("user_point", selectedList);
      await deleteItem("user_suggestion", selectedList);
      await deleteItem("user_ticket", selectedList);
      await deleteItem("user_wallet", selectedList);
      await deleteItem("user_type", selectedList);
      await deleteItem("user", selectedList);
    } else {
      await deleteItem(tableName, selectedList);
    }
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
          allowSelect={hideSelect ? false : true}
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
