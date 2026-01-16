import Link from "next/link";

import { Download, Terminal, Globe, Server, Check, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tools = [
  {
    name: "AWFixer Cloud CLI",
    description: "Command-line interface for managing your cloud resources.",
    icon: Terminal,
    version: "2.5.0",
    platforms: ["macOS", "Linux", "Windows"],
    installCommand: "curl -sSL https://get.awfixer.cloud | sh",
    recommended: true,
  },
  {
    name: "AWFixer Desktop",
    description: "GUI application for visual cloud resource management.",
    icon: Globe,
    version: "1.3.0",
    platforms: ["macOS", "Linux", "Windows"],
    installCommand: null,
    recommended: false,
  },
  {
    name: "Terraform Provider",
    description: "Infrastructure as code provider for AWFixer Cloud.",
    icon: Server,
    version: "3.1.0",
    platforms: ["All platforms"],
    installCommand: "terraform init",
    recommended: false,
  },
];

const sdks = [
  { language: "Node.js", version: "4.2.0", packageManager: "npm install @awfixer/cloud" },
  { language: "Python", version: "3.1.0", packageManager: "pip install awfixer-cloud" },
  { language: "Go", version: "2.0.0", packageManager: "go get github.com/awfixer/cloud-go" },
  { language: "Ruby", version: "1.5.0", packageManager: "gem install awfixer-cloud" },
  { language: "PHP", version: "2.2.0", packageManager: "composer require awfixer/cloud" },
  { language: "Java", version: "1.8.0", packageManager: "Maven/Gradle available" },
];

const requirements = [
  { label: "Operating System", value: "macOS 12+, Linux, Windows 10+" },
  { label: "Memory", value: "256 MB minimum" },
  { label: "Disk Space", value: "100 MB for CLI tools" },
  { label: "Network", value: "Internet connection required" },
];

export default function DownloadsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Download Tools
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Get started with AWFixer Cloud using our CLI tools, SDKs, and
          integrations. All tools are free and open source.
        </p>
      </div>

      {/* CLI & Desktop Tools */}
      <div className="mb-16 grid gap-6 lg:grid-cols-3">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card
              key={index}
              className={`relative border-2 transition-colors ${
                tool.recommended
                  ? "border-primary"
                  : "hover:border-primary/20"
              }`}
            >
              {tool.recommended && (
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
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{tool.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platforms</span>
                  <span className="font-medium">{tool.platforms.join(", ")}</span>
                </div>
                {tool.installCommand && (
                  <div className="rounded-lg bg-muted p-3">
                    <code className="text-xs">{tool.installCommand}</code>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* SDKs */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Official SDKs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sdks.map((sdk, index) => (
            <Card key={index} className="border hover:border-primary/20 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{sdk.language} SDK</CardTitle>
                <CardDescription className="text-xs">
                  v{sdk.version}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-lg bg-muted p-3">
                  <code className="text-xs">{sdk.packageManager}</code>
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
              {requirements.map((req, index) => (
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
        <h2 className="mb-4 text-2xl font-bold">Ready to Deploy?</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Follow our quickstart guide to deploy your first application on
          AWFixer Cloud in under 5 minutes.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/products/cloud/docs">
              Quickstart Guide
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://console.awfixer.cloud"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Console
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
