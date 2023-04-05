const AccumulateFlat = [
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
    "label": "FlatGuid",
    "name": "FlatGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Apartment"
  }
];

module.exports.AccumulateFlat = AccumulateFlat;
