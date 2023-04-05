const AssetsChangeArea = [
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
    "label": "AssetsGuid",
    "name": "AssetsGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Assets"
  },
  {
    "type": "text",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrentAreaGuid",
    "name": "CurrentAreaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "AssetsArea"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AreaGuid",
    "name": "AreaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "AssetsArea"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.AssetsChangeArea = AssetsChangeArea;
