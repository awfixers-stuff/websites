import Link from "next/link";
import { ArrowRight, Check, Cpu, Download, Shield, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Boot times under 10 seconds with optimized kernel and system services."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Built-in encryption, sandboxing, and advanced threat protection."
  },
  {
    icon: Cpu,
    title: "Hardware Optimized",
    description: "Supports latest hardware with automatic driver detection and installation."
  },
  {
    icon: Download,
    title: "Easy Updates",
    description: "Seamless over-the-air updates with rollback capabilities."
  }
];

const specifications = [
  "Based on Linux kernel 6.8",
  "Minimal system requirements: 2GB RAM, 20GB storage",
  "Supports x86_64, ARM64 architectures",
  "Pre-installed productivity suite",
  "Advanced power management",
  "Built-in virtualization support",
  "Extensive hardware compatibility",
  "Regular security updates"
];

const useCases = [
  {
    title: "Business Workstations",
    description: "Perfect for office environments with enhanced security and productivity tools."
  },
  {
    title: "Development Systems",
    description: "Ideal for developers with pre-configured development environments and tools."
  },
  {
    title: "Educational Institutions",
    description: "Great for schools and universities with educational software and management tools."
  },
  {
    title: "Home Computing",
    description: "Excellent for personal use with multimedia support and user-friendly interface."
  }
];

export default function AWFixerOSPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Cpu className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          AWFixerOS
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          A modern, secure operating system designed for performance, reliability, and ease of use. 
          Built for the future of computing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            <Download className="mr-2 h-5 w-5" />
            Download Now
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            View Documentation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
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

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
          <div className="bg-muted/50 rounded-2xl p-8">
            <ul className="space-y-3">
              {specifications.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
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

      <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 mb-16">
        <h2 className="text-3xl font-bold mb-4">Get Started with AWFixerOS</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Download the latest version of AWFixerOS and experience the future of computing. 
          Free for personal and commercial use.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            <Download className="mr-2 h-5 w-5" />
            Download v2.1.0
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            View Release Notes
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          File size: 2.3 GB | SHA256: checksum will appear here
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our support team is here to help you with installation, troubleshooting, and any questions you might have.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="https://docs.awfixer.com/os" target="_blank" rel="noopener noreferrer">
              View Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}