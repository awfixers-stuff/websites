import Link from "next/link";

import {
  Book,
  Download,
  HelpCircle,
  Rocket,
  Terminal,
  Video,
  ExternalLink,
  FileText,
  MessageCircle,
  Github,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickStartGuides = [
  {
    icon: Download,
    title: "Installation Guide",
    description: "Step-by-step instructions to install AWFixerOS on your system.",
    href: "#installation",
  },
  {
    icon: Rocket,
    title: "Getting Started",
    description: "First steps after installation and initial configuration.",
    href: "#getting-started",
  },
  {
    icon: Terminal,
    title: "Command Line Basics",
    description: "Essential terminal commands for everyday use.",
    href: "#cli-basics",
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Solutions to common issues and problems.",
    href: "#troubleshooting",
  },
];

const documentationSections = [
  {
    title: "User Guide",
    description: "Complete guide for everyday users",
    articles: [
      "Desktop Environment Overview",
      "File Management",
      "Software Installation",
      "System Settings",
      "Networking Configuration",
    ],
  },
  {
    title: "Administrator Guide",
    description: "System administration and management",
    articles: [
      "User Management",
      "Security Hardening",
      "Backup and Recovery",
      "Update Management",
      "Performance Tuning",
    ],
  },
  {
    title: "Developer Guide",
    description: "Development environment and tools",
    articles: [
      "Development Setup",
      "Container Workflows",
      "Building Packages",
      "Contributing to AWFixerOS",
      "API Reference",
    ],
  },
];

const resources = [
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Visual guides and walkthroughs",
    href: "https://youtube.com/@awfixer",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Get help from the community",
    href: "https://forum.awfixer.com",
    external: true,
  },
  {
    icon: Github,
    title: "GitHub Repository",
    description: "Source code and issue tracker",
    href: "https://github.com/awfixer/awfixeros",
    external: true,
  },
  {
    icon: FileText,
    title: "Release Notes",
    description: "Changelog and version history",
    href: "#release-notes",
    external: false,
  },
];

export default function DocsPage() {
  return (
    <div>
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Documentation</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Everything you need to get started with AWFixerOS, from installation
            to advanced configuration.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Quick Start</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickStartGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={index}
                  className="group cursor-pointer border-2 transition-colors hover:border-primary/20"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 rounded-lg bg-primary/10 p-2 w-fit group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">
                      {guide.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Documentation</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {documentationSections.map((section, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Book className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a
                          href="#"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <div className="mr-2 h-1 w-1 rounded-full bg-primary" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Additional Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.href}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <Card className="h-full border-2 transition-colors hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {resource.external && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>

        {/* Support CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
          <h2 className="mb-4 text-2xl font-bold">Need More Help?</h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Can&apos;t find what you&apos;re looking for? Our support team and community
            are here to help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://discord.gg/awfixer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
    </div>
  );
}
