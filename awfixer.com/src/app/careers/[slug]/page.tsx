import Link from "next/link";
import { notFound } from "next/navigation";

import { Briefcase, ChevronLeft, MapPin, Calendar } from "lucide-react";

import { Background } from "@/components/background";
import { MDXContent } from "@/components/blog/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCareerData, getSortedCareersData } from "@/lib/careers";
import { getCareerComponent } from "@/lib/generated/career-components";

export async function generateStaticParams() {
  const careers = getSortedCareersData();
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const career = getCareerData(params.slug);

  if (!career) {
    return {
      title: "Position Not Found",
    };
  }

  return {
    title: `${career.title} - AWFixer Careers`,
    description: career.excerpt,
    openGraph: {
      title: career.title,
      description: career.excerpt,
      url: `/careers/${career.slug}`,
      siteName: "AWFixer Careers",
      images: career.image ? [
        {
          url: career.image,
          width: 1200,
          height: 630,
          alt: career.title,
        },
      ] : [],
      type: "article",
      publishedTime: career.postedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: career.title,
      description: career.excerpt,
      images: career.image ? [career.image] : [],
      creator: "@awfixer",
    },
  };
}

const typeLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export default async function CareerPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const career = getCareerData(params.slug);

  if (!career) {
    notFound();
  }

  // Get the pre-compiled MDX component
  const CareerContent = getCareerComponent(params.slug);

  if (!CareerContent) {
    notFound();
  }

  return (
    <Background>
      <article className="container mx-auto max-w-5xl px-4 py-24 md:py-32 lg:pt-44">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground -ml-3"
          >
            <Link href="/careers">
              <ChevronLeft className="mr-2 size-4" />
              Back to Careers
            </Link>
          </Button>
        </div>

        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {typeLabels[career.type] || career.type}
            </Badge>
            <Badge variant="outline">{career.department}</Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {career.title}
          </h1>

          <div className="text-muted-foreground flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {career.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="size-4" />
              {career.department}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-4" />
              Posted {career.postedDate}
            </span>
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXContent Component={CareerContent} />
        </div>

        {/* Apply CTA */}
        <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">Interested in this role?</h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Send us your resume and tell us why you'd
            be a great fit.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Apply Now</Link>
          </Button>
        </div>
      </article>
    </Background>
  );
}
