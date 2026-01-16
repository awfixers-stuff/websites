import { Check, Server, HardDrive, Cpu, Monitor, Wifi, Lock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const technicalSpecs = {
  kernel: {
    title: "Kernel & System",
    icon: Cpu,
    specs: [
      { label: "Kernel Version", value: "Linux 6.8 LTS" },
      { label: "Architecture", value: "x86_64, ARM64" },
      { label: "Init System", value: "Custom microkernel init" },
      { label: "Package Format", value: "AWF packages (.awf)" },
      { label: "Shell", value: "Bash 5.2 / Zsh 5.9" },
    ],
  },
  desktop: {
    title: "Desktop Environment",
    icon: Monitor,
    specs: [
      { label: "Window Manager", value: "AWFixer WM (Wayland)" },
      { label: "Display Server", value: "Wayland with X11 compat" },
      { label: "Compositor", value: "GPU-accelerated" },
      { label: "Themes", value: "Dark/Light + Custom" },
      { label: "Accessibility", value: "Full WCAG 2.2 support" },
    ],
  },
  storage: {
    title: "Storage & Filesystems",
    icon: HardDrive,
    specs: [
      { label: "Default Filesystem", value: "Btrfs with compression" },
      { label: "Supported FS", value: "ext4, XFS, NTFS, FAT32" },
      { label: "LVM Support", value: "Yes" },
      { label: "RAID Support", value: "Software RAID 0/1/5/6" },
      { label: "Encryption", value: "LUKS2 full disk" },
    ],
  },
  networking: {
    title: "Networking",
    icon: Wifi,
    specs: [
      { label: "Network Manager", value: "NetworkManager 1.44" },
      { label: "Firewall", value: "nftables with UFW frontend" },
      { label: "VPN Support", value: "WireGuard, OpenVPN, IPSec" },
      { label: "WiFi", value: "All modern standards" },
      { label: "Bluetooth", value: "BlueZ 5.7x" },
    ],
  },
  security: {
    title: "Security",
    icon: Lock,
    specs: [
      { label: "MAC System", value: "AppArmor + SELinux" },
      { label: "Secure Boot", value: "Full UEFI support" },
      { label: "TPM", value: "TPM 2.0 integration" },
      { label: "Updates", value: "Signed packages" },
      { label: "Sandboxing", value: "Flatpak + Bubblewrap" },
    ],
  },
  virtualization: {
    title: "Virtualization & Containers",
    icon: Server,
    specs: [
      { label: "Hypervisor", value: "KVM/QEMU" },
      { label: "Container Runtime", value: "Podman, Docker" },
      { label: "Orchestration", value: "K3s ready" },
      { label: "VM Manager", value: "virt-manager" },
      { label: "GPU Passthrough", value: "Supported" },
    ],
  },
};

const softwareIncludes = [
  "Firefox Browser with hardware acceleration",
  "LibreOffice productivity suite",
  "GNOME Software for app management",
  "Terminal with GPU rendering",
  "Files (Nautilus) file manager",
  "System Monitor dashboard",
  "Settings application",
  "Screenshot and screen recording tools",
];

const developerTools = [
  "Git, Mercurial version control",
  "GCC, Clang compilers",
  "Python 3.12, Node.js 22 LTS",
  "Rust, Go toolchains available",
  "VS Code and Neovim",
  "Docker/Podman CLI tools",
  "Debugging tools (gdb, lldb)",
  "Performance profilers",
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
            Detailed technical specifications for AWFixerOS. Built on proven
            open-source technologies with modern enhancements.
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

        {/* Software Includes */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Pre-installed Software</h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {softwareIncludes.map((item, index) => (
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
            <h2 className="mb-6 text-2xl font-bold">Developer Tools</h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {developerTools.map((item, index) => (
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

        {/* Hardware Compatibility Note */}
        <div className="rounded-2xl bg-muted/50 p-8">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Hardware Compatibility
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-center">
            AWFixerOS supports a wide range of hardware out of the box. Our
            compatibility database includes thousands of tested devices.
          </p>
          <div className="grid gap-4 text-center sm:grid-cols-3">
            <div className="rounded-lg bg-background p-4">
              <p className="text-3xl font-bold text-primary">5000+</p>
              <p className="text-sm text-muted-foreground">Tested Laptops</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-3xl font-bold text-primary">99%</p>
              <p className="text-sm text-muted-foreground">WiFi Chip Coverage</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-3xl font-bold text-primary">Day 1</p>
              <p className="text-sm text-muted-foreground">New GPU Support</p>
            </div>
          </div>
        </div>
    </div>
  );
}
