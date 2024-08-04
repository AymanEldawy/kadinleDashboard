import React from "react";

import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { useUpdate } from "../../hooks/useUpdate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { updateUserType } from "../../Api/data";

const Suppliers = (props) => {
  const { updateItem } = useUpdate();
  const columns = COMBINE_DB_API.combine_suppliers || [];

  const handleUpdateSupplier = async (key, data) => {
    const res = await updateItem("supplier", {
      [key]: true,
      id: data?.id,
    });
    if (res?.error) {
      toast.error(`failed to update ${key} status`);
    } else {
      data[key] = true;
      await updateUserType(data?.user_id);
      toast.success(`Successfully update ${key}`);
    }
  };

  return (
    <DynamicLayout
      SUPABASE_TABLE_NAME="supplier"
      columns={columns}
      title="suppliers"
      renderTableAction={(data) => {
        return (
          <div className="flex flex-col gap-4">
            <Link
              to={`/suppliers/${data?.id}`}
              className="p-1 whitespace-nowrap rounded-md px-4 bg-blue-500 text-white text-xs"
            >
              See more
            </Link>
            {!data?.approved ? (
              <button
                onClick={() => handleUpdateSupplier("approved", data)}
                className="p-1 rounded-md px-4 bg-green-500 text-white text-xs"
              >
                Approve
              </button>
            ) : (
              <button
                onClick={() => handleUpdateSupplier("blocked", data)}
                className="p-1 rounded-md px-4 bg-red-500 text-white text-xs"
              >
                block
              </button>
            )}
          </div>
        );
      }}
    />
  );
};

export default Suppliers;
