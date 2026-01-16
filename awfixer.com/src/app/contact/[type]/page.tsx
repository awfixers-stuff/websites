import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { DashedLine } from "@/components/dashed-line";
import { TypedContactForm } from "@/components/blocks/typed-contact-form";
import { getContactType, getAllContactTypes } from "@/lib/contact-config";

interface ContactTypePageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateStaticParams() {
  const types = getAllContactTypes();
  return types.map((type) => ({
    type: type.id,
  }));
}

export async function generateMetadata({ params }: ContactTypePageProps): Promise<Metadata> {
  const { type } = await params;
  const contactType = getContactType(type);

  if (!contactType) {
    return {
      title: "Contact Not Found",
    };
  }

  return {
    title: `${contactType.title} - Contact AWFixer`,
    description: contactType.description,
  };
}

export default async function ContactTypePage({ params }: ContactTypePageProps) {
  const { type } = await params;
  const contactType = getContactType(type);

  if (!contactType) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...serializableContactType } = contactType;

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        {/* Back Link */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          <span>All contact options</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="rounded-lg bg-accent p-3">
            <contactType.icon className="size-6 text-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
            {contactType.title}
          </h1>
        </div>
        <p className="text-muted-foreground leading-snug font-medium mb-2">
          {contactType.description}
        </p>
        <p className="text-muted-foreground text-sm">
          Messages will be sent to{" "}
          <Link
            href={`mailto:${contactType.email}`}
            className="text-foreground hover:underline"
          >
            {contactType.email}
          </Link>
        </p>

        <DashedLine className="my-8" />

        {/* Contact Form */}
        <TypedContactForm contactType={serializableContactType} />
      </div>
    </section>
  );
}
