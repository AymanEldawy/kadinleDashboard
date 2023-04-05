const MsgTbl = [
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "text",
    "required": false,
    "label": "Msg",
    "name": "Msg"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ToUserGuid",
    "name": "ToUserGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FromUserGuid",
    "name": "FromUserGuid"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "FlagSend",
    "name": "FlagSend"
  }
];

module.exports.MsgTbl = MsgTbl;
