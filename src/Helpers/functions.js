import axios from "axios";
import { toast } from "react-toastify";

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

export const uploadFile = async ({ data, url }) => {
  const headers = new Headers();
  headers.append(
    "key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI"
  );

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: data,
    redirect: "follow",
  };

  const response = fetch(url, requestOptions);
  if (response) {
    return response;
  } else {
    toast.error(
      "failed to upload the image, please try again",
      response?.error
    );
  }
};

export function TicketIdGen() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let firstId = "";
  for (let i = 0; i < 3; i++) {
    let rand = characters.charAt(Math.floor(Math.random() * characters.length));
    firstId += rand.toString();
  }
  const secondId = Math.floor(Math.floor(Math.random() * 999));
  const thirdId = Math.floor(Math.floor(Math.random() * 99999));
  return firstId + "-" + secondId + "-" + thirdId;
}

export function getFormatPrice(price, currency) {
  let calculatePrice = (price / currency?.rate).toFixed(2);
  if (!calculatePrice || isNaN(calculatePrice)) calculatePrice = price;
  return calculatePrice;
}

export function buildTree(items) {
  const map = {};
  const roots = [];

  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  items.forEach((item) => {
    if (item.parent_id === null) {
      roots.push(map[item.id]);
    } else {
      map[item.parent_id].children.push(map[item.id]);
    }
  });

  return roots;
}

export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function getDiscountIcon(type) {
  console.log("🚀 ~ getDiscountIcon ~ type:", type);
  switch (type) {
    case "amount":
      return "💸";
    case "percentage":
      return "%";
    case "pay_x_buy_y":
      return "🏷️";
    default:
      return "";
  }
}
