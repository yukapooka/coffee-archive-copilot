import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const entries = [
  {
    "beanName": "Anaya Spring",
    "roasterName": "Kyuhei Coffee",
    "originRegion": "Huila",
    "originCountry": "Colombia",
    "varietal": "Ombligon",
    "process": "48 hr double anaerobic washed",
    "tastingNotesRaw": "Pink guava, macerated strawberries, honey",
    "personalTastingNote": "Bright fruit / honeyed finish",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Colombia Las Flores Ombligon",
    "roasterName": "Pinhole Coffee",
    "originRegion": "Pitalito, Huila",
    "originCountry": "Colombia",
    "varietal": "Ombligon",
    "process": "Thermoshock natural",
    "tastingNotesRaw": "Nerds candy, watermelon, berry candy, silky",
    "personalTastingNote": "Candy fruit / playful process",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Castillo — Honey + Blackberry",
    "roasterName": "Asylum Coffee",
    "originRegion": "Quindio",
    "originCountry": "Colombia",
    "varietal": "Castillo",
    "process": "72 hr dry anaerobic fermentation with blackberries",
    "tastingNotesRaw": "Honey, blackberry, blackberry jam, dark chocolate, caramel, mandarin",
    "personalTastingNote": "Dark fruit / processed sweetness",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Geisha Juice Bomb",
    "roasterName": "Drip n Drool",
    "originRegion": "Uraga & Yirgacheffe",
    "originCountry": "Ethiopia",
    "varietal": "Geisha blend",
    "process": "Natural & washed",
    "tastingNotesRaw": "Juicy berries, orange, black tea, candied",
    "personalTastingNote": "Floral fruit / tea finish",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Ethiopia Amederaro Konga",
    "roasterName": "Flip Coffee Roasters",
    "originRegion": "Yirgacheffe",
    "originCountry": "Ethiopia",
    "varietal": "Local landrace & JARC 74 selections",
    "process": "Natural anaerobic",
    "tastingNotesRaw": "Strawberry yoghurt, mandarin, cherry liqueur",
    "personalTastingNote": "Creamy fruit / fermented sweetness",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Haru Kochi Blend",
    "roasterName": "Kurasu",
    "originRegion": null,
    "originCountry": "Rwanda, Indonesia",
    "varietal": "Blend",
    "process": "Washed / lactic natural",
    "tastingNotesRaw": "Floral aroma, fermented grape, blood orange, mint, caramel-like sweetness, accompanying aftertaste",
    "personalTastingNote": "Floral ferment / layered finish",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Finca El Diviso Red Bourbon",
    "roasterName": "Dutch Colony",
    "originRegion": null,
    "originCountry": "Colombia",
    "varietal": "Red Bourbon",
    "process": "Unknown",
    "tastingNotesRaw": "Blackberry, watermelon, strawberry",
    "personalTastingNote": "Red fruit / juicy fruit",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Castillo — Honey + Wine Yeast & Strawberry",
    "roasterName": "Asylum Coffee",
    "originRegion": "Quindio",
    "originCountry": "Colombia",
    "varietal": "Castillo",
    "process": "72 hr dry anaerobic fermentation with strawberries",
    "tastingNotesRaw": "Honey, wine yeast, strawberry, ripe strawberries, mandarin, vanilla",
    "personalTastingNote": "Strawberry ferment / dessert sweetness",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Red Bourbon Washed",
    "roasterName": "Asylum Coffee",
    "originRegion": "El Salvador, Apaneca, Ilamatepec",
    "originCountry": "El Salvador",
    "varietal": "Red Bourbon",
    "process": "Washed",
    "tastingNotesRaw": "Candied orange peel, vanilla, peach",
    "personalTastingNote": "Washed sweetness / citrus cream",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Colombia Granja Paraiso 92",
    "roasterName": "Zerah Coffee Roasters",
    "originRegion": "Cauca",
    "originCountry": "Colombia",
    "varietal": "Caturra",
    "process": "Yeast thermo-shocked washed",
    "tastingNotesRaw": "Strawberry, rose, pink floral",
    "personalTastingNote": "Floral fruit / rose",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Colombia Quebraditas Estate",
    "roasterName": "A.M.O.C.",
    "originRegion": "Huila",
    "originCountry": "Colombia",
    "varietal": "Ombligon",
    "process": "Washed yeast thermal shock",
    "tastingNotesRaw": "Rose, mineola fruit, silky, smooth",
    "personalTastingNote": "Floral citrus / silky washed",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Pink Bourbon",
    "roasterName": "Asylum Coffee",
    "originRegion": "Quindio",
    "originCountry": "Colombia",
    "varietal": "Pink Bourbon",
    "process": "Natural anaerobic",
    "tastingNotesRaw": "Floral, plum, raisins, cacao powder, blackberries, mandarin",
    "personalTastingNote": "Dark fruit / cacao / natural",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "China Yunnan Meng Hai",
    "roasterName": "Apartment",
    "originRegion": "Yunnan",
    "originCountry": "China",
    "varietal": "Unknown",
    "process": "Unknown",
    "tastingNotesRaw": "Dried tangerine peel, red apple, pandan",
    "personalTastingNote": "Spiced fruit / herbal-sweet",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Hacienda Barbara — Las Brujas",
    "roasterName": "Kyuhei Coffee",
    "originRegion": "Boquete",
    "originCountry": "Panama",
    "varietal": "Pacamara",
    "process": "Washed",
    "tastingNotesRaw": "Chocolate truffle, dark plum, cherry",
    "personalTastingNote": "Chocolate fruit / classic washed",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Worka Chelchele",
    "roasterName": "Kyuhei Coffee",
    "originRegion": "Gedeb",
    "originCountry": "Ethiopia",
    "varietal": "Dega, Wolisho, Kurume, 74110",
    "process": "Washed",
    "tastingNotesRaw": "Lemon, peach, bergamot, apricot",
    "personalTastingNote": "Citrus floral / washed Ethiopia",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Java",
    "roasterName": "Asylum Coffee",
    "originRegion": "Quindio",
    "originCountry": "Colombia",
    "varietal": "Java",
    "process": "Natural EF2",
    "tastingNotesRaw": "Floral, vanilla, blackberries, lime, brown sugar",
    "personalTastingNote": "Floral berry / brown sugar",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Zou Zhou Yuan, Taiwan",
    "roasterName": "Corner Corner",
    "originRegion": "Alishan, Chiayi",
    "originCountry": null,
    "varietal": "Typica",
    "process": "Honey",
    "tastingNotesRaw": "Pear, rose apple, white tea",
    "personalTastingNote": "White tea / delicate orchard",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Bona Zuria",
    "roasterName": "Kyuhei Coffee",
    "originRegion": "Sidama",
    "originCountry": "Ethiopia",
    "varietal": "74158",
    "process": "Natural",
    "tastingNotesRaw": "Stewed peach, blackcurrant, black tea, violets, red apple",
    "personalTastingNote": "Dark tea fruit / violet",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Costa Rica Don Eli “Yabai”",
    "roasterName": "Double Up Coffee",
    "originRegion": "Tarrazu",
    "originCountry": "Costa Rica",
    "varietal": "Catuai",
    "process": "Yabai / double natural anaerobic",
    "tastingNotesRaw": "Muscat grape, golden pear, chardonnay",
    "personalTastingNote": "Grape / winey pear",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Raro Anaerobic",
    "roasterName": "Community Coffee",
    "originRegion": "Guji",
    "originCountry": "Ethiopia",
    "varietal": "Wolisho, Dega",
    "process": "Anaerobic natural",
    "tastingNotesRaw": "Syrupy, smooth, full, blackcurrants, fruit punch, dried mangoes, lychees",
    "personalTastingNote": "Syrupy tropical / anaerobic fruit",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Bomba de Fruta",
    "roasterName": "Community Coffee",
    "originRegion": "Huila",
    "originCountry": "Colombia",
    "varietal": "Caturra",
    "process": "Natural",
    "tastingNotesRaw": "Floral acidity, candy sweetness, story",
    "personalTastingNote": "Candy fruit / Colombia natural",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Lerida Estate Typica",
    "roasterName": "Abseil",
    "originRegion": null,
    "originCountry": "Panama",
    "varietal": "Typica",
    "process": "Washed",
    "tastingNotesRaw": "Gardenia, poached apple, apricot, white tea, raw sugar",
    "personalTastingNote": "White tea / orchard fruit",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "La Abejilla",
    "roasterName": "Abseil",
    "originRegion": null,
    "originCountry": "Costa Rica",
    "varietal": "Venecia",
    "process": "Natural",
    "tastingNotesRaw": "Yellow cherry, raisin, grapefruit, kombucha, marzipan",
    "personalTastingNote": "Funky citrus / marzipan",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "El Puente",
    "roasterName": "Abseil",
    "originRegion": null,
    "originCountry": "Honduras",
    "varietal": "Catuai",
    "process": "Extended natural",
    "tastingNotesRaw": "Mirabelle plum, pomelo, fig, Darjeeling, milk chocolate",
    "personalTastingNote": "Stone fruit / tea chocolate",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Potosi XO",
    "roasterName": "Narrative Coffee Stand",
    "originRegion": null,
    "originCountry": "Colombia",
    "varietal": "San Juan",
    "process": "Natural XO",
    "tastingNotesRaw": "Pineapple, champagne grape, hops",
    "personalTastingNote": "Tropical wine / sparkling",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Don Eli El Naranjo",
    "roasterName": "Narrative Coffee Stand",
    "originRegion": null,
    "originCountry": "Costa Rica",
    "varietal": "Catuai",
    "process": "Natural",
    "tastingNotesRaw": "Apple, dried apricot, Darjeeling tea",
    "personalTastingNote": "Orchard tea / natural",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Anasora",
    "roasterName": "Abseil",
    "originRegion": null,
    "originCountry": "Ethiopia",
    "varietal": "Heirloom",
    "process": "A.N. slow dry",
    "tastingNotesRaw": "Grape, bubblegum, blackberry, red wine, cacao",
    "personalTastingNote": "Winey fruit / cacao",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "Nitro Caturra",
    "roasterName": "Kei Coffee",
    "originRegion": null,
    "originCountry": "Colombia",
    "varietal": "Caturra",
    "process": "Nitro",
    "tastingNotesRaw": "Honeydew melon, watermelon, peach, juicy",
    "personalTastingNote": "Melon fruit / juicy orchard",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  },
  {
    "beanName": "El Paraiso Double Anaerobic Flor Lichi",
    "roasterName": "Kei Coffee",
    "originRegion": null,
    "originCountry": "Colombia",
    "varietal": "Colombia",
    "process": "Double anaerobic",
    "tastingNotesRaw": "Lychee, honey peach, strawberry, Calpis",
    "personalTastingNote": "Lychee floral / lactic fruit",
    "sourceType": "OLD_BEAN_CARD",
    "confidence": "MEDIUM"
  }
] as const;

async function main() {
  let imported = 0;
  let skipped = 0;

  for (const entry of entries) {
    const existing = await prisma.entry.findFirst({
      where: {
        beanName: entry.beanName,
        roasterName: entry.roasterName,
      },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.entry.create({
      data: entry,
    });

    imported++;
  }

  console.log(`Imported ${imported} entries`);
  console.log(`Skipped ${skipped} existing entries`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
