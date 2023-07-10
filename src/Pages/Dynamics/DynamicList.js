import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { TableBar } from "../../Components/TableBar/TableBar";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";

const DynamicList = ({ tableName, columns, onAddClick }) => {
  const { loading, getData } = useFetch();
  const { deleteItem } = useDelete();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedList, setSelectedList] = useState({});

  const handleDeleteItem = async (selectedList) => {
    await deleteItem(tableName, selectedList);
    setRefresh((p) => !p);
  };
  useEffect(() => {
    (async () => {
      setData(await getData(tableName));
    })();
  }, [refresh]);

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
          allowActions
          actionKey="Actions"
          actionsContent={(data) => {
            return (
              <Link
                to={`/update/${tableName}/${data?.id}`}
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
