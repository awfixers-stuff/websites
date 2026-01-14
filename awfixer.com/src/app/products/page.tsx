import Link from "next/link";
import { ArrowRight, Cpu, Globe, Shield, Zap } from "lucide-react";

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
    status: "available" as const,
    category: "Developer Tools"
  }
];

const statusColors = {
  available: "bg-green-100 text-green-800",
  beta: "bg-blue-100 text-blue-800", 
  "coming-soon": "bg-gray-100 text-gray-800"
};

const statusLabels = {
  available: "Available",
  beta: "Beta",
  "coming-soon": "Coming Soon"
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4">
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
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                    {statusLabels[product.status]}
                  </span>
                </div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
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
                <Button asChild className="w-full group-hover:primary/90">
                  <Link href={product.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
  );
}