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

export const generateForm = () => {
  const list = [
    "fabric_information",
    "environment",
    "style",
    "package",
    "sleeve_type",
    "waist",
    "belt_condition",
    "pocket",
    "leg_type",
    "closure_type",
    "thickness",
    "printing_technique",
    "embroidery_type",
    "washing_instructions",
  ];

  let c = "";
  for (const item of list) {
    c += ` {
      name: "${item}_id",
      type: "uuid",
      key: "ref",
      // required: true,
      tableName: "${item}_content",
      refId: "${item}_id",
    },
  `;
  }
};

generateForm()