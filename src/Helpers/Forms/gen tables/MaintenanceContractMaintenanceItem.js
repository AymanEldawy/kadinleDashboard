const MaintenanceContractMaintenanceItem = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
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
    "label": "MaintenanceItemGuid",
    "name": "MaintenanceItemGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MaintenanceItem"
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
    "label": "Note",
    "name": "Note"
  }
];

module.exports.MaintenanceContractMaintenanceItem = MaintenanceContractMaintenanceItem;
