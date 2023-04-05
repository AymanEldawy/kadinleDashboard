const LinkParkingContract = [
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
    "table": "LeaseApartment"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParkingContractGuid",
    "name": "ParkingContractGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ParkingContract"
  }
];

module.exports.LinkParkingContract = LinkParkingContract;
