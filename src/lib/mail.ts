import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or use 'host' and 'port' if not using Gmail service directly
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendOtpEmail = async (email: string, code: string, type: "REGISTER" | "RESET") => {
  console.log("DEBUG: EMAIL_SERVER_USER present?", !!process.env.EMAIL_SERVER_USER);
  console.log("DEBUG: EMAIL_SERVER_PASSWORD present?", !!process.env.EMAIL_SERVER_PASSWORD);

  const subject = type === "REGISTER"
    ? "Verify your email for Nayaab Gifts"
    : "Reset your password for Nayaab Gifts";

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${type === "REGISTER" ? "Welcome to Nayaab Gifts!" : "Password Reset Request"}</h2>
      <p>Use the following code to ${type === "REGISTER" ? "verify your email address" : "reset your password"}:</p>
      <div style="background-color: #f4f4f4; padding: 12px; font-size: 24px; letter-spacing: 4px; font-weight: bold; text-align: center; border-radius: 6px; margin: 20px 0;">
        ${code}
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject,
    html,
  });
};

export const sendOrderNotification = async (order: any, userEmail: string) => {
  const subject = `New Order Received! #${order.id.slice(-6)}`;

  const itemsList = order.items
    .map(
      (item: any) =>
        `<li>${item.product.name} (x${item.quantity}) - ₹${item.priceAtPurchase}</li>`
    )
    .join("");

  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e293b;">New Order Alert 📦</h2>
      <p><strong>Order ID:</strong> #${order.id}</p>
      <p><strong>Customer:</strong> ${userEmail}</p>
      <p><strong>Amount:</strong> ₹${order.totalAmount}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      
      <h3>Items:</h3>
      <ul>${itemsList}</ul>

      <div style="margin-top: 24px;">
        <a href="${process.env.NEXTAUTH_URL}/admin/orders" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Order</a>
      </div>
    </div>
  `;

  try {
    // Send to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER,
      subject,
      html,
    });

  } catch (error) {
    console.error("Failed to send order notification:", error);
  }
};

export const sendContactFormNotification = async (data: { name: string; email: string; subject: string; message: string }) => {
  const subject = `Contact Form: ${data.subject}`;

  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e293b;">New Contact Form Submission 📩</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
      <h3 style="color: #475569;">Message:</h3>
      <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 4px;">${data.message}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER, // Send to Admin
      replyTo: data.email, // Allow replying directly to user
      subject,
      html,
    });
    console.log("Contact form email sent successfully");
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    throw new Error("Failed to send email");
  }
};
export const sendCancellationNotification = async (orderId: string, userEmail: string, refundAmount: number, paymentMethod: string) => {
  const subject = `Order Cancelled: #${orderId.slice(-6)}`;

  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #ef4444;">Order Cancelled ❌</h2>
      <p><strong>Order ID:</strong> #${orderId}</p>
      <p><strong>Customer:</strong> ${userEmail}</p>
      <p><strong>Refund Amount:</strong> ₹${refundAmount}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Status:</strong> ${paymentMethod === "ONLINE" ? "Refund Initiated (Cashfree)" : "Order Voided (COD)"}</p>

      <div style="margin-top: 24px;">
        <a href="${process.env.NEXTAUTH_URL}/admin/orders" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Orders</a>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_SERVER_USER, // Send to Admin
      subject,
      html,
    });
    console.log("Cancellation email sent successfully");
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
  }
};
