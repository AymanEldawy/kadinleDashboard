const TransType = [
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
    "type": "text",
    "required": false,
    "label": "Code",
    "name": "Code"
  },
  {
    "type": "text",
    "required": false,
    "label": "Name",
    "name": "Name"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnName",
    "name": "LtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Menu",
    "name": "Menu"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnMenu",
    "name": "LtnMenu"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShortCut",
    "name": "ShortCut"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintPath",
    "name": "DefPrintPath"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "Color1",
    "name": "Color1"
  },
  {
    "type": "text",
    "required": false,
    "label": "Color2",
    "name": "Color2"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefCostinGuid",
    "name": "DefCostinGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefStoreInGuid",
    "name": "DefStoreInGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefCostOutGuid",
    "name": "DefCostOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefStoreOutGuid",
    "name": "DefStoreOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PostToStores",
    "name": "PostToStores"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PostToStoresAuto",
    "name": "PostToStoresAuto"
  }
];

module.exports.TransType = TransType;
