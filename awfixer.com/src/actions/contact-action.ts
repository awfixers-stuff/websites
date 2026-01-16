"use server";

import { Resend } from "resend";

import { actionClient } from "./safe-action";
import { typedContactSchema } from "@/lib/typed-contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const submitContactForm = actionClient
  .inputSchema(typedContactSchema)
  .action(async ({ parsedInput }) => {
    const {
      contactType,
      targetEmail,
      name,
      email,
      company,
      employees,
      message,
    } = parsedInput;

    // Build the email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
          New ${contactType} Contact Form Submission
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${employees ? `<p><strong>Company Size:</strong> ${employees}</p>` : ""}
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #888; font-size: 12px;">
          This email was sent from the AWFixer contact form.
        </p>
      </div>
    `;

    // Build plain text version
    const textContent = `
New ${contactType} Contact Form Submission

From: ${name}
Email: ${email}
${company ? `Company: ${company}` : ""}
${employees ? `Company Size: ${employees}` : ""}

Message:
${message}

---
This email was sent from the AWFixer contact form.
    `.trim();

    try {
      const { error } = await resend.emails.send({
        from: `AWFixer Contact <contact@notices.awfixer.com>`,
        to: targetEmail,
        replyTo: email,
        subject: `[${contactType.charAt(0).toUpperCase() + contactType.slice(1)}] New contact from ${name}`,
        html: htmlContent,
        text: textContent,
      });

      if (error) {
        console.error("Resend error:", error);
        return {
          success: false,
          message: "Failed to send your message. Please try again later.",
          contactType,
        };
      }

      return {
        success: true,
        message: `Thank you for contacting us! We'll respond to ${email} soon.`,
        contactType,
      };
    } catch (error) {
      console.error("Contact form error:", error);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        contactType,
      };
    }
  });
