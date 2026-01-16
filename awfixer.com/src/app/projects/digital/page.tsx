import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const digitalProjects = [
  {
    id: "https-reform",
    name: "HTTPS Reform",
    description:
      "Modernizing web security standards and promoting universal HTTPS adoption to create a safer, more private internet.",
    icon: Globe,
    features: [
      "Universal encryption advocacy",
      "Certificate automation",
      "Global security standards",
      "Performance optimization",
    ],
    href: "/projects/digital/https-reform",
    status: "active" as const,
    category: "Web Security",
    image: "/features/triage-card.svg",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  beta: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "coming-soon": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
};

const statusLabels = {
  active: "Active",
  beta: "Beta",
  "coming-soon": "Coming Soon",
};

export default function DigitalProjectsPage() {
  return (
    <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 font-medium text-emerald-600 dark:text-emerald-400">
            <Monitor className="h-5 w-5" />
            Digital Enhancements
          </div>
          <h1 className="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
            Digital Projects
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Software and digital infrastructure projects focused on security,
            productivity, and innovation in the modern digital landscape.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/projects">
                ← All Projects
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects/physical">
                Physical Projects →
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {digitalProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.id}
                className="group hover:border-primary/20 border-2 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-lg p-3 transition-colors">
                      <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <div className="relative mb-4 aspect-[1.28/1] overflow-hidden rounded-lg">
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
                  <div className="text-muted-foreground mt-2 text-sm">
                    {project.category}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
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

        <div className="bg-emerald-500/5 rounded-2xl border-2 border-emerald-500/20 p-8 text-center lg:p-12">
          <h2 className="mb-4 text-3xl font-bold">
            Have a Digital Project Idea?
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            We&apos;re always looking for innovative digital solutions. If you have an idea
            that could enhance security, productivity, or digital infrastructure,
            we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Submit a Proposal</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects/physical">Explore Physical Projects</Link>
            </Button>
          </div>
        </div>
    </div>
  );
}
