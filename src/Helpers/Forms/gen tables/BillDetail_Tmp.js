const BillDetail_Tmp = [
  {
    "type": "text",
    "required": false,
    "label": "Kind",
    "name": "Kind"
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
    "label": "ParentGuid",
    "name": "ParentGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "BillKind",
    "name": "BillKind"
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
    "label": "Bonus",
    "name": "Bonus"
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
  }
];

module.exports.BillDetail_Tmp = BillDetail_Tmp;
