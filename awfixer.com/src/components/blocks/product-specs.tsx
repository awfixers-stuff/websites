import { Check } from "lucide-react";

interface ProductSpecsProps {
  title: string;
  specifications: string[];
}

export function ProductSpecs({ title, specifications }: ProductSpecsProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="bg-muted/50 rounded-2xl p-8">
        <ul className="space-y-3">
          {specifications.map((spec, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}