const CheckType = [
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
    "label": "CheckKind",
    "name": "CheckKind"
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
    "label": "ltnName",
    "name": "ltnName"
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
    "type": "checkbox",
    "required": false,
    "label": "CreatedEntry",
    "name": "CreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoCreatedEntry",
    "name": "AutoCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoPostedEntry",
    "name": "AutoPostedEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DefAccountGuid",
    "name": "DefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Posted",
    "name": "Posted"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PosdetCreatedEntry",
    "name": "PosdetCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PosdetAutoCreatedEntry",
    "name": "PosdetAutoCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PosdetAutoPostedEntry",
    "name": "PosdetAutoPostedEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "PostedDefAccountGuid",
    "name": "PostedDefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "PostedDefCreditAccountGuid",
    "name": "PostedDefCreditAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DefOwnerBuildingPosted",
    "name": "DefOwnerBuildingPosted"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DefCustPosted",
    "name": "DefCustPosted"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PostMoveCostDebit",
    "name": "PostMoveCostDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "PostMoveCostCredit",
    "name": "PostMoveCostCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collected",
    "name": "collected"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedCreatedEntry",
    "name": "collectedCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedAutoCreatedEntry",
    "name": "collectedAutoCreatedEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CollectedEntryTypeGuid",
    "name": "CollectedEntryTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "EntryType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedAutoPostedEntry",
    "name": "collectedAutoPostedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedSanctionBankAccountBuilding",
    "name": "collectedSanctionBankAccountBuilding"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedSanctionCustObverse",
    "name": "collectedSanctionCustObverse"
  },
  {
    "key": "unique",
    "required": false,
    "label": "collectedDefAccountGuid",
    "name": "collectedDefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "collectedDefAccountObverseGuid",
    "name": "collectedDefAccountObverseGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommAccountDebitGuid",
    "name": "CommAccountDebitGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CommAccountCreditGuid",
    "name": "CommAccountCreditGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CommOwnerBuilding",
    "name": "CommOwnerBuilding"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DefBuildingComm",
    "name": "DefBuildingComm"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommType",
    "name": "CommType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DefBuildingIncomComm",
    "name": "DefBuildingIncomComm"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedMoveCostDebit",
    "name": "collectedMoveCostDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "collectedMoveCostCredit",
    "name": "collectedMoveCostCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CommMoveCost",
    "name": "CommMoveCost"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CommMoveCostCredit",
    "name": "CommMoveCostCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollected",
    "name": "partialcollected"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedCreatedEntry",
    "name": "partialcollectedCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedAutoCreatedEntry",
    "name": "partialcollectedAutoCreatedEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "partialCollectedEntryTypeGuid",
    "name": "partialCollectedEntryTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "EntryType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedAutoPostedEntry",
    "name": "partialcollectedAutoPostedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedSanctionBankAccountBuilding",
    "name": "partialcollectedSanctionBankAccountBuilding"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedCachBankAccountBuilding",
    "name": "partialcollectedCachBankAccountBuilding"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialcollectedSanctionCustObverse",
    "name": "partialcollectedSanctionCustObverse"
  },
  {
    "key": "unique",
    "required": false,
    "label": "partialcollectedDefAccountGuid",
    "name": "partialcollectedDefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "partialcollectedDefAccountObverseGuid",
    "name": "partialcollectedDefAccountObverseGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialMoveCostDebit",
    "name": "partialMoveCostDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "partialMoveCostCredit",
    "name": "partialMoveCostCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Endorsement",
    "name": "Endorsement"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndorsementCreatedEntry",
    "name": "EndorsementCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndorsementAutoCreatedEntry",
    "name": "EndorsementAutoCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndorsementAutoPostedEntry",
    "name": "EndorsementAutoPostedEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EndorsementDefAccountDebitGuid",
    "name": "EndorsementDefAccountDebitGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EndorsementDefAccountCreateGuid",
    "name": "EndorsementDefAccountCreateGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndorsementMoveCostDebit",
    "name": "EndorsementMoveCostDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndorsementMoveCostCredit",
    "name": "EndorsementMoveCostCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Returned",
    "name": "Returned"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedCreatedEntry",
    "name": "ReturnedCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedAutoCreatedEntry",
    "name": "ReturnedAutoCreatedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedAutoPostedEntry",
    "name": "ReturnedAutoPostedEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedSanctionBankBuilding",
    "name": "ReturnedSanctionBankBuilding"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedSanctionBankBuildingCaseCollOnly",
    "name": "ReturnedSanctionBankBuildingCaseCollOnly"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnedSanctionCustAccountDefAccount",
    "name": "ReturnedSanctionCustAccountDefAccount"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ReturnedDefAccountGuid",
    "name": "ReturnedDefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ReturnedDefAccountCreditGuid",
    "name": "ReturnedDefAccountCreditGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EnableAtherOperationOnReturn",
    "name": "EnableAtherOperationOnReturn"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnMoveCostDebit",
    "name": "ReturnMoveCostDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ReturnMoveCostCredit",
    "name": "ReturnMoveCostCredit"
  },
  {
    "key": "unique",
    "required": false,
    "label": "delayDefAccountGuid",
    "name": "delayDefAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "delayDefAccountObverseGuid",
    "name": "delayDefAccountObverseGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "delaySanctionCustAccountDefAccount",
    "name": "delaySanctionCustAccountDefAccount"
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
    "label": "NoteForm1",
    "name": "NoteForm1"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNoteForm1",
    "name": "LtnNoteForm1"
  },
  {
    "type": "text",
    "required": false,
    "label": "NoteForm2",
    "name": "NoteForm2"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNoteForm2",
    "name": "LtnNoteForm2"
  },
  {
    "type": "text",
    "required": false,
    "label": "NotePosted",
    "name": "NotePosted"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNotePosted",
    "name": "LtnNotePosted"
  },
  {
    "type": "text",
    "required": false,
    "label": "Notecollected",
    "name": "Notecollected"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNotecollected",
    "name": "LtnNotecollected"
  },
  {
    "type": "text",
    "required": false,
    "label": "NotecollectedPartial",
    "name": "NotecollectedPartial"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNotecollectedPartial",
    "name": "LtnNotecollectedPartial"
  },
  {
    "type": "text",
    "required": false,
    "label": "NoteEndorsement",
    "name": "NoteEndorsement"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNoteEndorsement",
    "name": "LtnNoteEndorsement"
  },
  {
    "type": "text",
    "required": false,
    "label": "NoteReturn",
    "name": "NoteReturn"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNoteReturn",
    "name": "LtnNoteReturn"
  },
  {
    "type": "text",
    "required": false,
    "label": "NoteCommission",
    "name": "NoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnNoteCommission",
    "name": "LtnNoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "PartialNoteCommission",
    "name": "PartialNoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "PartialLtnNoteCommission",
    "name": "PartialLtnNoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReturnNoteCommission",
    "name": "ReturnNoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnReturnNoteCommission",
    "name": "LtnReturnNoteCommission"
  },
  {
    "type": "text",
    "required": false,
    "label": "PostedDate",
    "name": "PostedDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "partialcollectedDate",
    "name": "partialcollectedDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "collectedDate",
    "name": "collectedDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "EndorsementDate",
    "name": "EndorsementDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReturnedDate",
    "name": "ReturnedDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoSMSAfterAdd",
    "name": "AutoSMSAfterAdd"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSMsg",
    "name": "SMSMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSMsgEn",
    "name": "SMSMsgEn"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSChecksCollectionAutoSend",
    "name": "SMSChecksCollectionAutoSend"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSChecksCollectionImmediate",
    "name": "SMSChecksCollectionImmediate"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksCollectionDay",
    "name": "SMSChecksCollectionDay"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksCollectionMsg",
    "name": "SMSChecksCollectionMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksCollectionMsgEN",
    "name": "SMSChecksCollectionMsgEN"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSChecksPartialCollectionAutoSend",
    "name": "SMSChecksPartialCollectionAutoSend"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksPartialCollectionMsg",
    "name": "SMSChecksPartialCollectionMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksPartialCollectionMsgEN",
    "name": "SMSChecksPartialCollectionMsgEN"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSCheckReturnAutoSend",
    "name": "SMSCheckReturnAutoSend"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSCheckReturnImmediate",
    "name": "SMSCheckReturnImmediate"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSCheckReturnDay",
    "name": "SMSCheckReturnDay"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSCheckReturnMsg",
    "name": "SMSCheckReturnMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSCheckReturnMsgEn",
    "name": "SMSCheckReturnMsgEn"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "SMSChecksDue",
    "name": "SMSChecksDue"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksDueDay",
    "name": "SMSChecksDueDay"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksDueMsg",
    "name": "SMSChecksDueMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "SMSChecksDueMsgEn",
    "name": "SMSChecksDueMsgEn"
  }
];

module.exports.CheckType = CheckType;
