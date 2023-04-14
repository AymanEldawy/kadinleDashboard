import { account, cost, Currency } from "./account";
import { Assets, AssetsGroup } from "./assets";
import { building } from "./building";
// import { apartment, customer, Landcontract, OfferPrice, Owner, parking, RentInfo, salesman, shop, Villa } from "./testentry";
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
  apartment
} from "./cards";
import { ContractType } from "./contractType";
import { FlatBuildingDetails } from "./flatBuildingDetails";
// Manual page
import { LeaseApartment } from "./LeaseApartment";
import { mat, matgroup, Store } from "./materials";
import { FlatContractFee } from "./transactions";

const obj = {
  account,
  cost,
  currency: Currency,
  // cards
  customer,
  salesman,
  villa: Villa,
  offerprice: OfferPrice,
  landcontract:Landcontract,
  shop,
  parking,
  rentinfo:RentInfo,
  owner:Owner,
  apartment,
  // Prefer to building manual
  building,
  flatbuildingdetails:FlatBuildingDetails,
  // Materials
  mat,
  matgroup,
  store:Store,
  // assets,
  assets:Assets,
  assetsgroup:AssetsGroup,

  leaseapartment:LeaseApartment,
  flatcontractfee:FlatContractFee,
  contracttype:ContractType,
}
export default obj
