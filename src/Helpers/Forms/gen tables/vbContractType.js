const vbContractType = [
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
    "type": "text",
    "required": false,
    "label": "ContractKind",
    "name": "ContractKind"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsAutoRenewal",
    "name": "IsAutoRenewal"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RevenueAccountGUID",
    "name": "RevenueAccountGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionFromCustGUID",
    "name": "AcCommissionFromCustGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionFromOwnerGUID",
    "name": "AcCommissionFromOwnerGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountContractPriceGUID",
    "name": "AccountContractPriceGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountCertificatValueGUID",
    "name": "AccountCertificatValueGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineAccountGUID",
    "name": "FineAccountGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DiscountAccountGUID",
    "name": "DiscountAccountGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TaxAccount",
    "name": "TaxAccount"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount1GUID",
    "name": "OtherFeeAccount1GUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount2GUID",
    "name": "OtherFeeAccount2GUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount3GUID",
    "name": "OtherFeeAccount3GUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount4GUID",
    "name": "OtherFeeAccount4GUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount5GUID",
    "name": "OtherFeeAccount5GUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "InsuranceAccountGuid",
    "name": "InsuranceAccountGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "ServesComm",
    "name": "ServesComm"
  },
  {
    "type": "text",
    "required": false,
    "label": "Rentcondition",
    "name": "Rentcondition"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCost",
    "name": "MoveCost"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostCredit",
    "name": "MoveCostCredit"
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
    "label": "DefPrintLogPath",
    "name": "DefPrintLogPath"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoCreateEntry",
    "name": "AutoCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoPostedEntry",
    "name": "AutoPostedEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithIncom",
    "name": "MoveCostWithIncom"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithInsurance",
    "name": "MoveCostWithInsurance"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithContractPrice",
    "name": "MoveCostWithContractPrice"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithCertificat",
    "name": "MoveCostWithCertificat"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithFee",
    "name": "MoveCostWithFee"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithclientComm",
    "name": "MoveCostWithclientComm"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithOwnerComm",
    "name": "MoveCostWithOwnerComm"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithInconEndContract",
    "name": "MoveCostWithInconEndContract"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithFineEndContract",
    "name": "MoveCostWithFineEndContract"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithIncomCredit",
    "name": "MoveCostWithIncomCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithInsuranceCredit",
    "name": "MoveCostWithInsuranceCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithContractPriceCredit",
    "name": "MoveCostWithContractPriceCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithCertificatCredit",
    "name": "MoveCostWithCertificatCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithFeeCredit",
    "name": "MoveCostWithFeeCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithclientCommCredit",
    "name": "MoveCostWithclientCommCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithOwnerCommCredit",
    "name": "MoveCostWithOwnerCommCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithInconEndContractCredit",
    "name": "MoveCostWithInconEndContractCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithFineEndContractCredit",
    "name": "MoveCostWithFineEndContractCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithDiscount",
    "name": "MoveCostWithDiscount"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithDiscountCredit",
    "name": "MoveCostWithDiscountCredit"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefSmsMobile",
    "name": "DefSmsMobile"
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
    "label": "AutoSMSAfterEnd",
    "name": "AutoSMSAfterEnd"
  },
  {
    "type": "text",
    "required": false,
    "label": "EndSMSMsg",
    "name": "EndSMSMsg"
  },
  {
    "type": "text",
    "required": false,
    "label": "EndSMSMsgEn",
    "name": "EndSMSMsgEn"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndContract",
    "name": "EndContract"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ConstraintInsurance",
    "name": "ConstraintInsurance"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintReceipt",
    "name": "DefPrintReceipt"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintacquittance",
    "name": "DefPrintacquittance"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DeflawsuitDebitAccountGUID",
    "name": "DeflawsuitDebitAccountGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DeflawsuitCreditAccountGUID",
    "name": "DeflawsuitCreditAccountGUID"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LawsuitCustAccount",
    "name": "LawsuitCustAccount"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LawsuitCostwithDebitAccount",
    "name": "LawsuitCostwithDebitAccount"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LawsuitCostwithCreditAccount",
    "name": "LawsuitCostwithCreditAccount"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LawsuitLinkUser",
    "name": "LawsuitLinkUser"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "LawsuitLinkUserExpense",
    "name": "LawsuitLinkUserExpense"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "UnearnedrRevenue",
    "name": "UnearnedrRevenue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcIncomNextYearGUID",
    "name": "AcIncomNextYearGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionExpenseGuid",
    "name": "AcCommissionExpenseGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "OpNewContract",
    "name": "OpNewContract"
  },
  {
    "type": "text",
    "required": false,
    "label": "FirstPayNote",
    "name": "FirstPayNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "FirstPayNoteLtn",
    "name": "FirstPayNoteLtn"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractNote",
    "name": "ContractNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractNoteLtn",
    "name": "ContractNoteLtn"
  },
  {
    "type": "text",
    "required": false,
    "label": "FeeEntryNote",
    "name": "FeeEntryNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CanBeginDateAfterDate2",
    "name": "CanBeginDateAfterDate2"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "GenEntryEnd",
    "name": "GenEntryEnd"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPicTab",
    "name": "DefPicTab"
  }
];

module.exports.vbContractType = vbContractType;
