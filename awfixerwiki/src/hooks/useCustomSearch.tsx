import { getCollection } from "astro:content";
import { useCallback, useEffect, useState, useMemo } from "react";
import { getPostHog } from "./usePostHog";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
  content: string;
  tags?: string[];
}

interface SearchState {
  results: SearchResult[];
  isSearching: boolean;
  query: string;
}

export const useCustomSearch = (debounceMs = 200) => {
  const [state, setState] = useState<SearchState>({
    results: [],
    isSearching: false,
    query: "",
  });

  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);

  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch("/api/search-index.json");
        if (response.ok) {
          const index = await response.json();
          setSearchIndex(index);
        } else {
          console.warn("Search index not found, using fallback");
          setSearchIndex([]);
        }
      } catch (error) {
        console.warn("Failed to load search index:", error);
        setSearchIndex([]);
      }
    };

    loadSearchIndex();
  }, []);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setState(prev => ({ ...prev, results: [], query, isSearching: false }));
        return;
      }

      setState(prev => ({ ...prev, isSearching: true, query }));

      const results = searchIndex
        .filter(item => {
          const searchTerm = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.content.toLowerCase().includes(searchTerm) ||
            item.description?.toLowerCase().includes(searchTerm) ||
            item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        })
        .slice(0, 10);

      getPostHog().capture();

      setState(prev => ({
        ...prev,
        results,
        isSearching: false,
      }));
    },
    [searchIndex],
  );

  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => performSearch(query), debounceMs);
    };
  }, [performSearch, debounceMs]);

  const setQuery = (query: string) => {
    debouncedSearch(query);
  };

  const clearResults = () => {
    setState(prev => ({
      ...prev,
      results: [],
      query: "",
      isSearching: false,
    }));
  };

  return {
    results: state.results,
    isSearching: state.isSearching,
    query: state.query,
    setQuery,
    clearResults,
  };
};
