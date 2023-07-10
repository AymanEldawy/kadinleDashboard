import { useState } from "react";

export const useUpdate = () => {
  const [loading, setLoading] = useState();

  const updateItem = () => {
    console.log("successfully update");
  };
  return { updateItem };
};
