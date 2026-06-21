import { access, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = [
  "public/images/hero_image.jpg",
  "public/images/A-Rose_PicWebsite_Fiorica.jpg",
  "public/images/Arose_PicWebsite_Bambina.jpg",
  "public/images/evento-serale.jpg",
  "public/images/prevenzione-dialogo.jpg",
  "public/images/sostegno-cuore.jpg",
  "public/images/ricerca-dettaglio.jpg",
  "public/images/A-ROSE_group.jpg",
  "public/images/Arose_PicWebsiteT-ShirtA-Rose_Giorgi.jpg",
  "public/images/Arose_PicWebsiteT-ShirtA-Rose_Pinton.jpg",
  "public/images/Arose_PicWebsiteT-ShirtA-Rose_Fiorica.jpg",
  "public/images/Arose_PicWebsiteT-ShirtA-Rose_Anania.jpg",
];

let originalBytes = 0;
let optimizedBytes = 0;

for (const relativeInput of assets) {
  const input = path.resolve(relativeInput);
  try {
    await access(input);
  } catch {
    console.warn(`Asset non trovato: ${relativeInput}`);
    continue;
  }

  const output = input.replace(/\.(?:jpe?g|png)$/i, ".webp");
  await sharp(input)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5, smartSubsample: true })
    .toFile(output);

  originalBytes += (await stat(input)).size;
  optimizedBytes += (await stat(output)).size;
}

const saved = originalBytes ? Math.round((1 - optimizedBytes / originalBytes) * 100) : 0;
console.log(`Immagini ottimizzate: ${assets.length}. Riduzione complessiva: ${saved}%.`);
