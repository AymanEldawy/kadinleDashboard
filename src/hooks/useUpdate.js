import { useState } from "react";

export const useUpdate = () => {
  const [loading, setLoading] = useState();

  const update = () => {
    console.log("successfully update");
  };
  return { update };
};
