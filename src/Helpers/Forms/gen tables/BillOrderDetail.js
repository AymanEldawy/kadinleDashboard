const BillOrderDetail = [
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
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "BillOrder"
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
    "type": "text",
    "required": false,
    "label": "unit",
    "name": "unit"
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
    "label": "Price",
    "name": "Price"
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
    "label": "Note",
    "name": "Note"
  }
];

module.exports.BillOrderDetail = BillOrderDetail;
