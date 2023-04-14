import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

import formsApi from "../../Helpers/Forms/formsApi";
import { FolderEmptyIcon, FolderMinusIcon, FolderPlusIcon } from "../../Helpers/Icons";
import SuperForm from "../CustomForm/SuperForm";
import FormHeadingTitle from "../Global/FormHeadingTitle";
import Modal from "../Modal/Modal";
import TreeViewItem from "./TreeViewItem";

const RenderTree = ({ chartTree, name, deleteItem, onSubmit }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState({});
  const [fields, setFields] = useState([]);
  useEffect(() => {
    setFields(formsApi[name?.toLowerCase()]);
  }, []);

  const toggleOpen = (itemId, level) => {
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
  };

  const renderTree = useCallback(
    (tree, level = 1) => {
      return tree?.map((item) => {
        return (
          <li className="space-x-3 w-fit mt-2 mb-2 last:mb-0">
            <TreeViewItem
              deleteItem={deleteItem}
              table={name}
              row={item}
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
  let oldValues = selectedItem?.FinalGUID
    ? {
        ParentGUID: selectedItem?.Guid,
        FinalGUID: selectedItem?.FinalGUID,
      }
    : {
        ParentGUID: selectedItem?.Guid,
      };

  const submit = (values) => {
    onSubmit(values);
    setOpen(false);
  };
  return (
    <>
      <Modal open={!!selectedItem} onClose={() => setSelectedItem(null)}>
        <FormHeadingTitle title={`Create new ${name}`} />
        <SuperForm
          initialFields={fields && fields?.length ? fields : []}
          oldValues={oldValues}
          onSubmit={submit}
        />
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
