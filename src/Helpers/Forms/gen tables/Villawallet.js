const Villawallet = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "wallet"
  },
  {
    "key": "unique",
    "required": false,
    "label": "VillaGuid",
    "name": "VillaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Villa"
  },
  {
    "type": "text",
    "required": false,
    "label": "MainCost",
    "name": "MainCost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Expense",
    "name": "Expense"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "BeginDate",
    "name": "BeginDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "SaleDate",
    "name": "SaleDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "SaleValue",
    "name": "SaleValue"
  }
];

module.exports.Villawallet = Villawallet;
