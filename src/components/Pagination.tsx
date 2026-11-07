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

  const renderPageNumbers = () => {
    const pages = [];

    // Always show page 1
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-10 pb-6 select-none">
      {/* Numbers row matching dark theme */}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#130d2a] text-gray-200 border border-[#291b50] hover:border-pink-500/50 hover:text-white transition-colors cursor-pointer shadow-xs"
          >
            &larr; Prev
          </button>
        )}

        {renderPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">
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
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30'
                  : 'bg-[#130d2a] text-gray-300 border border-[#291b50] hover:border-purple-500/50 hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#130d2a] text-gray-200 border border-[#291b50] hover:border-pink-500/50 hover:text-white transition-colors cursor-pointer shadow-xs"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
