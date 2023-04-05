const OrderTypeGroup = [
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
    "table": "OrderType"
  },
  {
    "key": "unique",
    "required": false,
    "label": "GroupGuid",
    "name": "GroupGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MatGroup"
  }
];

module.exports.OrderTypeGroup = OrderTypeGroup;
