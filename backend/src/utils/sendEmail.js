const tranEmailApi = require("../config/brevo");

const sendEmail = async (userEmail, name, tempID, url) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: { email: "rishabh.kumar.intern@gmail.com", name: "DoodleWar" },
      to: [{ email: userEmail }],
      templateId: tempID,
      params: {
        name: name,
        url: url
      }
    });

  } catch (error) {
    console.error("Email error:", error.response?.body || error);
  }
};

module.exports = sendEmail;