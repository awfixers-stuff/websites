import Link from "next/link";
import { ArrowRight, Check, Clock, Trophy, Target, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "Habit Formation",
    description: "Build productive habits with scientifically-backed streak tracking and reinforcement mechanisms."
  },
  {
    icon: Target,
    title: "Progress Visualization",
    description: "See your progress with beautiful charts, graphs, and milestone celebrations that keep you motivated."
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Unlock achievements and earn rewards as you reach milestones and build consistent productive behaviors."
  },
  {
    icon: Zap,
    title: "Continuous Feedback",
    description: "Get real-time feedback and insights to optimize your productivity and workflow patterns."
  }
];

const habits = [
  "Daily goal setting and tracking",
  "Weekly reflection and planning",
  "Focused work sessions with Pomodoro",
  "Regular breaks and wellness checks",
  "Team collaboration habits",
  "Learning and skill development time",
  "Energy management and prioritization",
  "Consistent morning and evening routines"
];

const useCases = [
  {
    title: "Personal Development",
    description: "Build consistent habits for learning, fitness, and personal growth with personalized tracking."
  },
  {
    title: "Team Productivity",
    description: "Establish team-wide productive habits and track collective progress toward shared goals."
  },
  {
    title: "Remote Work",
    description: "Maintain structure and momentum while working remotely with habit-based productivity systems."
  },
  {
    title: "Creative Projects",
    description: "Build creative momentum with consistent daily habits that support long-term artistic and professional goals."
  }
];

export default function MomentumBuildingPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Clock className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Momentum Building
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Build momentum and healthy habits with continuous improvement workflows 
          and achievement tracking that transforms your productivity over time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Building Habits
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
          <h2 className="text-3xl font-bold mb-6">Productive Habits</h2>
          <div className="bg-muted/50 rounded-2xl p-8">
            <ul className="space-y-3">
              {habits.map((habit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{habit}</span>
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
        <h2 className="text-3xl font-bold mb-4">Build Your Momentum Today</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start building productive habits that compound over time. Small changes 
          today lead to extraordinary results tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start 21-Day Challenge
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="/contact">
              Join Community
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}