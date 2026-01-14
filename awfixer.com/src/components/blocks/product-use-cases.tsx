import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UseCase {
  title: string;
  description: string;
}

interface ProductUseCasesProps {
  title: string;
  useCases: UseCase[];
}

export function ProductUseCases({ title, useCases }: ProductUseCasesProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
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
  );
}