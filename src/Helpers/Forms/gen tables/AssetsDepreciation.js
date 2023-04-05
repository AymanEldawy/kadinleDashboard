const AssetsDepreciation = [
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
    "label": "Date",
    "name": "Date"
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
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditCostGUID",
    "name": "CreditCostGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitCostGUID",
    "name": "DebitCostGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AssetsGroupGuid",
    "name": "AssetsGroupGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "AssetsGroup"
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
    "key": "unique",
    "required": false,
    "label": "AssetsAreaGuid",
    "name": "AssetsAreaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "AssetsArea"
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

module.exports.AssetsDepreciation = AssetsDepreciation;
