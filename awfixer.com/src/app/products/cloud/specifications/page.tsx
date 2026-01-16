import { Check, Server, HardDrive, Cpu, Globe, Wifi, Lock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const technicalSpecs = {
  compute: {
    title: "Compute",
    icon: Cpu,
    specs: [
      { label: "Instance Types", value: "50+ configurations" },
      { label: "CPU Options", value: "Intel, AMD, ARM64" },
      { label: "Max vCPUs", value: "Up to 192 per instance" },
      { label: "Max Memory", value: "Up to 1.5 TB RAM" },
      { label: "GPU Support", value: "NVIDIA A100, H100" },
    ],
  },
  network: {
    title: "Networking",
    icon: Globe,
    specs: [
      { label: "Edge Locations", value: "300+ worldwide" },
      { label: "Network Bandwidth", value: "Up to 100 Gbps" },
      { label: "IPv4 & IPv6", value: "Full dual-stack support" },
      { label: "Private Networks", value: "VPC with custom CIDR" },
      { label: "Load Balancers", value: "L4 and L7 available" },
    ],
  },
  storage: {
    title: "Storage",
    icon: HardDrive,
    specs: [
      { label: "Block Storage", value: "NVMe SSD, up to 64 TB" },
      { label: "Object Storage", value: "S3-compatible, unlimited" },
      { label: "IOPS", value: "Up to 160,000" },
      { label: "Throughput", value: "Up to 4,000 MB/s" },
      { label: "Replication", value: "Cross-region available" },
    ],
  },
  database: {
    title: "Databases",
    icon: Server,
    specs: [
      { label: "PostgreSQL", value: "v12-16 supported" },
      { label: "MySQL", value: "v5.7, 8.0 supported" },
      { label: "Redis", value: "v6, v7 supported" },
      { label: "MongoDB", value: "v5, v6 supported" },
      { label: "Max Storage", value: "Up to 16 TB per database" },
    ],
  },
  security: {
    title: "Security & Compliance",
    icon: Lock,
    specs: [
      { label: "Encryption", value: "AES-256 at rest & transit" },
      { label: "DDoS Protection", value: "L3/L4/L7 included" },
      { label: "WAF", value: "Managed rules + custom" },
      { label: "Certifications", value: "SOC 2, ISO 27001, GDPR" },
      { label: "IAM", value: "RBAC with MFA" },
    ],
  },
  connectivity: {
    title: "Connectivity",
    icon: Wifi,
    specs: [
      { label: "API", value: "REST, GraphQL, gRPC" },
      { label: "CLI", value: "Cross-platform available" },
      { label: "Terraform", value: "Official provider" },
      { label: "Kubernetes", value: "Managed K8s clusters" },
      { label: "Webhooks", value: "Supported for all events" },
    ],
  },
};

const includedServices = [
  "Free SSL/TLS certificates for all domains",
  "Automatic backups with 30-day retention",
  "Built-in monitoring and alerting",
  "Log aggregation and search",
  "Container registry with vulnerability scanning",
  "Secrets management with rotation",
  "CI/CD pipelines with GitHub integration",
  "24/7 technical support for all plans",
];

const enterpriseAddons = [
  "Dedicated support engineer",
  "Custom SLA up to 99.999%",
  "Private cloud deployments",
  "On-premise integration",
  "Compliance customization",
  "Volume discounts",
  "Priority feature requests",
  "Quarterly business reviews",
];

export default function SpecificationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Technical Specifications
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Detailed technical specifications for AWFixer Cloud. Enterprise-grade
          infrastructure built for performance and reliability.
        </p>
      </div>

      {/* Technical Specs Grid */}
      <div className="mb-16 grid gap-6 lg:grid-cols-2">
        {Object.values(technicalSpecs).map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex justify-between border-b border-border/40 pb-2 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Included Services */}
      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Included Services</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {includedServices.map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold">Enterprise Add-ons</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {enterpriseAddons.map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-2xl bg-muted/50 p-8">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Global Availability
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-center">
          AWFixer Cloud operates data centers across 6 continents, ensuring low
          latency and compliance with local data regulations.
        </p>
        <div className="grid gap-4 text-center sm:grid-cols-3">
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Data Centers</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">99.99%</p>
            <p className="text-sm text-muted-foreground">Uptime SLA</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">&lt;50ms</p>
            <p className="text-sm text-muted-foreground">Global P95 Latency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
