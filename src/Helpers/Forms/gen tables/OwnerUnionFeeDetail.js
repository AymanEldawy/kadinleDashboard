const OwnerUnionFeeDetail = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "parentGuid",
    "name": "parentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "OwnerUnionFee"
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
    "label": "FlatGuid",
    "name": "FlatGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Area",
    "name": "Area"
  },
  {
    "type": "text",
    "required": false,
    "label": "Fee",
    "name": "Fee"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountGuid",
    "name": "AccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.OwnerUnionFeeDetail = OwnerUnionFeeDetail;
