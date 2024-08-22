import React from "react";

import Login from "../Components/Auth/Login";
import NotAllowed from "../Components/Auth/NotAllowed";
import PageNotFound from "../Components/Auth/PageNotFound";
import { SingleUserTable } from "../Components/User/SingleUserTable";
import SelectProduct from "../Pages/ActionsFeatures/SelectProducts";
import UploadSheet from "../Pages/ActionsFeatures/UploadSheet";
import Update from "../Pages/Dynamics/Update";
import AddShippingPrice from "../Pages/Forms/AddShippingPrice";
import EmailSender from "../Pages/StandAlone/EmailSender";
import Home from "../Pages/StandAlone/Home";
import HomeSections from "../Pages/StandAlone/HomeSections";
import SingleUser from "../Pages/StandAlone/SingleUser";
import BillReports from "../Pages/Tables/BillReports";
import Bills from "../Pages/Tables/Bills";
import OrderReports from "../Pages/Tables/OrderReports";
import ShippingPrices from "../Pages/Tables/ShippingPrice";
import {
  AddBrand,
  AddBulkAlert,
  AddCategory,
  AddChart,
  AddChartContent,
  AddChartData,
  AddChunks,
  AddCollection,
  AddColor,
  AddCountry,
  AddCoupon,
  AddCurrency,
  AddDefinitions,
  AddHomeReviewer,
  AddHomeSlider,
  AddLanguage,
  AddLessThan,
  AddNewSupplier,
  AddNews,
  AddNewsletter,
  AddOffer,
  AddOrderStatus,
  AddPartner,
  AddPoint,
  AddProduct,
  AddRegion,
  AddReturnStatus,
  AddSale,
  AddSize,
  AddSupplierRequest,
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
  ChartContent,
  ChartData,
  Collections,
  CollectionsProducts,
  Colors,
  Comments,
  Countries,
  Coupons,
  Currency,
  Definitions,
  HomeReviews,
  Languages,
  LessThan,
  Logs,
  News,
  Newsletter,
  NewsletterSubscription,
  Offers,
  OffersProducts,
  OrderReturnRequests,
  Orders,
  OrderStatus,
  Partners,
  Points,
  ProductFeatures,
  Products,
  Regions,
  ReturnStatus,
  Sales,
  Sizes,
  Stocks,
  SupplierRequest,
  Suppliers,
  Users,
  WarehouseAvailability,
  Warehouses,
} from "./../Pages/Tables";
import SpecialOffer from "../Pages/Tables/SepcialOffer";
import Support from "../Pages/StandAlone/Support";
import ChatRoom from "../Pages/StandAlone/ChatRoom";
import ChatSetting from "../Pages/StandAlone/ChatSetting";
import SingleSupplier from "../Pages/StandAlone/SingleSupplier";
import XMLImport from "../Pages/StandAlone/XMLImport";
import HomeSliders from "../Pages/Tables/HomeSliders";
import ProductsSlider from "../Pages/Tables/ProductsSlider";
import ProductsSLidersForm from "../Pages/StandAlone/ProductsSLidersForm";
import SupplierProducts from "../Pages/StandAlone/SupplierProducts";
import Chunks from "../Pages/Tables/Chunks";
import MoveCategory from "../Pages/StandAlone/MoveCategory";

const authProtectedRoutes = [
  // **** Group Locations add paths ****
  {
    path: "/add-country",
    component: <AddCountry />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/add-currency",
    component: <AddCurrency />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/add-language",
    component: <AddLanguage />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/add-region",
    component: <AddRegion />,
    allowedRoles: ["superadmin"],
  },

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
  // **** Group Feature paths ****
  { path: "/color", component: <Colors />, allowedRoles: ["*"] },
  { path: "/category", component: <Categories />, allowedRoles: ["*"] },
  { path: "/size", component: <Sizes />, allowedRoles: ["*"] },
  // {
  //   path: "/product-features",
  //   component: <ProductFeatures />,
  //   allowedRoles: ["*"],
  // },

  // **** Group Seasons add paths ****
  { path: "/add-sale", component: <AddSale />, allowedRoles: ["*"] },
  { path: "/add-offer", component: <AddOffer />, allowedRoles: ["*"] },
  {
    path: "/add-collection",
    component: <AddCollection />,
    allowedRoles: ["*"],
  },

  // **** Group Seasons paths ****
  { path: "/collection", component: <Collections />, allowedRoles: ["*"] },
  {
    path: "/collections/products",
    component: <CollectionsProducts />,
    allowedRoles: ["*"],
  },
  { path: "/offers", component: <Offers />, allowedRoles: ["*"] },
  {
    path: "/offers/products",
    component: <OffersProducts />,
    allowedRoles: ["*"],
  },
  { path: "/sale", component: <Sales />, allowedRoles: ["*"] },

  // **** Group Chart add paths ****
  { path: "/add-chart", component: <AddChart />, allowedRoles: ["*"] },
  {
    path: "/add-chart-content",
    component: <AddChartContent />,
    allowedRoles: ["*"],
  },
  { path: "/add-chart-data", component: <AddChartData />, allowedRoles: ["*"] },

  // **** Group Chart paths ****
  { path: "/chart", component: <ChartContent />, allowedRoles: ["*"] },
  // { path: "/chart-content", component: <ChartContent />, allowedRoles: ["*"] },
  { path: "/chart-data", component: <ChartData />, allowedRoles: ["*"] },

  // **** Group News add paths ****
  { path: "/add-bulk-alert", component: <AddBulkAlert />, allowedRoles: ["*"] },
  {
    path: "/add-definitions",
    component: <AddDefinitions />,
    allowedRoles: ["*"],
  },
  { path: "/add-news", component: <AddNews />, allowedRoles: ["*"] },
  {
    path: "/add-newsletter",
    component: <AddNewsletter />,
    allowedRoles: ["*"],
  },

  // **** Group News paths ****
  { path: "/bulk-alert", component: <BulkAlert />, allowedRoles: ["*"] },
  { path: "/news", component: <News />, allowedRoles: ["*"] },
  { path: "/definitions", component: <Definitions />, allowedRoles: ["*"] },
  { path: "/newsletter", component: <Newsletter />, allowedRoles: ["*"] },
  {
    path: "/newsletter-subscription",
    component: <NewsletterSubscription />,
    allowedRoles: ["*"],
  },

  // **** Group Orders add paths ****
  {
    path: "/add-order-status",
    component: <AddOrderStatus />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/add-return-status",
    component: <AddReturnStatus />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/add-warehouse",
    component: <AddWarehouse />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-warehouse-availability",
    component: <AddWarehouseAvailability />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-shipping-price",
    component: <AddShippingPrice />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/update/shipping_price/:id",
    component: <AddShippingPrice />,
    allowedRoles: ["admin", "superadmin"],
  },

  // **** Group Orders paths ****
  { path: "/orders", component: <Orders />, allowedRoles: ["*"] },
  {
    path: "/order-return-requests",
    component: <OrderReturnRequests />,
    allowedRoles: ["*"],
  },
  { path: "/order-status", component: <OrderStatus />, allowedRoles: ["*"] },
  { path: "/return-status", component: <ReturnStatus />, allowedRoles: ["*"] },
  { path: "/warehouses", component: <Warehouses />, allowedRoles: ["*"] },
  {
    path: "/warehouse-availability",
    component: <WarehouseAvailability />,
    allowedRoles: ["*"],
  },
  {
    path: "/shipping-prices",
    component: <ShippingPrices />,
    allowedRoles: ["*"],
  },

  // **** Group Reports add paths ****
  // { path: "/add-order-status", component: <AddOrderStatus />, allowedRoles: ["superadmin"] },

  // **** Group Reports paths ****
  { path: "/bills", component: <Bills />, allowedRoles: ["*"] },
  { path: "/order-reports", component: <OrderReports />, allowedRoles: ["*"] },
  { path: "/bill-reports", component: <BillReports />, allowedRoles: ["*"] },

  // **** Group Award add paths ****
  {
    path: "/add-point",
    component: <AddPoint />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-coupon",
    component: <AddCoupon />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-less_than",
    // component: <AddLessThan />,
    component: <AddLessThan name="less_than" />,

    allowedRoles: ["admin", "superadmin"],
  },

  // **** Group Award paths ****
  { path: "/coupons", component: <Coupons />, allowedRoles: ["*"] },
  { path: "/less_than", component: <LessThan />, allowedRoles: ["*"] },
  { path: "/points", component: <Points />, allowedRoles: ["*"] },
  { path: "/special-offer", component: <SpecialOffer />, allowedRoles: ["*"] },

  // **** Group Interactive paths ****
  { path: "/home-reviews", component: <HomeReviews />, allowedRoles: ["*"] },
  {
    path: "/add-review",
    component: <AddHomeReviewer />,
    allowedRoles: ["admin", "superadmin"],
  },
  { path: "/comments", component: <Comments />, allowedRoles: ["*"] },

  // **** Group User paths ****
  { path: "/users", component: <Users />, allowedRoles: ["*"] },
  { path: "/add-user", component: <AddUser />, allowedRoles: ["superadmin"] },
  {
    path: "/users/:id",
    component: <SingleUser />,
    allowedRoles: ["superadmin"],
  },
  {
    path: "/users/:id/:name",
    component: <SingleUserTable />,
    allowedRoles: ["superadmin"],
  },

  // **** Group Update paths ****
  {
    path: "/update/:name/:id",
    component: <Update />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/products/update/product/:id",
    component: <AddProduct layout="update" />,
    allowedRoles: ["admin", "superadmin"],
  },

  // **** Group Support paths ****
  { path: "/support", component: <Support />, allowedRoles: ["*"] },
  { path: "/chat-setting", component: <ChatSetting />, allowedRoles: ["*"] },

  // **** Group Useful actions paths ****
  {
    path: "/add-products-slider",
    component: <ProductsSLidersForm />,
    allowedRoles: ["*"],
  },
  {
    path: "/update-products-slider/:id",
    component: <ProductsSLidersForm />,
    allowedRoles: ["*"],
  },
  {
    path: "/products-slider",
    component: <ProductsSlider />,
    allowedRoles: ["*"],
  },
  { path: "/add-chunks", component: <AddChunks />, allowedRoles: ["admin", "superadmin"] },
  { path: "/chunks", component: <Chunks />, allowedRoles: ["admin", "superadmin"] },
  { path: "/logs", component: <Logs />, allowedRoles: ["*"] },
  { path: "/rooms/:id", component: <ChatRoom />, allowedRoles: ["*"] },
  {
    path: "/select-products",
    component: <SelectProduct />,
    allowedRoles: ["*"],
  },
  {
    path: "/change-category",
    component: <MoveCategory />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/upload-sheet",
    component: <UploadSheet />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/send-email",
    component: <EmailSender />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/home-sections",
    component: <HomeSections />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/home-slider",
    component: <HomeSliders />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-home-sliders",
    component: <AddHomeSlider />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path:"/products-supplier",
    component: <SupplierProducts/>,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/xml-import",
    component: <XMLImport />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/partners",
    component: <Partners />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/add-partner",
    component: <AddPartner />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/suppliers",
    component: <Suppliers />,
    allowedRoles: ["admin", "superadmin"],
  },
  {
    path: "/suppliers/:id",
    component: <SingleSupplier />,
    allowedRoles: ["admin", "superadmin"],
  },

  {
    path: "/supplier-request",
    component: <SupplierRequest />,
    allowedRoles: ["admin", "superadmin"],
  },

  // **** Group public paths ****
  {
    path: "/add-supplier-request",
    component: <AddSupplierRequest />,
    allowedRoles: ["*"],
  },

  { path: "/", component: <Home />, allowedRoles: ["*"] },
  { path: "*", component: <NotAllowed />, allowedRoles: ["*"] },
  { path: "/not-found", component: <PageNotFound />, allowedRoles: ["*"] },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/join-supplier", component: <AddNewSupplier /> },
];
export { authProtectedRoutes, publicRoutes };
