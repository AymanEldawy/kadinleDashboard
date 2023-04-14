import axios from "axios";

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

export function openFullscreen() {
  let body = document.body;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    body.msRequestFullscreen();
  }
}

export function DropDowns(key) {
  const DropDown = {
    PayType: [
      { id: "0", name: "Cash" },
      { id: "1", name: "Installments" },
      { id: "2", name: "By plan" },
      { id: "3", name: "Credit" },
    ],
    RentDuration: [
      { id: 1, name: "1 Month" },
      { id: 2, name: "2 Months" },
      { id: 3, name: "3 Months" },
      { id: 4, name: "4 Months" },
      { id: 5, name: "5 Months" },
      { id: 6, name: "6 Months" },
      { id: 7, name: "7 Months" },
      { id: 8, name: "8 Months" },
      { id: 9, name: "9 Months" },
      { id: 10, name: "10 Months" },
      { id: 11, name: "11 Months" },
      { id: 12, name: "12 Months" },
      { id: 13, name: "Custom" },
    ],
    NewState: [
      { id: 0, name: "New" },
      { id: 1, name: "Renew" },
    ],
    SecLvl: [
      { id: 0, name: "Admin" },
      { id: 1, name: "User" },
    ],
    ContractKind: [
      { id: 1, name: "Flats" },
      { id: 2, name: "Pent Houses" },
      { id: 3, name: "Mezzanine" },
      { id: 4, name: "Offices" },
      { id: 5, name: "Car parking" },
      { id: 6, name: "Underground parking" },
      { id: 7, name: "Shops" },
      { id: 8, name: "Driver flats" },
      { id: 9, name: "Servant flats" },
    ],
  };
  return DropDown[key];
}

// conversion
export const hexToDecimal = (hex) => parseInt(hex, 16);
export const decimalToHex = (dec) =>
  (dec + Math.pow(16, 6)).toString(16).substr(-6);

const tabNames = {
  Apartment: "apartment 0",
  Mezzanine: "apartment 1",
  "Pent Houses": "apartment 2",
  Office: "apartment 3",
  "Servant flats": "apartment 7",
  "Driver flats": "apartment 8",
  Shops: "shop",
  "Car parking": "parking",
  "Underground parking": "parking",
};

const insertIntoApartments = async (tabName, data) => {
  let table = "Apartment";
  switch (tabNames[tabName]) {
    case "shop":
      table = "shop";
      break;
    case "parking":
      table = "parking";
      break;
    default:
      table = "Apartment";
      break;
  }
  let res = await axios.post(`/createNewApartments`, {
    table,
    data,
  });
  console.log(res);
  // console.log(tabName, tabNames[tabName], data);
};

// const deleteFromApartments = async (count, Guid, tabName) => {
//   // let apartments = await axios
//   //   .post(`/findPropertyOfBuilding`, {
//   //     table: tabName,
//   //     building: Guid,
//   //   })
//   //   .then((res) => res?.data?.recordset);
//   let deleted = await axios
//     .post(`/delete-all`)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log("---a", count, tabName, Guid, deleted);
// };

export const generateApartments = async (data) => {
  for (const tabName in data) {
    for (const row of data[tabName]) {
      await insertIntoApartments(tabName, row);
    }
  }
};

// export const apartmentsOperations = async (yCount, xCount, Guid) => {
//   for (let index = 0; index < xCount; index++) {
//     for (let j = 0; j < yCount; j++) {
//       await insertIntoApartments(
//         Guid,
//         (index * 100 + j + 101).toString(),
//         index + 1
//       );
//     }
//   }
// };

// const colPlace = {
//   ApartmentCountOfFloor: {
//     tabName: "Apartment",
//     index: "x",
//   },

//   FloorCount: {
//     tabName: "Apartment",
//     index: "y",
//   },
//   BHouseFloor: {
//     tabName: "Pent House",
//     index: "x",
//   },
//   BHouseFlatCount: {
//     tabName: "Pent House",
//     index: "y",
//   },

//   MBalanceFloor: {
//     tabName: "Mezzanine",
//     index: "x",
//   },
//   MBalanceFlatCount: {
//     tabName: "Mezzanine",
//     index: "y",
//   },
//   OfficeFloor: {
//     tabName: "Office",
//     index: "x",
//   },
//   OfficeCount: {
//     tabName: "Office",
//     index: "y",
//   },
//   ParkingFloor: {
//     tabName: "Car parking",
//     index: "x",
//   },
//   ParkingCount: {
//     tabName: "Car parking",
//     index: "y",
//   },
//   ParkingFloorUnder: {
//     tabName: "Underground parking",
//     index: "x",
//   },
//   ParkingCountUnder: {
//     tabName: "Underground parking",
//     index: "y",
//   },

//   ShopCount: {
//     tabName: "Shops",
//     index: "x",
//   },

//   FlatDriverCount: {
//     tabName: "Driver flats",
//     index: "x",
//   },

//   FlatServantCount: {
//     tabName: "Servant flats",
//     index: "x",
//   },
// };
// let collectApartments = {};

// export const checkApartments = async (columns, Guid) => {
//   console.log(columns);
//   for (const col in columns) {
//     collectApartments = {
//       ...collectApartments,
//       [colPlace?.[col]?.tabName]: {
//         ...collectApartments[colPlace?.[col]?.tabName],
//         [colPlace?.[col]?.index]: columns?.[col]?.newValue,
//         [`old${colPlace?.[col]?.index}`]: columns?.[col]?.oldValue,
//       },
//     };
//   }
//   console.log("go", collectApartments, columns);

//   for (const key in collectApartments) {
//     let item = collectApartments[key];
//     if (item?.hasOwnProperty("y")) {
//       let oldX = parseInt(item?.oldx) === 0 ? 1 : parseInt(item?.oldx);
//       let oldY = parseInt(item?.oldy) === 0 ? 1 : parseInt(item?.oldy);
//       let x = parseInt(item?.x) === 0 ? 1 : parseInt(item?.x);
//       let y = parseInt(item?.y) === 0 ? 1 : parseInt(item?.y);
//       let old = oldX * oldY;
//       let newVal = x * y;
//       if (old > newVal) {
//         let count = old - newVal;
//         deleteFromApartments(count, Guid, key);
//       } else {
//         let count = old === 1 ? newVal + 1 : newVal;
//         console.log(count);
//         count -= old;
//         console.log(count);
//         // for (let index = 0; index < count; index++) {
//         //   await insertIntoApartments(
//         //     Guid,
//         //     (index * 100 + index + 101).toString(),
//         //     "new " + index
//         //   );
//         // }
//         console.log("update");
//       }

//       console.log("old", old);
//       console.log("newVal", newVal);
//     } else {
//       let oldX = parseInt(item?.oldx) === 0 ? 1 : parseInt(item?.oldx);
//       let x = parseInt(item?.x) === 0 ? 1 : parseInt(item?.x);
//       if (oldX > x) {
//         console.log("delete", item);
//       } else {
//         console.log("update", item);
//       }
//     }
//   }
//   console.log(collectApartments);
// };
