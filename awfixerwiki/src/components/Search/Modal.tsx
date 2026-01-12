import { useCustomSearch } from "@/hooks/useCustomSearch";
import React from "react";

import NoResults from "./NoResults";
import QueryInput from "./QueryInput";
import Results from "./Results";

interface Props {
  closeModal: () => void;
}

const Modal: React.FC<Props> = ({ closeModal }) => {
  const { clearResults, isSearching, query, setQuery, results } =
    useCustomSearch(200);

  return (
    <div
      className="px-2 mt-12 mb-12 sm:px-4 md:px-0 md:mt-28 md:mb-28"
      onPointerDown={() => {
        closeModal();
      }}
    >
      <div
        onPointerDown={e => e.stopPropagation()}
        className="bg-background border rounded-lg w-full md:w-1/2 mx-auto"
      >
        <QueryInput
          clearResponse={clearResults}
          query={query}
          setQuery={setQuery}
        />
        {isSearching ? (
          <div className="my-4 animate-spin">Searching...</div>
        ) : (
          <Results closeModal={closeModal} results={results} />
        )}
      </div>
    </div>
  );
};

export default Modal;
