import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function textValue(value: string | null) {
  return value ?? "";
}

function dateValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

async function updateEntry(id: string, formData: FormData) {
  "use server";

  await prisma.entry.update({
    where: { id },
    data: {
      beanName: (formData.get("beanName") as string) || null,
      drinkLabel: (formData.get("drinkLabel") as string) || null,
      cafeName: (formData.get("cafeName") as string) || null,
      roasterName: (formData.get("roasterName") as string) || null,
      city: (formData.get("city") as string) || null,
      countryWhereDrank:
        (formData.get("countryWhereDrank") as string) || null,
      dateTried: formData.get("dateTried")
        ? new Date(formData.get("dateTried") as string)
        : null,

      originCountry: (formData.get("originCountry") as string) || null,
      originRegion: (formData.get("originRegion") as string) || null,
      producer: (formData.get("producer") as string) || null,
      farm: (formData.get("farm") as string) || null,
      varietal: (formData.get("varietal") as string) || null,
      process: (formData.get("process") as string) || null,
      servedStyle:
        ((formData.get("servedStyle") as string) || null) as
          | "HOT"
          | "ICED"
          | "BOTH"
          | null,

      tastingNotesRaw:
        (formData.get("tastingNotesRaw") as string) || null,

      personalTastingNote:
        (formData.get("personalTastingNote") as string) || null,
      whatLingered: (formData.get("whatLingered") as string) || null,
      roomNote: (formData.get("roomNote") as string) || null,
      memoryNote: (formData.get("memoryNote") as string) || null,

      curationNote: (formData.get("curationNote") as string) || null,

      memoryTrip: formData.get("memoryTrip") === "on",
      turningPoint: formData.get("turningPoint") === "on",
      quietFavorite: formData.get("quietFavorite") === "on",
      wouldRevisit: formData.get("wouldRevisit") === "on",
    },
  });

  redirect(`/entries/${id}`);
}

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const entry = await prisma.entry.findUnique({
    where: { id },
  });

  if (!entry) {
    notFound();
  }

  const updateEntryWithId = updateEntry.bind(null, id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Edit Entry
          </p>
          <h1 className="text-3xl font-semibold text-gray-200">
            {entry.beanName || entry.title || entry.drinkLabel || "Untitled entry"}
          </h1>
        </div>

        <Link
          href={`/entries/${entry.id}`}
          className="rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Cancel
        </Link>
      </div>

      <form action={updateEntryWithId} className="space-y-8">
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Capture
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="beanName"
              defaultValue={textValue(entry.beanName)}
              placeholder="Bean name"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="drinkLabel"
              defaultValue={textValue(entry.drinkLabel)}
              placeholder="Drink label"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="cafeName"
              defaultValue={textValue(entry.cafeName)}
              placeholder="Cafe name"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="roasterName"
              defaultValue={textValue(entry.roasterName)}
              placeholder="Roaster name"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="city"
              defaultValue={textValue(entry.city)}
              placeholder="City"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="countryWhereDrank"
              defaultValue={textValue(entry.countryWhereDrank)}
              placeholder="Country where drank"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="dateTried"
              type="date"
              defaultValue={dateValue(entry.dateTried)}
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="originCountry"
              defaultValue={textValue(entry.originCountry)}
              placeholder="Origin country"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="originRegion"
              defaultValue={textValue(entry.originRegion)}
              placeholder="Origin region"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="varietal"
              defaultValue={textValue(entry.varietal)}
              placeholder="Varietal"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="process"
              defaultValue={textValue(entry.process)}
              placeholder="Process"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <select
              name="servedStyle"
              defaultValue={entry.servedStyle ?? ""}
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            >
              <option value="">Served style</option>
              <option value="HOT">Hot</option>
              <option value="ICED">Iced</option>
              <option value="BOTH">Both</option>
            </select>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Coffee Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="producer"
              defaultValue={textValue(entry.producer)}
              placeholder="Producer"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <input
              name="farm"
              defaultValue={textValue(entry.farm)}
              placeholder="Farm"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />
          </div>

          <textarea
            name="tastingNotesRaw"
            defaultValue={textValue(entry.tastingNotesRaw)}
            placeholder="Roaster notes"
            className="mt-4 min-h-24 w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
          />
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Experience Notes
          </h2>

          <div className="space-y-4">
            <textarea
              name="personalTastingNote"
              defaultValue={textValue(entry.personalTastingNote)}
              placeholder="Personal tasting note"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <textarea
              name="whatLingered"
              defaultValue={textValue(entry.whatLingered)}
              placeholder="What lingered"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <textarea
              name="roomNote"
              defaultValue={textValue(entry.roomNote)}
              placeholder="Room note"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <textarea
              name="memoryNote"
              defaultValue={textValue(entry.memoryNote)}
              placeholder="Memory note"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Interpretation
          </h2>

          <textarea
            name="curationNote"
            defaultValue={textValue(entry.curationNote)}
            placeholder="Curation note / special note"
            className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                name="memoryTrip"
                defaultChecked={entry.memoryTrip}
              />
              <span>Memory Trip</span>
            </label>

            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                name="turningPoint"
                defaultChecked={entry.turningPoint}
              />
              <span>Turning Point</span>
            </label>

            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                name="quietFavorite"
                defaultChecked={entry.quietFavorite}
              />
              <span>Quiet Favorite</span>
            </label>

            <label className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                name="wouldRevisit"
                defaultChecked={entry.wouldRevisit}
              />
              <span>Would Revisit</span>
            </label>
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Save Changes
          </button>

          <Link
            href={`/entries/${entry.id}`}
            className="rounded bg-gray-700 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}