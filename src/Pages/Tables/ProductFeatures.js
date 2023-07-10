import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import DB_API from "../../Helpers/Forms/databaseApi";
import { useState } from "react";

const productFeatures = [
  "fabric_content",
  "material_content",
  "lining_content",
  "collar_content",
  "sleeve_content",
  "season_content",
  "feature_content",
  "pattern_content",
];

const CACHE_COLUMNS = {};

const ProductFeatures = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(productFeatures[0]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    for (let table of productFeatures) {
      let columns = DB_API?.[table]?.map((col) => col?.name) || [];
      CACHE_COLUMNS[table] = columns;
    }
    setRefresh((p) => !p);
  }, []);

  useEffect(() => {}, [refresh]);
  return (
    <div>
      <div className="mb-4 bg-white shadow-sm my-4 w-full p-4">
        <h2 className="text-primary-blue font-semibold mb-4 text-lg">
          Product Features
        </h2>
        <div className=" border-b flex flex-wrap ">
          {productFeatures?.map((stage, index) => (
            <button
              className={`text-gray-500 px-4 text-sm border-b-2 -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                stage === activeStage
                  ? "border-primary-red text-primary-red font-medium"
                  : ""
              }`}
              onClick={() => setActiveStage(stage)}
            >
              {stage?.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <DynamicLayout
        SUPABASE_TABLE_NAME={activeStage?.replace("_content", "")}
        columns={
          CACHE_COLUMNS[activeStage] ||
          DB_API?.[productFeatures[0]]?.map((col) => col?.name) ||
          []
        }
        title={activeStage?.replace("_", " ")}
        onAddClick={() =>
          navigate(`/add-${activeStage?.replace("_content", "")}`)
        }
      />
    </div>
  );
};

export default ProductFeatures;
