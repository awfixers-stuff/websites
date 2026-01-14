import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { DashedLine } from "../dashed-line";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "AWFixer CLI",
    description: "Powerful command-line interface for automated debugging and code analysis.",
    image: "/projects/cli-tool.webp",
    tech: ["Node.js", "TypeScript", "Bash"],
    github: "https://github.com/awfixer/cli",
    demo: "https://demo.awfixer.com/cli",
    featured: true,
  },
  {
    title: "Bug Tracker",
    description: "Intelligent bug detection and tracking system with AI-powered insights.",
    image: "/projects/bug-tracker.webp",
    tech: ["React", "Next.js", "PostgreSQL"],
    github: "https://github.com/awfixer/bug-tracker",
    demo: "https://demo.awfixer.com/bug-tracker",
    featured: true,
  },
  {
    title: "Performance Monitor",
    description: "Real-time application performance monitoring and optimization suggestions.",
    image: "/projects/performance-monitor.webp",
    tech: ["Vue.js", "D3.js", "WebSocket"],
    github: "https://github.com/awfixer/performance-monitor",
    demo: "https://demo.awfixer.com/performance",
    featured: false,
  },
  {
    title: "Code Analyzer",
    description: "Static code analysis tool for identifying potential issues and improvements.",
    image: "/projects/code-analyzer.webp",
    tech: ["Python", "AST", "Machine Learning"],
    github: "https://github.com/awfixer/code-analyzer",
    demo: null,
    featured: false,
  },
  {
    title: "Deploy Helper",
    description: "Automated deployment assistant with rollback capabilities.",
    image: "/projects/deploy-helper.webp",
    tech: ["Docker", "Kubernetes", "GitHub Actions"],
    github: "https://github.com/awfixer/deploy-helper",
    demo: "https://demo.awfixer.com/deploy",
    featured: false,
  },
  {
    title: "Test Runner",
    description: "Comprehensive testing framework with parallel execution and reporting.",
    image: "/projects/test-runner.webp",
    tech: ["Jest", "Playwright", "TypeScript"],
    github: "https://github.com/awfixer/test-runner",
    demo: "https://demo.awfixer.com/testing",
    featured: false,
  },
];

export const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="overflow-hidden pb-28 lg:pb-32">
      <div className="container">
        <div className="text-center">
          <div className="relative flex items-center justify-center">
            <DashedLine className="text-muted-foreground" />
            <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
              BUILD. DEBUG. DEPLOY.
            </span>
          </div>
          
          <div className="mx-auto mt-10 max-w-4xl space-y-6 md:mt-24">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Our Open Source Projects
            </h2>
            <p className="text-muted-foreground leading-snug">
              AWFixer maintains a collection of open-source tools designed to make
              developers' lives easier. From debugging helpers to deployment assistants,
              we've got you covered.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:mt-20 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <div className="mt-16 flex items-center justify-center">
              <DashedLine className="max-w-2xl" />
            </div>
            
            <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <SmallProjectCard key={project.title} project={project} />
              ))}
            </div>
          </>
        )}

        <div className="mt-20 text-center">
          <div className="bg-muted/50 rounded-3xl border p-8 md:p-12">
            <h3 className="text-2xl font-semibold md:text-3xl">
              Want to contribute?
            </h3>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              All our projects are open source and we welcome contributions from the
              community. Check out our GitHub organization to get started.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <a href="https://github.com/awfixer" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 size-4" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden border-none bg-transparent">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-background absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          </div>
          
          <div className="relative p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold md:text-2xl">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-4" />
                  GitHub
                </a>
              </Button>
              {project.demo && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SmallProjectCardProps {
  project: (typeof projects)[number];
}

const SmallProjectCard = ({ project }: SmallProjectCardProps) => {
  return (
    <Card className="group overflow-hidden border-none bg-transparent">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-background absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          </div>
          
          <div className="relative p-4">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
              {project.description}
            </p>
            
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-3" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};