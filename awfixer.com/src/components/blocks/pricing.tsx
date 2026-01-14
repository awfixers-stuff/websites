"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Nebula Nomad",
    monthlyPrice: "$13",
    yearlyPrice: "$156",
    description: "Free for everyone",
    features: [
      "Unlimited members",
      "2 teams",
      "500 issues",
      "Slack and Github integrations",
    ],
  },
  {
    name: "Vortex Vanguard",
    monthlyPrice: "$25",
    yearlyPrice: "$275",
    features: [
      "All free plan features and...",
      "AWFixer AI",
      "Unlimited teams",
      "Unlimited projects and file uploads",
      "AWFixer Insights",
      "Admin roles",
    ],
  },
  {
    name: "Eclipse Enigma",
    monthlyPrice: "$50",
    yearlyPrice: "$500",
    features: [
      "All free plan features and...",
      "AWFixer AI",
      "SuperAWFixer AGI",
      "Free daily catered lunch",
      "random HIPPA audits",
    ],
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Use AWFixer for free with your whole team. Upgrade to enable
            unlimited projects, enhanced security controls, and additional
            features.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Startup"
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-semibold">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-lg font-medium">
                      {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}{" "}
                      {plan.name !== "Free" && (
                        <span className="text-muted-foreground">
                          per
                          {isAnnual ? " year" : " month"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {plan.name !== "Free" ? (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAnnual}
                      onCheckedChange={() => setIsAnnual(!isAnnual)}
                      aria-label="Toggle annual billing"
                    />
                    <span className="text-sm font-medium">Billed annually</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    {plan.description}
                  </span>
                )}

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.name === "Startup" ? "default" : "outline"}
                >
                  Get started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
