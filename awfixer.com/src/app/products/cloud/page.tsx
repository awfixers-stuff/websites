import Link from "next/link";

import {
  ArrowRight,
  Download,
  Cloud,
  Zap,
  Database,
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
    description: "Global CDN with sub-second response times and 99.99% uptime.",
  },
  {
    icon: Database,
    title: "Infinite Scalability",
    description: "Auto-scaling infrastructure that grows with your business needs.",
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Ready",
    description: "Deploy across any cloud provider with unified management.",
  },
];

const stats = [
  { value: "50+", label: "Data Centers" },
  { value: "<50ms", label: "Global Latency" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
];

const useCases = [
  {
    title: "Web Applications",
    description: "High-performance hosting for modern web apps and APIs.",
  },
  {
    title: "Data Analytics",
    description: "Scalable compute for big data processing and machine learning.",
  },
  {
    title: "E-commerce",
    description: "Enterprise-grade infrastructure for online stores and marketplaces.",
  },
  {
    title: "Content Delivery",
    description: "Global CDN for fast media streaming and content distribution.",
  },
];

export default function AWFixerCloudPage() {
  return (
    <div>
      <div className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-4">
            <Cloud className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
          AWFixer Cloud
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
          Next-generation cloud infrastructure designed for speed, scalability,
          and reliability. Deploy anything, anywhere, instantly.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/cloud/downloads">
              <Download className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/cloud/features">
              Explore Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

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

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Why AWFixer Cloud?</h2>
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
            <Link href="/products/cloud/features">
              View All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Built for Modern Workloads</h2>
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

      <div className="mb-16 rounded-2xl bg-muted/50 p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              Join Cloud Innovators
            </h2>
            <p className="mb-6 text-muted-foreground">
              AWFixer Cloud powers thousands of startups, enterprises, and
              developers who are building the future of cloud computing.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">200K+ Active Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm">8K+ Cloud Engineers</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Button asChild>
              <a
                href="https://github.com/awfixer/cloud"
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

      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
        <h2 className="mb-4 text-3xl font-bold">Ready to Scale to Infinity?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Deploy your first application on AWFixer Cloud and experience the
          future of cloud infrastructure. Start free, scale as you grow.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/cloud/downloads">
              <Download className="mr-2 h-5 w-5" />
              Start Free Trial
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products/cloud/docs">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
