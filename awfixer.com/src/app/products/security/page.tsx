import Link from "next/link";

import {
  ArrowRight,
  Download,
  Shield,
  Zap,
  Lock,
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
    icon: Shield,
    title: "Military-Grade Security",
    description: "Advanced encryption and threat protection for enterprise environments.",
  },
  {
    icon: Lock,
    title: "Zero-Trust Architecture",
    description: "Comprehensive security model with continuous verification and monitoring.",
  },
  {
    icon: Zap,
    title: "Real-Time Protection",
    description: "Instant threat detection and response with AI-powered security.",
  },
];

const stats = [
  { value: "1M+", label: "Threats Blocked" },
  { value: "<100ms", label: "Response Time" },
  { value: "99.99%", label: "Security Uptime" },
  { value: "24/7", label: "Monitoring" },
];

const useCases = [
  {
    title: "Enterprise Networks",
    description: "Comprehensive protection for corporate infrastructure and data.",
  },
  {
    title: "Financial Systems",
    description: "Regulatory-compliant security for banking and financial institutions.",
  },
  {
    title: "Healthcare Data",
    description: "HIPAA-compliant protection for sensitive patient information.",
  },
  {
    title: "Government Agencies",
    description: "High-security solutions for classified government communications.",
  },
];

export default function AWFixerSecurityPage() {
  return (
    <div>
      <div className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
          AWFixer Security
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
          Enterprise-grade security solutions designed to protect your most
          valuable assets with cutting-edge threat detection and prevention.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/security/downloads">
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
            <Link href="/products/security/features">
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
        <h2 className="mb-8 text-center text-3xl font-bold">Why AWFixer Security?</h2>
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
            <Link href="/products/security/features">
              View All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Trusted by Industries</h2>
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
              Join Security Leaders Worldwide
            </h2>
            <p className="mb-6 text-muted-foreground">
              AWFixer Security is trusted by Fortune 500 companies, government
              agencies, and security professionals to protect their critical
              infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">100K+ Enterprise Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm">15K+ Security Experts</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Button asChild>
              <a
                href="https://github.com/awfixer/security"
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
        <h2 className="mb-4 text-3xl font-bold">Secure Your Infrastructure Today</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Deploy AWFixer Security and protect your organization from advanced
          threats. Enterprise-grade protection for businesses of all sizes.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/security/downloads">
              <Download className="mr-2 h-5 w-5" />
              Download v4.1.0
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products/security/docs">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
