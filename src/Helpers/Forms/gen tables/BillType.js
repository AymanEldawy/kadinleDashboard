const BillType = [
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
    "label": "BillKind",
    "name": "BillKind"
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
    "type": "text",
    "required": false,
    "label": "DefPrintPath",
    "name": "DefPrintPath"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "BillBarcode",
    "name": "BillBarcode"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "PayType",
    "name": "PayType"
  },
  {
    "type": "text",
    "required": false,
    "label": "Color1",
    "name": "Color1"
  },
  {
    "type": "text",
    "required": false,
    "label": "Color2",
    "name": "Color2"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefMatAccountGuid",
    "name": "DefMatAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefCashAccountGuid",
    "name": "DefCashAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefCostGuid",
    "name": "DefCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefStoreGuid",
    "name": "DefStoreGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefDiscountAccountGuid",
    "name": "DefDiscountAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefExtraAccountGuid",
    "name": "DefExtraAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "type": "checkbox",
    "required": false,
    "label": "PostToStores",
    "name": "PostToStores"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PostToStoresAuto",
    "name": "PostToStoresAuto"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EntryCreated",
    "name": "EntryCreated"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EntryCreatedAuto",
    "name": "EntryCreatedAuto"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoPostedEntry",
    "name": "AutoPostedEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "OpPrice",
    "name": "OpPrice"
  },
  {
    "type": "text",
    "required": false,
    "label": "SpecificPrice",
    "name": "SpecificPrice"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PriceEffected",
    "name": "PriceEffected"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DetailEntryByMat",
    "name": "DetailEntryByMat"
  }
];

module.exports.BillType = BillType;
