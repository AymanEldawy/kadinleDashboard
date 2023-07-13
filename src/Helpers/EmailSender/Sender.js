const messagesInfo = {
  messageName: "reset_password_msg",
  subject: "reset password subject",
  /*  no subscription yet */ join_family_msg: {
    messageName: "join_family_msg",
    subject: "join_family_msg subject",
  },
  /*  visit our shop link */ payment_successfully_msg: {
    messageName: "payment_successfully_msg",
    subject: "payment_successfully_msg subject",
  },
  /*  order_number, order_link, (track_link) */ received_order_msg: {
    messageName: "received_order_msg",
    subject: "received_order_msg subject",
  },
  /* point and expire date */ using_points_msg: {
    messageName: "using_points_msg",
    subject: "using_points_msg subject",
  },
};

export const generateMail = async (messageType, userEmail, params) => {
  let message = messagesInfo?.[messageType];
  if (message?.messageName) {
    const response = await fetch(`http://api.kadinle.com/sender`, {
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
        subject: message?.subject,
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
