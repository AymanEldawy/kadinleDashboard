const ElectricityCachPayment = [
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ElectricityBill"
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

module.exports.ElectricityCachPayment = ElectricityCachPayment;
