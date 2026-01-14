import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function ProductHero({ 
  icon: Icon, 
  title, 
  description, 
  primaryAction,
  secondaryAction 
}: ProductHeroProps) {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-primary/10 rounded-2xl">
          <Icon className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction && (
            <Button size="lg" className="text-lg px-8" asChild={!!primaryAction.href}>
              {primaryAction.href ? (
                <a href={primaryAction.href} onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </a>
              ) : (
                <button onClick={primaryAction.onClick}>
                  {primaryAction.label}
                </button>
              )}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" size="lg" className="text-lg px-8" asChild={!!secondaryAction.href}>
              {secondaryAction.href ? (
                <a href={secondaryAction.href} onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </a>
              ) : (
                <button onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </button>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}