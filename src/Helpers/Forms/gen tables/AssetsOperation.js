const AssetsOperation = [
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
    "label": "Flag",
    "name": "Flag"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AssetsGuid",
    "name": "AssetsGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Assets"
  },
  {
    "type": "text",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountGuid",
    "name": "AccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "Value",
    "name": "Value"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGUID",
    "name": "CurrencyGUID",
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
    "label": "Age",
    "name": "Age"
  },
  {
    "type": "text",
    "required": false,
    "label": "ScrapValue",
    "name": "ScrapValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitCostGuid",
    "name": "DebitCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditCostGuid",
    "name": "CreditCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsRounded",
    "name": "IsRounded"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.AssetsOperation = AssetsOperation;
