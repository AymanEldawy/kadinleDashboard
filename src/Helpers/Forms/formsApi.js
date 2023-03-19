import { account, cost, Currency } from "./account";
import { testentry } from "./testentry";
import {
  customer,
  salesman,
  Villa,
  OfferPrice,
  Landcontract,
  shop,
  parking,
  RentInfo,
  Owner,
} from "./cards";
import { mat, matgroup, Store } from "./materials";
import { Assets, AssetsGroup } from "./assets";
import { FlatContractFee } from "./transactions";
import {DropDowns} from "../functions";

// Manual page
const building = [
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "Number", type: "number", label: "Number", required: false },
  { name: "Emirate", type: "text", label: "Emirate", required: false },
  {
    name: "BuildAutoNumber",
    type: "text",
    label: "BuildAutoNumber",
    required: false,
  },
  { name: "Suburb", type: "text", label: "Suburb", required: false },
  { name: "BuildingNo", type: "text", label: "BuildingNo", required: false },
  {
    name: "BuildingArea",
    type: "text",
    label: "BuildingArea",
    required: false,
  },
  { name: "Area", type: "text", label: "Area", required: false },
  { name: "LicenseType", type: "text", label: "LicenseType", required: false },
  { name: "BasinNo", type: "text", label: "BasinNo", required: false },
  { name: "BuildYear", type: "text", label: "BuildYear", required: false },
  {
    name: "ElecCounterNo",
    type: "text",
    label: "ElecCounterNo",
    required: false,
  },
  { name: "Street", type: "text", label: "Street", required: false },
  { name: "BondType", type: "text", label: "BondType", required: false },
  { name: "BondNo", type: "text", label: "BondNo", required: false },
  {
    name: "BondDate",
    type: "datetime-local",
    label: "BondDate",
    required: false,
  },
  { name: "OwnerName", type: "text", label: "OwnerName", required: false },
  {
    key: "select",
    name: "SecLvl",
    label: "SecLvl",
    list: DropDowns("SecLvl"),
  },

  // step 2
  {
    name: "BuildingAccountGuid",
    type: "text",
    label: "BuildingAccountGuid",
    required: false,
  },
  { name: "CostGuid", type: "text", label: "CostGuid", required: false },
  {
    name: "AccountBankBuildingGuid",
    type: "text",
    label: "AccountBankBuildingGuid",
    required: false,
  },
  {
    name: "CashAccountGuid",
    type: "text",
    label: "CashAccountGuid",
    required: false,
  },
  {
    name: "InsuranceAccountGuid",
    type: "text",
    label: "InsuranceAccountGuid",
    required: false,
  },
  {
    name: "RentInfoGuid",
    type: "text",
    label: "RentInfoGuid",
    required: false,
  },
  { name: "BankName", type: "text", label: "BankName", required: false },
  { name: "AccountGuid", type: "text", label: "AccountGuid", required: false },
  {
    key: "select",
    name: "SecLvl",
    label: "SecLvl",
    list: DropDowns("SecLvl"),
  },
  // step 3
  {
    name: "ApartmentCountOfFloor",
    type: "number",
    label: "ApartmentCountOfFloor",
    required: false,
  },
  { name: "FloorCount", type: "number", label: "FloorCount", required: false },
  {
    name: "BHouseFloor",
    type: "number",
    label: "BHouseFloor",
    required: false,
  },
  {
    name: "BHouseFlatCount",
    type: "number",
    label: "BHouseFlatCount",
    required: false,
  },
  {
    name: "MBalanceFloor",
    type: "number",
    label: "MBalanceFloor",
    required: false,
  },
  {
    name: "MBalanceFlatCount",
    type: "number",
    label: "MBalanceFlatCount",
    required: false,
  },
  {
    name: "OfficeFloor",
    type: "number",
    label: "OfficeFloor",
    required: false,
  },
  {
    name: "OfficeCount",
    type: "number",
    label: "OfficeCount",
    required: false,
  },
  {
    name: "ParkingFloor",
    type: "number",
    label: "ParkingFloor",
    required: false,
  },
  {
    name: "ParkingCount",
    type: "number",
    label: "ParkingCount",
    required: false,
  },
  {
    name: "ParkingFloorUnder",
    type: "number",
    label: "ParkingFloorUnder",
    required: false,
  },
  {
    name: "ParkingCountUnder",
    type: "number",
    label: "ParkingCountUnder",
    required: false,
  },
  {
    name: "ApartmentCount",
    type: "number",
    label: "ApartmentCount",
    required: false,
  },
  { name: "ShopCount", type: "number", label: "ShopCount", required: false },
  {
    name: "FlatDriverCount",
    type: "number",
    label: "FlatDriverCount",
    required: false,
  },
  {
    name: "FlatServantCount",
    type: "number",
    label: "FlatServantCount",
    required: false,
  },
  {
    name: "BuildingCode",
    type: "text",
    label: "BuildingCode",
    required: false,
  },
  {
    key: "select",
    name: "SecLvl",
    label: "SecLvl",
    list: DropDowns("SecLvl"),
  },
  // step 4
  // Purchase
  {
    name: "DatePurchase",
    type: "datetime-local",
    label: "DatePurchase",
    required: false,
  },
  {
    name: "AmountPurchase",
    type: "number",
    label: "AmountPurchase",
    required: false,
  },
  {
    name: "CurrencyPurchase",
    type: "text",
    label: "CurrencyPurchase",
    required: false,
  },
  {
    name: "CurrencyvalPurchase",
    type: "number",
    label: "CurrencyvalPurchase",
    required: false,
  },
  { name: "AccountGuid", type: "text", label: "AccountGuid", required: false },
  {
    name: "PurchaseNotes",
    type: "text",
    label: "PurchaseNotes",
    required: false,
  },
  // Investment
  {
    name: "OwnerAccountGuid",
    type: "text",
    label: "OwnerAccountGuid",
    required: false,
  },
  {
    name: "IdentityBeginDate",
    type: "datetime-local",
    label: "IdentityBeginDate",
    required: false,
  },
  {
    name: "IdentityEndDate",
    type: "datetime-local",
    label: "IdentityEndDate",
    required: false,
  },
  {
    name: "IdentityValue",
    type: "number",
    label: "IdentityValue",
    required: false,
  },
  {
    name: "CurrencyIdentityGUID",
    type: "text",
    label: "CurrencyIdentityGUID",
    required: false,
  },
  {
    name: "CurrencyValIdentity",
    type: "number",
    label: "CurrencyValIdentity",
    required: false,
  },
  // Properties management
  { name: "OwnerGuid", type: "text", label: "OwnerGuid", required: false },
  {
    name: "CommissionPercent",
    type: "number",
    label: "CommissionPercent",
    required: false,
  },
  {
    name: "AccountCommIncomeGuid",
    type: "text",
    label: "AccountCommIncomeGuid",
    required: false,
  },
  {
    name: "AcCommissionFromOwnerGUID",
    type: "text",
    label: "AcCommissionFromOwnerGUID",
    required: false,
  },
  // Opening journal entry
  {
    name: "BuildingCost",
    type: "number",
    label: "BuildingCost",
    required: false,
  },
];
const leaseapartment = [
  // submittable
  // Contract information
  { name: "ContractNo", type: "text", label: "ContractNo", required: false },
  {
    name: "CustomerGuid",
    type: "text",
    label: "CustomerGuid",
    required: false,
  },
  {
    name: "BuildingGuid",
    type: "text",
    label: "BuildingGuid",
    required: false,
  },
  {
    name: "ApartmentGuid",
    type: "text",
    label: "ApartmentGuid",
    required: false,
  },
  {
    name: "RentInfoGuid",
    type: "text",
    label: "RentInfoGuid",
    required: false,
  },
  {
    name: "SalesManGuid",
    type: "text",
    label: "SalesManGuid",
    required: false,
  },
  {
    name: "NewState",
    key: "select",
    label: "NewState",
    required: false,
    list: DropDowns("NewState"),
  }, // select
  { name: "Purpose", type: "text", label: "Purpose", required: false },
  {
    name: "ResidentCount",
    type: "number",
    label: "ResidentCount",
    required: false,
  },
  { name: "Trademark", type: "text", label: "Trademark", required: false },
  { name: "Whereabouts", type: "text", label: "Whereabouts", required: false },
  {
    name: "EditDate",
    type: "datetime-local",
    label: "EditDate",
    required: false,
  },
  {
    name: "DeliverDate",
    type: "datetime-local",
    label: "DeliverDate",
    required: false,
  },
  {
    name: "RentDuration",
    type: "text",
    label: "RentDuration",
    required: false,
  },
  { name: "Rentype", type: "text", label: "Rentype", required: false },
  {
    name: "TermsOfPayment",
    type: "text",
    label: "TermsOfPayment",
    required: false,
  },
  {
    name: "CountOldContract",
    type: "number",
    label: "CountOldContract",
    required: false,
  },
  {
    name: "CountCurrentContract",
    type: "number",
    label: "CountCurrentContract",
    required: false,
  },
  // submittable
  //  Financial Information
  {
    name: "RentContractType",
    type: "number",
    label: "RentContractType",
    required: false,
  },
  { name: "Rent", type: "number", label: "Rent", required: false },
  {
    name: "MonthlyValue",
    type: "number",
    label: "MonthlyValue",
    required: false,
  },
  {
    name: "CurrencyGuid",
    type: "text",
    label: "CurrencyGuid",
    required: false,
  },
  {
    name: "DiscountPercent",
    type: "number",
    label: "DiscountPercent",
    required: false,
  },
  {
    name: "DiscountValue",
    type: "number",
    label: "DiscountValue",
    required: false,
  },
  {
    name: "DiscountAccountGuid",
    type: "text",
    label: "DiscountAccountGuid",
    required: false,
  },
  {
    name: "InsuranceValueOld",
    type: "number",
    label: "InsuranceValueOld",
    required: false,
  },
  {
    name: "InsuranceValue",
    type: "number",
    label: "InsuranceValue",
    required: false,
  },
  {
    name: "ContractPrice",
    type: "number",
    label: "ContractPrice",
    required: false,
  },
  { name: "OtherFee", type: "number", label: "OtherFee", required: false },
  {
    name: "ElectricityInsurance",
    type: "number",
    label: "ElectricityInsurance",
    required: false,
  },
  {
    name: "RentDuration",
    key: "select",
    label: "RentDuration",
    required: false,
    list: DropDowns("RentDuration"),
  }, // select
  {
    name: "FromDate",
    type: "datetime-local",
    label: "FromDate",
    required: false,
  },
  { name: "ToDate", type: "datetime-local", label: "ToDate", required: false },
  {
    name: "PayType",
    key: "select",
    label: "PayType",
    required: false,
    list: DropDowns("PayType"),
  }, // select
  { name: "CostGuid", type: "text", label: "CostGuid", required: false },
  {
    name: "RevenueAccountGuid",
    type: "text",
    label: "RevenueAccountGuid",
    required: false,
  },
  {
    name: "CustAccountGuid",
    type: "text",
    label: "CustAccountGuid",
    required: false,
  },
  {
    name: "InsuranceAccountGuid",
    type: "text",
    label: "InsuranceAccountGuid",
    required: false,
  },
  {
    name: "AccountContractPrice",
    type: "text",
    label: "AccountContractPrice",
    required: false,
  },
  {
    name: "AccountCertificatValue",
    type: "text",
    label: "AccountCertificatValue",
    required: false,
  },
  {
    name: "FineRevenueAccountGUID",
    type: "text",
    label: "FineRevenueAccountGUID",
    required: false,
  },
  // submittable
  //  payments
  // Increasable
  {
    name: "TypeGuid",
    key: "unique",
    label: "TypeGuid",
    required: false,
    list: [],
  },
  { name: "NO", type: "text", label: "NO", required: false },
  { name: "Value", type: "text", label: "Value", required: false },
  { name: "BankName", type: "text", label: "BankName", required: false },
  {
    name: "CurrencyGUID",
    key: "unique",
    label: "CurrencyGUID",
    required: false,
    list: [],
  },
  { name: "DueDate", type: "date", label: "DueDate", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "Note2", type: "text", label: "Note2", required: false },
  //  Submittable
  // Commission
  {
    name: "CommissionFromCustValue",
    type: "number",
    label: "CommissionFromCustValue",
    required: false,
  },
  {
    name: "CommissionFromCustPercent",
    type: "number",
    label: "CommissionFromCustPercent",
    required: false,
  },
  {
    name: "AcCommissionFromCustGuid",
    type: "text",
    label: "AcCommissionFromCustGuid",
    required: false,
  },
  {
    name: "AcCommissionFromCustNote",
    type: "text",
    label: "AcCommissionFromCustNote",
    required: false,
  },
  {
    name: "CommissionFromOwnerPercent",
    type: "number",
    label: "CommissionFromOwnerPercent",
    required: false,
  },
  {
    name: "CommissionFromOwnerValue",
    type: "number",
    label: "CommissionFromOwnerValue",
    required: false,
  },
  {
    name: "AcCommissionFromOwnerGuid",
    type: "text",
    label: "AcCommissionFromOwnerGuid",
    required: false,
  },
  {
    name: "AcCommissionFromOwnerNote",
    type: "text",
    label: "AcCommissionFromOwnerNote",
    required: false,
  },
  {
    name: "CommissionFromSalesManrPercent",
    type: "number",
    label: "CommissionFromSalesManrPercent",
    required: false,
  },
  {
    name: "CommissionFromSalesManValue",
    type: "number",
    label: "CommissionFromSalesManValue",
    required: false,
  },
  {
    name: "AcSalesManCommissionGuid",
    type: "text",
    label: "AcSalesManCommissionGuid",
    required: false,
  },
  {
    name: "AcCommissionExpenseGuid",
    type: "text",
    label: "AcCommissionExpenseGuid",
    required: false,
  },
  {
    name: "SalesManCommNote",
    type: "text",
    label: "SalesManCommNote",
    required: false,
  },
  //Submittable
  //  Contract terms

  //Submittable
  //  Incresable
  //  Related parking contracts
  { name: "Number", type: "text", label: "Number", required: false },
  {
    name: "ParentGuid",
    key: "unique",
    label: "ParentGuid",
    required: false,
    list: [],
  },
  {
    name: "ParkingContractGuid",
    key: "unique",
    label: "ParkingContractGuid",
    required: false,
    list: [],
  },

  // Submittable
  // Contract termination
  {
    name: "ContractFinish",
    type: "checkbox",
    label: "ContractFinish",
    required: false,
  },
  {
    name: "ContractFinishDate",
    type: "datetime-local",
    label: "ContractFinishDate",
    required: false,
  },
  {
    name: "EditContractFinishDate",
    type: "datetime-local",
    label: "EditContractFinishDate",
    required: false,
  },
  {
    name: "ResultingAmount",
    type: "number",
    label: "ResultingAmount",
    required: false,
  },
  {
    name: "ResultingAmount2",
    type: "number",
    label: "ResultingAmount2",
    required: false,
  },
  { name: "RoundKind", type: "number", label: "RoundKind", required: false },
  {
    name: "ResultingNote",
    type: "text",
    label: "ResultingNote",
    required: false,
  },
  { name: "Fine", type: "number", label: "Fine", required: false },
  { name: "FineNote", type: "text", label: "FineNote", required: false },
  { name: "FineAccount", type: "text", label: "FineAccount", required: false },
  { name: "Leave", type: "checkbox", label: "Leave", required: false },
  {
    name: "LeaveDate",
    type: "datetime-local",
    label: "LeaveDate",
    required: false,
  },
  // Submittable
  // Termination fines
  // Increasable
  {
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
  { name: "Value", type: "text", label: "Value", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  // Other fees
  // Submittable
  // Increasable
  { name: "No", type: "text", label: "No", required: false },
  { name: "Date", type: "date", label: "Date", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  // Log file
  // Submittable
  // Increasable

  { name: "Date", type: "date", label: "Date", required: false },
  { name: "Value", type: "text", label: "Value", required: false },
  {
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
  { name: "Note", type: "text", label: "Note", required: false },
  // Fixed assets
  // Submittable
  // Increasable
  { name: "ODate", type: "date", label: "ODate", required: false },
  {
    name: "UserGuid",
    key: "unique",
    label: "UserGuid",
    required: false,
    list: [],
  },
  { name: "Note", type: "text", label: "Note", required: false },
];

export default {
  testentry, // stand allow

  // Account
  account,
  cost,
  Currency,
  // cards
  customer,
  salesman,
  Villa,
  OfferPrice,
  Landcontract,
  shop,
  parking,
  RentInfo,
  Owner,
  // Prefer to building manual
  building,
  // Materials
  mat,
  matgroup,
  Store,
  // assets,
  Assets,
  AssetsGroup,

  // group
  leaseapartment,
  FlatContractFee,
};

// {
//   table: "",
//   steps: ["Accounts", "Accounts"],
// }
