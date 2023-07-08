import React from "react";
import { redirect } from "react-router-dom";

import { menuData } from "../Helpers/menu";
import AddCategoryContent from "../Pages/Forms/AddCategoryContent";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import CategoriesContent from "../Pages/Tables/CategoriesContent";
import { AddAddress, AddBrand, AddBulkAlert, AddCategory, AddChart, AddCollection, AddColor, AddCountry, AddCoupon, AddCurrency, AddLanguage, AddNews, AddNewsletter, AddProduct, AddRegion, AddSale, AddSize, InsertOne } from "./../Pages/Forms";
import Home from "./../Pages/Home/Home";
import { Addresses, Brands, BulkAlert, Categories, Chart, Collar, Collections, Colors, Comments, Countries, Coupons, Currency, GlobalList, Languages, Logs, News, Newsletter, Orders, Products, Regions, Sales, Sizes, Users } from "./../Pages/Tables";

const authProtectedRoutes = [
  // add paths
  { path: "/add-language", component: <AddLanguage /> },
  { path: "/add-category", component: <AddCategory /> },
  { path: "/add-category-content", component: <AddCategoryContent /> },
  { path: "/add-color", component: <AddColor /> },
  // { path: "/add-address", component: <AddAddress /> },
  { path: "/add-country", component: <AddCountry /> },
  { path: "/add-region", component: <AddRegion /> },
  { path: "/add-chart", component: <AddChart /> },
  { path: "/add-collection", component: <AddCollection /> },
  { path: "/add-bulk-alert", component: <AddBulkAlert /> },
  { path: "/add-news", component: <AddNews /> },
  { path: "/add-newsletter", component: <AddNewsletter /> },
  { path: "/add-brand", component: <AddBrand /> },
  { path: "/add-collar", component: <InsertOne /> },
  { path: "/add-coupon", component: <AddCoupon /> },
  { path: "/add-currency", component: <AddCurrency /> },
  { path: "/add-fabric", component: <InsertOne /> },
  { path: "/add-feature", component: <InsertOne /> },
  { path: "/add-lining", component: <InsertOne /> },
  { path: "/add-material", component: <InsertOne /> },
  { path: "/add-pattern", component: <InsertOne /> },
  { path: "/add-season", component: <InsertOne /> },
  { path: "/add-sleeve", component: <InsertOne /> },
  { path: "/add-sale", component: <AddSale /> },
  { path: "/add-size", component: <AddSize /> },
  { path: "/add-product", component: <AddProduct /> },

  // { path: "/add-color", component: <Color /> },
  // list or table paths
  { path: "/product", component: <Products /> },
  { path: "/color", component: <Colors /> },
  { path: "/category", component: <Categories /> },
  { path: "/categories-content", component: <CategoriesContent /> },
  { path: "/language", component: <Languages /> },
  { path: "/size", component: <Sizes /> },
  { path: "/address", component: <Addresses /> },
  { path: "/country", component: <Countries /> },
  { path: "/region", component: <Regions /> },
  { path: "/order", component: <Orders /> },
  { path: "/user", component: <Users /> },
  { path: "/chart", component: <Chart /> },
  { path: "/collection", component: <Collections /> },
  { path: "/bulk-alert", component: <BulkAlert /> },
  { path: "/logs", component: <Logs /> },
  { path: "/news", component: <News /> },
  { path: "/newsletter", component: <Newsletter /> },
  { path: "/comments", component: <Comments /> },
  { path: "/brand", component: <Brands /> },
  { path: "/collar", component: <Collar /> },
  { path: "/coupons", component: <Coupons /> },
  { path: "/currency", component: <Currency /> },
  { path: "/fabric", component: <GlobalList /> },
  { path: "/feature", component: <GlobalList /> },
  { path: "/lining", component: <GlobalList /> },
  { path: "/material", component: <GlobalList /> },
  { path: "/pattern", component: <GlobalList /> },
  { path: "/season", component: <GlobalList /> },
  { path: "/sleeve", component: <GlobalList /> },
  { path: "/sale", component: <Sales /> },

  // not found page
  { path: "*", component: <NotFoundPage /> },
];

const publicRoutes = [{ path: "/", component: <Home /> }];
export { authProtectedRoutes, publicRoutes };
