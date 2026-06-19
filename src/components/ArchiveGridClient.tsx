"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type ArchiveEntry = {
  id: string;
  beanName: string | null;
  title: string | null;
  drinkLabel: string | null;
  cafeName: string | null;
  city: string | null;
  dateTried: string | null;
  originCountry: string | null;
  originRegion: string | null;
  varietal: string | null;
  process: string | null;
  servedStyle: string | null;
  tastingNotesRaw: string | null;
  personalTastingNote: string | null;
  whatLingered: string | null;
  entryCollections: Array<{
    id: string;
    collection: {
      name: string;
    };
  }>;
};

type ArchiveGridClientProps = {
  entries: ArchiveEntry[];
  deleteEntries: (entryIds: string[]) => Promise<void>;
};

function getDisplayTitle(entry: ArchiveEntry) {
  return entry.beanName || entry.title || entry.drinkLabel || "Untitled entry";
}

function ArchiveCardContent({
  entry,
  isSelected,
  isSelectMode,
  onToggle,
}: {
  entry: ArchiveEntry;
  isSelected: boolean;
  isSelectMode: boolean;
  onToggle: (entryId: string) => void;
}) {
  return (
    <>
      {isSelectMode && (
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(entry.id)}
            className="h-4 w-4 accent-black"
            aria-label={`Select ${getDisplayTitle(entry)}`}
          />
          <span>{isSelected ? "Selected" : "Select"}</span>
        </div>
      )}

      <h2 className="mt-2 text-xl font-medium text-gray-800">
        {getDisplayTitle(entry)}
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        {[entry.cafeName, entry.city].filter(Boolean).join(" · ")}
      </p>
      {entry.dateTried && (
        <p className="mt-2 text-sm text-gray-500">
          {new Date(entry.dateTried).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      {entry.entryCollections.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {entry.entryCollections.map((item) => (
            <span
              key={item.id}
              className="rounded-full bg-gray-400 px-2 py-1 text-white"
            >
              {item.collection.name}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {entry.originCountry && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            {entry.originCountry}
          </span>
        )}

        {entry.originRegion && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            {entry.originRegion}
          </span>
        )}

        {entry.varietal && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            {entry.varietal}
          </span>
        )}

        {entry.process && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            {entry.process}
          </span>
        )}

        {entry.servedStyle && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            {entry.servedStyle.toLowerCase()}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        {entry.tastingNotesRaw && (
          <p className="line-clamp-2">
            <span className="font-medium">Roaster notes:</span>{" "}
            {entry.tastingNotesRaw}
          </p>
        )}

        {entry.personalTastingNote && (
          <p className="line-clamp-2">
            <span className="font-medium">Note:</span>{" "}
            {entry.personalTastingNote}
          </p>
        )}

        {entry.whatLingered && (
          <p className="line-clamp-2">
            <span className="font-medium">Lingered:</span> {entry.whatLingered}
          </p>
        )}
      </div>
    </>
  );
}

export function ArchiveGridClient({
  entries,
  deleteEntries,
}: ArchiveGridClientProps) {
  const router = useRouter();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const selectedCount = selectedIds.size;

  function toggleEntry(entryId: string) {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }

      return next;
    });
  }

  function cancelSelection() {
    setSelectedIds(new Set());
    setIsSelectMode(false);
  }

  function handleDeleteSelected() {
    if (selectedCount === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedCount} selected archive cards? This cannot be undone.`
    );

    if (!confirmed) return;

    const entryIds = Array.from(selectedIds);

    startTransition(async () => {
      await deleteEntries(entryIds);
      setSelectedIds(new Set());
      setIsSelectMode(false);
      router.refresh();
    });
  }

  if (entries.length === 0) {
    return (
      <div className="rounded border border-dashed p-10 text-center text-gray-500">
        No entries yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {!isSelectMode ? (
          <button
            type="button"
            onClick={() => setIsSelectMode(true)}
            className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            Select
          </button>
        ) : (
          <>
            <p className="text-gray-500">{selectedCount} selected</p>
            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={selectedCount === 0 || isPending}
              className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isPending ? "Deleting..." : "Delete selected"}
            </button>
            <button
              type="button"
              onClick={cancelSelection}
              disabled={isPending}
              className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => {
          const isSelected = selectedIds.has(entry.id);
          const cardClassName = `rounded-xl border bg-white p-5 shadow-sm transition ${
            isSelectMode
              ? isSelected
                ? "border-gray-900"
                : ""
              : "hover:shadow-md"
          }`;

          if (isSelectMode) {
            return (
              <div key={entry.id} className={cardClassName}>
                <ArchiveCardContent
                  entry={entry}
                  isSelected={isSelected}
                  isSelectMode={isSelectMode}
                  onToggle={toggleEntry}
                />
              </div>
            );
          }

          return (
            <Link
              key={entry.id}
              href={`/entries/${entry.id}`}
              className={cardClassName}
            >
              <ArchiveCardContent
                entry={entry}
                isSelected={isSelected}
                isSelectMode={isSelectMode}
                onToggle={toggleEntry}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
