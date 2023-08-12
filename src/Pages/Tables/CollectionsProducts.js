import React, { useEffect } from "react";
import SelectProduct from "../ActionsFeatures/SelectProducts";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import ArrowIcon from './../../Components/icons/ArrowIcon';
import { BackIcon } from "../../Helpers/Icons";
import { useNavigate } from "react-router-dom";

const CollectionsProducts = () => {
  const navigate = useNavigate()

  return (
    <BlockPaper
      title="collection"
      headerClassName='flex justify-between gap-2 items-center'
      contentBar={
        <button onClick={() => navigate(-1)} className="flex gap-2 items-center p-1 px-3 hover:bg-primary-blue hover:text-white rounded-md border text-primary-blue border-primary-blue">
          <BackIcon className="h-5 w-5" />
          Back
        </button>
      }
    >
      <SelectProduct
        tableName="collection"
      />
    </BlockPaper>
  );
};

export default CollectionsProducts;
