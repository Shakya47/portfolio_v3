import React, { useState } from 'react';
import { ExternalLink, Filter } from 'lucide-react';
import type { Contribution } from '../data/portfolio';

interface ContributionsFilterProps {
  contributions: Contribution[];
}

export default function ContributionsFilter({ contributions = [] }: ContributionsFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  // Extract all unique tags
  const tags = ["ALL", "OSS", "npm", "Project", "Article"];

  const filteredContributions = selectedTag
    ? contributions.filter(c => c.tags.includes(selectedTag))
    : contributions;

  const displayedContributions = filteredContributions.slice(0, visibleCount);

  const toggleTag = (tag: string) => {
    if (tag === "ALL") {
      setSelectedTag(null);
    } else {
      setSelectedTag(selectedTag === tag ? null : tag);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, contributions.length));
  };

  // Helper to color tags in brutalist style
  const getTagStyle = (tag: string) => {
    const isActive = selectedTag === tag || (tag === "ALL" && selectedTag === null);
    if (isActive) {
      return "bg-[#2563EB] text-white border-current";
    }
    return "bg-transparent text-light-border dark:text-dark-border border-current hover:bg-[#2563EB] hover:text-white";
  };

  const getRowTagStyle = (tag: string) => {
    switch (tag.toUpperCase()) {
      case "OSS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-400";
      case "NPM":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-400";
      case "PROJECT":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-400";
      case "ARTICLE":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-400";
      case "TALK":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-400";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 border-zinc-400";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Category Toggles */}
      <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Filter contributions">
        <span className="font-mono text-xs font-black uppercase flex items-center gap-1 mr-2 text-zinc-500">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`brutal-border-sm px-3 py-1 font-mono text-xs font-black uppercase transition-all duration-100 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB] ${getTagStyle(tag)}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Contributions Table */}
      <div className="w-full overflow-x-auto brutal-border bg-white dark:bg-zinc-950 border-current shadow-[4px_4px_0px_0px_currentColor]">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b-3 border-current uppercase font-black bg-zinc-50 dark:bg-zinc-900">
              <th className="p-4 w-28 md:w-36">Date</th>
              <th className="p-4 w-32 md:w-48">Type</th>
              <th className="p-4">Title</th>
              <th className="p-4 w-20 text-center">Link</th>
            </tr>
          </thead>
          <tbody>
            {displayedContributions.length > 0 ? (
              displayedContributions.map((c, index) => (
                <tr
                  key={index}
                  className={`border-b-2 border-current last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors`}
                >
                  <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400">{c.date}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map(t => (
                        <span
                          key={t}
                          className={`brutal-border-sm px-2 py-0.5 text-[9px] font-extrabold uppercase ${getRowTagStyle(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-black tracking-wide text-light-border dark:text-dark-border">{c.title}</td>
                  <td className="p-4 text-center">
                    <a
                      href={c.url}
                      className="inline-flex items-center justify-center w-8 h-8 brutal-border-sm bg-[#2563EB] text-white hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
                      aria-label={`Link to ${c.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center font-bold text-zinc-500">
                  No contributions found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {filteredContributions.length > visibleCount && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleLoadMore}
            className="brutal-border brutal-shadow-sm brutal-btn-hover bg-[#2563EB] text-white px-6 py-3 font-mono text-xs font-black uppercase border-current focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
          >
            Load More Activity
          </button>
        </div>
      )}
    </div>
  );
}
