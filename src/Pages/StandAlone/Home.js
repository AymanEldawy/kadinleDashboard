import React, { useEffect } from "react";
import { useState } from "react";

import {
  getCount,
  getRecentOrders,
  getRecentUser,
  getTotalEarning,
} from "../../Api/statictes";
import SuperTable from "../../Components/CustomTable/SuperTable";
import MoneyIcon from "../../Components/icons/MoneyIcon";
import ShoppingBagIcon from "../../Components/icons/ShoppingBagIcon";
import UserIcon from "../../Components/icons/UserIcon";
import SkeletonCard from "../../Components/StatisticsCards/SkeletonCard";
import StatisticsCards from "../../Components/StatisticsCards/StatisticsCards";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { StoreIcon } from "../../Helpers/Icons";
import DynamicList from "../Dynamics/DynamicList";
import { supabase } from "../../Helpers/SupabaseConfig/SupabaseConfig";
import { generateForm } from "../../Helpers/functions";

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
    // generateForm();
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

  const insert = async () => {
    // const products = await supabase
    //   .from("product")
    //   .select("*, product_variant(id)")
    //   .in(
    //     "product_sku",
    //     [
    //       95080, 94653, 82469, 640803, 649417, 94781, 682081, 81585, 681695,
    //       94107, 182876, 229209, 60452, 637497, 209895, 699885, 236015, 696303,
    //       214215, 202046, 211456, 692834, 94074, 94380, 96061, 330873, 642179,
    //       94978, 318330,
    //     ]
    //   );
    // let orders = [];
    // for (const product of products?.data) {
    //   orders.push({
    //     order_id: "13b5cf80-58da-4f45-a20c-eea296b6c4fb",
    //     variant_id: product?.product_variant.at(0)?.id,
    //     quantity: 2,
    //   });
    // }

    // const res = await supabase.from("order_content").insert(orders);

    //
    const products = await supabase
      .from("product")
      .select("*")
      .in(
        "product_sku",
        [
          94648, 94895, 706463, 81984, 692352, 94396, 94054, 96124, 82807,
          95033, 211381, 203255, 93753, 623328, 695903, 94019, 94111, 211437,
          696233, 189825, 210412, 703296, 83012, 82526, 95221, 641914, 94577,
          625105, 94815,
        ]
      );
    let orders = [];
    for (const product of products?.data) {
      orders.push({
        user_id: "a3471155-2cb0-4083-b885-6f174205503e",
        product_id: product?.id,
      });
    }

    const res = await supabase.from("user_like").insert(orders);
  };
  return (
    <div>
      <StatisticsCards data={statistics} />
      {/* <button onClick={insert}>load</button> */}
      <div className="grid items-start grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <div className="dark:bg-bgmaindark bg-white shadow ">
          <h4 className="font-medium dark:text-white text-gray-800 text-lg p-2">
            Recent Orders
          </h4>
          <DynamicList
            tableName="order"
            columns={COMBINE_DB_API?.combine_order_short}
            hideBar
            hideAction
            oldData={orders}
            hidePagination
            hideSelect
          />
        </div>
        <div className="dark:bg-bgmaindark bg-white shadow  overflow-auto">
          <h4 className="font-medium dark:text-white text-gray-800 text-lg p-2">
            Recent Users
          </h4>
          <SuperTable
            columns={COMBINE_DB_API?.combine_user()}
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
