const EntryDateDetail = [
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
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "EntryDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcGuid",
    "name": "AcGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "Debit",
    "name": "Debit"
  },
  {
    "type": "text",
    "required": false,
    "label": "Credit",
    "name": "Credit"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGuid",
    "name": "CurrencyGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencyVal",
    "name": "CurrencyVal"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ObverseAcGuid",
    "name": "ObverseAcGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "label": "Note",
    "name": "Note"
  }
];

module.exports.EntryDateDetail = EntryDateDetail;
