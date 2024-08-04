import React, { useEffect } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SelectProduct from "../ActionsFeatures/SelectProducts";
import { BackIcon } from "../../Helpers/Icons";
import { useNavigate } from "react-router-dom";

const OffersProducts = () => {
  const navigate = useNavigate()

  return (
    <BlockPaper title="offer"
      headerClassName='flex justify-between gap-2 items-center'

      contentBar={
        <button onClick={() => navigate(-1)} className="flex gap-2 items-center p-1 px-3 hover:bg-primary-blue hover:text-white rounded-md border text-primary-blue border-primary-blue">
          <BackIcon className="h-5 w-5" />
          Back
        </button>
      }
    >
      <SelectProduct
        tableName="offer"
      />
    </BlockPaper>
  );
};

export default OffersProducts;
