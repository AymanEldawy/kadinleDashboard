import React, { useState } from "react";
import { refreshPrices } from "../Api/data";
import { LoadingProcess } from "./Global/LoadingProcess";

export const RefreshChunksBtn = ({ item }) => {
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);

  const refresh = async () => {
    setIsLoadingProcess(true);
    const response = await refreshPrices(item);
    setIsLoadingProcess(false);
  };

  return (
    <>
      {isLoadingProcess ? <LoadingProcess isFull /> : null}
      <button onClick={refresh} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm">
        Refresh{" "}
      </button>
    </>
  );
};
