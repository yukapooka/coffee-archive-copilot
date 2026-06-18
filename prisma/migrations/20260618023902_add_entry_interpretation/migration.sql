-- CreateEnum
CREATE TYPE "Occasion" AS ENUM ('JOURNALING', 'READING', 'WORK_FOCUS', 'CREATIVE_WORK', 'SOCIAL_CATCHUP', 'SOLO_WANDERING', 'TRAVEL', 'MEMORY_VISIT', 'HOME_BREWING', 'ROUTINE_CUP', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "SelectionIntent" AS ENUM ('CURIOSITY', 'COMFORT', 'CLARITY', 'ENERGY_RESET', 'TREAT', 'EXPERIMENT', 'MEMORY', 'SOCIAL_PAIRING', 'ROUTINE', 'NOVELTY', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "MoodState" AS ENUM ('CURIOUS', 'FOCUSED', 'REFLECTIVE', 'CALM', 'TIRED', 'RESTLESS', 'COMFORT_SEEKING', 'SOCIAL', 'NEUTRAL', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "RepeatLikelihood" AS ENUM ('YES', 'MAYBE', 'ONLY_IN_SAME_CONTEXT', 'NO', 'UNKNOWN');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SelectionSource" ADD VALUE 'CAFE_SIGNATURE';
ALTER TYPE "SelectionSource" ADD VALUE 'ROASTER_FEATURE';
ALTER TYPE "SelectionSource" ADD VALUE 'SOCIAL_MEDIA';
ALTER TYPE "SelectionSource" ADD VALUE 'MENU_DESCRIPTION';
ALTER TYPE "SelectionSource" ADD VALUE 'RETURNING_FAVORITE';
ALTER TYPE "SelectionSource" ADD VALUE 'RANDOM_CHOICE';
ALTER TYPE "SelectionSource" ADD VALUE 'GIFT';
ALTER TYPE "SelectionSource" ADD VALUE 'OTHER';

-- CreateTable
CREATE TABLE "EntryInterpretation" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "occasion" "Occasion",
    "selectionSource" "SelectionSource",
    "selectionIntent" "SelectionIntent",
    "moodBefore" "MoodState",
    "energyBefore" "EnergyLevel",
    "momentFitRating" INTEGER,
    "repeatLikelihood" "RepeatLikelihood",
    "interpretationNote" TEXT,
    "memoryNote" TEXT,
    "lingeringNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntryInterpretation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntryInterpretation_entryId_key" ON "EntryInterpretation"("entryId");

-- AddForeignKey
ALTER TABLE "EntryInterpretation" ADD CONSTRAINT "EntryInterpretation_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
