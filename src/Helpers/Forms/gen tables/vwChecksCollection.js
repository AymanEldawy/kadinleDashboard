const vwChecksCollection = [
  {
    "type": "text",
    "required": false,
    "label": "TypeName",
    "name": "TypeName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Seclvl",
    "name": "Seclvl"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
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
    "name": "CheckGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitAccountGuid",
    "name": "DebitAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DebitCostGuid",
    "name": "DebitCostGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditAccountGuid",
    "name": "CreditAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditCostGuid",
    "name": "CreditCostGuid"
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
    "key": "unique",
    "required": false,
    "label": "CommAccountGuid",
    "name": "CommAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommAccountCreditGuid",
    "name": "CommAccountCreditGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGUID",
    "name": "CurrencyGUID"
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
    "name": "DelayAccountDebitGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DelayAccountCreditGuid",
    "name": "DelayAccountCreditGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DelayCostGuid",
    "name": "DelayCostGuid"
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
    "label": "Finishdate",
    "name": "Finishdate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReturnCause",
    "name": "ReturnCause"
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
    "label": "CommCostGuid",
    "name": "CommCostGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommNote",
    "name": "CommNote"
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
  }
];

module.exports.vwChecksCollection = vwChecksCollection;
