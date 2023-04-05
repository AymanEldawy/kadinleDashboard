const MaintenanceContractVisitRealty = [
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
    "key": "unique",
    "required": false,
    "label": "RealtyGuid",
    "name": "RealtyGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.MaintenanceContractVisitRealty = MaintenanceContractVisitRealty;
