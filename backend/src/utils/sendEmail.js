const tranEmailApi = require("../config/brevo");

const sendVerificationEmail = async (userEmail, token) => {
  const url = `http://localhost:5000/api/auth/verify/${token}`;
  try {
    await tranEmailApi.sendTransacEmail({
      sender: { email: "rishabh.kumar.intern@gmail.com", name: "DoodleWar" },
      to: [{ email: userEmail }],
      subject: "Verify your account",
      htmlContent: `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${url}">${url}</a>
      `,
    });

  } catch (error) {
    console.error("Email error:", error.response?.body || error);
  }
};

module.exports = sendVerificationEmail;