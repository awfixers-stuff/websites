import { Check, Shield, Server, Eye, Lock, Globe, AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const technicalSpecs = {
  threatProtection: {
    title: "Threat Protection",
    icon: Shield,
    specs: [
      { label: "Detection Engine", value: "AI + Signature-based" },
      { label: "Scan Speed", value: "10,000+ files/second" },
      { label: "Update Frequency", value: "Real-time cloud updates" },
      { label: "False Positive Rate", value: "<0.01%" },
      { label: "Zero-Day Detection", value: "Behavioral analysis" },
    ],
  },
  networkSecurity: {
    title: "Network Security",
    icon: Globe,
    specs: [
      { label: "Firewall", value: "Stateful + Layer 7" },
      { label: "IDS/IPS", value: "Signature + Anomaly" },
      { label: "DDoS Protection", value: "L3/L4/L7 mitigation" },
      { label: "VPN Support", value: "WireGuard, IPSec, OpenVPN" },
      { label: "Throughput", value: "Up to 100 Gbps" },
    ],
  },
  endpointSecurity: {
    title: "Endpoint Security",
    icon: Server,
    specs: [
      { label: "Platforms", value: "Windows, macOS, Linux" },
      { label: "Mobile Support", value: "iOS, Android" },
      { label: "Agent Size", value: "<50 MB" },
      { label: "CPU Usage", value: "<1% idle" },
      { label: "Offline Mode", value: "Full protection" },
    ],
  },
  monitoring: {
    title: "Security Monitoring",
    icon: Eye,
    specs: [
      { label: "Log Retention", value: "Up to 365 days" },
      { label: "Event Processing", value: "1M+ events/second" },
      { label: "Alert Latency", value: "<1 second" },
      { label: "Integration", value: "SIEM, SOAR compatible" },
      { label: "API Access", value: "REST + GraphQL" },
    ],
  },
  encryption: {
    title: "Encryption",
    icon: Lock,
    specs: [
      { label: "Data at Rest", value: "AES-256" },
      { label: "Data in Transit", value: "TLS 1.3" },
      { label: "Key Management", value: "HSM supported" },
      { label: "Certificate Management", value: "Automated renewal" },
      { label: "Quantum-Ready", value: "Post-quantum algorithms" },
    ],
  },
  compliance: {
    title: "Compliance",
    icon: AlertTriangle,
    specs: [
      { label: "Certifications", value: "SOC 2, ISO 27001" },
      { label: "Frameworks", value: "NIST, CIS, MITRE" },
      { label: "Regulations", value: "GDPR, HIPAA, PCI-DSS" },
      { label: "Audit Logs", value: "Immutable, tamper-proof" },
      { label: "Reports", value: "Automated generation" },
    ],
  },
};

const protectionCapabilities = [
  "Ransomware protection with rollback",
  "Phishing and email security",
  "Malware and virus protection",
  "Rootkit and bootkit detection",
  "Exploit prevention",
  "Web content filtering",
  "USB device control",
  "Data loss prevention (DLP)",
];

const deploymentOptions = [
  "Cloud-hosted (SaaS)",
  "On-premise deployment",
  "Hybrid cloud architecture",
  "Air-gapped environment support",
  "Multi-tenant architecture",
  "Single sign-on (SSO)",
  "Active Directory integration",
  "API-first architecture",
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
          Detailed technical specifications for AWFixer Security. Enterprise-grade
          protection built on proven security technologies.
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

      {/* Protection & Deployment */}
      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Protection Capabilities</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {protectionCapabilities.map((item, index) => (
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
          <h2 className="mb-6 text-2xl font-bold">Deployment Options</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {deploymentOptions.map((item, index) => (
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

      {/* Security Metrics */}
      <div className="rounded-2xl bg-muted/50 p-8">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Security Performance
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-center">
          AWFixer Security consistently achieves top marks in independent security
          tests and real-world threat protection.
        </p>
        <div className="grid gap-4 text-center sm:grid-cols-3">
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">99.99%</p>
            <p className="text-sm text-muted-foreground">Threat Detection Rate</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">&lt;100ms</p>
            <p className="text-sm text-muted-foreground">Response Time</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">1M+</p>
            <p className="text-sm text-muted-foreground">Threats Blocked Daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}
