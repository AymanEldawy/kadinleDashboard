const ElectricityBill = [
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
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ElectricityType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsCollect",
    "name": "IsCollect"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuildingGuid",
    "name": "BuildingGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Building"
  },
  {
    "type": "text",
    "required": false,
    "label": "RealtyType",
    "name": "RealtyType"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FlatGuid",
    "name": "FlatGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Apartment"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ShopGuid",
    "name": "ShopGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Shop"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustGuid",
    "name": "CustGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
  },
  {
    "type": "text",
    "required": false,
    "label": "ElecCounterNo",
    "name": "ElecCounterNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "Counter",
    "name": "Counter"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldCounter",
    "name": "OldCounter"
  },
  {
    "type": "text",
    "required": false,
    "label": "Discount",
    "name": "Discount"
  },
  {
    "type": "text",
    "required": false,
    "label": "Extra",
    "name": "Extra"
  },
  {
    "type": "text",
    "required": false,
    "label": "Consumption",
    "name": "Consumption"
  },
  {
    "type": "text",
    "required": false,
    "label": "WaterCounterNo",
    "name": "WaterCounterNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "WCounter",
    "name": "WCounter"
  },
  {
    "type": "text",
    "required": false,
    "label": "WOldCounter",
    "name": "WOldCounter"
  },
  {
    "type": "text",
    "required": false,
    "label": "RoundKind",
    "name": "RoundKind"
  },
  {
    "type": "text",
    "required": false,
    "label": "TotalValue",
    "name": "TotalValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "IncomeAccountGuid",
    "name": "IncomeAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ExtraAccountGuid",
    "name": "ExtraAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DiscountAccountGuid",
    "name": "DiscountAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "WaterAccountGuid",
    "name": "WaterAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DrainageAccountGuid",
    "name": "DrainageAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "WaterValue",
    "name": "WaterValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "DrainageValue",
    "name": "DrainageValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineAccountGuid",
    "name": "FineAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FeeAccountGuid",
    "name": "FeeAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "FineValue",
    "name": "FineValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "FeeValue",
    "name": "FeeValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "Overdue",
    "name": "Overdue"
  },
  {
    "type": "text",
    "required": false,
    "label": "WaterNote",
    "name": "WaterNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "DrainageNote",
    "name": "DrainageNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "DiscountNote",
    "name": "DiscountNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "ExtraNote",
    "name": "ExtraNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "ConsumptionNote",
    "name": "ConsumptionNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "FineNote",
    "name": "FineNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "FeeNote",
    "name": "FeeNote"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGuid",
    "name": "CurrencyGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencyVal",
    "name": "CurrencyVal"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateBilltEntry",
    "name": "CreateBilltEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.ElectricityBill = ElectricityBill;
