import React from "react";
import { redirect } from "react-router-dom";

import { menuData } from "../Helpers/menu";
import DynamicForm from "../Pages/Dynamics/DynamicForm";
import Update from "../Pages/Dynamics/Update";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import {
  AddHomeReviewer,
  AddAddress,
  AddBrand,
  AddBulkAlert,
  AddCategory,
  AddCategoryContent,
  AddChart,
  AddChartContent,
  AddChartData,
  AddCollection,
  AddCollectionContent,
  AddColor,
  AddColorContent,
  AddCountry,
  AddCoupon,
  AddCurrency,
  AddLanguage,
  AddNews,
  AddNewsletter,
  AddOffer,
  AddOrderStatus,
  AddPoint,
  AddProduct,
  AddProductImages,
  AddProductVariants,
  AddRegion,
  AddReturnStatus,
  AddSale,
  AddSize,
  AddSizeContent,
  InsertOne,
  AddUser,
} from "./../Pages/Forms";
import Home from "../Pages/StandAlone/Home";
import SingleUser from "../Pages/StandAlone/SingleUser";
import {
  Addresses,
  Brands,
  BulkAlert,
  Categories,
  CategoriesContent,
  Chart,
  ChartContent,
  ChartData,
  Collections,
  CollectionsContent,
  Colors,
  ColorsContent,
  Comments,
  Countries,
  Coupons,
  Currency,
  GlobalList,
  HomeReviews,
  Languages,
  Logs,
  News,
  Newsletter,
  NewsletterSubscription,
  Offers,
  OrderReturnRequests,
  OrderStatus,
  Orders,
  Points,
  ProductFeatures,
  Products,
  Regions,
  ReturnStatus,
  Sales,
  Showreels,
  Sizes,
  SizesContent,
  Stocks,
  Users,
  WarehouseAvailability,
  Warehouses,
} from "./../Pages/Tables";
import SelectProduct from "../Pages/ActionsFeatures/SelectProducts";
import UploadSheet from "../Pages/ActionsFeatures/UploadSheet";
import Login from "../Components/Auth/Login";
import PageNotFound from "../Components/Auth/PageNotFound";
import NotAllowed from "../Components/Auth/NotAllowed";

const authProtectedRoutes = [
  // add paths
  // { path: "/add-address", component: <AddAddress /> },
  // { path: "/add-language", component: <AddLanguage /> },
  { path: "/add-category", component: <AddCategory /> },
  { path: "/add-category-content", component: <AddCategoryContent /> },
  { path: "/add-color", component: <AddColor /> },
  { path: "/add-color-content", component: <AddColorContent /> },
  { path: "/add-country", component: <AddCountry /> },
  { path: "/add-collection-content", component: <AddCollectionContent /> },
  { path: "/add-collection", component: <AddCollection /> },
  { path: "/add-chart", component: <AddChart /> },
  { path: "/add-chart-content", component: <AddChartContent /> },
  { path: "/add-chart-data", component: <AddChartData /> },
  { path: "/add-bulk-alert", component: <AddBulkAlert /> },
  { path: "/add-region", component: <AddRegion /> },
  { path: "/add-news", component: <AddNews /> },
  { path: "/add-newsletter", component: <AddNewsletter /> },
  { path: "/add-brand", component: <AddBrand /> },
  { path: "/add-review", component: <AddHomeReviewer /> },
  {
    path: "/add-collar",
    component: <InsertOne layout="collar" title="add collar" />,
  },
  { path: "/add-coupon", component: <AddCoupon /> },
  { path: "/add-currency", component: <AddCurrency /> },
  {
    path: "/add-fabric",
    component: <InsertOne layout="fabric" title="add fabric" />,
  },
  {
    path: "/add-feature",
    component: <InsertOne layout="feature" title="add feature" />,
  },
  {
    path: "/add-lining",
    component: <InsertOne layout="lining" title="add lining" />,
  },
  {
    path: "/add-material",
    component: <InsertOne layout="material" title="add material" />,
  },
  {
    path: "/add-pattern",
    component: <InsertOne layout="pattern" title="add pattern" />,
  },
  {
    path: "/add-season",
    component: <InsertOne layout="season" title="add season" />,
  },
  {
    path: "/add-sleeve",
    component: <InsertOne layout="sleeve" title="add sleeve" />,
  },
  { path: "/add-sale", component: <AddSale /> },
  { path: "/add-size", component: <AddSize /> },
  { path: "/add-size-content", component: <AddSizeContent /> },
  { path: "/add-product", component: <AddProduct /> },
  { path: "/add-product-variants", component: <AddProductVariants /> },
  { path: "/add-product-images", component: <AddProductImages /> },
  { path: "/add-offer", component: <AddOffer /> },
  { path: "/add-point", component: <AddPoint /> },
  { path: "/add-order-status", component: <AddOrderStatus /> },
  { path: "/add-return-status", component: <AddReturnStatus /> },
  { path: "/add-user", component: <AddUser /> },

  // update
  // { path: "/update/:name/:id", component: <DynamicForm layout="update" /> },
  { path: "/update/:name/:id", component: <Update /> },

  // list or table paths
  { path: "/product", component: <Products /> },
  { path: "/color", component: <Colors /> },
  { path: "/colors-content", component: <ColorsContent /> },
  { path: "/category", component: <Categories /> },
  { path: "/categories-content", component: <CategoriesContent /> },
  // { path: "/language", component: <Languages /> },
  { path: "/size", component: <Sizes /> },
  { path: "/sizes-content", component: <SizesContent /> },
  { path: "/address", component: <Addresses /> },
  { path: "/country", component: <Countries /> },
  { path: "/region", component: <Regions /> },
  { path: "/orders", component: <Orders /> },
  { path: "/users", component: <Users /> },
  { path: "/chart", component: <Chart /> },
  { path: "/chart-content", component: <ChartContent /> },
  { path: "/chart-data", component: <ChartData /> },
  { path: "/collection", component: <Collections /> },
  { path: "/collection-content", component: <CollectionsContent /> },
  { path: "/bulk-alert", component: <BulkAlert /> },
  { path: "/logs", component: <Logs /> },
  { path: "/news", component: <News /> },
  { path: "/newsletter", component: <Newsletter /> },
  { path: "/newsletter-subscription", component: <NewsletterSubscription /> },
  { path: "/comments", component: <Comments /> },
  { path: "/brand", component: <Brands /> },
  { path: "/product-features", component: <ProductFeatures /> },
  { path: "/coupons", component: <Coupons /> },
  { path: "/currency", component: <Currency /> },
  { path: "/offers", component: <Offers /> },
  { path: "/points", component: <Points /> },
  {
    path: "/fabric",
    component: (
      <GlobalList table="fabric" title="fabric" addHref="add-fabric" />
    ),
  },
  {
    path: "/feature",
    component: (
      <GlobalList table="feature" title="feature" addHref="add-feature" />
    ),
  },
  {
    path: "/lining",
    component: (
      <GlobalList table="lining" title="lining" addHref="add-lining" />
    ),
  },
  {
    path: "/material",
    component: (
      <GlobalList table="material" title="material" addHref="add-material" />
    ),
  },
  {
    path: "/pattern",
    component: (
      <GlobalList table="pattern" title="pattern" addHref="add-pattern" />
    ),
  },
  {
    path: "/season",
    component: (
      <GlobalList table="season" title="season" addHref="add-season" />
    ),
  },
  {
    path: "/sleeve",
    component: (
      <GlobalList table="sleeve" title="sleeve" addHref="add-sleeve" />
    ),
  },
  { path: "/sale", component: <Sales /> },
  { path: "/home-reviews", component: <HomeReviews /> },
  { path: "/order-return-requests", component: <OrderReturnRequests /> },
  { path: "/order-return-requests", component: <OrderReturnRequests /> },
  { path: "/stocks", component: <Stocks /> },
  { path: "/warehouse-availability", component: <WarehouseAvailability /> },
  { path: "/showreels", component: <Showreels /> },
  { path: "/warehouses", component: <Warehouses /> },
  { path: "/order-status", component: <OrderStatus /> },
  { path: "/return-status", component: <ReturnStatus /> },

  //
  { path: "/users/:id", component: <SingleUser /> },
  // actions
  { path: "/return-status", component: <ReturnStatus /> },
  { path: "/select-products", component: <SelectProduct /> },
  { path: "/upload-sheet", component: <UploadSheet /> },
  { path: "/send-email", component: "" },
  { path: "/", component: <Home /> },
  { path: "*", component: <NotAllowed /> },
  { path: "/not-found", component: <PageNotFound /> },
];

const publicRoutes = [{ path: "/login", component: <Login /> }];
export { authProtectedRoutes, publicRoutes };

// const AuthorizedDashboard = withAuthorization(Dashboard, ['admin', 'manager']);
// const AuthorizedProfile = withAuthorization(Profile, ['admin', 'user']);
