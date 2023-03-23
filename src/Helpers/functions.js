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
    PayType: ["Cash", "Installments", "By plan", "Credit"],
    RentDuration: [
      "1 Month",
      "2 Months",
      "3 Months",
      "4 Months",
      "5 Months",
      "6 Months",
      "7 Months",
      "8 Months",
      "9 Months",
      "10 Months",
      "11 Months",
      "12 Months",
      "Custom",
    ],
    NewState: ["New", "Renew"],
    SecLvl: ["Admin", "User"],
  };
  return DropDown[key];
}

const REQUESTED_CACHED = {};

async function fetch(name) {
  const res = await axios.post(`/list`, {
    table: name,
  });
  return await res.json();
}
export function getData(name) {
  fetch(name).then((d) => {
    console.log("d", d);
    // console.log("dddd", d);
    // if (d.status == 200) {
    //   return d?.data?.recordset;
    // }
  });
}

// export function getData(name) {
//   if (!REQUESTED_CACHED[name]) {
//     fetch(name).then((d) => {
//       if (d?.data) REQUESTED_CACHED[name] = d?.data?.recordset;
//       return d?.data?.recordset;
//     });
//     return REQUESTED_CACHED[name];
//   } else return REQUESTED_CACHED[name];
// }

const account = [
  {
    name: "CurrencyGUID",
    key: "unique",
    label: "CurrencyGUID",
    required: false,
    list: getData("currency"),
  },
];
