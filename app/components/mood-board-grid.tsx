"use client";

import { usePaginatedQuery } from "convex/react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";

export default function MoodBoardGrid() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.moodBoard.list,
    {},
    { initialNumItems: 10 },
  );

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Moods</h2>

      {/* Masonry Layout using CSS Columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {results.map((entry) => (
          <div
            key={entry._id}
            className="break-inside-avoid mb-4 border rounded-lg overflow-hidden group bg-white shadow-sm hover:shadow-md transition-shadow p-2 flex flex-col"
          >
            {/* Show image if exists */}
            {entry.url && (
              <div className="relative aspect-square rounded overflow-hidden bg-gray-50 mb-2">
                <Image
                  src={entry.url}
                  alt="Mood entry"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
            )}

            {/* Show message if exists */}
            {entry.message && (
              <div
                className={`text-sm text-gray-700 break-words ${!entry.url ? "p-4 text-center flex items-center justify-center min-h-[150px] italic bg-gray-50 rounded" : "bg-gray-50 p-2 rounded"}`}
              >
                {entry.message}
              </div>
            )}

            {/* Footer with date */}
            <div className="mt-2 pt-2 border-t text-xs text-gray-400 text-right">
              {new Date(entry.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {status === "CanLoadMore" && (
        <div className="text-center mt-8">
          <button
            onClick={() => loadMore(10)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-colors"
          >
            Load More Moods
          </button>
        </div>
      )}
    </section>
  );
}
