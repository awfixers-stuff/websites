import { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ProductFeature({ icon: Icon, title, description }: ProductFeatureProps) {
  return (
    <Card className="text-center border-2 hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="mx-auto p-3 bg-primary/10 rounded-lg mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}