const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyDs6sAxA8xhfITXSnMDxdVev1O-Ws7UJnI";
const DATA_FILE = path.join(__dirname, "../data/wr-beauty-data.json");

async function fetchPhotoReference(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.result?.photos?.length > 0) {
    return data.result.photos[0].photo_reference;
  }
  return null;
}

async function main() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const json = JSON.parse(raw);
  const categories = json.categories;

  let total = 0;
  let updated = 0;

  for (const category of Object.keys(categories)) {
    for (const business of categories[category]) {
      total++;
      if (!business.placeId) continue;
      if (business.photoReference) {
        console.log(`SKIP (already has photo): ${business.name}`);
        continue;
      }
      try {
        const ref = await fetchPhotoReference(business.placeId);
        if (ref) {
          business.photoReference = ref;
          updated++;
          console.log(`✓ ${business.name}`);
        } else {
          console.log(`✗ No photo: ${business.name}`);
        }
      } catch (err) {
        console.log(`ERROR: ${business.name} — ${err.message}`);
      }
      // small delay to avoid hammering the API
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2));
  console.log(`\nDone. ${updated}/${total} businesses updated with photos.`);
}

main();