const ContractParkingCachPayment = [
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ParkingContract"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryGuid",
    "name": "EntryGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "HEntry"
  }
];

module.exports.ContractParkingCachPayment = ContractParkingCachPayment;
