const ReceiptOrderTypeDetail = [
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
    "table": "ReceiptOrderType"
  },
  {
    "type": "text",
    "required": false,
    "label": "Label",
    "name": "Label"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountGuid",
    "name": "AccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "ArNote",
    "name": "ArNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "EnNote",
    "name": "EnNote"
  }
];

module.exports.ReceiptOrderTypeDetail = ReceiptOrderTypeDetail;
