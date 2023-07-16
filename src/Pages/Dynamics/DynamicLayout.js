import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import DynamicList from "../Dynamics/DynamicList";
import { useFetch } from "./../../hooks/useFetch";

const DynamicLayout = ({
  SUPABASE_TABLE_NAME,
  columns,
  title,
  onAddClick,
  renderTableAction,
  oldValue,
  getSelectedList,
  contentBar,
  hideBar,
  hideAction,
  hideSelect,
}) => {
  const [selectedList, setSelectedList] = useState({});
  useEffect(() => {
    console.log(Object.keys(selectedList)?.length);
    if (!!getSelectedList) getSelectedList(setSelectedList);
  }, [selectedList]);

  return (
    <BlockPaper
      title={title}
      subTitle={
        Object.keys(selectedList)?.length ? (
          <p className="text-gray-500 text-xs flex gap-1 items-center">
            <span className="border-gray-300 border text-black px-1 rounded bg-gray-200">
              {Object.keys(selectedList)?.length}
            </span>
            Selected rows
          </p>
        ) : null
      }
      contentBar={contentBar}
    >
      <DynamicList
        tableName={SUPABASE_TABLE_NAME}
        columns={columns}
        renderTableAction={renderTableAction}
        oldValue={oldValue}
        onAddClick={onAddClick}
        setSelectedList={setSelectedList}
        selectedList={selectedList}
        hideBar={hideBar}
        hideAction={hideAction}
        hideSelect={hideSelect}
      />
    </BlockPaper>
  );
};

export default DynamicLayout;
