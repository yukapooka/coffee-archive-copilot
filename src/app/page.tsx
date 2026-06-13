import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function getDisplayTitle(entry: {
  beanName: string | null;
  title: string | null;
  drinkLabel: string | null;
}) {
  return entry.beanName || entry.title || entry.drinkLabel || "Untitled entry";
}

export default async function HomePage() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Coffee Archive Copilot
          </p>
          <h1 className="text-4xl font-semibold">Archive</h1>
        </div>

        <Link
          href="/entries/new"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          New entry
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="rounded border border-dashed p-10 text-center text-gray-500">
          No entries yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/entries/${entry.id}`}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wide text-gray-500">
                {entry.entryNumber ? `#${entry.entryNumber}` : "Draft"}
              </p>

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
                    <span className="font-medium">Lingered:</span>{" "}
                    {entry.whatLingered}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
