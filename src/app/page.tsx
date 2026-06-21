import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArchiveGridClient } from "@/components/ArchiveGridClient";
import { prisma } from "@/lib/prisma";

async function deleteSelectedEntries(entryIds: string[]) {
  "use server";

  const selectedIds = Array.from(new Set(entryIds.filter(Boolean)));

  if (selectedIds.length === 0) return;

  await prisma.entry.deleteMany({
    where: {
      id: {
        in: selectedIds,
      },
    },
  });

  revalidatePath("/");
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    originCountry?: string;
    process?: string;
    collectionId?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q || "";
  const originCountry = params.originCountry || "";
  const process = params.process || "";
  const collectionId = params.collectionId || "";
  const [collections, entries, totalEntries] = await Promise.all([
    prisma.collection.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.entry.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { beanName: { contains: q, mode: "insensitive" } },
                  { cafeName: { contains: q, mode: "insensitive" } },
                  { roasterName: { contains: q, mode: "insensitive" } },
                  { originCountry: { contains: q, mode: "insensitive" } },
                  { originRegion: { contains: q, mode: "insensitive" } },
                  { varietal: { contains: q, mode: "insensitive" } },
                  { process: { contains: q, mode: "insensitive" } },
                  { tastingNotesRaw: { contains: q, mode: "insensitive" } },
                  {
                    personalTastingNote: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                  { whatLingered: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},
          originCountry
            ? {
                originCountry: {
                  contains: originCountry,
                  mode: "insensitive",
                },
              }
            : {},
          process
            ? {
                process: {
                  contains: process,
                  mode: "insensitive",
                },
              }
            : {},
          collectionId
            ? {
                entryCollections: {
                  some: {
                    collectionId,
                  },
                },
              }
            : {},
        ],
      },
      orderBy: [
        {
          dateTried: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        beanName: true,
        title: true,
        drinkLabel: true,
        cafeName: true,
        city: true,
        dateTried: true,
        originCountry: true,
        originRegion: true,
        varietal: true,
        process: true,
        servedStyle: true,
        tastingNotesRaw: true,
        personalTastingNote: true,
        whatLingered: true,
        entryCollections: {
          select: {
            id: true,
            collection: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.entry.count(),
  ]);
  const archiveEntries = entries.map((entry) => ({
    ...entry,
    dateTried: entry.dateTried?.toISOString() ?? null,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Coffee Archive Copilot
          </p>
          <h1 className="text-4xl font-semibold">Archive</h1>
          <p className="mt-2 text-sm text-gray-500">
            {entries.length === totalEntries
              ? `${totalEntries} archive cards`
              : `Showing ${entries.length} of ${totalEntries} archive cards`}
          </p>
        </div>

        <Link
          href="/entries/new"
          className="rounded bg-white px-4 py-2 text-sm text-black"
        >
          New entry
        </Link>
      </div>


    <form className="mb-8 grid gap-3 rounded-xl border bg-white p-4 shadow-sm sm:grid-cols-5">
      <input
        name="q"
        defaultValue={q}
        placeholder="Search archive"
        className="rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-500 sm:col-span-2"
      />

      <input
        name="originCountry"
        defaultValue={originCountry}
        placeholder="Origin country"
        className="rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-500"
      />

      <input
        name="process"
        defaultValue={process}
        placeholder="Process"
        className="rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-500"
      />

      <select
        name="collectionId"
        defaultValue={collectionId}
        className="rounded border border-gray-400 p-3 text-gray-500"
      >
        <option value="">All collections</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>

      <div className="flex gap-3 sm:col-span-4">
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          Search
        </button>

        <Link
          href="/"
          className="rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Clear
        </Link>
      </div>
    </form>

      <ArchiveGridClient
        entries={archiveEntries}
        deleteEntries={deleteSelectedEntries}
      />
    </main>
  );
}
