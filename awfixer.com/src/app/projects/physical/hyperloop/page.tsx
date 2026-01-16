import Link from "next/link";
import { ArrowRight, Check, Train, Leaf, Zap, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "High-Speed Travel",
    description:
      "Achieve speeds up to 760 mph in near-vacuum tube systems, reducing travel times by up to 90%.",
  },
  {
    icon: Leaf,
    title: "Sustainable Transport",
    description:
      "Solar-powered infrastructure with zero direct emissions, revolutionizing eco-friendly mass transit.",
  },
  {
    icon: Train,
    title: "Magnetic Levitation",
    description:
      "Frictionless travel using magnetic levitation technology, ensuring smooth and quiet journeys.",
  },
  {
    icon: MapPin,
    title: "Urban Connectivity",
    description:
      "Connecting major cities with seamless, high-frequency departures every few minutes.",
  },
];

const benefits = [
  "Travel times reduced by up to 90%",
  "Zero direct carbon emissions",
  "Lower infrastructure cost per mile than high-speed rail",
  "Weather-independent operations",
  "Reduced land usage with elevated tube design",
  "Energy-positive system with solar generation",
];

const useCases = [
  {
    title: "Inter-City Corridors",
    description:
      "High-traffic routes between major metropolitan areas, replacing short-haul flights.",
  },
  {
    title: "Freight Transport",
    description:
      "Ultra-fast cargo delivery for time-sensitive goods and supply chain optimization.",
  },
  {
    title: "Airport Connections",
    description:
      "Rapid transit between airports and city centers, extending airport catchment areas.",
  },
  {
    title: "Regional Networks",
    description:
      "Creating megaregions by connecting neighboring cities into unified economic zones.",
  },
];

export default function HyperloopPage() {
  return (
    <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            Physical Enhancement
          </div>
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 rounded-2xl p-4">
              <Train className="text-primary h-12 w-12" />
            </div>
          </div>
          <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
            Hyperloop Technology
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Revolutionizing transportation with high-speed vacuum tube systems,
            making inter-city travel faster, cleaner, and more sustainable than
            ever before.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
              <Link href="/projects/physical">View Physical Projects</Link>
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:border-primary/20 border-2 text-center transition-colors"
                >
                  <CardHeader>
                    <div className="bg-primary/10 mx-auto mb-4 rounded-lg p-3">
                      <Icon className="text-primary h-6 w-6" />
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

        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Impact & Benefits</h2>
            <div className="bg-muted/50 rounded-2xl p-8">
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold">Applications</h2>
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="hover:border-primary/20 border-2 transition-colors"
                >
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

        <div className="from-primary/10 to-primary/5 rounded-2xl bg-gradient-to-r p-8 text-center lg:p-12">
          <h2 className="mb-4 text-3xl font-bold">
            Shape the Future of Transportation
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            Join us in building the next generation of mass transit. Whether
            you&apos;re an engineer, investor, or city planner, be part of the
            transportation revolution.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              Partner With Us
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg" asChild>
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
    </div>
  );
}
