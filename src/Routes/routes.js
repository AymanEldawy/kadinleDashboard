import React from "react";
import { redirect } from "react-router-dom";

import { menuData } from "../Helpers/menu";
import AddCategoryContent from "../Pages/Forms/AddCategoryContent";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import CategoriesContent from "../Pages/Tables/CategoriesContent";
import {
  AddAddress,
  AddBrand,
  AddBulkAlert,
  AddCategory,
  AddChart,
  AddCollection,
  AddColor,
  AddCountry,
  AddCoupon,
  AddCurrency,
  AddLanguage,
  AddNews,
  AddNewsletter,
  AddProduct,
  AddRegion,
  AddSale,
  AddSize,
  InsertOne,
} from "./../Pages/Forms";
import Home from "./../Pages/Home/Home";
import {
  Addresses,
  Brands,
  BulkAlert,
  Categories,
  Chart,
  Collar,
  Collections,
  Colors,
  Comments,
  Countries,
  Coupons,
  Currency,
  GlobalList,
  Languages,
  Logs,
  News,
  Newsletter,
  Orders,
  Products,
  Regions,
  Sales,
  Sizes,
  Users,
} from "./../Pages/Tables";
import AddCollectionContent from "../Pages/Forms/AddCollectionContent";
import CollectionsContent from "../Pages/Tables/CollectionsContent";
import ColorsContent from "../Pages/Tables/ColorsContent";
import SizesContent from "../Pages/Tables/SizesContent";
import AddColorContent from "../Pages/Forms/AddColorContent";
import AddSizeContent from "../Pages/Forms/AddSizeContent";
import AddProductContent from "../Pages/Forms/AddProductContent";
import AddProductVariants from "../Pages/Forms/AddProductVariants";
import AddProductImages from "../Pages/Forms/AddProductImages";

const authProtectedRoutes = [
  // add paths
  // { path: "/add-address", component: <AddAddress /> },
  { path: "/add-language", component: <AddLanguage /> },
  { path: "/add-category", component: <AddCategory /> },
  { path: "/add-category-content", component: <AddCategoryContent /> },
  { path: "/add-color", component: <AddColor /> },
  { path: "/add-color-content", component: <AddColorContent /> },
  { path: "/add-country", component: <AddCountry /> },
  { path: "/add-collection-content", component: <AddCollectionContent /> },
  { path: "/add-collection", component: <AddCollection /> },
  { path: "/add-chart", component: <AddChart /> },
  { path: "/add-bulk-alert", component: <AddBulkAlert /> },
  { path: "/add-region", component: <AddRegion /> },
  { path: "/add-news", component: <AddNews /> },
  { path: "/add-newsletter", component: <AddNewsletter /> },
  { path: "/add-brand", component: <AddBrand /> },
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
  { path: "/add-product-content", component: <AddProductContent /> },
  { path: "/add-product-variants", component: <AddProductVariants /> },
  { path: "/add-product-images", component: <AddProductImages /> },

  // { path: "/add-color", component: <Color /> },
  // list or table paths
  { path: "/product", component: <Products /> },
  { path: "/color", component: <Colors /> },
  { path: "/colors-content", component: <ColorsContent /> },
  { path: "/category", component: <Categories /> },
  { path: "/categories-content", component: <CategoriesContent /> },
  { path: "/language", component: <Languages /> },
  { path: "/size", component: <Sizes /> },
  { path: "/size", component: <SizesContent /> },
  { path: "/address", component: <Addresses /> },
  { path: "/country", component: <Countries /> },
  { path: "/region", component: <Regions /> },
  { path: "/order", component: <Orders /> },
  { path: "/user", component: <Users /> },
  { path: "/chart", component: <Chart /> },
  { path: "/collection", component: <Collections /> },
  { path: "/collection-content", component: <CollectionsContent /> },
  { path: "/bulk-alert", component: <BulkAlert /> },
  { path: "/logs", component: <Logs /> },
  { path: "/news", component: <News /> },
  { path: "/newsletter", component: <Newsletter /> },
  { path: "/comments", component: <Comments /> },
  { path: "/brand", component: <Brands /> },
  { path: "/collar", component: <Collar /> },
  { path: "/coupons", component: <Coupons /> },
  { path: "/currency", component: <Currency /> },
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

  // not found page
  { path: "*", component: <NotFoundPage /> },
];

const publicRoutes = [{ path: "/", component: <Home /> }];
export { authProtectedRoutes, publicRoutes };
