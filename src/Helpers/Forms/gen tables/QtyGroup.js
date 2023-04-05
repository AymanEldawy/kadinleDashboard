const QtyGroup = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
  },
  {
    "key": "unique",
    "required": false,
    "label": "GroupGuid",
    "name": "GroupGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "MatGroup"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CalcQtyGuid",
    "name": "CalcQtyGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "CalcQty"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.QtyGroup = QtyGroup;
