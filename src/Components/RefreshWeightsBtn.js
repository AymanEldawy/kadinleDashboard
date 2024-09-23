import React, { useState } from "react";
import { refreshWeights } from "../Api/data";
import { LoadingProcess } from "./Global/LoadingProcess";
import { toast } from "react-toastify";

export const RefreshWeightsBtn = ({ item }) => {
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);

  const refresh = async () => {
    setIsLoadingProcess(true);
    console.log("🚀 ~ refresh ~ item:", item);
    const response = await refreshWeights(item);
    if (response?.error) {
      toast.error(`Failed to update weight ${response?.error?.message}`);
    } else {
      if(response?.length) {
        toast.success(`Successfully set Weight for ${response?.length} items`);       
      } else {
        toast.warn(`There are no product for this category`);
      }
    }
    setIsLoadingProcess(false);
  };

  return (
    <>
      {isLoadingProcess ? <LoadingProcess isFull /> : null}
      <button
        onClick={refresh}
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
      >
        Refresh{" "}
      </button>
    </>
  );
};
