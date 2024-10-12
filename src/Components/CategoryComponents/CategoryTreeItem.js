import React, { useMemo } from "react";
import {
  ChevronIcon,
  EditIcon,
  FolderEmptyIcon,
  FolderMinusIcon,
  FolderPlusIcon,
  TrashIcon,
} from "../../Helpers/Icons";
import { Link } from "react-router-dom";
import { useGlobalOptions } from "../../Context/GlobalOptions";

export const CategoryTreeItem = ({
  toggleOpen,
  open,
  level,
  item,
  displayTree,
  selectedList,
  onSelectedItem,
}) => {
  const { defaultLanguage } = useGlobalOptions();
  const content = useMemo(
    () =>
      item?.category_content?.find(
        (c) => c?.language_id === defaultLanguage?.id
      ),
    [item]
  );

  return (
    <li
      className="mt-2 mb-2 last:mb-0 border-b last:border-0 py-1 w-full flex flex-col items-center"
      key={item?.id}
    >
      <div className="flex items-center w-full">
        <div className="w-16 flex items-center gap-2">
          <input
            type="checkbox"
            className="h-[16px] w-[16px]"
            checked={selectedList?.[item?.id]}
            onChange={(e) => onSelectedItem(e, item)}
          />

          <button className="scale-75" onClick={toggleOpen}>
            {!item?.children?.length ? null : open[level] === item?.id ? (
              <span className="text-red-600">
                <ChevronIcon />
              </span>
            ) : (
              <span className="text-green-500">
                <ChevronIcon className="w-6 h-6 -rotate-90" />
              </span>
            )}
          </button>
        </div>
        <div className="flex gap-2 items-center flex-1">
          <img src={item?.image} alt="" className="w-16 h-16" />
          <div className="flex flex-col gap-1 items-start justify-start">
            <span className="text-orange-500">Sku: {item?.numeric}</span>
            <h3>{content?.title}</h3>
            <span>{content?.short_title}</span>
          </div>
        </div>
        <p className="w-[130px] text-center">
          Children: {item?.children?.length}
        </p>
        <Link
          className="bg-blue-500 px-4 text-white text-center w-[100px] py-1 text-sm rounded-md whitespace-nowrap"
          data-title={"Edit"}
          to={`/update/category/${item?.id}`}
        >
          Edit
        </Link>
      </div>
      {item?.children?.length ? (
        <>
          {open[level] === item?.id ? (
            <ul
              className={`relative w-full  pr-4 !ml-4 rounded-md color-level-${level}`}
            >
              {displayTree(item?.children, level + 1)}
            </ul>
          ) : null}
        </>
      ) : null}
    </li>
  );
};
