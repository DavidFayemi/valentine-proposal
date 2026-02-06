import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (emailjsPublicKey && emailjsServiceId && emailjsTemplateId) {
  emailjs.init(emailjsPublicKey);
} else {
  console.warn(
    "EmailJS credentials not fully configured. Email sending will be disabled.",
  );
}

export const sendResponseEmail = async (response: "yes" | "no") => {
  try {
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;

    if (!recipientEmail) {
      console.warn("Recipient email not configured");
      return;
    }

    if (!emailjsPublicKey || !emailjsServiceId || !emailjsTemplateId) {
      console.warn("EmailJS credentials not configured");
      return;
    }

    const message =
      response === "yes"
        ? "She said yes, I hope you have your gifts ready!"
        : "She attempted to say no";

    // Send email using EmailJS
    await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      {
        to_email: recipientEmail,
        to_name: "Valentine",
        subject: `Valentine's Proposal Response - ${response.toUpperCase()}`,
        message: message,
        response_type: response,
      },
      emailjsPublicKey,
    );

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
