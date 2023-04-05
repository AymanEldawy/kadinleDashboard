const vbAssets = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AssetsGroupGuid",
    "name": "AssetsGroupGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Code",
    "name": "Code"
  },
  {
    "type": "text",
    "required": false,
    "label": "Name",
    "name": "Name"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnName",
    "name": "LtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Barcode",
    "name": "Barcode"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsActive",
    "name": "IsActive"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGUID",
    "name": "CurrencyGUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencyVal",
    "name": "CurrencyVal"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AssetsAreaGuid",
    "name": "AssetsAreaGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrentAssetsAreaGuid",
    "name": "CurrentAssetsAreaGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "State",
    "name": "State"
  },
  {
    "type": "text",
    "required": false,
    "label": "Importer",
    "name": "Importer"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EnterAccountGuid",
    "name": "EnterAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EnterCostGuid",
    "name": "EnterCostGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EnterCreditCostGuid",
    "name": "EnterCreditCostGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "EnterValue",
    "name": "EnterValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "EnterDate",
    "name": "EnterDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Origin",
    "name": "Origin"
  },
  {
    "type": "text",
    "required": false,
    "label": "Company",
    "name": "Company"
  },
  {
    "type": "text",
    "required": false,
    "label": "EnterNote",
    "name": "EnterNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AsstesAccountGuid",
    "name": "AsstesAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ExpenseAccountGuid",
    "name": "ExpenseAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DepreciationAccountGuid",
    "name": "DepreciationAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DepreciationTotalAccountGuid",
    "name": "DepreciationTotalAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ProfitAccountGuid",
    "name": "ProfitAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "lossesAccountGuid",
    "name": "lossesAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EvaluationAccountGuid",
    "name": "EvaluationAccountGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Shipping",
    "name": "Shipping"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShippingNo",
    "name": "ShippingNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShippingDate",
    "name": "ShippingDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ArriveDate",
    "name": "ArriveDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ArrivePlace",
    "name": "ArrivePlace"
  },
  {
    "type": "text",
    "required": false,
    "label": "ImportPermit",
    "name": "ImportPermit"
  },
  {
    "type": "text",
    "required": false,
    "label": "CustomsNote",
    "name": "CustomsNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "CustomsDate",
    "name": "CustomsDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "CustomsExpense",
    "name": "CustomsExpense"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShippingNote",
    "name": "ShippingNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "MaintenanceContract",
    "name": "MaintenanceContract"
  },
  {
    "type": "text",
    "required": false,
    "label": "MaintenanceBeginDate",
    "name": "MaintenanceBeginDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "MaintenanceEndDate",
    "name": "MaintenanceEndDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Guaranty",
    "name": "Guaranty"
  },
  {
    "type": "text",
    "required": false,
    "label": "GuarantyBeginDate",
    "name": "GuarantyBeginDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "GuarantyEndDate",
    "name": "GuarantyEndDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "DepreciationMode",
    "name": "DepreciationMode"
  },
  {
    "type": "text",
    "required": false,
    "label": "IsDepreciationMonthly",
    "name": "IsDepreciationMonthly"
  },
  {
    "type": "text",
    "required": false,
    "label": "DepreciationBeginDate",
    "name": "DepreciationBeginDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Age",
    "name": "Age"
  },
  {
    "type": "text",
    "required": false,
    "label": "DepreciationAvg",
    "name": "DepreciationAvg"
  },
  {
    "type": "text",
    "required": false,
    "label": "ScrapValue",
    "name": "ScrapValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldYearExtra",
    "name": "OldYearExtra"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldYearDecrease",
    "name": "OldYearDecrease"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldYearDepreciation",
    "name": "OldYearDepreciation"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldYearMaintenance",
    "name": "OldYearMaintenance"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsSale",
    "name": "IsSale"
  },
  {
    "type": "text",
    "required": false,
    "label": "SaleDate",
    "name": "SaleDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "SaleCustomer",
    "name": "SaleCustomer"
  },
  {
    "key": "unique",
    "required": false,
    "label": "SalesAccountGuid",
    "name": "SalesAccountGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "SaleValue",
    "name": "SaleValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencySaleGUID",
    "name": "CurrencySaleGUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencySaleVal",
    "name": "CurrencySaleVal"
  },
  {
    "type": "text",
    "required": false,
    "label": "SaleNote",
    "name": "SaleNote"
  }
];

module.exports.vbAssets = vbAssets;
