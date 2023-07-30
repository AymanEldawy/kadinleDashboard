import React from "react";
import { redirect } from "react-router-dom";

import Login from "../Components/Auth/Login";
import NotAllowed from "../Components/Auth/NotAllowed";
import PageNotFound from "../Components/Auth/PageNotFound";
import { menuData } from "../Helpers/menu";
import SelectProduct from "../Pages/ActionsFeatures/SelectProducts";
import UploadSheet from "../Pages/ActionsFeatures/UploadSheet";
import DynamicForm from "../Pages/Dynamics/DynamicForm";
import Update from "../Pages/Dynamics/Update";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Home from "../Pages/StandAlone/Home";
import HomeSections from "../Pages/StandAlone/HomeSections";
import SingleUser from "../Pages/StandAlone/SingleUser";
import {
  AddAddress,
  AddBrand,
  AddBulkAlert,
  AddCategory,
  AddChart,
  AddChartContent,
  AddChartData,
  AddCollection,
  AddColor,
  AddCountry,
  AddCoupon,
  AddCurrency,
  AddHomeReviewer,
  AddLanguage,
  AddNews,
  AddNewsletter,
  AddOffer,
  AddOrderStatus,
  AddPoint,
  AddProduct,
  AddRegion,
  AddReturnStatus,
  AddSale,
  AddSize,
  AddUser,
  AddWarehouse,
  AddWarehouseAvailability,
  InsertOne,
} from "./../Pages/Forms";
import {
  Addresses,
  Brands,
  BulkAlert,
  Categories,
  Chart,
  ChartContent,
  ChartData,
  Collections,
  Colors,
  Comments,
  Countries,
  Coupons,
  Currency,
  HomeReviews,
  Languages,
  Logs,
  News,
  Newsletter,
  NewsletterSubscription,
  Offers,
  OrderReturnRequests,
  Orders,
  OrderStatus,
  Points,
  ProductFeatures,
  Products,
  Regions,
  ReturnStatus,
  Sales,
  Sizes,
  Stocks,
  Users,
  WarehouseAvailability,
  Warehouses,
} from "./../Pages/Tables";
import { SingleUserTable } from "../Components/User/SingleUserTable";

const authProtectedRoutes = [

  // **** Group Locations add paths ****
  { path: "/add-country", component: <AddCountry /> },
  { path: "/add-currency", component: <AddCurrency /> },
  { path: "/add-language", component: <AddLanguage /> },
  { path: "/add-region", component: <AddRegion /> },

  // **** Group Locations paths ****
  { path: "/address", component: <Addresses /> },
  { path: "/country", component: <Countries /> },
  { path: "/region", component: <Regions /> },
  { path: "/currency", component: <Currency /> },

  // **** Group Content add paths ****
  { path: "/add-brand", component: <AddBrand /> },
  { path: "/add-product", component: <AddProduct /> },


  // **** Group Content paths ****
  { path: "/products", component: <Products /> },
  { path: "/brand", component: <Brands /> },
  { path: "/stocks", component: <Stocks /> },

  // **** Group Feature add paths ****
  { path: "/add-category", component: <AddCategory /> },
  { path: "/add-color", component: <AddColor /> },
  { path: "/add-size", component: <AddSize /> },
  {
    path: "/add-collar",
    component: <InsertOne layout="collar" />,
  },

  {
    path: "/add-fabric",
    component: <InsertOne layout="fabric" />,
  },
  {
    path: "/add-feature",
    component: <InsertOne layout="feature" />,
  },
  {
    path: "/add-lining",
    component: <InsertOne layout="lining" />,
  },
  {
    path: "/add-material",
    component: <InsertOne layout="material" />,
  },
  {
    path: "/add-pattern",
    component: <InsertOne layout="pattern" />,
  },
  {
    path: "/add-season",
    component: <InsertOne layout="season" />,
  },
  {
    path: "/add-sleeve",
    component: <InsertOne layout="sleeve" />,
  },


  // **** Group Feature paths ****
  { path: "/color", component: <Colors /> },
  { path: "/category", component: <Categories /> },
  { path: "/size", component: <Sizes /> },
  { path: "/product-features", component: <ProductFeatures /> },

  // **** Group Seasons add paths ****
  { path: "/add-sale", component: <AddSale /> },
  { path: "/add-offer", component: <AddOffer /> },
  { path: "/add-collection", component: <AddCollection /> },

  // **** Group Seasons paths ****
  { path: "/collection", component: <Collections /> },
  { path: "/offers", component: <Offers /> },
  { path: "/sale", component: <Sales /> },



  // **** Group Chart add paths ****
  { path: "/add-chart", component: <AddChart /> },
  { path: "/add-chart-content", component: <AddChartContent /> },
  { path: "/add-chart-data", component: <AddChartData /> },

  // **** Group Chart paths ****
  { path: "/chart", component: <Chart /> },
  { path: "/chart-content", component: <ChartContent /> },
  { path: "/chart-data", component: <ChartData /> },


  // **** Group News add paths ****
  { path: "/add-bulk-alert", component: <AddBulkAlert /> },
  { path: "/add-news", component: <AddNews /> },
  { path: "/add-newsletter", component: <AddNewsletter /> },

  // **** Group News paths ****
  { path: "/bulk-alert", component: <BulkAlert /> },
  { path: "/news", component: <News /> },
  { path: "/newsletter", component: <Newsletter /> },
  { path: "/newsletter-subscription", component: <NewsletterSubscription /> },


  // **** Group Orders add paths ****
  { path: "/add-order-status", component: <AddOrderStatus /> },
  { path: "/add-return-status", component: <AddReturnStatus /> },
  { path: "/add-warehouse", component: <AddWarehouse /> },
  { path: "/add-warehouse-availability", component: <AddWarehouseAvailability /> },

  // **** Group Orders paths ****
  { path: "/orders", component: <Orders /> },
  { path: "/order-return-requests", component: <OrderReturnRequests /> },
  { path: "/order-status", component: <OrderStatus /> },
  { path: "/return-status", component: <ReturnStatus /> },
  { path: "/warehouses", component: <Warehouses /> },
  { path: "/warehouse-availability", component: <WarehouseAvailability /> },

  // **** Group Award add paths ****
  { path: "/add-point", component: <AddPoint /> },
  { path: "/add-coupon", component: <AddCoupon /> },

  // **** Group Award paths ****
  { path: "/coupons", component: <Coupons /> },
  { path: "/points", component: <Points /> },

  // **** Group Interactive paths ****
  { path: "/home-reviews", component: <HomeReviews /> },
  { path: "/add-review", component: <AddHomeReviewer /> },
  { path: "/comments", component: <Comments /> },


  // **** Group User paths ****
  { path: "/users", component: <Users /> },
  { path: "/add-user", component: <AddUser /> },
  { path: "/users/:id", component: <SingleUser /> },
  { path: "/users/:id/:name", component: <SingleUserTable /> },

  // **** Group Update paths ****
  { path: "/update/:name/:id", component: <Update /> },
  {
    path: "/products/update/product/:id",
    component: <AddProduct layout="update" />,
  },

  // **** Group Useful actions paths ****
  { path: "/logs", component: <Logs /> },
  { path: "/select-products", component: <SelectProduct /> },
  { path: "/upload-sheet", component: <UploadSheet /> },
  { path: "/send-email", component: "" },
  { path: "/home-sections", component: <HomeSections /> },



  // **** Group public paths ****
  { path: "/", component: <Home /> },
  { path: "*", component: <NotAllowed /> },
  { path: "/not-found", component: <PageNotFound /> },


];

const publicRoutes = [{ path: "/login", component: <Login /> }];
export { authProtectedRoutes, publicRoutes };

// const AuthorizedDashboard = withAuthorization(Dashboard, ['admin', 'manager']);
// const AuthorizedProfile = withAuthorization(Profile, ['admin', 'user']);
