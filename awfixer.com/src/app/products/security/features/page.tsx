import {
  Shield,
  Lock,
  Eye,
  Zap,
  AlertTriangle,
  Fingerprint,
  Server,
  Globe,
  Key,
  FileSearch
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
    icon: Shield,
    title: "Advanced Threat Protection",
    description: "AI-powered threat detection and prevention.",
    details: [
      "Real-time malware detection and blocking",
      "Behavioral analysis for zero-day threats",
      "Machine learning threat classification",
      "Automated incident response playbooks",
    ],
  },
  {
    icon: Lock,
    title: "Zero-Trust Architecture",
    description: "Never trust, always verify - complete access control.",
    details: [
      "Continuous authentication and authorization",
      "Micro-segmentation for network isolation",
      "Identity-based access policies",
      "Least-privilege access enforcement",
    ],
  },
  {
    icon: Eye,
    title: "24/7 Security Monitoring",
    description: "Round-the-clock visibility into your security posture.",
    details: [
      "Security Operations Center (SOC) monitoring",
      "Threat intelligence integration",
      "Anomaly detection and alerting",
      "Comprehensive security dashboards",
    ],
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "Automated and rapid response to security incidents.",
    details: [
      "Sub-second threat containment",
      "Automated quarantine and isolation",
      "One-click remediation workflows",
      "Forensic evidence collection",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Fingerprint,
    title: "Identity Protection",
    description: "Multi-factor authentication and identity governance.",
  },
  {
    icon: Server,
    title: "Endpoint Security",
    description: "Comprehensive protection for all devices and endpoints.",
  },
  {
    icon: Globe,
    title: "Network Security",
    description: "Firewall, IDS/IPS, and network traffic analysis.",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Management",
    description: "Continuous scanning and prioritized remediation.",
  },
  {
    icon: Key,
    title: "Encryption Services",
    description: "End-to-end encryption for data at rest and in transit.",
  },
  {
    icon: FileSearch,
    title: "Compliance Reporting",
    description: "Automated reports for SOC 2, HIPAA, GDPR, and more.",
  },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
          Features that Protect
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
          AWFixer Security provides enterprise-grade protection with cutting-edge
          technology. Every feature is designed to keep your organization safe.
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
          See how AWFixer Security compares to traditional enterprise security
          solutions in terms of protection, performance, and cost.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Comparison chart coming soon
        </p>
      </div>
    </div>
  );
}
