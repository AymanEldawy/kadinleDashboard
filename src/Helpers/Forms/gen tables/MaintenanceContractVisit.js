const MaintenanceContractVisit = [
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
    "type": "checkbox",
    "required": false,
    "label": "WithOutContract",
    "name": "WithOutContract"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MaintenanceContract"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustGuid",
    "name": "CustGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
  },
  {
    "type": "text",
    "required": false,
    "label": "No",
    "name": "No"
  },
  {
    "type": "text",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "text",
    "required": false,
    "label": "ExecState",
    "name": "ExecState"
  },
  {
    "type": "text",
    "required": false,
    "label": "ExecDate",
    "name": "ExecDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "MaintenanceWorkerGuid",
    "name": "MaintenanceWorkerGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MaintenanceWorker"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FeeAccountGuid",
    "name": "FeeAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "ExecNote",
    "name": "ExecNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "NotExecNote",
    "name": "NotExecNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "WorkNote",
    "name": "WorkNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
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
    "label": "EntryDebitCostGuid",
    "name": "EntryDebitCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryCreditCostGuid",
    "name": "EntryCreditCostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryNote",
    "name": "EntryNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.MaintenanceContractVisit = MaintenanceContractVisit;
