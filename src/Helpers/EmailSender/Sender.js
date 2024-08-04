import { addNewItem, ADMIN } from "../../Api/globalActions";
import { msg17 } from "../Messages/17";
import { msg18 } from "../Messages/18";
import { msg30 } from "../Messages/30";
import { msg33 } from "../Messages/33";
import { msg34 } from "../Messages/34";
import { msg35 } from "../Messages/35";
import { msg36 } from "../Messages/36";
import { msg37 } from "../Messages/37";
import { msg8 } from "../Messages/8";
import { msg9 } from "../Messages/9";
import { msg19 } from "./../Messages/19";
import { msg20 } from "./../Messages/20";
import { msg21 } from "./../Messages/21";
import { msg22 } from "./../Messages/22";
import { msg23 } from "./../Messages/23";
import { msg24 } from "./../Messages/24";
import { other } from "./../Messages/other";

export const TEMPLATES = {
  8: {
    number: 8,
    name: "msg8",
    fn: msg8,
    subject: "We are so sorry that your order didn't arrive on time",
  },
  9: {
    number: 9,
    name: "msg9",
    fn: msg9,
    subject: "Kadinle - We are here to help you for the billing issue",
  },
  17: {
    number: 17,
    name: "msg8",
    fn: msg17,
    subject: "We apologize for any damage happened to your order",
  },
  18: {
    number: 18,
    name: "msg9",
    fn: msg18,
    subject: "We apologize for receiving a wrong order",
  },
  19: {
    number: 19,
    name: "msg19",
    fn: msg19,
    subject: "We are sorry for the negative experience you had",
  },
  20: {
    number: 20,
    name: "msg20",
    fn: msg20,
    subject: "We sincerely apologize for your exception request",
  },
  21: {
    number: 21,
    name: "msg21",
    fn: msg21,
    subject:
      "Exchange your products with confidence Kadinle - Unlimited Warranty",
  },
  22: {
    number: 22,
    name: "msg22",
    fn: msg22,
    subject:
      "The action you requested is against our policy, we appreciate your understanding",
  },
  23: {
    number: 23,
    name: "msg23",
    fn: msg23,
    subject: "You can get your money back now",
  },
  24: {
    number: 24,
    name: "msg24",
    fn: msg24,
    subject: "Kadinle Policies New Updates",
  },
  30: {
    number: 30,
    name: "msg30",
    fn: msg30,
    subject: "Kadinle.. We appreciate your opinions views",
  },
  33: {
    number: 33,
    name: "msg33",
    fn: msg33,
    subject:
      "The discount coupon is ready to be applied on the products in the shopping cart, what are you waiting for? 🛍😍",
  },
  34: {
    number: 34,
    name: "msg34",
    fn: msg34,
    subject:
      "Let your imagination look forward to unique and new elegance opportunities 👗 from Kadinle ",
  },
  35: {
    number: 35,
    name: "msg35",
    fn: msg35,
    subject:
      "Don't miss the chance to get a discounts of up to 60% on Kadinle products 🛍",
  },
  36: {
    number: 36,
    name: "msg36",
    fn: msg36,
    subject: "Kadinle Administration - Forward to Success",
  },
  37: {
    number: 37,
    name: "msg37",
    fn: msg37,
    subject:
      "We are so sorry to inform you that the prices of some products have rised",
  },
  other: { number: 0, name: "other", fn: other, subject: "other" },
};

export const generateMail = async (messageType, userEmail, params) => {
  if (messageType) {
    // const response = await fetch(`http://api.kadinle.com/sender`, {
    const response = await fetch(`${process.env.REACT_APP_KADINLE_API}/sender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        messageType,
        userEmail,
        params,
        subject: params?.subject || "From kadinle",
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to generate mail. Server responded with status ${response.status}`
      );
    } else {
    }
    return response.json();
  }
};

export const sendMail = async (message, emailList, subject) => {
  if (emailList?.length) {
    const response = await fetch(`${process.env.REACT_APP_KADINLE_API}/send-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        message,
        emailList,
        subject,
      }),
    });
    if (!response.ok) {
      await addNewItem("logs", {
        description: `Failed to send message to ${
          emailList?.length === 1
            ? emailList?.at(0)
            : `${emailList?.length} user`
        }`,
        row_id: `No row id`,
        table_name: `message: ${subject}`,
        admin_id: ADMIN?.id,
      });
      throw new Error(
        `Failed to generate mail. Server responded with status ${response.status}`
      );
    } else {
      await addNewItem("logs", {
        description: `Successfully send message to ${
          emailList?.length === 1
            ? emailList?.at(0)
            : `${emailList?.length} user`
        }`,
        row_id: `No row id`,
        table_name: `message: ${subject}`,
        admin_id: ADMIN?.id,
      });
    }
    return response;
  }
};

sendMail('testing', ['aymaneldawy04@gmail.com'], 'testing email')