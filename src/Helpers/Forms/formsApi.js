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
import { building } from "./building";

// Manual page
import { LeaseApartment } from "./LeaseApartment";

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

  LeaseApartment,
  FlatContractFee,
};
