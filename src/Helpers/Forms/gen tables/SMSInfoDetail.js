const SMSInfoDetail = [
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
    "table": "SMSInfo"
  },
  {
    "type": "text",
    "required": false,
    "label": "Result",
    "name": "Result"
  },
  {
    "type": "text",
    "required": false,
    "label": "ArNote",
    "name": "ArNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "EnNote",
    "name": "EnNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsSend",
    "name": "IsSend"
  }
];

module.exports.SMSInfoDetail = SMSInfoDetail;
