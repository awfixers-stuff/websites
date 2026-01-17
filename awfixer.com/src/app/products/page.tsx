import Link from "next/link";
import { ArrowRight, Cpu, FileText, Globe, Shield, Zap, FlaskConical, AlertTriangle } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: "awfixeros",
    name: "AWFixerOS",
    description: "A modern, secure operating system built for performance and reliability.",
    icon: Cpu,
    features: [
      "Lightning-fast boot times",
      "Advanced security features",
      "Seamless hardware integration",
      "Regular updates and support"
    ],
    href: "/products/awfixeros",
    docsHref: "/products/awfixeros/docs",
    status: "available" as const,
    category: "Operating System"
  },
  {
    id: "awfixer-cloud",
    name: "AWFixer Cloud",
    description: "Scalable cloud infrastructure solutions for modern applications.",
    icon: Globe,
    features: [
      "Auto-scaling capabilities",
      "Global CDN network",
      "99.9% uptime guarantee",
      "Developer-friendly APIs"
    ],
    href: "/products/cloud",
    docsHref: "/products/cloud/docs",
    status: "beta" as const,
    category: "Cloud Services"
  },
  {
    id: "awfixer-security",
    name: "AWFixer Security",
    description: "Enterprise-grade security solutions to protect your digital assets.",
    icon: Shield,
    features: [
      "Real-time threat detection",
      "Advanced encryption standards",
      "Compliance management",
      "24/7 security monitoring"
    ],
    href: "/products/security",
    docsHref: "/products/security/docs",
    status: "coming-soon" as const,
    category: "Security"
  },
  {
    id: "awfixer-tools",
    name: "AWFixer Tools",
    description: "Professional development tools to boost your productivity.",
    icon: Zap,
    features: [
      "Integrated development environment",
      "Code optimization tools",
      "Team collaboration features",
      "Cross-platform support"
    ],
    href: "/products/tools",
    docsHref: "/products/tools/docs",
    status: "available" as const,
    category: "Developer Tools"
  },
  {
    id: "experimental",
    name: "Experimental Products",
    description: "Cutting-edge experimental products and prototypes from AWFixer Labs.",
    icon: FlaskConical,
    features: [
      "Quantum computing frameworks",
      "Neural interface development kits",
      "Fusion reactor prototypes",
      "Molecular-level 3D printing"
    ],
    href: "/products/experimental",
    docsHref: "/products/experimental",
    status: "experimental" as const,
    category: "Research & Development"
  }
];

const statusColors = {
  available: "bg-green-100 text-green-800",
  beta: "bg-blue-100 text-blue-800", 
  "coming-soon": "bg-gray-100 text-gray-800",
  experimental: "bg-red-100 text-red-800"
};

const statusLabels = {
  available: "Available",
  beta: "Beta",
  "coming-soon": "Coming Soon",
  experimental: "Experimental"
};

export default function ProductsPage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:pt-44">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our comprehensive suite of products designed to empower your business and accelerate your growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.id} className={`group hover:shadow-lg transition-all duration-300 border-2 ${
                    product.status === "experimental" 
                      ? "hover:border-red-500/30" 
                      : "hover:border-primary/20"
                  }`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg transition-colors ${
                      product.status === "experimental" 
                        ? "bg-red-500/10 group-hover:bg-red-500/20" 
                        : "bg-primary/10 group-hover:bg-primary/20"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        product.status === "experimental" 
                          ? "text-red-600 dark:text-red-400" 
                          : "text-primary"
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                        {statusLabels[product.status]}
                      </span>
                      {product.status === "experimental" && (
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>
                  <CardTitle className={`text-2xl ${
                    product.status === "experimental" 
                      ? "text-red-900 dark:text-red-100" 
                      : ""
                  }`}>{product.name}</CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {product.category}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button asChild className={`flex-1 ${
                      product.status === "experimental" 
                        ? "bg-red-600 hover:bg-red-700" 
                        : ""
                    }`}>
                      <Link href={product.href}>
                        {product.status === "experimental" ? "Experiment" : "Learn More"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild title="View Documentation">
                      <Link href={product.docsHref}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-muted/50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Need help choosing the right product?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect solution for your specific needs. Get in touch with us for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/faq">
                View FAQ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}