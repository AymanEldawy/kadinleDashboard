const BillOrderRecipientDiscountExtra = [
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
    "label": "AccountGUID",
    "name": "AccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "label": "Extra",
    "name": "Extra"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGUID",
    "name": "CostGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContraAccGUID",
    "name": "ContraAccGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "Notes",
    "name": "Notes"
  }
];

module.exports.BillOrderRecipientDiscountExtra = BillOrderRecipientDiscountExtra;
