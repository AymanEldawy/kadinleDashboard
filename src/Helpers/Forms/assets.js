import { DropDowns, getData } from "../functions";

export const AssetsGroup = [
  { name: "Number", type: "number", label: "Number", required: false },
  {
    name: "SecLvl",
    key: "select",
    label: "SecLvl",
    required: false,
    list: DropDowns("SecLvl"),
  },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "LtnName", type: "text", label: "LtnName", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  {
    table: "AssetGroup",
    name: "ParentGuid",
    key: "unique",
    label: "ParentGuid",
    required: false,
    list: getData("account"),
  },
];

const Assets_General = [
  { name: "AssetsGroup", type: "text", label: "AssetsGroup", required: false },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "Barcode", type: "text", label: "Barcode", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "IsActive", type: "checkbox", label: "IsActive", required: false },
  {
    table: "Assets", // need to update
    name: "AssetsAreaGuid",
    key: "unique",
    label: "AssetsAreaGuid",
    required: false,
    list: getData("account"), //
  },
  {
    table: "",
    name: "CurrentAssetsAreaGuid",
    key: "unique",
    label: "CurrentAssetsAreaGuid",
    required: false,
    list: [],
  },
  { name: "state", type: "text", label: "state", required: false },
  { name: "Origin", type: "text", label: "Origin", required: false },
  { name: "Importer", type: "text", label: "Importer", required: false },
];

const Assets_Accounts = [
  {
    table: "",
    name: "AsstesAccountGuid",
    key: "unique",
    label: "AsstesAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "ExpenseAccountGuid",
    key: "unique",
    label: "ExpenseAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "DepreciationAccountGuid",
    key: "unique",
    label: "DepreciationAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "DepreciationTotalAccountGuid",
    key: "unique",
    label: "DepreciationTotalAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",

    name: "ProfitAccountGuid",
    key: "unique",
    label: "ProfitAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",
    name: "lossesAccountGuid",
    key: "unique",
    label: "lossesAccountGuid",
    required: false,
    list: [],
  },
  {
    table: "",
    name: "EvaluationAccountGuid",
    key: "unique",
    label: "EvaluationAccountGuid",
    required: false,
    list: [],
  },
];
const Assets_Input = [
  { name: "Importer", type: "text", label: "Importer", required: false },
  {
    table: "",
    name: "EnterAccountGuid",
    key: "unique",
    label: "EnterAccountGuid",
    required: false,
    list: [],
  },
  { name: "EnterDate", type: "text", label: "EnterDate", required: false },
  { name: "EnterValue", type: "number", label: "EnterValue", required: false },
  {
    table: "Currency",
    name: "CurrencyGUID",
    key: "unique",
    label: "CurrencyGUID",
    required: false,
    list: [],
  },
  {
    table: "cost",
    name: "EnterCostGuid",
    key: "unique",
    label: "EnterCostGuid",
    required: false,
    list: [],
  },
  {
    table: "",
    name: "EnterCreditCostGuid",
    key: "unique",
    label: "EnterCreditCostGuid",
    required: false,
    list: [],
  },
  { name: "EnterNote", type: "text", label: "EnterNote", required: false },
];
const Assets_Shipping = [
  { name: "Shipping", type: "text", label: "Shipping", required: false },
  { name: "ShippingNo", type: "text", label: "ShippingNo", required: false },
  {
    name: "ShippingDate",
    type: "text",
    label: "ShippingDate",
    required: false,
  },
  { name: "ArriveDate", type: "text", label: "ArriveDate", required: false },
  { name: "ArrivePlace", type: "text", label: "ArrivePlace", required: false },
  {
    name: "ImportPermit",
    type: "text",
    label: "ImportPermit",
    required: false,
  },
  { name: "CustomsNote", type: "text", label: "CustomsNote", required: false },
  { name: "CustomsDate", type: "text", label: "CustomsDate", required: false },
  {
    name: "CustomsExpense",
    type: "text",
    label: "CustomsExpense",
    required: false,
  },
  {
    name: "ShippingNote",
    type: "text",
    label: "ShippingNote",
    required: false,
  },
];

const Assets_Maintenance = [
  {
    name: "MaintenanceContract",
    type: "text",
    label: "MaintenanceContract",
    required: false,
  },
  {
    name: "MaintenanceBeginDate",
    type: "text",
    label: "MaintenanceBeginDate",
    required: false,
  },
  {
    name: "MaintenanceEndDate",
    type: "text",
    label: "MaintenanceEndDate",
    required: false,
  },
  { name: "Guaranty", type: "text", label: "Guaranty", required: false },
  {
    name: "GuarantyBeginDate",
    type: "text",
    label: "GuarantyBeginDate",
    required: false,
  },
  {
    name: "GuarantyEndDate",
    type: "text",
    label: "GuarantyEndDate",
    required: false,
  },
];

const Assets_Depreciation = [
  {
    name: "DepreciationMode",
    type: "number",
    label: "DepreciationMode",
    required: false,
  },
  // { name: "", type: "text", label: "", required: false },
  // { name: "", type: "text", label: "", required: false },
  {
    name: "OldYearExtra",
    type: "number",
    label: "OldYearExtra",
    required: false,
  },
  {
    name: "OldYearDecrease",
    type: "number",
    label: "OldYearDecrease",
    required: false,
  },
  {
    name: "OldYearDepreciation",
    type: "number",
    label: "OldYearDepreciation",
    required: false,
  },
  {
    name: "OldYearMaintenance",
    type: "number",
    label: "OldYearMaintenance",
    required: false,
  },
];

const Assets_Asset_sale = [
  { name: "IsSale", type: "checkbox", label: "IsSale", required: false },
  { name: "SaleDate", type: "text", label: "SaleDate", required: false },
  {
    name: "SaleCustomer",
    type: "text",
    label: "SaleCustomer",
    required: false,
  },
  {
    table: "",
    name: "SalesAccountGuid",
    key: "unique",
    label: "SalesAccountGuid",
    required: false,
    list: getData("account"),
  },
  { name: "SaleValue", type: "number", label: "SaleValue", required: false },
  {
    table: "",
    name: "CurrencySaleGUID",
    key: "unique",
    label: "CurrencySaleGUID",
    required: false,
    list: getData("currency"),
  },
  {
    name: "CurrencySaleVal",
    type: "number",
    label: "CurrencySaleVal",
    required: false,
  },
  { name: "SaleNote", type: "text", label: "SaleNote", required: false },
];

export const Assets = {
  steps: [
    "General",
    "Accounts",
    "Input",
    "Shipping",
    "Maintenance",
    "Depreciation",
    "Asset sale",
  ],
  forms: {
    General: Assets_General,
    Accounts: Assets_Accounts,
    Input: Assets_Input,
    Shipping: Assets_Shipping,
    Maintenance: Assets_Maintenance,
    Depreciation: Assets_Depreciation,
    "Asset sale": Assets_Asset_sale,
  },
};
