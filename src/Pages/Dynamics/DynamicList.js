import React from "react";
import { useState } from "react";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";

const DynamicList = ({
  tableName,
  columns,
  data,
  loading,
  setRefresh,
  onAddClick,
}) => {
  const { deleteItem } = useDelete();
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedList, setSelectedList] = useState({});

  const handleDeleteItem = async (selectedList) => {
    console.log(selectedList);
    await deleteItem(tableName, selectedList);
    setRefresh((p) => !p);
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
      <TableBar
        onDeleteClick={() => setOpenConfirmation(true)}
        onAddClick={onAddClick}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
        onSelectChange={setItemsPerPage}
        itemsPerPage={itemsPerPage}
        selectedList={selectedList}
      />
      <SuperTable
        itemsPerPage={itemsPerPage}
        deleteItem={deleteItem}
        columns={columns}
        data={data}
        allowSelect
        searchValue={searchValue}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        loading={loading}
        tableName={tableName}
      />
    </>
  );
};

export default DynamicList;
