import React from "react";
import { Search as SearchIcon } from "react-feather";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: any) => void;
    };
    searchStore?: {
      set: (value: boolean) => void;
    };
  }
}

export default function OpenModalButtonIsland() {
  const handleSearchClick = () => {
    if (typeof window !== "undefined" && window.searchStore) {
      window.searchStore.set(true);
    }

    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("search_opened", {
        trigger: "button_click",
      });
    }
  };

  return (
    <button
      onClick={handleSearchClick}
      className="flex items-center justify-between space-x-4 w-full rounded border border-gray-300 cursor-pointer px-2 py-2 md:py-1 text-gray-600 text-left md:hover:border-pink-300"
    >
      <div className="flex items-center space-x-2">
        <SearchIcon className="w-4 h-4" />
        <span className="text-sm">Search</span>
      </div>
      <div className="text-gray-600 text-sm hidden md:block">⌘K</div>
    </button>
  );
}
