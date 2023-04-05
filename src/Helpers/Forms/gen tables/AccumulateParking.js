const AccumulateParking = [
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
    "table": "parking"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParkingGuid",
    "name": "ParkingGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "parking"
  }
];

module.exports.AccumulateParking = AccumulateParking;
