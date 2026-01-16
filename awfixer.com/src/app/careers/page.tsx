import Image from "next/image";
import Link from "next/link";

import { Briefcase, MapPin } from "lucide-react";

import { Background } from "@/components/background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSortedCareersData } from "@/lib/careers";

export const metadata = {
  title: "Careers - AWFixer",
  description:
    "Join the AWFixer team. Explore open positions and help us build the future of technology.",
};

const typeLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export default function CareersIndex() {
  const careers = getSortedCareersData();

  // Group careers by department
  const departments = careers.reduce(
    (acc, career) => {
      if (!acc[career.department]) {
        acc[career.department] = [];
      }
      acc[career.department].push(career);
      return acc;
    },
    {} as Record<string, typeof careers>
  );

  return (
    <Background>
      <div className="container py-24 md:py-32 lg:pt-44">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Our Team
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            We're building the future of technology and looking for talented
            people to join us. Explore our open positions below.
          </p>
        </div>

        {Object.keys(departments).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(departments).map(([department, positions]) => (
              <section key={department}>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                  {department}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {positions.map((career) => (
                    <Card key={career.slug} className="group flex h-full flex-col overflow-hidden">
                      {career.image && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={career.image}
                            alt={career.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">
                            {typeLabels[career.type] || career.type}
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2">
                          <Link
                            href={`/careers/${career.slug}`}
                            className="hover:underline"
                          >
                            {career.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-3">
                        <CardDescription className="line-clamp-3">
                          {career.excerpt}
                        </CardDescription>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {career.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="size-4" />
                            {career.department}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          asChild
                          variant="ghost"
                          className="h-auto p-0 font-medium"
                        >
                          <Link href={`/careers/${career.slug}`}>
                            View position{" "}
                            <span aria-hidden="true" className="ml-1">
                              &rarr;
                            </span>
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-12 text-center">
            <p className="mb-4">
              No open positions at the moment. Check back soon!
            </p>
            <p>
              Want to be notified when positions open?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </Background>
  );
}
