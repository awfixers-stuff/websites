import Link from "next/link";
import { ArrowRight, Check, Globe, Lock, Shield, Zap } from "lucide-react";

import { Background } from "@/components/background";
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
    icon: Lock,
    title: "Universal Encryption",
    description:
      "Advocating for HTTPS adoption across all websites, ensuring every connection is encrypted by default.",
  },
  {
    icon: Shield,
    title: "Certificate Automation",
    description:
      "Streamlined processes for obtaining, renewing, and managing SSL/TLS certificates with zero downtime.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Working with international bodies to establish and promote modern web security standards.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Proving that security doesn't come at the cost of speed with optimized TLS configurations.",
  },
];

const benefits = [
  "Protection against man-in-the-middle attacks",
  "Improved search engine rankings (SEO boost)",
  "Enhanced user trust and credibility",
  "Compliance with data protection regulations",
  "Prevention of content injection attacks",
  "Secure handling of sensitive user data",
];

const useCases = [
  {
    title: "Legacy Migration",
    description:
      "Helping organizations transition legacy HTTP infrastructure to modern HTTPS standards.",
  },
  {
    title: "Certificate Management",
    description:
      "Automated certificate lifecycle management for enterprises with thousands of domains.",
  },
  {
    title: "Security Auditing",
    description:
      "Comprehensive HTTPS configuration audits identifying vulnerabilities and optimization opportunities.",
  },
  {
    title: "Developer Education",
    description:
      "Training programs and resources for developers to implement HTTPS correctly from the start.",
  },
];

export default function HTTPSReformPage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:pt-44">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Digital Enhancement
          </div>
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 rounded-2xl p-4">
              <Globe className="text-primary h-12 w-12" />
            </div>
          </div>
          <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
            HTTPS Reform
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Modernizing web security standards and promoting universal HTTPS
            adoption to create a safer, more private internet for everyone.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
              <Link href="/projects/digital">View Digital Projects</Link>
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
            <h2 className="mb-6 text-3xl font-bold">Why HTTPS Matters</h2>
            <div className="bg-muted/50 rounded-2xl p-8">
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{benefit}</span>
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

        <div className="from-primary/10 to-primary/5 rounded-2xl bg-gradient-to-r p-8 text-center lg:p-12">
          <h2 className="mb-4 text-3xl font-bold">Join the HTTPS Movement</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            Be part of the initiative to secure the web. Whether you&apos;re a
            developer, organization, or advocate, there&apos;s a role for you in
            making the internet safer.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              Get Involved
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}
