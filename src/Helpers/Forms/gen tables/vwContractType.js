const vwContractType = [
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
    "label": "Contractkind",
    "name": "Contractkind"
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
    "label": "ArName",
    "name": "ArName"
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
    "label": "arMenu",
    "name": "arMenu"
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
    "label": "defprintPath",
    "name": "defprintPath"
  },
  {
    "type": "text",
    "required": false,
    "label": "defprintLogPath",
    "name": "defprintLogPath"
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
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithIncom",
    "name": "MoveCostWithIncom"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TaxAccount",
    "name": "TaxAccount"
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
    "key": "unique",
    "required": false,
    "label": "InsuranceAccountGuid",
    "name": "InsuranceAccountGuid"
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
    "type": "checkbox",
    "required": false,
    "label": "UnearnedrRevenue",
    "name": "UnearnedrRevenue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcIncomNextYearGuid",
    "name": "AcIncomNextYearGuid"
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
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsAutoRenewal",
    "name": "IsAutoRenewal"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "GenEntryEnd",
    "name": "GenEntryEnd"
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
    "type": "text",
    "required": false,
    "label": "DefSmsMobile",
    "name": "DefSmsMobile"
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
    "label": "ContractNote",
    "name": "ContractNote"
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
    "label": "DefPicTab",
    "name": "DefPicTab"
  }
];

module.exports.vwContractType = vwContractType;
