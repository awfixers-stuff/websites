import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";

interface CardNavItem {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  featured?: boolean;
}

interface Props {
  items: CardNavItem[];
  className?: string;
}

export default function CardNavIsland({ items, className = "" }: Props) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardTitle: string) => {
    setExpandedCard(expandedCard === cardTitle ? null : cardTitle);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Card Navigation
        </h2>
        <div className="space-y-2">
          {items.map((item, index) => (
            <CardNavItem
              key={`${item.title}-${index}`}
              item={item}
              isExpanded={expandedCard === item.title}
              onToggle={() => toggleCard(item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CardNavCardProps {
  item: CardNavItem;
  isExpanded: boolean;
  onToggle: () => void;
}

function CardNavItem({ item, isExpanded, onToggle }: CardNavCardProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          {item.icon && (
            <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">
              {item.icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0">
          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.badge && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {item.badge}
              </span>
            )}
            {item.featured && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                Featured
              </span>
            )}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
          <div className="py-2 space-y-2">
            <a
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors group"
            >
              <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
