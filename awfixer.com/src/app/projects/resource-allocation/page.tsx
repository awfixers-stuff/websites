import Link from "next/link";
import { ArrowRight, BarChart, Check, TrendingUp, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BarChart,
    title: "Intelligent Planning",
    description: "AI-powered resource planning that optimizes allocation based on team capacity, skill sets, and project priorities."
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Monitor resource utilization, budget consumption, and team performance with live dashboards and predictive insights."
  },
  {
    icon: Users,
    title: "Team Matching",
    description: "Automatically match the right team members to projects based on skills, availability, and workload balance."
  },
  {
    icon: Zap,
    title: "Rapid Rebalancing",
    description: "Quickly reallocate resources when priorities change or unexpected challenges arise."
  }
];

const specifications = [
  "AI-driven resource optimization algorithms",
  "Real-time budget tracking and forecasting",
  "Skill-based team assignment",
  "Workload balancing across teams",
  "Predictive analytics for resource needs",
  "Integration with popular project management tools",
  "Customizable resource allocation rules",
  "Audit trails for compliance"
];

const useCases = [
  {
    title: "Enterprise Planning",
    description: "Plan resource allocation across multiple departments and projects with enterprise-grade security and governance."
  },
  {
    title: "Agency Management",
    description: "Optimize billable hours and resource utilization for client projects while maintaining quality standards."
  },
  {
    title: "Startup Scaling",
    description: "Effectively allocate limited resources during rapid growth phases while maintaining product quality."
  },
  {
    title: "Product Roadmapping",
    description: "Align resource allocation with product strategy and market opportunities for maximum impact."
  }
];

export default function ResourceAllocationPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <BarChart className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Resource Allocation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Optimize your resource allocation and execution with intelligent planning 
          and real-time tracking tools that ensure maximum efficiency and ROI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Optimizing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
          <div className="bg-muted/50 rounded-2xl p-8">
            <ul className="space-y-3">
              {specifications.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12">
        <h2 className="text-3xl font-bold mb-4">Optimize Your Resources Today</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stop guessing and start optimizing with data-driven resource allocation that 
          maximizes team productivity and project success rates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Free Resource Assessment
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="/contact">
              Talk to Expert
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}