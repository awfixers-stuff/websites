import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    id: "modern-teams",
    name: "Modern Product Teams",
    description: "AWFixer is built on habits that make the best product teams successful: staying focused, moving quickly, and always aiming for high-quality work.",
    icon: Users,
    features: [
      "Focus management and prioritization",
      "Rapid iteration workflows",
      "Quality assurance processes",
      "Team collaboration tools"
    ],
    href: "/projects/modern-teams",
    status: "active" as const,
    category: "Team Management",
    image: "/features/triage-card.svg"
  },
  {
    id: "resource-allocation",
    name: "Resource Allocation",
    description: "Optimize your resource allocation and execution with intelligent planning and real-time tracking tools.",
    icon: BarChart,
    features: [
      "Intelligent resource planning",
      "Real-time tracking dashboards",
      "Budget optimization",
      "Performance analytics"
    ],
    href: "/projects/resource-allocation",
    status: "active" as const,
    category: "Planning & Analytics",
    image: "/features/cycle-card.svg"
  },
  {
    id: "momentum-building",
    name: "Momentum Building",
    description: "Build momentum and healthy habits with continuous improvement workflows and achievement tracking.",
    icon: Clock,
    features: [
      "Habit formation tracking",
      "Progress visualization",
      "Milestone celebrations",
      "Continuous feedback loops"
    ],
    href: "/projects/momentum-building",
    status: "beta" as const,
    category: "Productivity",
    image: "/features/overview-card.svg"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  beta: "bg-blue-100 text-blue-800", 
  "coming-soon": "bg-gray-100 text-gray-800"
};

const statusLabels = {
  active: "Active",
  beta: "Beta",
  "coming-soon": "Coming Soon"
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Our Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore our comprehensive projects designed to enhance team collaboration, 
          optimize resource allocation, and build sustainable momentum for modern product development.
        </p>
        <div className="bg-muted/50 rounded-2xl p-4 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground font-mono tracking-wide">
            MEASURE TWICE. CUT ONCE.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>
                <div className="relative aspect-[1.28/1] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.image}
                    alt={`${project.name} interface`}
                    fill
                    className="object-cover object-left-top"
                  />
                  <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                </div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
                <div className="text-sm text-muted-foreground mt-2">
                  {project.category}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full group-hover:primary/90">
                  <Link href={project.href}>
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
          Ready to transform your workflow?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our projects are designed to work together seamlessly, providing a comprehensive 
          solution for modern product teams. Get started with any project and scale as you grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Get Started
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}