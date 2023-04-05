const AccumulateShop = [
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
    "table": "Shop"
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
  }
];

module.exports.AccumulateShop = AccumulateShop;
