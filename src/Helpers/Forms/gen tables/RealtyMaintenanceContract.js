const RealtyMaintenanceContract = [
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
    "table": "MaintenanceContract"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RealtyGuid",
    "name": "RealtyGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid",
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
    "label": "Percent",
    "name": "Percent"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.RealtyMaintenanceContract = RealtyMaintenanceContract;
