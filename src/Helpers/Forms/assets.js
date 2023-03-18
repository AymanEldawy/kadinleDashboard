export const AssetsGroup = [
  { name: "Number", type: "number", label: "Number", required: false },
  { name: "SecLvl", key: "select", label: "SecLvl", required: false, list: [] },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "LtnName", type: "text", label: "LtnName", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "ParentGuid", type: "text", label: "ParentGuid", required: false },
];

const Assets_General = [
  { name: "AssetsGroup", type: "text", label: "AssetsGroup", required: false },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "Barcode", type: "text", label: "Barcode", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "IsActive", type: "checkbox", label: "IsActive", required: false },
  {
    name: "AssetsAreaGuid",
    type: "text",
    label: "AssetsAreaGuid",
    required: false,
  },
  {
    name: "CurrentAssetsAreaGuid",
    type: "text",
    label: "CurrentAssetsAreaGuid",
    required: false,
  },
  { name: "state", type: "text", label: "state", required: false },
  { name: "Origin", type: "text", label: "Origin", required: false },
  { name: "Importer", type: "text", label: "Importer", required: false },
];

const Assets_Accounts = [
  {
    name: "AsstesAccountGuid",
    type: "text",
    label: "AsstesAccountGuid",
    required: false,
  },
  {
    name: "ExpenseAccountGuid",
    type: "text",
    label: "ExpenseAccountGuid",
    required: false,
  },
  {
    name: "DepreciationAccountGuid",
    type: "text",
    label: "DepreciationAccountGuid",
    required: false,
  },
  {
    name: "DepreciationTotalAccountGuid",
    type: "text",
    label: "DepreciationTotalAccountGuid",
    required: false,
  },
  {
    name: "ProfitAccountGuid",
    type: "text",
    label: "ProfitAccountGuid",
    required: false,
  },
  {
    name: "lossesAccountGuid",
    type: "text",
    label: "lossesAccountGuid",
    required: false,
  },
  {
    name: "EvaluationAccountGuid",
    type: "text",
    label: "EvaluationAccountGuid",
    required: false,
  },
];
const Assets_Input = [
  { name: "Importer", type: "text", label: "Importer", required: false },
  {
    name: "EnterAccountGuid",
    type: "text",
    label: "EnterAccountGuid",
    required: false,
  },
  { name: "EnterDate", type: "text", label: "EnterDate", required: false },
  { name: "EnterValue", type: "number", label: "EnterValue", required: false },
  {
    name: "CurrencyGUID",
    type: "text",
    label: "CurrencyGUID",
    required: false,
  },
  {
    name: "EnterCostGuid",
    type: "text",
    label: "EnterCostGuid",
    required: false,
  },
  {
    name: "EnterCreditCostGuid",
    type: "text",
    label: "EnterCreditCostGuid",
    required: false,
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
    name: "SalesAccountGuid",
    type: "text",
    label: "SalesAccountGuid",
    required: false,
  },
  { name: "SaleValue", type: "number", label: "SaleValue", required: false },
  {
    name: "CurrencySaleGUID",
    type: "text",
    label: "CurrencySaleGUID",
    required: false,
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

