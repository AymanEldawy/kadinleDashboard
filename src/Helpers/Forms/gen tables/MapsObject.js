const MapsObject = [
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "MapGuid",
    "name": "MapGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MapsConfig"
  },
  {
    "type": "text",
    "required": false,
    "label": "X",
    "name": "X"
  },
  {
    "type": "text",
    "required": false,
    "label": "Y",
    "name": "Y"
  },
  {
    "type": "text",
    "required": false,
    "label": "Kind",
    "name": "Kind"
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
    "label": "LandGuid",
    "name": "LandGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Earth"
  },
  {
    "key": "unique",
    "required": false,
    "label": "VillaGuid",
    "name": "VillaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Villa"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.MapsObject = MapsObject;
