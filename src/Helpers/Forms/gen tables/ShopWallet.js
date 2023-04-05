const ShopWallet = [
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
    "label": "ShopGuid",
    "name": "ShopGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Shop"
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

module.exports.ShopWallet = ShopWallet;
