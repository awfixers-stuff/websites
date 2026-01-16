import Link from "next/link";
import { Twitter, ArrowRight } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { getAllContactTypes } from "@/lib/contact-config";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://x.com/awfixer",
    icon: Twitter,
  },
  {
    name: "Discord",
    href: "https://discord.awfixer.com",
    icon: () => (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const contactTypes = getAllContactTypes();

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-3xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Contact us
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          Choose the best way to get in touch with us
        </p>

        {/* Contact Type Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {contactTypes.map((type) => (
            <Link
              key={type.id}
              href={`/contact/${type.id}`}
              className="group flex flex-col rounded-lg border p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent p-2">
                  <type.icon className="size-5 text-foreground" />
                </div>
                <h2 className="text-lg font-semibold">{type.title}</h2>
              </div>
              <p className="text-muted-foreground mt-2 text-sm flex-1">
                {type.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                <span>Get in touch</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Social Links */}
        <div className="text-center">
          <h2 className="mb-4 text-lg font-semibold">Follow us</h2>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="size-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
