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

const insertIntoApartments = async (Guid, No, FloorNo) => {
  let res = await axios.post(`/createApartments`, {
    BuildingGuid: Guid,
    No,
    FloorNo,
  });
  console.log(res);
};

const deleteFromApartments = async () => {};

export const generateApartments = async (data, Guid) => {
  const { FloorCount, ApartmentCountOfFloor } = data;
  for (let index = 0; index < FloorCount; index++) {
    for (let j = 0; j < ApartmentCountOfFloor; j++) {
      await insertIntoApartments(
        Guid,
        (index * 100 + j + 101).toString(),
        index + 1
      );
    }
  }
};

export const apartmentsOperations = async (yCount, xCount, Guid) => {
  for (let index = 0; index < xCount; index++) {
    for (let j = 0; j < yCount; j++) {
      await insertIntoApartments(
        Guid,
        (index * 100 + j + 101).toString(),
        index + 1
      );
    }
  }
};

const colPlace = {
  ApartmentCountOfFloor: {
    tabName: "Apartment",
    index: "x",
  },

  FloorCount: {
    tabName: "Apartment",
    index: "y",
  },
  BHouseFloor: {
    tabName: "Pent House",
    index: "x",
  },
  BHouseFlatCount: {
    tabName: "Pent House",
    index: "y",
  },

  MBalanceFloor: {
    tabName: "Mezzanine",
    index: "x",
  },
  MBalanceFlatCount: {
    tabName: "Mezzanine",
    index: "y",
  },
  OfficeFloor: {
    tabName: "Office",
    index: "x",
  },
  OfficeCount: {
    tabName: "Office",
    index: "y",
  },
  ParkingFloor: {
    tabName: "Car parking",
    index: "x",
  },
  ParkingCount: {
    tabName: "Car parking",
    index: "y",
  },
  ParkingFloorUnder: {
    tabName: "Underground parking",
    index: "x",
  },
  ParkingCountUnder: {
    tabName: "Underground parking",
    index: "y",
  },

  ShopCount: {
    tabName: "Shops",
    index: "x",
  },

  FlatDriverCount: {
    tabName: "Driver flats",
    index: "x",
  },

  FlatServantCount: {
    tabName: "Servant flats",
    index: "x",
  },
};
let collectApartments = {};

export const checkApartments = (columns) => {
  for (const col in columns) {
    let differences = columns?.[col]?.newValue - columns?.[col]?.oldValue;
    collectApartments = {
      ...collectApartments,
      [colPlace?.[col]?.tabName]: {
        ...collectApartments[colPlace?.[col]?.tabName],
        [colPlace?.[col]?.index]: columns?.[col]?.newValue,
        [`old${colPlace?.[col]?.index}`]: columns?.[col]?.oldValue,
        [`differences_${colPlace?.[col]?.index}`]: differences,
      },
    };
  }

  // if (columns?.[col]?.updated) {
  // if (columns?.[col]?.oldValue > columns?.[col]?.newValue) {
  //   console.log("delete");
  //   // delete
  // }
  // if (columns?.[col]?.oldValue < columns?.[col]?.newValue) {
  //   console.log("insert");
  //   // insert
  // }
  // }
  for (const key in collectApartments) {
    let item = collectApartments[key];
    if (item?.hasOwnProperty("y")) {
      let incrementYStatus = true;
      let incrementXStatus = true;
      if (item?.differences_y < 0) {
        incrementYStatus = false;
      }
      if (item?.differences_x < 0) {
        incrementXStatus = false;
      }
      console.log(incrementXStatus, "x", incrementYStatus, "y");
    } else {
      console.log(item, "one", item);
    }
  }
  console.log(collectApartments);
};
