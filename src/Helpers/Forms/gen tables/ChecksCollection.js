const ChecksCollection = [
  {
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
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
    "label": "CheckGuid",
    "name": "CheckGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Checks"
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
    "label": "Value",
    "name": "Value"
  },
  {
    "type": "text",
    "required": false,
    "label": "Commission",
    "name": "Commission"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LossComm",
    "name": "LossComm"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReturnCause",
    "name": "ReturnCause"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommAccountGuid",
    "name": "CommAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommAccountCreditGuid",
    "name": "CommAccountCreditGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommCostGuid",
    "name": "CommCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommNote",
    "name": "CommNote"
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
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "Kind",
    "name": "Kind"
  },
  {
    "type": "text",
    "required": false,
    "label": "Delay",
    "name": "Delay"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DelayAccountDebitGuid",
    "name": "DelayAccountDebitGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DelayAccountCreditGuid",
    "name": "DelayAccountCreditGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "DelayNote",
    "name": "DelayNote"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DelayCostGuid",
    "name": "DelayCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Finished",
    "name": "Finished"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "FinishDate",
    "name": "FinishDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "FixReturn",
    "name": "FixReturn"
  },
  {
    "type": "text",
    "required": false,
    "label": "FixReturnNote",
    "name": "FixReturnNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsRounded",
    "name": "IsRounded"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "OperationCreateEntry",
    "name": "OperationCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnCreateEntry",
    "name": "ReturnCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CommCreateEntry",
    "name": "CommCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  }
];

module.exports.ChecksCollection = ChecksCollection;
