import {
  Zap,
  Shield,
  Cloud,
  Globe,
  Server,
  Layers,
  Lock,
  Gauge,
  Database,
  GitBranch
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const coreFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Sub-second response times with global edge computing.",
    details: [
      "Global CDN with 300+ edge locations",
      "Automatic traffic optimization and routing",
      "Zero-latency scaling for sudden traffic spikes",
      "Smart caching with instant cache invalidation",
    ],
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Deploy across 50+ data centers worldwide.",
    details: [
      "Multi-region deployment with one click",
      "Automatic geo-routing for lowest latency",
      "Cross-region data replication",
      "Compliance with local data regulations",
    ],
  },
  {
    icon: Server,
    title: "Infinite Scalability",
    description: "Auto-scaling infrastructure that grows with your business.",
    details: [
      "Horizontal and vertical auto-scaling",
      "Serverless compute for event-driven workloads",
      "Container orchestration with Kubernetes",
      "Scale to zero when not in use",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for all your workloads.",
    details: [
      "DDoS protection included by default",
      "WAF with custom rule support",
      "End-to-end encryption in transit and at rest",
      "SOC 2 Type II and ISO 27001 certified",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Database,
    title: "Managed Databases",
    description: "PostgreSQL, MySQL, Redis, and MongoDB with automatic backups.",
  },
  {
    icon: Layers,
    title: "Container Platform",
    description: "Run containers at scale with managed Kubernetes clusters.",
  },
  {
    icon: Lock,
    title: "Secrets Management",
    description: "Secure storage and rotation for API keys and credentials.",
  },
  {
    icon: Gauge,
    title: "Real-time Monitoring",
    description: "Built-in observability with metrics, logs, and traces.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    description: "Native integrations with GitHub, GitLab, and Bitbucket.",
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Support",
    description: "Deploy and manage resources across AWS, GCP, and Azure.",
  },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Features that Scale
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
          AWFixer Cloud is designed for modern applications. Every feature
          is built to help you deploy faster, scale effortlessly, and operate reliably.
        </p>
      </div>

      {/* Core Features */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Core Features</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {coreFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm">
                        <div className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Features */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Additional Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border hover:border-primary/20 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="rounded-2xl bg-muted/50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Compare with Other Clouds</h2>
        <p className="text-muted-foreground mb-6">
          See how AWFixer Cloud stacks up against traditional cloud providers
          in terms of performance, pricing, and developer experience.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Comparison chart coming soon
        </p>
      </div>
    </div>
  );
}
