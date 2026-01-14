import Link from "next/link";
import { ArrowRight, Check, Users, Target, Zap, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Foster better collaboration with shared workspaces, real-time updates, and integrated communication tools."
  },
  {
    icon: Target,
    title: "Focus Management",
    description: "Help teams stay focused on what matters most with intelligent prioritization and distraction-blocking features."
  },
  {
    icon: Zap,
    title: "Rapid Iteration",
    description: "Move quickly with streamlined workflows, automated testing, and continuous deployment capabilities."
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Maintain high standards with built-in quality checks, code reviews, and comprehensive testing frameworks."
  }
];

const benefits = [
  "Increased team productivity by 40%",
  "Reduced time-to-market by 35%",
  "Improved team satisfaction scores",
  "Better work-life balance for team members",
  "Higher quality deliverables",
  "More predictable release schedules"
];

const useCases = [
  {
    title: "Sprint Planning",
    description: "Plan and execute sprints with better resource allocation and realistic timelines."
  },
  {
    title: "Feature Development",
    description: "Manage feature development from concept to deployment with full traceability."
  },
  {
    title: "Team Retrospectives",
    description: "Conduct meaningful retrospectives with data-driven insights and action items."
  },
  {
    title: "Performance Reviews",
    description: "Track team and individual performance with objective metrics and achievements."
  }
];

export default function ModernTeamsPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Users className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Modern Product Teams
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Built on habits that make the best product teams successful: staying focused, 
          moving quickly, and always aiming for high-quality work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Get Started
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
          <h2 className="text-3xl font-bold mb-6">Proven Benefits</h2>
          <div className="bg-muted/50 rounded-2xl p-8">
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
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
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Team?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams that have already transformed their product development 
          process with our modern team management solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="/contact">
              Schedule Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}