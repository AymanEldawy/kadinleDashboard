const vwAccountConformity = [
  {
    "type": "text",
    "required": false,
    "label": "UserName",
    "name": "UserName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Cost",
    "name": "Cost"
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
    "label": "Guid",
    "name": "Guid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "UserGuid",
    "name": "UserGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountGuid",
    "name": "AccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGuid",
    "name": "CurrencyGuid"
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
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "Balance",
    "name": "Balance"
  }
];

module.exports.vwAccountConformity = vwAccountConformity;
