import React from "react";
import { Search as SearchIcon } from "react-feather";

interface Props {
  clearResponse: () => void;
  query: string;
  setQuery: (q: string) => void;
}

const QueryInput: React.FC<Props> = ({ clearResponse, query, setQuery }) => {
  return (
    <div className="flex flex-col">
      <form className="flex flex-row" onSubmit={e => e.preventDefault()}>
        <span className="flex items-center px-3">
          <SearchIcon className="w-4 text-gray-300" />
        </span>
        <input
          autoFocus
          className="w-full focus:outline-none bg-transparent"
          type="text"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="flex items-center py-2 pr-4">
          <button
            className="flex items-center justify-center w-14 h-8 rounded border border-solid rounded-lg text-black text-sm dark:text-white hover:bg-gray-100"
            onClick={e => {
              e.preventDefault();
              clearResponse();
            }}
          >
            <span className="text-gray-500">Clear</span>
          </button>
        </span>
      </form>
    </div>
  );
};

export default QueryInput;
