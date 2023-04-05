const BillOrderRecipientDetail = [
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
    "table": "BillOrderRecipient"
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
    "label": "Qty2",
    "name": "Qty2"
  },
  {
    "type": "text",
    "required": false,
    "label": "Qty3",
    "name": "Qty3"
  },
  {
    "type": "text",
    "required": false,
    "label": "Price",
    "name": "Price"
  },
  {
    "type": "text",
    "required": false,
    "label": "ClassPtr",
    "name": "ClassPtr"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.BillOrderRecipientDetail = BillOrderRecipientDetail;
