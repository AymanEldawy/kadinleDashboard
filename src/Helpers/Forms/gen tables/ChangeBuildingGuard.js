const ChangeBuildingGuard = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
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
    "key": "unique",
    "required": false,
    "label": "GuardGuid",
    "name": "GuardGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "BuildingGuard"
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
    "label": "Note",
    "name": "Note"
  }
];

module.exports.ChangeBuildingGuard = ChangeBuildingGuard;
