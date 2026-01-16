import Link from "next/link";
import { ArrowRight, Globe, Monitor, Train, Zap } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projectCategories = [
  {
    id: "digital",
    title: "Digital Enhancements",
    icon: Monitor,
    href: "/projects/digital",
    description:
      "Software and digital infrastructure projects focused on security, productivity, and innovation in the modern digital landscape.",
    color: "emerald",
    projectCount: 1,
    featuredProject: {
      name: "HTTPS Reform",
      icon: Globe,
      href: "/projects/digital/https-reform",
      description: "Modernizing web security standards",
    },
  },
  {
    id: "physical",
    title: "Physical Enhancements",
    icon: Zap,
    href: "/projects/physical",
    description:
      "Hardware and physical infrastructure projects revolutionizing transportation, manufacturing, and real-world systems.",
    color: "amber",
    projectCount: 1,
    featuredProject: {
      name: "Hyperloop Technology",
      icon: Train,
      href: "/projects/physical/hyperloop",
      description: "High-speed vacuum tube transportation",
    },
  },
];

export default function ProjectsPage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:pt-44">
        <div className="mb-16 text-center">
          <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
            Our Projects
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Explore our comprehensive projects designed to enhance both digital
            infrastructure and physical systems, driving innovation across all
            domains.
          </p>
          <div className="bg-muted/50 mx-auto max-w-2xl rounded-2xl p-4">
            <p className="text-muted-foreground font-mono text-sm tracking-wide">
              MEASURE TWICE. CUT ONCE.
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {projectCategories.map((category) => {
            const CategoryIcon = category.icon;
            const FeaturedIcon = category.featuredProject.icon;
            const colorClasses = {
              emerald: {
                bg: "bg-emerald-500/10 hover:bg-emerald-500/20",
                text: "text-emerald-600 dark:text-emerald-400",
                border: "border-emerald-500/30 hover:border-emerald-500/50",
                dot: "bg-emerald-500",
              },
              amber: {
                bg: "bg-amber-500/10 hover:bg-amber-500/20",
                text: "text-amber-600 dark:text-amber-400",
                border: "border-amber-500/30 hover:border-amber-500/50",
                dot: "bg-amber-500",
              },
            }[category.color] || { bg: "", text: "", border: "", dot: "" };

            return (
              <Card
                key={category.id}
                className={`group border-2 transition-all duration-300 hover:shadow-lg ${colorClasses.border}`}
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`rounded-xl p-4 transition-colors ${colorClasses.bg}`}
                    >
                      <CategoryIcon className={`h-8 w-8 ${colorClasses.text}`} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
                    >
                      {category.projectCount} Project
                      {category.projectCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <CardTitle className={`text-2xl ${colorClasses.text}`}>
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Featured Project Preview */}
                  <div className="bg-muted/30 mb-6 rounded-lg border p-4">
                    <div className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                      Featured Project
                    </div>
                    <Link
                      href={category.featuredProject.href}
                      className="group/featured flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                      <div className={`rounded-lg p-2 ${colorClasses.bg}`}>
                        <FeaturedIcon
                          className={`h-5 w-5 ${colorClasses.text}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium">
                          {category.featuredProject.name}
                        </div>
                        <div className="text-muted-foreground truncate text-sm">
                          {category.featuredProject.description}
                        </div>
                      </div>
                      <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover/featured:translate-x-1" />
                    </Link>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={category.href}>
                      Explore {category.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation Matrix */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Quick Navigation
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectCategories.map((category) => {
              const FeaturedIcon = category.featuredProject.icon;
              const colorClasses = {
                emerald: {
                  bg: "bg-emerald-500/10 hover:bg-emerald-500/20",
                  text: "text-emerald-600 dark:text-emerald-400",
                  border: "border-emerald-500/20",
                },
                amber: {
                  bg: "bg-amber-500/10 hover:bg-amber-500/20",
                  text: "text-amber-600 dark:text-amber-400",
                  border: "border-amber-500/20",
                },
              }[category.color] || { bg: "", text: "", border: "" };

              return (
                <Link
                  key={`nav-${category.id}`}
                  href={category.featuredProject.href}
                  className={`group flex items-center gap-3 rounded-xl border-2 p-4 transition-all hover:shadow-md ${colorClasses.border} ${colorClasses.bg}`}
                >
                  <FeaturedIcon className={`h-6 w-6 ${colorClasses.text}`} />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium ${colorClasses.text}`}>
                      {category.featuredProject.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {category.title}
                    </div>
                  </div>
                  <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 text-center lg:p-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to transform your workflow?
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Our projects span both digital and physical domains, providing
            comprehensive solutions for modern challenges. Get started with any
            project and scale as you grow.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}
