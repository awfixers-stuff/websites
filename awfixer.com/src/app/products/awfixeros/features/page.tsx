import {
  Zap,
  Shield,
  Cpu,
  Download,
  Battery,
  Layers,
  Lock,
  Gauge,
  Terminal,
  Palette
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
    description: "Boot times under 10 seconds with optimized kernel and system services.",
    details: [
      "Microkernel architecture with async driver loading",
      "Highly optimized desktop environment",
      "Custom-built browser with native rendering",
      "Efficient memory management with smart caching",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Built-in encryption, sandboxing, and advanced threat protection.",
    details: [
      "Full-disk encryption with TPM support",
      "Application sandboxing by default",
      "Real-time threat detection engine",
      "Secure boot chain verification",
    ],
  },
  {
    icon: Cpu,
    title: "Hardware Optimization",
    description: "Automatic driver detection and optimal hardware utilization.",
    details: [
      "Universal driver compatibility layer",
      "Auto-tuning for CPU and GPU workloads",
      "Native support for latest hardware",
      "Power-efficient scheduling algorithms",
    ],
  },
  {
    icon: Download,
    title: "Seamless Updates",
    description: "Over-the-air updates with instant rollback capabilities.",
    details: [
      "Atomic system updates",
      "Zero-downtime upgrade process",
      "Automatic rollback on failure",
      "Delta updates for bandwidth efficiency",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Battery,
    title: "Advanced Power Management",
    description: "Intelligent power profiles that adapt to your usage patterns.",
  },
  {
    icon: Layers,
    title: "Container Support",
    description: "Native Docker and Podman integration for development workflows.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No telemetry collection. Your data stays on your device.",
  },
  {
    icon: Gauge,
    title: "Performance Monitoring",
    description: "Built-in system monitor with detailed resource analytics.",
  },
  {
    icon: Terminal,
    title: "Developer Tools",
    description: "Pre-installed development environment with popular languages.",
  },
  {
    icon: Palette,
    title: "Customizable UI",
    description: "Extensive theming options with dark mode support.",
  },
];

export default function FeaturesPage() {
  return (
    <div>
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
            Features that Matter
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            AWFixerOS is designed with modern computing needs in mind. Every feature
            is crafted to enhance your productivity, security, and overall experience.
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
          <h2 className="mb-4 text-2xl font-bold">Compare with Other Systems</h2>
          <p className="text-muted-foreground mb-6">
            See how AWFixerOS stacks up against traditional operating systems
            in terms of performance, security, and user experience.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Comparison chart coming soon
          </p>
        </div>
    </div>
  );
}
