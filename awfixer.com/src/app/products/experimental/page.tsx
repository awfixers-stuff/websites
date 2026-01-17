import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, TestTube, Microscope, Dna } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Experimental Products | AWFixer",
  description: "Cutting-edge experimental products and prototypes from AWFixer Labs.",
};

const experimentalProducts = [
  {
    id: "quantum-compute",
    name: "Quantum Compute Engine",
    description: "Experimental quantum computing framework for next-generation processing.",
    icon: Microscope,
    features: [
      "Quantum circuit simulation",
      "Hybrid classical-quantum algorithms",
      "Real-time quantum state visualization",
      "API for quantum experimentation"
    ],
    href: "/products/experimental/quantum-compute",
    status: "prototype" as const,
    category: "Quantum Computing",
    riskLevel: "High"
  },
  {
    id: "neural-interface",
    name: "Neural Interface SDK",
    description: "Brain-computer interface development kit for experimental applications.",
    icon: Dna,
    features: [
      "EEG signal processing",
      "Real-time neural pattern recognition",
      "Machine learning integration",
      "Safety-first architecture"
    ],
    href: "/products/experimental/neural-interface",
    status: "alpha" as const,
    category: "BCI Technology",
    riskLevel: "Very High"
  },
  {
    id: "fusion-reactor",
    name: "Compact Fusion Reactor",
    description: "Miniature fusion reactor prototype for clean energy generation.",
    icon: TestTube,
    features: [
      "Plasma containment system",
      "Energy harvesting mechanisms",
      "Safety monitoring protocols",
      "Scalable design architecture"
    ],
    href: "/products/experimental/fusion-reactor",
    status: "research" as const,
    category: "Clean Energy",
    riskLevel: "Extreme"
  },
  {
    id: "matter-printer",
    name: "Matter Printer 3D",
    description: "Molecular-level 3D printing for material synthesis and prototyping.",
    icon: FlaskConical,
    features: [
      "Atomic precision placement",
      "Multi-material synthesis",
      "Real-time molecular modeling",
      "Quantum material properties"
    ],
    href: "/products/experimental/matter-printer",
    status: "concept" as const,
    category: "Material Science",
    riskLevel: "Moderate"
  }
];

const statusColors = {
  prototype: "bg-orange-100 text-orange-800",
  alpha: "bg-red-100 text-red-800", 
  research: "bg-purple-100 text-purple-800",
  concept: "bg-gray-100 text-gray-800"
};

const statusLabels = {
  prototype: "Prototype",
  alpha: "Alpha",
  research: "Research",
  concept: "Concept"
};

const riskColors: Record<string, string> = {
  "Moderate": "bg-yellow-100 text-yellow-800",
  "High": "bg-orange-100 text-orange-800",
  "Very High": "bg-red-100 text-red-800",
  "Extreme": "bg-red-200 text-red-900"
};

export default function ExperimentalPage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:pt-44">
        <div className="text-center mb-16">
          {/* Warning Banner */}
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-red-800 dark:text-red-200">
              <FlaskConical className="h-5 w-5" />
              <span className="font-semibold">Experimental Products - Use at Your Own Risk</span>
              <FlaskConical className="h-5 w-5" />
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              These products are experimental and may contain bugs, security vulnerabilities, or unstable features. 
              They are not intended for production use.
            </p>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            AWFixer Labs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our cutting-edge experimental products and prototypes. 
            Push the boundaries of technology with our most ambitious projects.
          </p>
          <div className="bg-red-50 dark:bg-red-950/50 mx-auto max-w-2xl rounded-2xl p-4 border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm tracking-wide">
              EXPERIMENTAL • PROTOTYPE • RESEARCH
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {experimentalProducts.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                        {statusLabels[product.status]}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskColors[product.riskLevel]}`}>
                        {product.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-red-900 dark:text-red-100">{product.name}</CardTitle>
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
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                    <Link href={product.href}>
                      Experiment with {product.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 lg:p-12 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-100">
            Join the Experimental Program
          </h2>
          <p className="text-red-800 dark:text-red-200 mb-6 max-w-2xl mx-auto">
            Help us shape the future of technology. Get early access to experimental products, 
            provide feedback, and collaborate with our research team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/contact?subject=experimental-program">
                Apply for Beta Access
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-red-300 text-red-700 hover:bg-red-50">
              <Link href="/docs/experimental">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}