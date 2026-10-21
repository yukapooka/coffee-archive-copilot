-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "heroImage" TEXT,
ADD COLUMN     "suggestedTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tagsReviewed" BOOLEAN NOT NULL DEFAULT false;
