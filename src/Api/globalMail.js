import { generateMail } from "../Helpers/EmailSender/Sender";
import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import { getUserData } from "./data";

let ORDER_STATUS = {};
const getOrderStatus = async () => {
  if (Object.keys(ORDER_STATUS).length) return ORDER_STATUS;
  const response = await supabase
    .from("order_status")
    .select(`*, order_status_content(*)`);
  for (const status of response?.data) {
    ORDER_STATUS[status?.id] = status;
  }
  return ORDER_STATUS;
};

export const onOrderStatusChange = async (order) => {
  const allStatus = await getOrderStatus();

  const status = allStatus?.[order?.order_status];
  if (status?.numerical < 4) return;

  let final = status?.numerical === 5;
  let messageType =
    status?.numerical === 4
      ? `order_shipping_msg`
      : final
      ? `order_delivered_msg`
      : "";
  if (!messageType) return;

  const userResponse = await getUserData("user", "id", order?.user_id);
  const user = userResponse?.data?.at(0);

  let customer_name = `${user?.first_name} ${
    user?.last_name ? user?.last_name : ``
  }`;
  let country = null;
  if (final) {
    const responseCountry = await supabase
      .from("address")
      .select(`*, country(name)`)
      .eq("id", order?.shipping_adress);
    country = responseCountry?.data?.at(0)?.country?.name;
  }

  let params =
    final === 5
      ? {
          customer_name,
          lang: "en",
          address_or_country: country,
          delivery_time: new Date().toLocaleDateString("en-US"),
          support_link: "https://kadinle.com/support",
          subject: "Congratulations! Your order has been delivered",
        }
      : {
          customer_name,
          order_number: order?.order_number,
          order_details_link: `https://kadinle.com/profile`,
          lang: "en",
          subject: "Your order is on the way🚦",
        };

  await generateMail(messageType, user?.email, params);
};

export const onReturnRequestStatusChange = (request) => {

};
