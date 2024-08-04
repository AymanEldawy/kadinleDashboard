import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import SelectProduct from "../ActionsFeatures/SelectProducts";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { BackIcon } from "../../Helpers/Icons";

const Sales = () => {
  const navigate = useNavigate();

  return (
    <BlockPaper title="Sale"
      headerClassName='flex justify-between gap-2 items-center'
      contentBar={
        <button onClick={() => navigate(-1)} className="flex gap-2 items-center p-1 px-3 hover:bg-primary-blue hover:text-white rounded-md border text-primary-blue border-primary-blue">
          <BackIcon className="h-5 w-5" />
          Back
        </button>
      }
    >
      <SelectProduct
        tableName="sale"
      />
    </BlockPaper>
  );
};

export default Sales;
