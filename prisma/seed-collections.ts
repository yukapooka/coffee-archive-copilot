import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const collections = [
  {
    name: "Coffee Before Art",
    description: "Cups connected to museum visits, galleries, architecture, or art-looking rituals.",
  },
  {
    name: "Processing × Mood",
    description: "Entries exploring how processing methods shape mood, occasion, and choice.",
  },
  {
    name: "Rainy Afternoon Coffees",
    description: "Coffees associated with rainy weather, darker moods, or slower afternoons.",
  },
  {
    name: "Tokyo Cups",
    description: "Coffee entries from Tokyo.",
  },
  {
    name: "Hong Kong Cups",
    description: "Coffee entries from Hong Kong.",
  },
];

async function main() {
  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { name: collection.name },
      update: {
        description: collection.description,
      },
      create: collection,
    });
  }

  console.log(`Seeded ${collections.length} collections`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });