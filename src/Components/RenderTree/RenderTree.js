import React, { useCallback } from "react";
import { useState } from "react";
import {
  FolderEmptyIcon,
  FolderMinusIcon,
  FolderPlusIcon,
  PlusIcon,
  TrashIcon,
} from "../../Helpers/Icons";
import Modal from "../Modal/Modal";

const TreeViewItem = ({ itemName, icon, toggleOpen, onSelectedItem }) => {
  return (
    <div onClick={toggleOpen} className="flex capitalize cursor-pointer">
      <div className="group options flex gap-1 pl-4 min-w-[190px] hover:text-black dark:hover:text-white dark:hover:bg-bgmaindark dark:hover:border-borderdark hover:bg-gray-100 border-transparent rounded border hover:border-gray-300">
        <button className="scale-75">{icon}</button>
        {itemName}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("run...");
            onSelectedItem();
          }}
          className="text-transparent group-hover:text-blue-600 scale-75 rounded-ful ml-auto rtl:mr-auto"
        >
          <PlusIcon />
        </button>
        <button className="scale-90 text-transparent group-hover:text-red-500">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const RenderTree = ({ chartTree }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState({});
  const toggleOpen = (itemId, level) => {
    console.log(itemId, "r");
    if (open[level] === itemId) {
      setOpen((prev) => {
        return {
          ...prev,
          [level]: "",
        };
      });
    } else
      setOpen((prev) => {
        return {
          ...prev,
          [level]: itemId,
        };
      });
    console.log(open);
  };

  const renderTree = useCallback(
    (tree, level = 1) => {
      console.log(level);
      return tree?.map((item) => {
        return (
          <li className="space-x-3 w-fit mt-2 mb-2 last:mb-0">
            <TreeViewItem
              itemName={item?.Name}
              toggleOpen={() => {
                if (item?.children?.length) toggleOpen(item?.Guid, level);
              }}
              onSelectedItem={() => setSelectedItem(item)}
              open={open}
              icon={
                !item?.children?.length ? (
                  <span className="text-gray-400 dark:text-gray-700">
                    <FolderEmptyIcon />
                  </span>
                ) : open[level] === item?.Guid ? (
                  <span className="text-red-600">
                    <FolderMinusIcon />
                  </span>
                ) : (
                  <span className="text-green-500">
                    <FolderPlusIcon />
                  </span>
                )
              }
            />
            {item?.children?.length ? (
              <>
                {open[level] === item?.Guid ? (
                  <ul
                    className={`relative bg-[#9991] dark:bg-[#1111] pr-4 !ml-4 rounded-md dark:before:border-borderdark before:border-l-2 before:absolute before:left-0 before:-z-1 before:h-full color-level-${level} after:opacity-20 after:w-4 after:h-full after:absolute after:top-0`}
                  >
                    {renderTree(item?.children, level + 1)}
                  </ul>
                ) : null}
              </>
            ) : null}
          </li>
        );
      });
    },
    [open, toggleOpen]
  );

  return (
    <>
      <Modal open={!!selectedItem} onClose={() => setSelectedItem(null)}>
        <p className="dark:text-white text-black font-medium text-lg mb-1">
          Name: {selectedItem?.Name}
        </p>
        <p>id: {selectedItem?.Guid}</p>
      </Modal>
      <ul
        className={`relative pr-4 !ml-4 rounded-md dark:before:border-borderdark before:border-l-2 before:absolute before:left-0 before:-z-1 before:h-full color-level-0 after:opacity-50 after:w-4 after:h-full after:absolute after:top-0`}
      >
        {renderTree(chartTree)}
      </ul>
    </>
  );
};

export default RenderTree;
