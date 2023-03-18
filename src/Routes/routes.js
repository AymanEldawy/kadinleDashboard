import React from "react";
import { redirect } from "react-router-dom";
import Accounts from "../Components/Tables/Accounts/Accounts";
import { menuData } from "../Helpers/menu";

const authProtectedRoutes = [
  { path: "/list/accounts", component: Accounts },
  {
    path: "/",
    exact: true,
    component: () => redirect("/dashboard"),
  },
];

// function log(data) {
//   // console.log('run...')
//   data.map((item) => {
//     console.log(`{ path: "${item?.link}", component: ${item?.name} }`);
//     if (item?.children) log(item?.children);
//     if (item?.subChild) log(item?.subChild);
//   });
// }
// log(menuData);
// // menuData.map((item) => {});
const publicRoutes = [
  { path: "account", component: "Account" },
  { path: "account-card", component: "account card " },
  { path: "chart-of-accounts", component: "Chart of accounts " },
  { path: "cost-centers", component: "Cost centers " },
  { path: "currencies", component: "Currencies " },
  
  { path: "cards", component: "Cards " },
  { path: "/list/customer", component: "Customer/Supplier Card " },
  { path: "/list/building", component: "Building Card " },
  { path: "/list/apartment", component: "Flat Card " },
  { path: "/list/shop", component: "Shop Card " },
  { path: "/list/parking", component: "Parking Card " },
  { path: "/list/Landcontract", component: "Land Card " },
  { path: "/list/Villa", component: "Villa Card " },
  { path: "/list/RentInfo", component: "Leasor Card " },
  { path: "/list/Owner", component: "Owner Card " },
  { path: "/list/salesman", component: "Salesman Card " },
  { path: "/list/watchman", component: "Watchman Card " },
  { path: "/list/OfferPrice", component: "Quotation Card " },
  { path: "", component: "Materials " },
  { path: "/list/mat", component: "Material Card " },
  { path: "/list/matgroup", component: "Group Card " },
  { path: "/Chart/mat", component: "Chart of Materials " },
  { path: "/list/Store", component: "Store Card " },
  { path: "/Chart/store", component: "Chart of Stores " },
  { path: "/report/materials", component: "Activity reports " },
  { path: "", component: "Assets " },
  { path: "/list/AssetsGroup", component: "Asset Category " },
  { path: "/list/Assets", component: "Asset Card " },
  { path: "/Chart/Assets", component: "Chart of Assets " },
  { path: "realty", component: "Realty " },
  { path: "", component: "Contracts " },
  { path: "", component: "Rent Contracts " },
  { path: "/list/LeaseApartment", component: "Flat rent contract " },
  { path: "/list/", component: "Shop rent contract " },
  { path: "/list/", component: "Parking rent contract " },
  { path: "", component: "Sale Contracts " },
  { path: "/list/FlatContractFee", component: "Flat sale contract " },
  { path: "/list/", component: "Shop sale contract " },
  { path: "/list/", component: "Parking sale contract " },
  { path: "/list/", component: "Land sale contract " },
  { path: "/list/", component: "Services contracts " },
  { path: "/list/", component: "Electricity bills " },
  { path: "/list/", component: "Lawsuit " },
  { path: "/list/", component: "Owners Associations Fees " },
  { path: "/list/", component: "Contract cycle " },
  { path: "/list/", component: "Building electricity meter reading " },
  { path: "", component: "Internal maintenance " },
  { path: "/", component: "Maintenance worker card " },
  { path: "/", component: "Complaint card " },
  { path: "/", component: "Maintenance order " },
  { path: "/", component: "Complaints report " },
  { path: "/", component: "Maintenance orders report " },
  { path: "", component: "Maintenance " },
  { path: "", component: "External maintenance " },
  { path: "/", component: "Maintenance contracts " },
  { path: "/", component: "Maintenance work card " },
  { path: "/", component: "Maintenance visits " },
  { path: "/", component: "Maintenance visits report " },
  { path: "/", component: "Maintenance Contracts report " },
  // Authentication Page
  // { path: "/logout", component: Logout },
  // { path: "/login", component: Login },
  // { path: "/forgot-password", component: ForgetPasswordPage },
  // { path: "/register", component: Register },
];
export { authProtectedRoutes, publicRoutes };
