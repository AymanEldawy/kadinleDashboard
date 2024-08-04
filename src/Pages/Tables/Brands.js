import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DB_API from "../../Helpers/Forms/databaseApi";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Brand = () => {
  const navigate = useNavigate();

  const columns = COMBINE_DB_API.combine_brand;
  // const fields = DB_API.brand;

  return (
    <>
      {/* <PopupFormOne
        setInitialFields={setInitialFields}
        setOldValues={setOldValues}
        open={openFeaturesForm}
        setOpen={setOpenFeaturesForm}
        oldValues={oldValues}
        table={activeStage}
        layout={layout}
        setLayout={setLayout}
        initialFields={initialFields}
        onSubmit={onSubmit}
        resetForm={resetForm}
      /> */}
      <DynamicLayout
        SUPABASE_TABLE_NAME="brand"
        columns={columns}
        title="Brands"
        onAddClick={() => navigate("/add-brand")}
      />
    </>
  );
};

export default Brand;
