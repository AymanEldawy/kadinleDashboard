const Account = [
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
    "type": "text",
    "required": false,
    "label": "Name",
    "name": "Name"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnName",
    "name": "LtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Code",
    "name": "Code"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "CDate",
    "name": "CDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "NSons",
    "name": "NSons"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
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
    "label": "Type",
    "name": "Type"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParentGUID",
    "name": "ParentGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FinalGUID",
    "name": "FinalGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "MaxDebit",
    "name": "MaxDebit"
  },
  {
    "type": "text",
    "required": false,
    "label": "MinDebit",
    "name": "MinDebit"
  },
  {
    "type": "text",
    "required": false,
    "label": "MaxCredit",
    "name": "MaxCredit"
  },
  {
    "type": "text",
    "required": false,
    "label": "MinCredit",
    "name": "MinCredit"
  },
  {
    "type": "text",
    "required": false,
    "label": "SumDebit",
    "name": "SumDebit"
  },
  {
    "type": "text",
    "required": false,
    "label": "SumCredit",
    "name": "SumCredit"
  }
];

module.exports.Account = Account;
