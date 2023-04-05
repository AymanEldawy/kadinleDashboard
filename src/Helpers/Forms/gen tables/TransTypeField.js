const TransTypeField = [
  {
    "key": "unique",
    "required": false,
    "label": "TransTypeGuid",
    "name": "TransTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "TransType"
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

module.exports.TransTypeField = TransTypeField;
