const MaintenanceOrder = [
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
    "label": "No",
    "name": "No"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ComplaintGuid",
    "name": "ComplaintGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Complaint"
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
    "type": "text",
    "required": false,
    "label": "WorkKInd",
    "name": "WorkKInd"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "StartDate",
    "name": "StartDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EndExpectedDate",
    "name": "EndExpectedDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "CloseDate",
    "name": "CloseDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "OrderState",
    "name": "OrderState"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReasonNotRealized",
    "name": "ReasonNotRealized"
  },
  {
    "type": "text",
    "required": false,
    "label": "Convertto",
    "name": "Convertto"
  },
  {
    "type": "text",
    "required": false,
    "label": "ConvertNote",
    "name": "ConvertNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "Realized",
    "name": "Realized"
  },
  {
    "type": "text",
    "required": false,
    "label": "Mat",
    "name": "Mat"
  },
  {
    "type": "text",
    "required": false,
    "label": "Reason",
    "name": "Reason"
  },
  {
    "type": "text",
    "required": false,
    "label": "repitition",
    "name": "repitition"
  },
  {
    "type": "text",
    "required": false,
    "label": "delay",
    "name": "delay"
  },
  {
    "type": "text",
    "required": false,
    "label": "DelayReason",
    "name": "DelayReason"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryValue",
    "name": "EntryValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryCurrencyGUID",
    "name": "EntryCurrencyGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryCurrencyVal",
    "name": "EntryCurrencyVal"
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
    "label": "EntryNote",
    "name": "EntryNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note2",
    "name": "Note2"
  }
];

module.exports.MaintenanceOrder = MaintenanceOrder;
