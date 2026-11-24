import React from 'react';
import { History, X } from 'lucide-react';

interface SearchHistoryProps {
  queries: string[];
  activeQuery: string;
  onSelectQuery: (query: string) => void;
  onRemoveQuery: (query: string) => void;
  onClearHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  queries,
  activeQuery,
  onSelectQuery,
  onRemoveQuery,
  onClearHistory,
}) => {
  if (queries.length === 0) return null;

  return (
    <div
      aria-label="Recent searches"
      className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto mb-3"
    >
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 mr-0.5">
        <History className="w-3 h-3" />
        <span>Recent:</span>
      </span>

      {queries.map((term) => {
        const isActive = activeQuery.trim().toLowerCase() === term.toLowerCase();
        return (
          <div
            key={term}
            className={`inline-flex items-center rounded-full border text-[11px] font-medium transition-all shadow-xs ${
              isActive
                ? 'bg-black border-black text-white'
                : 'bg-white border-neutral-300 text-neutral-700 hover:border-black hover:bg-neutral-100 hover:text-black'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectQuery(term)}
              className="pl-3 pr-1.5 py-1 cursor-pointer rounded-l-full focus:outline-none"
            >
              {term}
            </button>
            <button
              type="button"
              onClick={() => onRemoveQuery(term)}
              aria-label={`Remove ${term} from search history`}
              className={`pr-2 pl-0.5 py-1 cursor-pointer rounded-r-full focus:outline-none transition-colors ${
                isActive ? 'text-neutral-300 hover:text-white' : 'text-neutral-400 hover:text-black'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={onClearHistory}
        className="text-[11px] font-medium text-neutral-500 hover:text-black px-1.5 py-1 cursor-pointer transition-colors"
      >
        Clear all
      </button>
    </div>
  );
};
