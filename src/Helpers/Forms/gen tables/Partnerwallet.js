const Partnerwallet = [
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
    "table": "wallet"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustGuid",
    "name": "CustGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
  },
  {
    "type": "text",
    "required": false,
    "label": "Value",
    "name": "Value"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "BeginDate",
    "name": "BeginDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EndDate",
    "name": "EndDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "RealWorkDay",
    "name": "RealWorkDay"
  }
];

module.exports.Partnerwallet = Partnerwallet;
