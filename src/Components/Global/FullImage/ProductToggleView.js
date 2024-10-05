import React from "react";
import { Button } from "../Button";

export const ProductToggleView = ({ product }) => {
    const display = product?.display;
    const handleToggleView = async () => {

    }
  return (
    <Button
      title={display ? 'Hide' : 'Show'}
      classes={`text-xs capitalize ${display ? '!bg-red-500' : 'bg-green-500'}`}
      onClick={handleToggleView}
    />
  );
};
