import React from "react";
import { useNavigate } from "react-router-dom";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";

const Measurement = () => {
  const navigate = useNavigate();
  const columns = COMBINE_DB_API.combine_measurement || [];

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="measurement"
      columns={columns}
      title="Measurement"
      onAddClick={() => navigate(`/add-measurement`)}
      outerSelectedId={(row, relativeIndex, parent) => {
        return row?.id;
      }}
    />
  );
};

export default Measurement;
