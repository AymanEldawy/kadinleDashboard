const FlatAssets = [
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
    "table": "Apartment"
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

module.exports.FlatAssets = FlatAssets;
