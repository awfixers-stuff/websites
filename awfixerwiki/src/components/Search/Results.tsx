import { Link } from "@/components/Link";
import { Markup } from "interweave";
import React, { useCallback, useEffect, useState } from "react";
import tinykeys from "tinykeys";
import classNames from "classnames";
import { getPostHog } from "@/hooks/usePostHog";
import { SearchResult } from "@/hooks/useCustomSearch";

interface Props {
  closeModal: () => void;
  results: SearchResult[];
}

type SelectedResult = { idx: number; url: string };

const Results: React.FC<Props> = ({ closeModal, results }) => {
  const [selectedResult, setSelectedResult] = useState<SelectedResult | null>(
    null,
  );

  const resultsFlat: SelectedResult[] = results.map((r, idx) => ({
    idx,
    url: r.url,
  }));

  const onArrowKeyDown = useCallback(() => {
    if (selectedResult && selectedResult.idx + 1 >= resultsFlat.length) {
      return;
    }

    setSelectedResult(prev => {
      const next = prev ? resultsFlat[prev.idx + 1] : resultsFlat[0];
      return { ...next };
    });
  }, [resultsFlat, selectedResult]);

  const onArrowKeyUp = useCallback(() => {
    setSelectedResult(prev => {
      if (prev === null || prev.idx === 0) {
        return null;
      }
      const next = prev ? resultsFlat[prev.idx - 1] : resultsFlat[0];
      return { ...next };
    });
  }, [resultsFlat]);

  const onEnter = useCallback(() => {
    const resultToOpen = selectedResult ?? resultsFlat[0];

    if (!resultToOpen) {
      return;
    }

    getPostHog().capture();

    closeModal();
    window.location.href = resultToOpen.url;
  }, [selectedResult, resultsFlat, closeModal]);

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      ArrowDown: onArrowKeyDown,
      ArrowUp: onArrowKeyUp,
      Enter: onEnter,
      Escape: closeModal,
    });
    return unsubscribe;
  }, [onArrowKeyDown, onArrowKeyUp, onEnter, closeModal]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="px-2 py-4 md:px-4">
      <div className="max-h-96 overflow-y-auto">
        {results.map((result, idx) => (
          <div
            key={result.id}
            className={classNames(
              "px-4 py-2 cursor-pointer border-l-4 transition-colors",
              {
                "border-blue-500 bg-blue-50 dark:bg-blue-900/20":
                  selectedResult?.idx === idx,
                "border-transparent hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800":
                  selectedResult?.idx !== idx,
              },
            )}
            onClick={() => {
              getPostHog().capture();
              closeModal();
              window.location.href = result.url;
            }}
            onMouseEnter={() => setSelectedResult({ idx, url: result.url })}
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">
              <Link href={result.url} className="hover:underline">
                {result.title}
              </Link>
            </div>
            {result.description && (
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <Markup
                  content={result.description}
                  tagName="span"
                  className="text-sm"
                  noWrap
                  disableLineBreaks
                />
              </div>
            )}
            {result.tags && result.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {result.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
