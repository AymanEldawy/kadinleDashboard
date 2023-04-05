const BuildingRecElecCounter = [
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
    "key": "unique",
    "required": false,
    "label": "BuildingGuid",
    "name": "BuildingGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Building"
  },
  {
    "type": "text",
    "required": false,
    "label": "UnNo",
    "name": "UnNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "Service",
    "name": "Service"
  },
  {
    "type": "text",
    "required": false,
    "label": "Address",
    "name": "Address"
  },
  {
    "type": "text",
    "required": false,
    "label": "ElecCounterNo",
    "name": "ElecCounterNo"
  },
  {
    "key": "unique",
    "required": false,
    "label": "UserGuid",
    "name": "UserGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "text",
    "required": false,
    "label": "OldCounter",
    "name": "OldCounter"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "OldDate",
    "name": "OldDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Counter",
    "name": "Counter"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.BuildingRecElecCounter = BuildingRecElecCounter;
