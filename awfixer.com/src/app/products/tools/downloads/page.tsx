import Link from "next/link";

import { Download, Terminal, Apple, Monitor, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const platforms = [
  {
    name: "Linux",
    description: "Debian, Ubuntu, Fedora, Arch, and other distributions.",
    icon: Terminal,
    version: "3.2.0",
    size: "45 MB",
    filename: "awfixer-tools-3.2.0-linux-x86_64.tar.gz",
    installCommand: "curl -sSL https://get.awfixer.tools | sh",
    recommended: true,
  },
  {
    name: "macOS",
    description: "macOS 12 Monterey and later, Intel and Apple Silicon.",
    icon: Apple,
    version: "3.2.0",
    size: "42 MB",
    filename: "awfixer-tools-3.2.0-darwin-universal.pkg",
    installCommand: "brew install awfixer/tap/tools",
    recommended: false,
  },
  {
    name: "Windows",
    description: "Windows 10 and later, with PowerShell integration.",
    icon: Monitor,
    version: "3.2.0",
    size: "48 MB",
    filename: "awfixer-tools-3.2.0-windows-x86_64.msi",
    installCommand: "winget install AWFixer.Tools",
    recommended: false,
  },
];

const packageManagers = [
  { manager: "Homebrew (macOS/Linux)", command: "brew install awfixer/tap/tools" },
  { manager: "APT (Debian/Ubuntu)", command: "apt install awfixer-tools" },
  { manager: "DNF (Fedora)", command: "dnf install awfixer-tools" },
  { manager: "Pacman (Arch)", command: "pacman -S awfixer-tools" },
  { manager: "Winget (Windows)", command: "winget install AWFixer.Tools" },
  { manager: "Chocolatey (Windows)", command: "choco install awfixer-tools" },
];

const systemRequirements = {
  minimum: [
    { label: "Operating System", value: "Linux, macOS 12+, Windows 10+" },
    { label: "Processor", value: "x86_64 or ARM64" },
    { label: "Memory", value: "128 MB RAM" },
    { label: "Disk Space", value: "250 MB" },
  ],
};

export default function DownloadsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Download AWFixer Tools
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Get the complete system administration toolkit for your platform.
          Free for personal and commercial use.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="mb-16 grid gap-6 lg:grid-cols-3">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <Card
              key={index}
              className={`relative border-2 transition-colors ${
                platform.recommended
                  ? "border-primary"
                  : "hover:border-primary/20"
              }`}
            >
              {platform.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Recommended
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 rounded-xl bg-primary/10 p-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{platform.name}</CardTitle>
                <CardDescription>{platform.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{platform.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{platform.size}</span>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <code className="text-xs">{platform.installCommand}</code>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {platform.filename}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Package Managers */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Install via Package Manager</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageManagers.map((pm, index) => (
            <Card key={index} className="border hover:border-primary/20 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{pm.manager}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-lg bg-muted p-3">
                  <code className="text-xs">{pm.command}</code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">System Requirements</h2>
        <Card className="mx-auto max-w-2xl border-2">
          <CardContent className="pt-6">
            <div className="space-y-3">
              {systemRequirements.minimum.map((req, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{req.label}</span>
                  <span className="font-medium">{req.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
        <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Follow our quickstart guide to learn the essential commands and
          start boosting your productivity.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/tools/docs">
              Quickstart Guide
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products/tools/docs#command-reference">
              Command Reference
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
