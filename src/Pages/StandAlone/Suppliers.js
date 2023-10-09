import React from "react";
import DynamicLayout from "../Dynamics/DynamicLayout";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdate } from "../../hooks/useUpdate";
import { useDelete } from "../../hooks/useDelete";

const Suppliers = () => {
  const navigate = useNavigate();
  const { updateItem } = useUpdate();
  const { deleteItem } = useDelete();
  const columns = COMBINE_DB_API.combine_suppliers || [];

  const addToArchive = async (e, data) => {
    const checked = e.target.checked;

    const res = await updateItem("suppliers", {
      archive: checked ? true : false,
      id: data?.id,
    });
    if (res?.error) {
      toast.error("failed to update Archive status");
    } else {
      toast.success("Successfully update archive");
    }
  };

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="suppliers"
      columns={columns}
      title="suppliers"
      renderTableAction={(data) => {
        return (
          <div className="flex gap-4 items-center ">
            <label
              className="text-primary-blue capitalize flex items-center gap-4"
              to={`/products/update/product/${data?.id}`}
            >
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={data?.archive}
                onChange={(e) => addToArchive(e, data)}
              />
              add to archive
            </label>
          </div>
        );
      }}
    />
  );
};

export default Suppliers;
