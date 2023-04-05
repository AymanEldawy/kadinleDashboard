const OrderType = [
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
    "label": "LtnName",
    "name": "LtnName"
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
    "label": "BillTypeGuid",
    "name": "BillTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "BillType"
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
    "label": "ChangeBillType",
    "name": "ChangeBillType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ChangeCurrency",
    "name": "ChangeCurrency"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CheckStore",
    "name": "CheckStore"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CheckStoreRecipient",
    "name": "CheckStoreRecipient"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "RestraintMat",
    "name": "RestraintMat"
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
    "label": "DefUnity",
    "name": "DefUnity"
  }
];

module.exports.OrderType = OrderType;
