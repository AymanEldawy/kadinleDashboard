const BillDetail = [
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
    "table": "Bill"
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
    "label": "Price",
    "name": "Price"
  },
  {
    "type": "text",
    "required": false,
    "label": "TotalPrice",
    "name": "TotalPrice"
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
  },
  {
    "type": "text",
    "required": false,
    "label": "DiscountPercent",
    "name": "DiscountPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "Discount",
    "name": "Discount"
  },
  {
    "type": "text",
    "required": false,
    "label": "ExtraPercent",
    "name": "ExtraPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "Extra",
    "name": "Extra"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ProductDate",
    "name": "ProductDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ExpireDate",
    "name": "ExpireDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Class",
    "name": "Class"
  },
  {
    "type": "text",
    "required": false,
    "label": "Length",
    "name": "Length"
  },
  {
    "type": "text",
    "required": false,
    "label": "width",
    "name": "width"
  },
  {
    "type": "text",
    "required": false,
    "label": "height",
    "name": "height"
  },
  {
    "type": "text",
    "required": false,
    "label": "Count",
    "name": "Count"
  },
  {
    "type": "text",
    "required": false,
    "label": "unityFact2",
    "name": "unityFact2"
  },
  {
    "type": "text",
    "required": false,
    "label": "unityFact3",
    "name": "unityFact3"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "unityfix2",
    "name": "unityfix2"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "unityfix3",
    "name": "unityfix3"
  },
  {
    "type": "text",
    "required": false,
    "label": "ItemUnit",
    "name": "ItemUnit"
  }
];

module.exports.BillDetail = BillDetail;
