import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const FROM_EMAIL = 'onboarding@resend.dev'; // Update this to your verified domain
const TO_EMAIL = 'support@awfixer.me'; // Update this to your support email

export const server = {
  contact: {
    send: defineAction({
      accept: 'form',
      input: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        details: z.string(),
      }),
      handler: async (input) => {
        const { firstName, lastName, email, phone, details } = input;

        try {
          const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: `
              <h1>New Contact Message</h1>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Details:</strong></p>
              <p>${details}</p>
            `,
          });
          return { success: true, data };
        } catch (error) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send email',
          });
        }
      },
    }),
  },
  newsletter: {
    subscribe: defineAction({
      accept: 'form',
      input: z.object({
        email: z.string().email(),
      }),
      handler: async (input) => {
        const { email } = input;

        try {
          // In a real app, you might add this to an audience list
          const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: `New Newsletter Subscriber: ${email}`,
            html: `<p>New subscriber: <strong>${email}</strong></p>`,
          });
           return { success: true, data };
        } catch (error) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to subscribe',
          });
        }
      },
    }),
  },
  auth: {
    register: defineAction({
      accept: 'form',
      input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        agree: z.literal('on').optional(), // Checkbox sends 'on'
      }),
      handler: async (input) => {
        if (input.password !== input.confirmPassword) {
            throw new ActionError({
                code: "BAD_REQUEST",
                message: "Passwords do not match"
            })
        }

        try {
          // Send welcome email
          await resend.emails.send({
            from: FROM_EMAIL,
            to: input.email,
            subject: 'Welcome to AWFixer\'s Lounge',
            html: `<h1>Welcome!</h1><p>Thanks for signing up to AWFixer's Lounge.</p>`,
          });
          return { success: true };
        } catch (error) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send welcome email',
          });
        }
      },
    }),
    recover: defineAction({
      accept: 'form',
      input: z.object({
        email: z.string().email(),
      }),
      handler: async (input) => {
        try {
          // Send recovery email
           await resend.emails.send({
            from: FROM_EMAIL,
            to: input.email,
            subject: 'Password Recovery - AWFixer\'s Lounge',
            html: `<p>You requested a password reset. (This is a demo)</p>`,
          });
          return { success: true };
        } catch (error) {
           throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send recovery email',
          });
        }
      },
    }),
    login: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email(),
            password: z.string(),
            rememberMe: z.literal('on').optional()
        }),
        handler: async (input) => {
            // Mock login - strictly for demonstration as requested to "use resend"
            // We won't send an email on login usually.
            return { success: true };
        }
    })
  },
};
