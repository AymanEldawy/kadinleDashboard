import { DropDowns } from "../functions";

const Building_General_information = [
  // shared
  {
    key: "select",
    name: "SecLvl",
    label: "SecLvl",
    list: DropDowns("SecLvl"),
  },
  // shared end
  { name: "Name", type: "text", label: "Name", required: true },
  // { name: "Number", type: "number", label: "Number", required: false },
  { name: "Emirate", type: "text", label: "Emirate", required: false },
  {
    name: "BuildAutoNumber",
    type: "text",
    label: "BuildAutoNumber",
    required: false,
  },
  { name: "Suburb", type: "text", label: "Suburb", required: false },
  { name: "BuildingNo", type: "text", label: "BuildingNo", required: false },
  {
    name: "BuildingArea",
    type: "text",
    label: "BuildingArea",
    required: false,
  },
  { name: "Area", type: "text", label: "Area", required: false },
  { name: "LicenseType", type: "text", label: "LicenseType", required: false },
  { name: "BasinNo", type: "text", label: "BasinNo", required: false },
  { name: "BuildYear", type: "text", label: "BuildYear", required: false },
  {
    name: "ElecCounterNo",
    type: "text",
    label: "ElecCounterNo",
    required: false,
  },
  { name: "Street", type: "text", label: "Street", required: false },
  // Group Dead
  { name: "BondType", type: "text", label: "BondType", required: false },
  { name: "BondNo", type: "text", label: "BondNo", required: false },
  {
    name: "BondDate",
    type: "datetime-local",
    label: "BondDate",
    required: false,
  },
  { name: "OwnerName", type: "text", label: "OwnerName", required: false },
];

const Building_account = [
  {
    table: "",
    name: "BuildingAccountGuid",
    key: "unique",
    label: "BuildingAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "cost",
    name: "CostGuid",
    key: "unique",
    label: "CostGuid",
    required: false,
    list: [],
  },
  {
    table: "",
    name: "AccountBankBuildingGuid",
    key: "unique",
    label: "AccountBankBuildingGuid",
    required: false,
    list: [],
  },
  {
    table: "",
    name: "CashAccountGuid",
    key: "unique",
    label: "CashAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "InsuranceAccountGuid",
    key: "unique",
    label: "InsuranceAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "RentInfoGuid",
    key: "unique",
    label: "RentInfoGuid",
    required: false,
    list: [],
  },
  { name: "BankName", type: "text", label: "BankName", required: false },
  {
    table: "Account",
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
];

const Building_Add_flats = [
  // group Flats:
  {
    name: "ApartmentCountOfFloor",
    type: "number",
    label: "ApartmentCountOfFloor",
    required: false,
  },
  { name: "FloorCount", type: "number", label: "FloorCount", required: false },
  // group Pent House:

  {
    name: "BHouseFloor",
    type: "number",
    label: "BHouseFloor",
    required: false,
  },
  {
    name: "BHouseFlatCount",
    type: "number",
    label: "BHouseFlatCount",
    required: false,
  },
  // group Mezzanine:
  {
    name: "MBalanceFloor",
    type: "number",
    label: "MBalanceFloor",
    required: false,
  },
  {
    name: "MBalanceFlatCount",
    type: "number",
    label: "MBalanceFlatCount",
    required: false,
  },
  // group Offices:
  {
    name: "OfficeFloor",
    type: "number",
    label: "OfficeFloor",
    required: false,
  },
  {
    name: "OfficeCount",
    type: "number",
    label: "OfficeCount",
    required: false,
  },
  // Group Car parking:
  {
    name: "ParkingFloor",
    type: "number",
    label: "ParkingFloor",
    required: false,
  },
  {
    name: "ParkingCount",
    type: "number",
    label: "ParkingCount",
    required: false,
  },
  // Group Underground car parking:
  {
    name: "ParkingFloorUnder",
    type: "number",
    label: "ParkingFloorUnder",
    required: false,
  },
  {
    name: "ParkingCountUnder",
    type: "number",
    label: "ParkingCountUnder",
    required: false,
  },
  {
    name: "ApartmentCount",
    type: "number",
    label: "ApartmentCount",
    required: false,
    readonly: true,
  },
  { name: "ShopCount", type: "number", label: "ShopCount", required: false },
  {
    name: "FlatDriverCount",
    type: "number",
    label: "FlatDriverCount",
    required: false,
  },
  {
    name: "FlatServantCount",
    type: "number",
    label: "FlatServantCount",
    required: false,
  },
  {
    name: "BuildingCode",
    type: "text",
    label: "BuildingCode",
    required: false,
  },
];

const Building_ownerships = [
  // Purchase
  {
    name: "DatePurchase",
    type: "datetime-local",
    label: "DatePurchase",
    required: false,
  },
  {
    name: "AmountPurchase",
    type: "number",
    label: "AmountPurchase",
    required: false,
  },
  {
    name: "CurrencyPurchase",
    type: "text",
    label: "CurrencyPurchase",
    required: false,
  },
  {
    name: "CurrencyvalPurchase",
    type: "number",
    label: "CurrencyvalPurchase",
    required: false,
  },
  {
    table: "Account",
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
  {
    name: "PurchaseNotes",
    type: "text",
    label: "PurchaseNotes",
    required: false,
  },
  // Investment
  {
    table: "Account", // update
    name: "OwnerAccountGuid",
    key: "unique",
    label: "OwnerAccountGuid",
    required: false,
    list: [],
  },
  {
    name: "IdentityBeginDate",
    type: "datetime-local",
    label: "IdentityBeginDate",
    required: false,
  },
  {
    name: "IdentityEndDate",
    type: "datetime-local",
    label: "IdentityEndDate",
    required: false,
  },
  {
    name: "IdentityValue",
    type: "number",
    label: "IdentityValue",
    required: false,
  },
  {
    table: "Currency", // update
    name: "CurrencyIdentityGUID",
    key: "unique",
    label: "CurrencyIdentityGUID",
    required: false,
    list: [],
  },
  {
    name: "CurrencyValIdentity",
    type: "number",
    label: "CurrencyValIdentity",
    required: false,
  },
  // Properties management
  {
    table: "",
    name: "OwnerGuid",
    key: "unique",
    label: "OwnerGuid",
    required: false,
    list: [],
  },
  {
    name: "CommissionPercent",
    type: "number",
    label: "CommissionPercent",
    required: false,
  },
  {
    table: "Account",
    name: "AccountCommIncomeGuid",
    key: "unique",
    label: "AccountCommIncomeGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "AcCommissionFromOwnerGUID",
    key: "unique",
    label: "AcCommissionFromOwnerGUID",
    required: false,
    list: [],
  },
  // Opening journal entry
  {
    name: "BuildingCost",
    type: "number",
    label: "BuildingCost",
    required: false,
  },
];

export const building = {
  steps: ["General information", "account", "Add flats", "ownerships"],
  forms: {
    "General information": Building_General_information,
    account: Building_account,
    "Add flats": Building_Add_flats,
    ownerships: Building_ownerships,
  },
};
