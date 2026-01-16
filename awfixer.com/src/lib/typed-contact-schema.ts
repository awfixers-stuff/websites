import * as z from "zod";

export const typedContactSchema = z.object({
  contactType: z.string().min(1, "Contact type is required"),
  targetEmail: z.string().email("Invalid target email"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  employees: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  agree: z.literal(true, { message: "You must agree to the terms" }),
});

export type TypedContactFormData = z.infer<typeof typedContactSchema>;
