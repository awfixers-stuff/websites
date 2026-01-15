import Link from "next/link";

import { Download, HardDrive, Monitor, Server, Check, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const editions = [
  {
    name: "AWFixerOS Desktop",
    description: "Full desktop experience for workstations and personal computers.",
    icon: Monitor,
    version: "2.1.0",
    size: "2.3 GB",
    filename: "awfixeros-desktop-2.1.0-x86_64.iso",
    sha256: "a1b2c3d4e5f6...",
    recommended: true,
  },
  {
    name: "AWFixerOS Server",
    description: "Headless server edition optimized for cloud and data center deployments.",
    icon: Server,
    version: "2.1.0",
    size: "1.1 GB",
    filename: "awfixeros-server-2.1.0-x86_64.iso",
    sha256: "f6e5d4c3b2a1...",
    recommended: false,
  },
  {
    name: "AWFixerOS Minimal",
    description: "Bare-bones installation for advanced users and custom deployments.",
    icon: HardDrive,
    version: "2.1.0",
    size: "450 MB",
    filename: "awfixeros-minimal-2.1.0-x86_64.iso",
    sha256: "1a2b3c4d5e6f...",
    recommended: false,
  },
];

const systemRequirements = {
  minimum: [
    { label: "Processor", value: "64-bit x86 or ARM64" },
    { label: "RAM", value: "2 GB" },
    { label: "Storage", value: "20 GB" },
    { label: "Graphics", value: "Any GPU with OpenGL 3.3+" },
  ],
  recommended: [
    { label: "Processor", value: "4-core 2.0 GHz or better" },
    { label: "RAM", value: "8 GB or more" },
    { label: "Storage", value: "64 GB SSD" },
    { label: "Graphics", value: "Dedicated GPU with Vulkan support" },
  ],
};

export default function DownloadsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Download AWFixerOS
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Choose the edition that best fits your needs. All editions are free
          for personal and commercial use.
        </p>
      </div>

      {/* Edition Cards */}
      <div className="mb-16 grid gap-6 lg:grid-cols-3">
        {editions.map((edition, index) => {
          const Icon = edition.icon;
          return (
            <Card
              key={index}
              className={`relative border-2 transition-colors ${
                edition.recommended
                  ? "border-primary"
                  : "hover:border-primary/20"
              }`}
            >
              {edition.recommended && (
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
                <CardTitle className="text-xl">{edition.name}</CardTitle>
                <CardDescription>{edition.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{edition.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{edition.size}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {edition.filename}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* System Requirements */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">System Requirements</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Minimum Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
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

          <Card className="border-2 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Check className="h-5 w-5 text-green-500" />
                Recommended Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemRequirements.recommended.map((req, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{req.label}</span>
                    <span className="font-medium">{req.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Installation Guide CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
        <h2 className="mb-4 text-2xl font-bold">Ready to Install?</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Follow our step-by-step installation guide to get AWFixerOS running
          on your system in minutes.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/awfixeros/docs">
              Installation Guide
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products/awfixeros/docs#bootable-usb">
              Create Bootable USB
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
