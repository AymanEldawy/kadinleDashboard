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
