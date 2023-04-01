import { useState } from "react";
import { Link } from "react-router-dom";
import { EditIcon, PlusIcon, TrashIcon } from "../../Helpers/Icons";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Button } from "../Global/Button";
import Modal from "../Modal/Modal";

const TreeViewItem = ({
  table,
  row,
  icon,
  toggleOpen,
  onSelectedItem,
  deleteItem,
}) => {
  const [open, setOpen] = useState(false);
  const onDeleteItem = () => {
    deleteItem([row?.Guid]);
    setOpen(false);
  };

  return (
    <>
      <ConfirmModal onConfirm={onDeleteItem} open={open} setOpen={setOpen} />
      <div onClick={toggleOpen} className="flex capitalize cursor-pointer">
        <div className="group options flex pl-8 min-w-[190px] hover:text-black dark:hover:text-white dark:hover:bg-bgmaindark dark:hover:border-borderdark hover:bg-gray-100 border-transparent rounded border hover:border-gray-300">
          <button className="scale-75">{icon}</button>
          {row?.Name}
          <span className="ml-8" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectedItem();
            }}
            className="tooltip text-transparent group-hover:text-blue-600 rounded-ful  ml-auto rtl:mr-auto"
            data-title="Add"
          >
            <span className="scale-75 block">
              <PlusIcon circle />
            </span>
          </button>
          <Link
            className="tooltip text-transparent group-hover:text-green-500"
            data-title="Edit"
            to={`/update/${table}/${row?.Guid}`}
            state={{ row, table }}
          >
            <span className="scale-75 block">
              <EditIcon />
            </span>
          </Link>
          <button
            className="tooltip text-transparent group-hover:text-red-500"
            data-title="Delete"
            onClick={() => setOpen(true)}
          >
            <span className="scale-90 block">
              <TrashIcon />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TreeViewItem;
