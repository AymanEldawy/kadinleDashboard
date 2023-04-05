const LawsuitExpense = [
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
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Lawsuit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CustRecovery",
    "name": "CustRecovery"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReceiptNo",
    "name": "ReceiptNo"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ReceiptDate",
    "name": "ReceiptDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReceiptValue",
    "name": "ReceiptValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGUID",
    "name": "CurrencyGUID",
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
    "type": "text",
    "required": false,
    "label": "Reference",
    "name": "Reference"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReceiptNote",
    "name": "ReceiptNote"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitAccountGuid",
    "name": "DebitAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditAccountGuid",
    "name": "CreditAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitCostGuid",
    "name": "DebitCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditCostGuid",
    "name": "CreditCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "DebitNote",
    "name": "DebitNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "CreditNote",
    "name": "CreditNote"
  },
  {
    "key": "unique",
    "required": false,
    "label": "UserGuid",
    "name": "UserGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "OneNote",
    "name": "OneNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsRounded",
    "name": "IsRounded"
  }
];

module.exports.LawsuitExpense = LawsuitExpense;
