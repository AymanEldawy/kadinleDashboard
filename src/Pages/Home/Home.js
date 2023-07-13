import React, { useEffect } from "react";
import StatisticsCards from "../../Components/StatisticsCards/StatisticsCards";
import { useState } from "react";
import MoneyIcon from "../../Components/icons/MoneyIcon";
import ShoppingBagIcon from "../../Components/icons/ShoppingBagIcon";
import UserIcon from "../../Components/icons/UserIcon";
import WalletIcon from "../../Components/icons/WalletIcon";
import { getCount, getTotalEarning } from "../../Api/statictes";
import SkeletonCard from "../../Components/StatisticsCards/SkeletonCard";

const dummyStatistics = {
  totalEarnings: {
    name: "totalEarnings",
    statistics: 0,
    preStatistics: "$",
    icon: <MoneyIcon className="text-[#20BAA5]" />,
    color: "bg-[#0ab39c2e]",
    // percentage: "16.24",
    // isIncreased: true,
    link: "",
    linkText: "viewNetEarnings",
  },
  orders: {
    name: "orders",
    statistics: "0",
    icon: <ShoppingBagIcon className="text-[#299cdb]" />,
    color: "bg-[#299cdb2e]",
    // percentage: "3.57",
    // isIncreased: false,
    link: "",
    linkText: "viewAllOrders",
  },
  customers: {
    name: "customers",
    statistics: "0",
    icon: <UserIcon className="text-[#f7b84b]" />,
    color: "bg-[#f7b84b2e]",
    // percentage: "29.08",
    // isIncreased: true,
    link: "",
    linkText: "seeDetails",
  },
  myBalance: {
    name: "myBalance",
    statistics: "0",
    preStatistics: "$",
    icon: <WalletIcon className="text-[#405189]" />,
    color: "bg-[#4051892e]",
    // percentage: "0.00",
    // isIncreased: "stable",
    link: "",
    linkText: "withdrawMoney",
  },
};

const Home = () => {
  const [statistics, setStatistics] = useState(dummyStatistics);
  const [isLoading, setIsLoading] = useState({
    totalEarnings: true,
    orders: true,
    customers: true,
  });

  const getTotalEarningsHandler = async () => {
    try {
      const { total: totalEarnings } = await getTotalEarning();
      setStatistics((prev) => {
        const totalEarningsObj = prev.totalEarnings;
        totalEarningsObj.statistics = totalEarnings;
        return { ...prev, totalEarnings: totalEarningsObj };
      });
    } catch (error) {}
    setIsLoading((prev) => ({ ...prev, totalEarnings: false }));
  };
  const getOrdersCountHandler = async () => {
    try {
      const { order_count } = await getCount("order");
      setStatistics((prev) => {
        const totalOrders = prev.orders;
        totalOrders.statistics = order_count;
        return { ...prev, orders: totalOrders };
      });
    } catch (error) {}
    setIsLoading((prev) => ({ ...prev, orders: false }));
  };
  const getCustomersCountHandler = async () => {
    try {
      const { user_count } = await getCount("user");
      setStatistics((prev) => {
        const totalCustomers = prev.customers;
        totalCustomers.statistics = user_count;
        return { ...prev, customers: totalCustomers };
      });
    } catch (error) {}
    setIsLoading((prev) => ({ ...prev, customers: false }));
  };

  useEffect(() => {
    getTotalEarningsHandler();
    getOrdersCountHandler();
    getCustomersCountHandler();
  }, []);

  const allIsLoading = Object.values(isLoading).reduce((acc, cur) => {
    return acc && cur;
  }, true);

  if (allIsLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <StatisticsCards data={statistics} />
    </div>
  );
};

export default Home;
