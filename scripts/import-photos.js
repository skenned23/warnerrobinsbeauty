const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const XLSX_FILE = path.join(__dirname, "../data/Outscraper-photos 20260428151337s0b.xlsx");
const DATA_FILE = path.join(__dirname, "../data/wr-beauty-data.json");

// Read the XLSX
const workbook = XLSX.readFile(XLSX_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

console.log(`Loaded ${rows.length} rows from XLSX`);
console.log("Columns:", Object.keys(rows[0]));

// Build a map of placeId -> first photo URL
const photoMap = {};
for (const row of rows) {
  const placeId = row["query"] || row["place_id"] || row["google_id"];
  const photoUrl = row["photo_url"] || row["photo_url_big"] || row["original_photo_url"];
  
  if (placeId && photoUrl && !photoMap[placeId]) {
    photoMap[placeId] = photoUrl;
  }
}

console.log(`Found ${Object.keys(photoMap).length} unique place IDs with photos`);

// Update the JSON
const raw = fs.readFileSync(DATA_FILE, "utf-8");
const json = JSON.parse(raw);
const categories = json.categories;

let updated = 0;
let notFound = 0;

for (const category of Object.keys(categories)) {
  for (const business of categories[category]) {
    if (!business.placeId) continue;
    const photoUrl = photoMap[business.placeId];
    if (photoUrl) {
      business.photoUrl = photoUrl;
      updated++;
      console.log(`✓ ${business.name}`);
    } else {
      notFound++;
      console.log(`✗ No photo: ${business.name}`);
    }
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2));
console.log(`\nDone. ${updated} updated, ${notFound} not found.`);