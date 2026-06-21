import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/lib/prisma";

function textValue(value: string | null) {
  return value ?? "";
}

function dateValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function nullableString(value: FormDataEntryValue | null) {
  const stringValue = value?.toString().trim();
  return stringValue ? stringValue : null;
}

function nullableEnum<T extends string>(value: FormDataEntryValue | null) {
  const stringValue = value?.toString().trim();
  return stringValue ? (stringValue as T) : null;
}

function nullableInt(value: FormDataEntryValue | null) {
  const stringValue = value?.toString().trim();

  if (!stringValue) return null;

  const parsed = Number.parseInt(stringValue, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

async function updateEntry(id: string, formData: FormData) {
  "use server";

  const selectedCollectionIds = formData.getAll("collectionIds") as string[];

  await prisma.$transaction(async (tx) => {
    await tx.entry.update({
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
        memoryNote: (formData.get("MemoryNote") as string) || null,
        curationNote: (formData.get("curationNote") as string) || null,
        memoryTrip: formData.get("memoryTrip") === "on",
        turningPoint: formData.get("turningPoint") === "on",
        quietFavorite: formData.get("quietFavorite") === "on",
        wouldRevisit: formData.get("wouldRevisit") === "on",
      },
    });

    await tx.entryInterpretation.upsert({
      where: {
        entryId: id,
      },
      update: {
        occasion: nullableEnum(formData.get("occasion")),
        selectionSource: nullableEnum(formData.get("selectionSource")),
        selectionIntent: nullableEnum(formData.get("selectionIntent")),
        moodBefore: nullableEnum(formData.get("moodBefore")),
        energyBefore: nullableEnum(formData.get("energyBefore")),
        energyAfter: nullableEnum(formData.get("energyAfter")),
        momentFitRating: nullableInt(formData.get("momentFitRating")),
        repeatLikelihood: nullableEnum(formData.get("repeatLikelihood")),
        interpretationNote: nullableString(formData.get("interpretationNote")),
      },
      create: {
        entryId: id,
        occasion: nullableEnum(formData.get("occasion")),
        selectionSource: nullableEnum(formData.get("selectionSource")),
        selectionIntent: nullableEnum(formData.get("selectionIntent")),
        moodBefore: nullableEnum(formData.get("moodBefore")),
        energyBefore: nullableEnum(formData.get("energyBefore")),
        energyAfter: nullableEnum(formData.get("energyAfter")),
        momentFitRating: nullableInt(formData.get("momentFitRating")),
        repeatLikelihood: nullableEnum(formData.get("repeatLikelihood")),
        interpretationNote: nullableString(formData.get("interpretationNote")),
        memoryNote: nullableString(formData.get("interpretationMemoryNote")),
        lingeringNote: nullableString(formData.get("lingeringNote")),
      },
    });

    await tx.entryCollection.deleteMany({
      where: {
        entryId: id,
      },
    });

    if (selectedCollectionIds.length > 0) {
      await tx.entryCollection.createMany({
        data: selectedCollectionIds.map((collectionId) => ({
          entryId: id,
          collectionId,
        })),
        skipDuplicates: true,
      });
    }
  });

  revalidatePath("/");
  revalidatePath(`/entries/${id}`);
  redirect(`/entries/${id}`);
}

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [entry, collections] = await Promise.all([
    prisma.entry.findUnique({
      where: { id },
      include: {
        interpretation: true,
        entryCollections: {
          include: {
            collection: true,
          },
        },
      },
    }),
    prisma.collection.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

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
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Opening notes
              </span>
              <textarea
                name="personalTastingNote"
                defaultValue={textValue(entry.personalTastingNote)}
                placeholder="Opening notes"
                className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
              />
              <span className="mt-1 block text-xs text-gray-500">
                What appeared first?
              </span>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                What lingered
              </span>
              <textarea
                name="whatLingered"
                defaultValue={textValue(entry.whatLingered)}
                placeholder="What lingered"
                className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
              />
              <span className="mt-1 block text-xs text-gray-500">
                What stayed after the sip?
              </span>
            </label>

            <textarea
              name="roomNote"
              defaultValue={textValue(entry.roomNote)}
              placeholder="Room note"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

            <textarea
              name="interpretationMemoryNote"
              defaultValue={textValue(entry.memoryNote)}
              placeholder="Memory note"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Collections
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
                {collections.map((collection) => {
                const isChecked = entry.entryCollections.some(
                    (item) => item.collectionId === collection.id
                );

                return (
                    <label
                    key={collection.id}
                    className="flex items-center gap-2 text-gray-800"
                    >
                    <input
                        type="checkbox"
                        name="collectionIds"
                        value={collection.id}
                        defaultChecked={isChecked}
                        className="h-4 w-4 accent-black"
                    />
                    <span>{collection.name}</span>
                    </label>
                );
                })}
            </div>
        </section>
        

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Interpretation
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                What kind of moment was this?
              </span>
              <select
                name="occasion"
                defaultValue={entry.interpretation?.occasion ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="JOURNALING">Journaling</option>
                <option value="READING">Reading</option>
                <option value="WORK_FOCUS">Work focus</option>
                <option value="CREATIVE_WORK">Creative work</option>
                <option value="SOCIAL_CATCHUP">Social catch-up</option>
                <option value="SOLO_WANDERING">Solo wandering</option>
                <option value="TRAVEL">Travel</option>
                <option value="HOME_BREWING">Home brewing</option>
                <option value="ROUTINE_CUP">Routine cup</option>
                <option value="OTHER">Other</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Who or what led you to this coffee?
              </span>
              <select
                name="selectionSource"
                defaultValue={entry.interpretation?.selectionSource ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="SELF_SELECTED">Self selected</option>
                <option value="BARISTA_RECOMMENDED">Barista recommended</option>
                <option value="FRIEND_RECOMMENDED">Friend recommended</option>
                <option value="CAFE_SIGNATURE">Café signature</option>
                <option value="CAFE_FEATURED">Café featured</option>
                <option value="ROASTER_FEATURE">Roaster feature</option>
                <option value="SOCIAL_MEDIA">Social media</option>
                <option value="MENU_DESCRIPTION">Menu description</option>
                <option value="RETURNING_FAVORITE">Returning favorite</option>
                <option value="RANDOM_CHOICE">Random choice</option>
                <option value="GIFT">Gift</option>
                <option value="OTHER">Other</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                What were you looking for?
              </span>
              <select
                name="selectionIntent"
                defaultValue={entry.interpretation?.selectionIntent ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="CURIOSITY">Curiosity</option>
                <option value="COMFORT">Comfort</option>
                <option value="CLARITY">Clarity</option>
                <option value="ENERGY_RESET">Energy reset</option>
                <option value="TREAT">Treat</option>
                <option value="EXPERIMENT">Experiment</option>
                <option value="MEMORY">Memory</option>
                <option value="SOCIAL_PAIRING">Social pairing</option>
                <option value="ROUTINE">Routine</option>
                <option value="NOVELTY">Novelty</option>
                <option value="OTHER">Other</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                How were you feeling before the cup?
              </span>
              <select
                name="moodBefore"
                defaultValue={entry.interpretation?.moodBefore ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="CURIOUS">Curious</option>
                <option value="FOCUSED">Focused</option>
                <option value="REFLECTIVE">Reflective</option>
                <option value="CALM">Calm</option>
                <option value="TIRED">Tired</option>
                <option value="RESTLESS">Restless</option>
                <option value="COMFORT_SEEKING">Comfort seeking</option>
                <option value="SOCIAL">Social</option>
                <option value="NEUTRAL">Neutral</option>
                <option value="OTHER">Other</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                What was your energy level?
              </span>
              <select
                name="energyBefore"
                defaultValue={entry.interpretation?.energyBefore ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="LOW">Low energy</option>
                <option value="MEDIUM">Medium energy</option>
                <option value="HIGH">High energy</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                What was your energy level after the cup?
              </span>
              <select
                name="energyAfter"
                defaultValue={entry.interpretation?.energyAfter ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="LOW">Low energy</option>
                <option value="MEDIUM">Medium energy</option>
                <option value="HIGH">High energy</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                How well did this coffee fit the moment?
              </span>
              <select
                name="momentFitRating"
                defaultValue={entry.interpretation?.momentFitRating?.toString() ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="1">1 — Did not fit</option>
                <option value="2">2 — Somewhat mismatched</option>
                <option value="3">3 — Fine / neutral</option>
                <option value="4">4 — Fit well</option>
                <option value="5">5 — Perfect for the moment</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Would you return to this coffee?
              </span>
              <select
                name="repeatLikelihood"
                defaultValue={entry.interpretation?.repeatLikelihood ?? ""}
                className="w-full rounded border border-gray-400 p-3 text-gray-900"
              >
                <option value=""></option>
                <option value="YES">Would return</option>
                <option value="MAYBE">Maybe</option>
                <option value="ONLY_IN_SAME_CONTEXT">Only in the same context</option>
                <option value="NO">Would not return</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </label>
          </div>

          <div className="mt-4 space-y-4">
            <textarea
              name="interpretationNote"
              defaultValue={entry.interpretation?.interpretationNote ?? ""}
              placeholder="What might this experience suggest?"
              className="w-full rounded border border-gray-400 p-3 text-gray-900 placeholder:text-gray-600"
            />

          </div>
          
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-medium text-gray-700">
            Entry markers
          </h3>

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
        </div>
        </section>

        <div className="flex gap-3">
          <SubmitButton className="rounded bg-black px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300">
            Save Changes
          </SubmitButton>

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
