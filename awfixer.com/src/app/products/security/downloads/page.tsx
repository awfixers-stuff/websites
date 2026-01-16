import Link from "next/link";

import { Download, Shield, Server, Monitor, Check, ExternalLink } from "lucide-react";

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
    name: "Enterprise Endpoint",
    description: "Complete endpoint protection for workstations and servers.",
    icon: Monitor,
    version: "4.1.0",
    size: "85 MB",
    filename: "awfixer-security-endpoint-4.1.0.msi",
    recommended: true,
  },
  {
    name: "Network Gateway",
    description: "Network-level protection with firewall and IDS/IPS.",
    icon: Shield,
    version: "4.1.0",
    size: "250 MB",
    filename: "awfixer-security-gateway-4.1.0.iso",
    recommended: false,
  },
  {
    name: "Server Protection",
    description: "Lightweight protection optimized for server workloads.",
    icon: Server,
    version: "4.1.0",
    size: "45 MB",
    filename: "awfixer-security-server-4.1.0.deb",
    recommended: false,
  },
];

const platformSupport = [
  { platform: "Windows", versions: "Windows 10, 11, Server 2016-2025" },
  { platform: "macOS", versions: "macOS 12 Monterey and later" },
  { platform: "Linux", versions: "Ubuntu 20.04+, RHEL 8+, Debian 11+" },
  { platform: "Mobile", versions: "iOS 15+, Android 11+" },
];

const systemRequirements = {
  endpoint: [
    { label: "Processor", value: "2 GHz dual-core or better" },
    { label: "Memory", value: "4 GB RAM (8 GB recommended)" },
    { label: "Disk Space", value: "500 MB for installation" },
    { label: "Network", value: "Internet for cloud features" },
  ],
  server: [
    { label: "Processor", value: "4-core 2.5 GHz or better" },
    { label: "Memory", value: "8 GB RAM (16 GB recommended)" },
    { label: "Disk Space", value: "1 GB for installation + logs" },
    { label: "Network", value: "1 Gbps minimum" },
  ],
};

export default function DownloadsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Download AWFixer Security
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Choose the protection level that fits your needs. All editions include
          24/7 support and automatic updates.
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

      {/* Platform Support */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Platform Support</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformSupport.map((platform, index) => (
            <Card key={index} className="border hover:border-primary/20 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{platform.platform}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {platform.versions}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">System Requirements</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Endpoint Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemRequirements.endpoint.map((req, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{req.label}</span>
                    <span className="font-medium">{req.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Server Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemRequirements.server.map((req, index) => (
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

      {/* Getting Started CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center lg:p-12">
        <h2 className="mb-4 text-2xl font-bold">Ready to Secure Your Organization?</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Follow our deployment guide to get AWFixer Security running across
          your organization in minutes.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/security/docs">
              Deployment Guide
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://console.awfixer.security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Admin Console
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
