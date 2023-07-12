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
}) => {
  return (
    <BlockPaper title={title}>
      <DynamicList
        tableName={SUPABASE_TABLE_NAME}
        columns={columns}
        // data={data}
        renderTableAction={renderTableAction}
        oldValue={oldValue}
        onAddClick={onAddClick}
      />
    </BlockPaper>
  );
};

export default DynamicLayout;
