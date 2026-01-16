"use server";

import { actionClient } from "./safe-action";
import { typedContactSchema } from "@/lib/typed-contact-schema";

export const submitContactForm = actionClient
  .inputSchema(typedContactSchema)
  .action(async ({ parsedInput }) => {
    const { contactType, targetEmail, name, email, company, employees, message } = parsedInput;

    // Log for development - replace with actual email sending
    console.log("=== Contact Form Submission ===");
    console.log(`Type: ${contactType}`);
    console.log(`To: ${targetEmail}`);
    console.log(`From: ${name} <${email}>`);
    if (company) console.log(`Company: ${company}`);
    if (employees) console.log(`Employees: ${employees}`);
    console.log(`Message: ${message}`);
    console.log("================================");

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'AWFixer Contact <noreply@awfixer.com>',
    //   to: targetEmail,
    //   replyTo: email,
    //   subject: `[${contactType}] New contact from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p>...`,
    // });

    return {
      success: true,
      message: `Thank you for contacting us! We'll respond to ${email} soon.`,
      contactType,
    };
  });
