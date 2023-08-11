import React from "react";
import { redirect } from "react-router-dom";

import Login from "../Components/Auth/Login";
import NotAllowed from "../Components/Auth/NotAllowed";
import PageNotFound from "../Components/Auth/PageNotFound";
import { SingleUserTable } from "../Components/User/SingleUserTable";
import { menuData } from "../Helpers/menu";
import SelectProduct from "../Pages/ActionsFeatures/SelectProducts";
import UploadSheet from "../Pages/ActionsFeatures/UploadSheet";
import DynamicForm from "../Pages/Dynamics/DynamicForm";
import Update from "../Pages/Dynamics/Update";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Home from "../Pages/StandAlone/Home";
import HomeSections from "../Pages/StandAlone/HomeSections";
import SingleUser from "../Pages/StandAlone/SingleUser";
import { AddAddress, AddBrand, AddBulkAlert, AddCategory, AddChart, AddChartContent, AddChartData, AddCollection, AddColor, AddCountry, AddCoupon, AddCurrency, AddHomeReviewer, AddLanguage, AddNews, AddNewsletter, AddOffer, AddOrderStatus, AddPoint, AddProduct, AddRegion, AddReturnStatus, AddSale, AddSize, AddUser, AddWarehouse, AddWarehouseAvailability, InsertOne } from "./../Pages/Forms";
import { Addresses, Brands, BulkAlert, Categories, Chart, ChartContent, ChartData, Collections, Colors, Comments, Countries, Coupons, Currency, HomeReviews, Languages, Logs, News, Newsletter, NewsletterSubscription, Offers, OrderReturnRequests, Orders, OrderStatus, Points, ProductFeatures, Products, Regions, ReturnStatus, Sales, Sizes, Stocks, Users, WarehouseAvailability, Warehouses } from "./../Pages/Tables";
import AddShippingPrice from "../Pages/Forms/AddShippingPrice";
import ShippingPrices from "../Pages/Tables/ShippingPrice";

const authProtectedRoutes = [

  // **** Group Locations add paths ****
  { path: "/add-country", component: <AddCountry />, allowedRoles: ["superadmin"] },
  { path: "/add-currency", component: <AddCurrency />, allowedRoles: ["superadmin"] },
  { path: "/add-language", component: <AddLanguage />, allowedRoles: ["superadmin"] },
  { path: "/add-region", component: <AddRegion />, allowedRoles: ["superadmin"] },

  // **** Group Locations paths ****
  { path: "/address", component: <Addresses />, allowedRoles: ["superadmin"] },
  { path: "/country", component: <Countries />, allowedRoles: ["superadmin"] },
  { path: "/region", component: <Regions />, allowedRoles: ["superadmin"] },
  { path: "/currency", component: <Currency />, allowedRoles: ["superadmin"] },
  { path: "/language", component: <Languages />, allowedRoles: ["superadmin"] },

  // **** Group Content add paths ****
  { path: "/add-brand", component: <AddBrand />, allowedRoles: ["*"] },
  { path: "/add-product", component: <AddProduct />, allowedRoles: ["*"] },


  // **** Group Content paths ****
  { path: "/products", component: <Products />, allowedRoles: ["*"] },
  { path: "/brand", component: <Brands />, allowedRoles: ["*"] },
  { path: "/stocks", component: <Stocks />, allowedRoles: ["*"] },

  // **** Group Feature add paths ****
  { path: "/add-category", component: <AddCategory />, allowedRoles: ["*"] },
  { path: "/add-color", component: <AddColor />, allowedRoles: ["*"] },
  { path: "/add-size", component: <AddSize />, allowedRoles: ["*"] },
  {
    path: "/add-collar",
    component: <InsertOne layout="collar" />,
    allowedRoles: ["*"]
  },

  {
    path: "/add-fabric",
    component: <InsertOne layout="fabric" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-feature",
    component: <InsertOne layout="feature" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-lining",
    component: <InsertOne layout="lining" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-material",
    component: <InsertOne layout="material" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-pattern",
    component: <InsertOne layout="pattern" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-season",
    component: <InsertOne layout="season" />,
    allowedRoles: ["*"]
  },
  {
    path: "/add-sleeve",
    component: <InsertOne layout="sleeve" />,
    allowedRoles: ["*"]
  },


  // **** Group Feature paths ****
  { path: "/color", component: <Colors />, allowedRoles: ["*"] },
  { path: "/category", component: <Categories />, allowedRoles: ["*"] },
  { path: "/size", component: <Sizes />, allowedRoles: ["*"] },
  { path: "/product-features", component: <ProductFeatures />, allowedRoles: ["*"] },

  // **** Group Seasons add paths ****
  { path: "/add-sale", component: <AddSale />, allowedRoles: ["*"] },
  { path: "/add-offer", component: <AddOffer />, allowedRoles: ["*"] },
  { path: "/add-collection", component: <AddCollection />, allowedRoles: ["*"] },

  // **** Group Seasons paths ****
  { path: "/collection", component: <Collections />, allowedRoles: ["*"] },
  { path: "/offers", component: <Offers />, allowedRoles: ["*"] },
  { path: "/sale", component: <Sales />, allowedRoles: ["*"] },



  // **** Group Chart add paths ****
  { path: "/add-chart", component: <AddChart />, allowedRoles: ["*"] },
  { path: "/add-chart-content", component: <AddChartContent />, allowedRoles: ["*"] },
  { path: "/add-chart-data", component: <AddChartData />, allowedRoles: ["*"] },

  // **** Group Chart paths ****
  { path: "/chart", component: <Chart />, allowedRoles: ["*"] },
  { path: "/chart-content", component: <ChartContent />, allowedRoles: ["*"] },
  { path: "/chart-data", component: <ChartData />, allowedRoles: ["*"] },


  // **** Group News add paths ****
  { path: "/add-bulk-alert", component: <AddBulkAlert />, allowedRoles: ["*"] },
  { path: "/add-news", component: <AddNews />, allowedRoles: ["*"] },
  { path: "/add-newsletter", component: <AddNewsletter />, allowedRoles: ["*"] },

  // **** Group News paths ****
  { path: "/bulk-alert", component: <BulkAlert />, allowedRoles: ["*"] },
  { path: "/news", component: <News />, allowedRoles: ["*"] },
  { path: "/newsletter", component: <Newsletter />, allowedRoles: ["*"] },
  { path: "/newsletter-subscription", component: <NewsletterSubscription />, allowedRoles: ["*"] },


  // **** Group Orders add paths ****
  { path: "/add-order-status", component: <AddOrderStatus />, allowedRoles: ["superadmin"] },
  { path: "/add-return-status", component: <AddReturnStatus />, allowedRoles: ["superadmin"] },
  { path: "/add-warehouse", component: <AddWarehouse />, allowedRoles: ["*"] },
  { path: "/add-warehouse-availability", component: <AddWarehouseAvailability />, allowedRoles: ["*"] },
  { path: "/add-shipping-price", component: <AddShippingPrice />, allowedRoles: ["*"] },

  // **** Group Orders paths ****
  { path: "/orders", component: <Orders />, allowedRoles: ["*"] },
  { path: "/order-return-requests", component: <OrderReturnRequests />, allowedRoles: ["*"] },
  { path: "/order-status", component: <OrderStatus />, allowedRoles: ["*"] },
  { path: "/return-status", component: <ReturnStatus />, allowedRoles: ["*"] },
  { path: "/warehouses", component: <Warehouses />, allowedRoles: ["*"] },
  { path: "/warehouse-availability", component: <WarehouseAvailability />, allowedRoles: ["*"] },
  { path: "/shipping-prices", component: <ShippingPrices />, allowedRoles: ["*"] },

  // **** Group Award add paths ****
  { path: "/add-point", component: <AddPoint />, allowedRoles: ["*"] },
  { path: "/add-coupon", component: <AddCoupon />, allowedRoles: ["*"] },

  // **** Group Award paths ****
  { path: "/coupons", component: <Coupons />, allowedRoles: ["*"] },
  { path: "/points", component: <Points />, allowedRoles: ["*"] },

  // **** Group Interactive paths ****
  { path: "/home-reviews", component: <HomeReviews />, allowedRoles: ["*"] },
  { path: "/add-review", component: <AddHomeReviewer />, allowedRoles: ["*"] },
  { path: "/comments", component: <Comments />, allowedRoles: ["*"] },


  // **** Group User paths ****
  { path: "/users", component: <Users />, allowedRoles: ["*"] },
  { path: "/add-user", component: <AddUser />, allowedRoles: ["*"] },
  { path: "/users/:id", component: <SingleUser />, allowedRoles: ["*"] },
  { path: "/users/:id/:name", component: <SingleUserTable />, allowedRoles: ["*"] },

  // **** Group Update paths ****
  { path: "/update/:name/:id", component: <Update />, allowedRoles: ["*"] },
  {
    path: "/products/update/product/:id",
    component: <AddProduct layout="update" />,
    allowedRoles: ["*"]
  },

  // **** Group Useful actions paths ****
  { path: "/logs", component: <Logs />, allowedRoles: ["*"] },
  { path: "/select-products", component: <SelectProduct />, allowedRoles: ["*"] },
  { path: "/upload-sheet", component: <UploadSheet />, allowedRoles: ["*"] },
  { path: "/send-email", component: "" },
  { path: "/home-sections", component: <HomeSections />, allowedRoles: ["*"] },



  // **** Group public paths ****
  { path: "/", component: <Home />, allowedRoles: ["*"] },
  { path: "*", component: <NotAllowed />, allowedRoles: ["*"] },
  { path: "/not-found", component: <PageNotFound />, allowedRoles: ["*"] },


];

const publicRoutes = [{ path: "/login", component: <Login /> }];
export { authProtectedRoutes, publicRoutes };

