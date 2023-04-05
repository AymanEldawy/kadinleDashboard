const OrderCheckMatBalance_Tmp = [
  {
    "type": "text",
    "required": false,
    "label": "Spid",
    "name": "Spid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "MatGuid",
    "name": "MatGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Mat"
  },
  {
    "key": "unique",
    "required": false,
    "label": "StoreGuid",
    "name": "StoreGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "type": "text",
    "required": false,
    "label": "Qty",
    "name": "Qty"
  },
  {
    "type": "text",
    "required": false,
    "label": "unit",
    "name": "unit"
  }
];

module.exports.OrderCheckMatBalance_Tmp = OrderCheckMatBalance_Tmp;
