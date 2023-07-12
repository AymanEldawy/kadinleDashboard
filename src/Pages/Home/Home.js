import React from "react";
import StatisticsCards from "../../Components/StatisticsCards/StatisticsCards";
import { useState } from "react";
import MoneyIcon from "../../Components/icons/MoneyIcon";
import ShoppingBagIcon from "../../Components/icons/ShoppingBagIcon";

const dummyStatistics = [
  {
    name: "totalEarnings",
    statistics: "559.25",
    preStatistics: "$",
    icon: <MoneyIcon className="text-[#20BAA5]" />,
    color: "bg-[#0ab39c2e]",
    percentage: "16.24",
    isIncreased: true,
    link: "",
    linkText: "viewNetEarnings",
  },
  {
    name: "orders",
    statistics: "36.894",
    icon: <ShoppingBagIcon className="text-[#299cdb]" />,
    color: "bg-[#299cdb2e]",
    percentage: "3.57",
    isIncreased: false,
    link: "",
    linkText: "viewAllOrders",
  },
  {
    name: "customers",
    statistics: "183.35",
    icon: <MoneyIcon className="text-[#f7b84b]" />,
    color: "bg-[#f7b84b2e]",
    percentage: "29.08",
    isIncreased: true,
    link: "",
    linkText: "seeDetails",
  },
  {
    name: "myBalance",
    statistics: "165.89",
    preStatistics: "$",
    icon: <MoneyIcon className="text-[#405189]" />,
    color: "bg-[#4051892e]",
    percentage: "0.00",
    isIncreased: "stable",
    link: "",
    linkText: "withdrawMoney",
  },
];

const Home = () => {
  const [statistics, setStatistics] = useState(dummyStatistics);

  return (
    <div>
      <StatisticsCards data={statistics} />
    </div>
  );
};

export default Home;
