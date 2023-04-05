const vwTrans = [
  {
    "type": "text",
    "required": false,
    "label": "BuNumber",
    "name": "BuNumber"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuGuid",
    "name": "BuGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuSecLvl",
    "name": "BuSecLvl"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuTypeGuid",
    "name": "BuTypeGuid"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "BuDate",
    "name": "BuDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuCurrencyGuid",
    "name": "BuCurrencyGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuCurrencyVal",
    "name": "BuCurrencyVal"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuPayType",
    "name": "BuPayType"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuPayTypeStr",
    "name": "BuPayTypeStr"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuStoreInGuid",
    "name": "BuStoreInGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuStoreOutGuid",
    "name": "BuStoreOutGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuCostInGuid",
    "name": "BuCostInGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuCostOutGuid",
    "name": "BuCostOutGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuBranchGuid",
    "name": "BuBranchGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuClass",
    "name": "BuClass"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuNote",
    "name": "BuNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "BuisPosted",
    "name": "BuisPosted"
  },
  {
    "type": "text",
    "required": false,
    "label": "TransPost",
    "name": "TransPost"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtNumber",
    "name": "BtNumber"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BtGuid",
    "name": "BtGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtSecLvl",
    "name": "BtSecLvl"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtCode",
    "name": "BtCode"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtName",
    "name": "BtName"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtLtnName",
    "name": "BtLtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtMenu",
    "name": "BtMenu"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtLtnMenu",
    "name": "BtLtnMenu"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtShortCut",
    "name": "BtShortCut"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtDefPrintPath",
    "name": "BtDefPrintPath"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtNote",
    "name": "BtNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtColor1",
    "name": "BtColor1"
  },
  {
    "type": "text",
    "required": false,
    "label": "BtColor2",
    "name": "BtColor2"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "BtPostToStores",
    "name": "BtPostToStores"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "BtPostToStoresAuto",
    "name": "BtPostToStoresAuto"
  },
  {
    "type": "text",
    "required": false,
    "label": "MyCode",
    "name": "MyCode"
  },
  {
    "type": "text",
    "required": false,
    "label": "MyLtnCode",
    "name": "MyLtnCode"
  },
  {
    "type": "text",
    "required": false,
    "label": "MyName",
    "name": "MyName"
  },
  {
    "type": "text",
    "required": false,
    "label": "MyLtnName",
    "name": "MyLtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "MyCurrencyVal",
    "name": "MyCurrencyVal"
  },
  {
    "type": "text",
    "required": false,
    "label": "StCodeIn",
    "name": "StCodeIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "StNameIn",
    "name": "StNameIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "StLtnNameIn",
    "name": "StLtnNameIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "StCodeOut",
    "name": "StCodeOut"
  },
  {
    "type": "text",
    "required": false,
    "label": "StNameOut",
    "name": "StNameOut"
  },
  {
    "type": "text",
    "required": false,
    "label": "StLtnNameOut",
    "name": "StLtnNameOut"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoCodeIn",
    "name": "CoCodeIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoNameIn",
    "name": "CoNameIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoLtnNameIn",
    "name": "CoLtnNameIn"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoCodeOut",
    "name": "CoCodeOut"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoNameOut",
    "name": "CoNameOut"
  },
  {
    "type": "text",
    "required": false,
    "label": "CoLtnNameOut",
    "name": "CoLtnNameOut"
  }
];

module.exports.vwTrans = vwTrans;
