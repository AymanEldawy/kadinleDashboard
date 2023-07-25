const messagesInfo = {
  using_points_msg: {
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
