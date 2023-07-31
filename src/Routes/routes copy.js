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

const authProtectedRoutes = {
  // **** Group Locations add paths ****
  addCountry: { path: "/add-country", component: <AddCountry /> },
  addCurrency: { path: "/add-currency", component: <AddCurrency /> },
  addLanguage: { path: "/add-language", component: <AddLanguage /> },
  addRegion: { path: "/add-region", component: <AddRegion /> },

  // **** Group Locations paths ****
  address: { path: "/address", component: <Addresses /> },
  country: { path: "/country", component: <Countries /> },
  region: { path: "/region", component: <Regions /> },
  currency: { path: "/currency", component: <Currency /> },

  // **** Group Content add paths ****
  addBrand: { path: "/add-brand", component: <AddBrand /> },
  addProduct: { path: "/add-product", component: <AddProduct /> },


  // **** Group Content paths ****
  products: { path: "/products", component: <Products /> },
  brand: { path: "/brand", component: <Brands /> },
  stocks: { path: "/stocks", component: <Stocks /> },

  // **** Group Feature add paths ****
  addCategory: { path: "/add-category", component: <AddCategory /> },
  addColor: { path: "/add-color", component: <AddColor /> },
  addSize: { path: "/add-size", component: <AddSize /> },
  addCollar: {
    path: "/add-collar",
    component: <InsertOne layout="collar" />,
  },

  addFabric: {
    path: "/add-fabric",
    component: <InsertOne layout="fabric" />,
  },
  addFeature: {
    path: "/add-feature",
    component: <InsertOne layout="feature" />,
  },
  addLining: {
    path: "/add-lining",
    component: <InsertOne layout="lining" />,
  },
  addMaterial: {
    path: "/add-material",
    component: <InsertOne layout="material" />,
  },
  addPattern: {
    path: "/add-pattern",
    component: <InsertOne layout="pattern" />,
  },
  addSeason: {
    path: "/add-season",
    component: <InsertOne layout="season" />,
  },
  addSleeve: {
    path: "/add-sleeve",
    component: <InsertOne layout="sleeve" />,
  },


  // **** Group Feature paths ****
  color: { path: "/color", component: <Colors /> },
  category: { path: "/category", component: <Categories /> },
  size: { path: "/size", component: <Sizes /> },
  productFeatures: { path: "/product-features", component: <ProductFeatures /> },

  // **** Group Seasons add paths ****
  addSale: { path: "/add-sale", component: <AddSale /> },
  addOffer: { path: "/add-offer", component: <AddOffer /> },
  addCollection: { path: "/add-collection", component: <AddCollection /> },

  // **** Group Seasons paths ****
  collection: { path: "/collection", component: <Collections /> },
  offers: { path: "/offers", component: <Offers /> },
  sale: { path: "/sale", component: <Sales /> },

  // **** Group Chart add paths ****
  addChart: { path: "/add-chart", component: <AddChart /> },
  addChartContent: { path: "/add-chart-content", component: <AddChartContent /> },
  addChartData: { path: "/add-chart-data", component: <AddChartData /> },

  // **** Group Chart paths ****
  chart: { path: "/chart", component: <Chart /> },
  chartContent: { path: "/chart-content", component: <ChartContent /> },
  chartData: { path: "/chart-data", component: <ChartData /> },


  // **** Group News add paths ****
  addBulkAlert: { path: "/add-bulk-alert", component: <AddBulkAlert /> },
  addNews: { path: "/add-news", component: <AddNews /> },
  addNewsletter: { path: "/add-newsletter", component: <AddNewsletter /> },

  // **** Group News paths ****
  bulkAlert: { path: "/bulk-alert", component: <BulkAlert /> },
  news: { path: "/news", component: <News /> },
  newsletter: { path: "/newsletter", component: <Newsletter /> },
  newsletterSubscription: { path: "/newsletter-subscription", component: <NewsletterSubscription /> },


  // **** Group Orders add paths ****
  addOrderStatus: { path: "/add-order-status", component: <AddOrderStatus /> },
  addReturnStatus: { path: "/add-return-status", component: <AddReturnStatus /> },
  addWarehouse: { path: "/add-warehouse", component: <AddWarehouse /> },
  addWarehouseAvailability: { path: "/add-warehouse-availability", component: <AddWarehouseAvailability /> },

  // **** Group Orders paths ****
  orders: { path: "/orders", component: <Orders /> },
  orderReturnRequest: { path: "/order-return-requests", component: <OrderReturnRequests /> },
  orderStatus: { path: "/order-status", component: <OrderStatus /> },
  returnStatus: { path: "/return-status", component: <ReturnStatus /> },
  warehouses: { path: "/warehouses", component: <Warehouses /> },
  warehouseAvailability: { path: "/warehouse-availability", component: <WarehouseAvailability /> },

  // **** Group Award add paths ****
  addPoint: { path: "/add-point", component: <AddPoint /> },
  addCoupon: { path: "/add-coupon", component: <AddCoupon /> },

  // **** Group Award paths ****
  coupons: { path: "/coupons", component: <Coupons /> },
  points: { path: "/points", component: <Points /> },

  // **** Group Interactive paths ****
  homeReviews: { path: "/home-reviews", component: <HomeReviews /> },
  addReview: { path: "/add-review", component: <AddHomeReviewer /> },
  comments: { path: "/comments", component: <Comments /> },


  // **** Group User paths ****
  users: { path: "/users", component: <Users /> },
  addUser: { path: "/add-user", component: <AddUser /> },
  singleUser: { path: "/users/:id", component: <SingleUser /> },
  singleUserInfo: { path: "/users/:id/:name", component: <SingleUserTable /> },

  // **** Group Update paths ****
  update: { path: "/update/:name/:id", component: <Update /> },
  updateProduct: {
    path: "/products/update/product/:id",
    component: <AddProduct layout="update" />,
  },

  // **** Group Useful actions paths ****
  logs: { path: "/logs", component: <Logs /> },
  selectProducts: { path: "/select-products", component: <SelectProduct /> },
  uploadSheet: { path: "/upload-sheet", component: <UploadSheet /> },
  sendEmail: { path: "/send-email", component: "" },
  homeSections: { path: "/home-sections", component: <HomeSections /> },



  // **** Group public paths ****
  home: { path: "/", component: <Home /> },
  notAllowed: { path: "*", component: <NotAllowed /> },
  notFound: { path: "/not-found", component: <PageNotFound /> },

};

const publicRoutes = [{ path: "/login", component: <Login /> }];
export { authProtectedRoutes, publicRoutes };

// const AuthorizedDashboard = withAuthorization(Dashboard, ['admin', 'manager']);
// const AuthorizedProfile = withAuthorization(Profile, ['admin', 'user']);
