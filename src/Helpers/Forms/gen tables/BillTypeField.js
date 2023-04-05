const BillTypeField = [
  {
    "key": "unique",
    "required": false,
    "label": "BillTypeGuid",
    "name": "BillTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "BillType"
  },
  {
    "type": "text",
    "required": false,
    "label": "FieldName",
    "name": "FieldName"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Visible",
    "name": "Visible"
  }
];

module.exports.BillTypeField = BillTypeField;
