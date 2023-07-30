import React, { useEffect } from "react";
import StatisticsCards from "../../Components/StatisticsCards/StatisticsCards";
import { useState } from "react";
import MoneyIcon from "../../Components/icons/MoneyIcon";
import ShoppingBagIcon from "../../Components/icons/ShoppingBagIcon";
import UserIcon from "../../Components/icons/UserIcon";
import WalletIcon from "../../Components/icons/WalletIcon";
import {
  bestSelling,
  getCount,
  getRecentOrders,
  getRecentUser,
  getTotalEarning,
} from "../../Api/statictes";
import SkeletonCard from "../../Components/StatisticsCards/SkeletonCard";
import DynamicList from "../Dynamics/DynamicList";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import SuperTable from "../../Components/CustomTable/SuperTable";
import DB_API from "../../Helpers/Forms/databaseApi";
import { StoreIcon } from "../../Helpers/Icons";

const dummyStatistics = {
  totalEarnings: {
    name: "totalEarnings",
    statistics: 0,
    preStatistics: "$",
    icon: <MoneyIcon className="text-[#20BAA5]" />,
    color: "bg-[#0ab39c2e]",
    // percentage: "16.24",
    // isIncreased: true,
    link: "/order",
    linkText: "view net earnings",
  },
  orders: {
    name: "orders",
    statistics: "0",
    icon: <ShoppingBagIcon className="text-[#299cdb]" />,
    color: "bg-[#299cdb2e]",
    // percentage: "3.57",
    // isIncreased: false,
    link: "/orders",
    linkText: "view all orders",
  },
  customers: {
    name: "customers",
    statistics: "0",
    icon: <UserIcon className="text-[#f7b84b]" />,
    color: "bg-[#f7b84b2e]",
    // percentage: "29.08",
    // isIncreased: true,
    link: "/users",
    linkText: "see details",
  },
  warehouses: {
    name: "warehouses",
    statistics: "0",
    icon: <StoreIcon className="text-[#405189]" />,
    color: "bg-[#4051892e]",
    // percentage: "0.00",
    // isIncreased: "stable",
    link: "/warehouses",
    linkText: "see warehouses",
  },
};

const Home = () => {
  const [statistics, setStatistics] = useState(dummyStatistics);
  const [orders, setOrders] = useState([]);
  // const [bestSelling, setBestSelling] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  // const [stocks, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState({
    totalEarnings: true,
    orders: true,
    customers: true,
  });

  const getUsers = async () => {
    const response = await getRecentUser();
    setRecentUsers(response?.data);
  };

  const getOrders = async () => {
    const response = await getRecentOrders();
    setOrders(response);
  };

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
  const getStockHandler = async () => {
    try {
      const { warehouse_count } = await getCount("warehouse");
      setStatistics((prev) => {
        const totalWarehouses = prev.warehouses;
        totalWarehouses.statistics = warehouse_count;
        return { ...prev, warehouses: totalWarehouses };
      });
    } catch (error) {}
    setIsLoading((prev) => ({ ...prev, Products: false }));
  };

  useEffect(() => {
    getTotalEarningsHandler();
    getOrdersCountHandler();
    getCustomersCountHandler();
    getStockHandler();
    // getBestSelling();
    getOrders();
    getUsers();
    // getStocks();
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
      <div className="grid  items-start grid-cols-1 md:grid-cols-2 gap-8">
        <div className="dark:bg-bgmaindark bg-white shadow my-8">
          <h4 className="font-medium text-gray-800 text-lg p-2">
            Recent Orders
          </h4>
          <DynamicList
            tableName="order"
            columns={COMBINE_DB_API.combine_order_short}
            hideBar
            hideAction
            oldData={orders}
            hidePagination
            hideSelect
          />
        </div>
        <div className="dark:bg-bgmaindark bg-white shadow my-8">
          <h4 className="font-medium text-gray-800 text-lg p-2">
            Recent Users
          </h4>
          <SuperTable
            columns={COMBINE_DB_API.combine_user}
            tableName="user"
            data={recentUsers}
            hideBar
            hideAction
            hidePagination
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
