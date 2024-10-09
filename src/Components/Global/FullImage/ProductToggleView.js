import React from "react";
import { Button } from "../Button";

export const ProductToggleView = ({ product, handleToggleViewAll }) => {
  const display = product?.display;
  const id = product?.product_id;

  return (
    <Button
      title={display ? "Hide" : "Show"}
      classes={`text-xs capitalize ${display ? "!bg-red-500 hover:!bg-red-600" : "bg-green-500 hover:!bg-green-600"}`}
      onClick={() => handleToggleViewAll(!display, [id])}
    />
  );
};
