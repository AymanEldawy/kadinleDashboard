const AccumulateLand = [
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
    "table": "Earth"
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
  }
];

module.exports.AccumulateLand = AccumulateLand;
