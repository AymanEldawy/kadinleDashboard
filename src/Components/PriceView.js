import React from "react";
import { getFormatPrice } from "../Helpers/functions";
import { useGlobalOptions } from "../Context/GlobalOptions";

export const PriceView = ({ price }) => {
  const { currency } = useGlobalOptions();
  return <>{getFormatPrice(price, currency)}</>;
};
