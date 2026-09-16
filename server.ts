import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const GOOGLE_PHOTOS_ALBUM_URL = "https://photos.app.goo.gl/UAG3ZDqGFsv14JZG9";

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  baseUrl: string;
  thumbnailUrl: string;
  previewUrl: string;
  fullUrl: string;
  width: number;
  height: number;
  timestamp: number;
  aspectRatio: number;
  isPortrait: boolean;
}

const CATEGORIES = [
  "wedding",
  "birthday",
  "celebration",
  "novelty",
  "chocolate",
  "floral",
  "cupcakes",
  "bento"
];

const TITLES = [
  "Golden Blossom Floral Celebration Cake",
  "Bespoke Multi-Tier Wedding Masterpiece",
  "Artisanal Rustic Semi-Naked Berry Cake",
  "Velvet Rose & Macaron Deluxe Tier",
  "Whimsical Pastel Rainbow Birthday Tier",
  "Decadent Belgian Chocolate Ganache Drip",
  "Vintage Lambeth Ruffled Buttercream Cake",
  "Enchanted Woodland Themed Sculpture Cake",
  "Artisan Hand-Piped Floral Bouquet Cake",
  "Signature Gourmet Cupcake Collection",
  "Luxury Gold-Leaf & Marble Buttercream",
  "Tropical Passionfruit & Coconut Creation",
  "Safari Adventure Themed Celebration Cake",
  "Minimalist Bento Cake with Custom Lettering",
  "Elegance in Ivory Tiered Wedding Cake",
  "Cookies & Cream Indulgence Drip Cake",
  "Princess Crown & Pearl Birthday Cake",
  "Artisan Strawberry Shortcake Tower",
  "Midnight Galaxy Watercolor Buttercream",
  "Botanical Eucalyptus & Peony Tier",
  "Dinosaur Roar Kids Fantasy Cake",
  "Salted Caramel & Hazelnut Crunch Cake",
  "Champagne & Blush Anniversary Tier",
  "Lemon Curd & Meringue Silk Cake",
  "Boho Chic Pampas & Dried Palm Cake",
  "Carnival Fairground Celebration Cake",
  "Ruby Red Velvet with White Chocolate Pearls",
  "Celestial Starry Night Birthday Cake",
  "Lavender & Wild Honey Botanical Cake",
  "Superhero Action Themed Novelty Cake",
  "Pastel Macaron Cascade Drip Cake",
  "Classic Royal English Fruit & Fondant Tier",
  "Nutella Chocoholic Supreme Cake",
  "Under the Sea Mermaid Fantasy Cake",
  "Emerald Green & Gold Geode Cake",
  "Mini Signature Assorted Confection Boxes",
  "Sunset Ombre Textured Buttercream Cake"
];

// In-memory cache
let cachedPhotos: PhotoItem[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache TTL

async function fetchGooglePhotosAlbum(force = false): Promise<PhotoItem[]> {
  const now = Date.now();
  if (!force && cachedPhotos.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPhotos;
  }

  try {
    const response = await fetch(GOOGLE_PHOTOS_ALBUM_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      console.warn("Failed to fetch album page:", response.status);
      return cachedPhotos;
    }

    const html = await response.text();

    // Strategy 1: Look for AF_initDataCallback with ds:1 data array
    const callbackMatch = html.match(
      /AF_initDataCallback\({key:\s*['"]ds:1['"],.*?data:(.*?), sideChannel:/s
    );

    let parsedItems: any[] = [];
    if (callbackMatch && callbackMatch[1]) {
      try {
        const rawData = JSON.parse(callbackMatch[1]);
        if (Array.isArray(rawData) && Array.isArray(rawData[1])) {
          parsedItems = rawData[1];
        }
      } catch (err) {
        console.warn("Error parsing callback JSON:", err);
      }
    }

    let extracted: PhotoItem[] = [];

    if (parsedItems.length > 0) {
      extracted = parsedItems
        .map((item, index) => {
          const id = item[0] || `photo-${index}`;
          const baseUrl = item[1]?.[0];
          const width = Number(item[1]?.[1]) || 1200;
          const height = Number(item[1]?.[2]) || 1600;
          const timestamp = Number(item[2]) || Date.now() - index * 86400000;

          if (!baseUrl || typeof baseUrl !== "string" || !baseUrl.startsWith("http")) {
            return null;
          }

          // Clean base URL by removing any trailing query or parameters
          const cleanBase = baseUrl.split("=")[0];
          const category = CATEGORIES[index % CATEGORIES.length];
          const title = TITLES[index % TITLES.length] || `Artisanal Cake Design #${index + 1}`;

          return {
            id,
            title,
            category,
            baseUrl: cleanBase,
            thumbnailUrl: `${cleanBase}=w600-h600-c`,
            previewUrl: `${cleanBase}=w1000`,
            fullUrl: `${cleanBase}=w1800`,
            width,
            height,
            timestamp,
            aspectRatio: width / height,
            isPortrait: height > width,
          };
        })
        .filter((item): item is PhotoItem => item !== null);
    }

    // Strategy 2: Fallback regex if data callback format changed
    if (extracted.length === 0) {
      const urlRegex = /https:\/\/lh3\.googleusercontent\.com\/pw\/([a-zA-Z0-9_-]+)/g;
      const uniqueUrls = new Set<string>();
      let match: RegExpExecArray | null;

      while ((match = urlRegex.exec(html)) !== null) {
        uniqueUrls.add(match[0]);
      }

      const list = Array.from(uniqueUrls);
      extracted = list.map((cleanBase, index) => {
        const category = CATEGORIES[index % CATEGORIES.length];
        const title = TITLES[index % TITLES.length] || `Artisanal Cake Design #${index + 1}`;
        return {
          id: `photo-re-${index}`,
          title,
          category,
          baseUrl: cleanBase,
          thumbnailUrl: `${cleanBase}=w600-h600-c`,
          previewUrl: `${cleanBase}=w1000`,
          fullUrl: `${cleanBase}=w1800`,
          width: 1200,
          height: 1600,
          timestamp: Date.now() - index * 86400000,
          aspectRatio: 0.75,
          isPortrait: true,
        };
      });
    }

    if (extracted.length > 0) {
      cachedPhotos = extracted;
      lastFetchTime = now;
      console.log(`Successfully synced ${extracted.length} photos from Google Photos album.`);
    }

    return cachedPhotos;
  } catch (error) {
    console.error("Error fetching Google Photos album:", error);
    return cachedPhotos;
  }
}

// Preload photos on startup
fetchGooglePhotosAlbum().catch(() => {});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/photos", async (req, res) => {
  const force = req.query.refresh === "true";
  const photos = await fetchGooglePhotosAlbum(force);
  res.json({
    success: true,
    albumUrl: GOOGLE_PHOTOS_ALBUM_URL,
    total: photos.length,
    lastUpdated: new Date(lastFetchTime).toISOString(),
    photos,
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
