"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

import { submitContactForm } from "@/actions/contact-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ContactType } from "@/lib/contact-config";
import { typedContactSchema, type TypedContactFormData } from "@/lib/typed-contact-schema";

interface TypedContactFormProps {
  contactType: Omit<ContactType, "icon">;
}

export function TypedContactForm({ contactType }: TypedContactFormProps) {
  const form = useForm<TypedContactFormData>({
    resolver: zodResolver(typedContactSchema),
    defaultValues: {
      contactType: contactType.id,
      targetEmail: contactType.email,
      name: "",
      email: "",
      company: "",
      employees: "",
      message: "",
      agree: false as unknown as true,
    },
  });

  const formAction = useAction(submitContactForm, {
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
  });

  const handleSubmit = form.handleSubmit(async (data: TypedContactFormData) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;

  if (hasSucceeded) {
    return (
      <div className="w-full gap-2 rounded-md border p-2 sm:p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full px-3 py-6"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mx-auto mb-4 flex w-fit justify-center rounded-full border p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="mb-2 text-center text-2xl font-bold text-pretty">
            Thank you!
          </h2>
          <p className="text-muted-foreground text-center text-lg text-pretty">
            Your message has been sent to our {contactType.title.toLowerCase()} team.
            We&apos;ll get back to you soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 space-y-4 rounded-md"
      >
        {/* Hidden fields for contact type and target email */}
        <input type="hidden" {...form.register("contactType")} />
        <input type="hidden" {...form.register("targetEmail")} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Full name *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="First and last name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email address *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="you@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {contactType.showCompanyField && (
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Your company"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {contactType.showEmployeesField && (
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => {
              const options = [
                { value: "1", label: "1" },
                { value: "2-10", label: "2-10" },
                { value: "11-50", label: "11-50" },
                { value: "51-200", label: "51-200" },
                { value: "201-500", label: "201-500" },
                { value: "500+", label: "500+" },
              ];
              return (
                <FormItem className="w-full">
                  <FormLabel>Number of employees</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="How can we help you?"
                  className="min-h-32 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  I agree to the terms and conditions and privacy policy
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-end pt-3">
          <Button type="submit" className="rounded-lg" disabled={isExecuting}>
            {isExecuting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
