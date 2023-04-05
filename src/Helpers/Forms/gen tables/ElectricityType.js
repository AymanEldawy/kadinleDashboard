const ElectricityType = [
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
    "type": "text",
    "required": false,
    "label": "Name",
    "name": "Name"
  },
  {
    "type": "text",
    "required": false,
    "label": "ltnName",
    "name": "ltnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Menu",
    "name": "Menu"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnMenu",
    "name": "LtnMenu"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShortCut",
    "name": "ShortCut"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreatedEntry",
    "name": "CreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoCreatedEntry",
    "name": "AutoCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoPostedEntry",
    "name": "AutoPostedEntry"
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
    "label": "DefPrintPath",
    "name": "DefPrintPath"
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
    "type": "text",
    "required": false,
    "label": "Calculate",
    "name": "Calculate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Calculate2",
    "name": "Calculate2"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefCheckTypeGuid",
    "name": "DefCheckTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "CheckType"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefEntryTypeGuid",
    "name": "DefEntryTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "EntryType"
  }
];

module.exports.ElectricityType = ElectricityType;
