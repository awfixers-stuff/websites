import Link from "next/link";

import {
  ArrowRight,
  Cpu,
  Download,
  Shield,
  Zap,
  Users,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Boot in under 10 seconds with our optimized microkernel.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security with sandboxing and encryption.",
  },
  {
    icon: Cpu,
    title: "Hardware Optimized",
    description: "Automatic driver detection for all modern hardware.",
  },
];

const stats = [
  { value: "10M+", label: "Downloads" },
  { value: "<10s", label: "Boot Time" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const useCases = [
  {
    title: "Business Workstations",
    description: "Enhanced security and productivity tools for enterprise.",
  },
  {
    title: "Development Systems",
    description: "Pre-configured environments for modern development.",
  },
  {
    title: "Educational Use",
    description: "Perfect for schools with management tools included.",
  },
  {
    title: "Home Computing",
    description: "User-friendly interface with multimedia support.",
  },
];

export default function AWFixerOSPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-4">
            <Cpu className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
          AWFixerOS
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
          A modern, secure operating system designed for performance,
          reliability, and ease of use. Built for the future of computing.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/awfixeros/downloads">
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/awfixeros/features">
              Explore Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl bg-muted/50 p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Key Highlights */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Why AWFixerOS?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={index}
                className="border-2 text-center transition-colors hover:border-primary/20"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/products/awfixeros/features">
              View All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Built For Everyone</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="border transition-colors hover:border-primary/20"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="mb-16 rounded-2xl bg-muted/50 p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              Join Our Growing Community
            </h2>
            <p className="mb-6 text-muted-foreground">
              AWFixerOS is built by a passionate community of developers and
              users. Contribute, get support, or just connect with like-minded
              people.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">50K+ Community Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm">10K+ GitHub Stars</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Button asChild>
              <a
                href="https://github.com/awfixer/awfixeros"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://discord.gg/awfixer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
        <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Download AWFixerOS today and experience the future of computing. Free
          for personal and commercial use.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/awfixeros/downloads">
              <Download className="mr-2 h-5 w-5" />
              Download v2.1.0
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products/awfixeros/docs">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
