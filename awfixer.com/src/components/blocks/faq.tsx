import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Support",
    questions: [
      {
        question: "How do I update my account without breaking my laptop?",
        answer:
          "Account updates are designed to be seamless and safe. Simply navigate to your account settings, make your changes, and save. All updates are validated before being applied to prevent any issues with your system or data.",
      },
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "We provide comprehensive documentation and community support free of charge. For enterprise customers, dedicated support is included with your subscription. We believe in empowering developers with the resources they need to succeed.",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "At AWFixer, we view AI as a powerful tool to enhance human capabilities, not replace them. We're building tools that leverage AI to make developers more productive while keeping humans firmly in control of the creative and strategic decisions.",
      },
    ],
  },
  {
    title: "Your account",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Navigate to your account settings, select 'Security', and click 'Change Password'. You'll need to enter your current password and choose a new one. We recommend using a strong, unique password and enabling two-factor authentication for added security.",
      },
      {
        question: "How long do you store session tokens?",
        answer:
          "Session tokens are valid for 30 days by default. For security reasons, tokens are automatically refreshed during active use and invalidated after 90 days of inactivity. You can customize these settings in your security preferences.",
      },
    ],
  },
  {
    title: "Other questions",
    questions: [
      {
        question: "Where are you based?",
        answer:
          "AWFixer Holdings LLC is a remote-first company with team members distributed across the United States. This allows us to attract top talent from anywhere and build products that serve a global developer community.",
      },
      {
        question: "Who actually owns AWFixer?",
        answer:
          "AWFixer and Friends is owned and operated by AWFixer Holdings LLC. We're an independent company focused on democratizing quality software through innovative development tools and solutions.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
