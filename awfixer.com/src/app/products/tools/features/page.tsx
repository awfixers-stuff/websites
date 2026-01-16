import {
  Zap,
  Shield,
  Wrench,
  Terminal,
  Settings,
  Layers,
  Lock,
  Gauge,
  Code,
  RefreshCw
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
    description: "Optimized tools that execute in milliseconds.",
    details: [
      "Native binaries for maximum speed",
      "Minimal memory footprint",
      "Parallel execution for batch operations",
      "Instant startup with no runtime overhead",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Secure by design with audit logging and access control.",
    details: [
      "Role-based access control (RBAC)",
      "Comprehensive audit logging",
      "Encrypted credential storage",
      "Secure remote execution",
    ],
  },
  {
    icon: Wrench,
    title: "Comprehensive Toolkit",
    description: "Everything you need for system administration.",
    details: [
      "50+ command-line tools included",
      "System diagnostics and monitoring",
      "Network troubleshooting utilities",
      "Disk and file management tools",
    ],
  },
  {
    icon: RefreshCw,
    title: "Automation Ready",
    description: "Script and automate repetitive tasks with ease.",
    details: [
      "Built-in scripting engine",
      "Cron job management",
      "Event-driven automation",
      "REST API for remote control",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Terminal,
    title: "Modern CLI Experience",
    description: "Intuitive commands with autocompletion and color output.",
  },
  {
    icon: Layers,
    title: "Plugin System",
    description: "Extend functionality with community plugins.",
  },
  {
    icon: Lock,
    title: "Secrets Management",
    description: "Secure storage for passwords, tokens, and certificates.",
  },
  {
    icon: Gauge,
    title: "Performance Profiling",
    description: "Built-in profilers for CPU, memory, and I/O analysis.",
  },
  {
    icon: Code,
    title: "Developer Integrations",
    description: "Seamless integration with IDEs and development workflows.",
  },
  {
    icon: Settings,
    title: "Configuration Management",
    description: "Declarative configuration for consistent environments.",
  },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Features that Empower
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
          AWFixer Tools is designed for system administrators and developers who
          demand powerful, reliable, and efficient utilities for their work.
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

      {/* Comparison */}
      <div className="rounded-2xl bg-muted/50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Compare with Alternatives</h2>
        <p className="text-muted-foreground mb-6">
          See how AWFixer Tools stacks up against other system administration
          toolkits in terms of features, performance, and usability.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Comparison chart coming soon
        </p>
      </div>
    </div>
  );
}
