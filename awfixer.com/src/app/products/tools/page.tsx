import Link from "next/link";

import {
  ArrowRight,
  Check,
  Cpu,
  Download,
  Shield,
  Zap,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Boot times under 10 seconds with optimized kernel and system services.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Built-in encryption, sandboxing, and advanced threat protection.",
  },
  {
    icon: Cpu,
    title: "Hardware Optimized",
    description:
      "Supports latest hardware with automatic driver detection and installation.",
  },
  {
    icon: Download,
    title: "Easy Updates",
    description: "Seamless over-the-air updates with rollback capabilities.",
  },
];

const specifications = [
  "Based on Linux kernel 6.8",
  "Minimal system requirements: 2GB RAM, 20GB storage",
  "Supports x86_64, ARM64 architectures",
  "Pre-installed productivity suite",
  "Advanced power management",
  "Built-in virtualization support",
  "Extensive hardware compatibility",
  "Regular security updates",
];

const useCases = [
  {
    title: "Business Workstations",
    description:
      "Perfect for office environments with enhanced security and productivity tools.",
  },
  {
    title: "Development Systems",
    description:
      "Ideal for developers with pre-configured development environments and tools.",
  },
  {
    title: "Educational Institutions",
    description:
      "Great for schools and universities with educational software and management tools.",
  },
  {
    title: "Home Computing",
    description:
      "Excellent for personal use with multimedia support and user-friendly interface.",
  },
];

export default function AWFixerOSPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-primary/10 rounded-2xl p-4">
            <Wrench className="text-primary h-12 w-12" />
          </div>
        </div>
        <h1 className="from-primary to-primary/60 mb-6 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
          AWFixer Tools
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
          A modern, secure operating system designed for performance,
          reliability, and ease of use. Built for the future of computing.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 text-lg">
            <Download className="mr-2 h-5 w-5" />
            Download Now
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg">
            View Documentation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:border-primary/20 border-2 text-center transition-colors"
              >
                <CardHeader>
                  <div className="bg-primary/10 mx-auto mb-4 rounded-lg p-3">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mb-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">Technical Specifications</h2>
          <div className="bg-muted/50 rounded-2xl p-8">
            <ul className="space-y-3">
              {specifications.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-sm">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold">Use Cases</h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="hover:border-primary/20 border-2 transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="from-primary/10 to-primary/5 mb-16 rounded-2xl bg-linear-to-r p-8 text-center lg:p-12">
        <h2 className="mb-4 text-3xl font-bold">Get Started with AWFixerOS</h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
          Download the latest version of AWFixerOS and experience the future of
          computing. Free for personal and commercial use.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 text-lg">
            <Download className="mr-2 h-5 w-5" />
            Download v2.1.0
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg">
            View Release Notes
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 text-sm">
          File size: 2.3 GB | SHA256: checksum will appear here
        </p>
      </div>

      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Need Help?</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Our support team is here to help you with installation,
          troubleshooting, and any questions you might have.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outline" asChild>
            <a
              href="https://docs.awfixer.com/os"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
