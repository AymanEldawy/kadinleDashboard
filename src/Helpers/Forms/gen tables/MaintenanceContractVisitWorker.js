const MaintenanceContractVisitWorker = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MaintenanceContractVisit"
  },
  {
    "type": "text",
    "required": false,
    "label": "HourCount",
    "name": "HourCount"
  },
  {
    "type": "text",
    "required": false,
    "label": "Fee",
    "name": "Fee"
  },
  {
    "key": "unique",
    "required": false,
    "label": "WorkerGuid",
    "name": "WorkerGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MaintenanceWorker"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.MaintenanceContractVisitWorker = MaintenanceContractVisitWorker;
