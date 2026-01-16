import { Check, Terminal, HardDrive, Cpu, Monitor, Wifi, Lock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const technicalSpecs = {
  system: {
    title: "System Requirements",
    icon: Cpu,
    specs: [
      { label: "Operating System", value: "Linux, macOS, Windows" },
      { label: "Architecture", value: "x86_64, ARM64" },
      { label: "Minimum RAM", value: "128 MB" },
      { label: "Disk Space", value: "250 MB" },
      { label: "Shell", value: "Bash, Zsh, Fish, PowerShell" },
    ],
  },
  cli: {
    title: "CLI Features",
    icon: Terminal,
    specs: [
      { label: "Commands", value: "50+ built-in tools" },
      { label: "Output Formats", value: "JSON, YAML, Table, CSV" },
      { label: "Autocompletion", value: "Bash, Zsh, Fish" },
      { label: "Color Output", value: "Configurable themes" },
      { label: "Progress Bars", value: "Real-time feedback" },
    ],
  },
  storage: {
    title: "Storage Tools",
    icon: HardDrive,
    specs: [
      { label: "Disk Analysis", value: "Space usage, SMART data" },
      { label: "File Search", value: "Regex, fuzzy matching" },
      { label: "Backup Tools", value: "Incremental, compressed" },
      { label: "Sync Tools", value: "rsync-compatible" },
      { label: "Recovery", value: "Deleted file recovery" },
    ],
  },
  network: {
    title: "Network Tools",
    icon: Wifi,
    specs: [
      { label: "Diagnostics", value: "ping, traceroute, dig" },
      { label: "Monitoring", value: "Bandwidth, connections" },
      { label: "Security", value: "Port scanning, TLS check" },
      { label: "Transfer", value: "HTTP, FTP, SCP, SFTP" },
      { label: "DNS", value: "Lookup, zone transfer" },
    ],
  },
  security: {
    title: "Security Tools",
    icon: Lock,
    specs: [
      { label: "Password Manager", value: "Encrypted vault" },
      { label: "SSH Tools", value: "Key management, tunnels" },
      { label: "Checksums", value: "MD5, SHA-1, SHA-256" },
      { label: "Encryption", value: "AES-256, GPG" },
      { label: "Audit", value: "Permission checker" },
    ],
  },
  monitoring: {
    title: "Monitoring Tools",
    icon: Monitor,
    specs: [
      { label: "Process Monitor", value: "CPU, memory, I/O" },
      { label: "System Stats", value: "Load, uptime, temps" },
      { label: "Log Viewer", value: "Tail, filter, search" },
      { label: "Alerts", value: "Threshold-based" },
      { label: "Reports", value: "HTML, PDF export" },
    ],
  },
};

const includedTools = [
  "awf-disk - Disk usage analyzer",
  "awf-net - Network diagnostics suite",
  "awf-proc - Process manager",
  "awf-log - Log viewer and analyzer",
  "awf-sync - File synchronization",
  "awf-backup - Incremental backups",
  "awf-crypt - Encryption toolkit",
  "awf-ssh - SSH manager",
];

const integrations = [
  "VS Code Extension",
  "JetBrains Plugin",
  "GitHub Actions",
  "GitLab CI/CD",
  "Jenkins Plugin",
  "Ansible Module",
  "Terraform Provider",
  "Docker Integration",
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
          Detailed technical specifications for AWFixer Tools. Built for
          professionals who demand precision and reliability.
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

      {/* Included Tools & Integrations */}
      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Included Tools</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {includedTools.map((item, index) => (
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
          <h2 className="mb-6 text-2xl font-bold">Integrations</h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {integrations.map((item, index) => (
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

      {/* Performance */}
      <div className="rounded-2xl bg-muted/50 p-8">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Performance Benchmarks
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-center">
          AWFixer Tools is optimized for speed and efficiency, outperforming
          traditional alternatives in common operations.
        </p>
        <div className="grid gap-4 text-center sm:grid-cols-3">
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">3x</p>
            <p className="text-sm text-muted-foreground">Faster File Search</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">50%</p>
            <p className="text-sm text-muted-foreground">Less Memory Usage</p>
          </div>
          <div className="rounded-lg bg-background p-4">
            <p className="text-3xl font-bold text-primary">&lt;100ms</p>
            <p className="text-sm text-muted-foreground">Startup Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
