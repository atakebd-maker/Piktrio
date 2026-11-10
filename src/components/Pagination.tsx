import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = (): (number | string)[] => {
    // If 7 or fewer pages, show all page numbers directly (1, 2, 3, 4, 5, 6, 7)
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // If current page is near the start
    if (currentPage <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    // If current page is near the end
    else if (currentPage >= totalPages - 3) {
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages - 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    }
    // If current page is in the middle
    else {
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-10 pb-6 select-none">
      {/* Numbers row matching clean white & blue theme */}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer shadow-xs"
          >
            &larr; Prev
          </button>
        )}

        {renderPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-sm">
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = currentPage === pageNum;

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next Page"
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer shadow-xs"
          >
            Next &rarr;
          </button>
        )}
      </div>

      {/* Page indicator text */}
      <span className="text-xs font-semibold text-slate-500">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};
