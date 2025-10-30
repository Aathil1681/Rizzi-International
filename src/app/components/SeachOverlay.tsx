"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteMap } from "@/lib/siteMap";
import { Search, X, Hash } from "lucide-react";

interface SearchOverlayProps {
  searchOpen: boolean;
  onClose: () => void;
}

// Define the structure for our new flattened search list
interface SearchResultItem {
  keyword: string;
  url: string;
}

export default function SearchOverlay({
  searchOpen,
  onClose,
}: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  // Create a flattened, memoized map of all keywords and their URLs
  const keywordMap = useMemo(() => {
    const map: SearchResultItem[] = [];
    siteMap.forEach((item) => {
      item.keywords.forEach((keyword) => {
        map.push({ keyword: keyword.toLowerCase(), url: item.url });
      });
    });
    return map;
  }, []); // Empty dependency array ensures this runs only once

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]);
      return;
    }

    // Filter the flattened map using startsWith
    const results = keywordMap.filter((item) => item.keyword.startsWith(query));
    setSearchResults(results);
  };

  const handleSearchClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSearchClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Search Modal (Responsive) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            /* RESPONSIVE CHANGES HERE:
              - top-[15vh] (mobile) vs sm:top-[20vh] (desktop)
              - w-[90%] (mobile) vs max-w-lg (desktop)
            */
            className="fixed top-[15vh] sm:top-[20vh] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
          >
            <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/95 shadow-2xl">
              {/* Input and Close Button Wrapper */}
              <div className="flex items-center gap-2 p-4">
                {/* Input */}
                <div className="relative flex-grow">
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Type a command or search..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {/* New Close Button */}
                <button
                  onClick={handleSearchClose}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-gray-100 hover:bg-gray-700 transition-colors"
                  aria-label="Close search"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[40svh] overflow-y-auto px-4 pb-4">
                {searchResults.length === 0 && searchQuery && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Hash className="text-slate-600" size={40} />
                    <p className="mt-2 font-medium text-slate-400">
                      No results found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try searching for something else.
                    </p>
                  </div>
                )}

                <div className="flex flex-col space-y-1">
                  {searchResults.map((item, idx) => {
                    // Create the highlighted keyword
                    const highlightedDisplay = `
                      <mark class='bg-transparent text-indigo-300 font-semibold'>
                        ${item.keyword.substring(0, searchQuery.length)}
                      </mark>
                      <span class='text-slate-100'>
                        ${item.keyword.substring(searchQuery.length)}
                      </span>
                    `;

                    return (
                      <Link
                        key={`${item.url}-${item.keyword}-${idx}`}
                        href={item.url}
                        onClick={handleSearchClose}
                        className="block rounded-lg p-3 transition-colors hover:bg-slate-800"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightedDisplay,
                          }}
                        />
                        <span className="ml-2 text-sm text-slate-400">
                          in {item.url}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
