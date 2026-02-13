import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "ceps.txt");
const OUT_CSV = path.join(ROOT, "src", "lib", "data", "state-city.csv");
const OUT_TS = path.join(ROOT, "src", "lib", "state-city.map.ts");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeLine(line) {
  return line.replace(/\r$/, "").trim();
}

function parseCsvLine(line) {
  // Expected input format: UF,CIDADE,CEP DE,CEP ATÉ
  // City names in this dataset don't contain commas; split is safe here.
  const [ufRaw, cityRaw] = line.split(",", 3);
  const uf = (ufRaw ?? "").trim();
  const city = (cityRaw ?? "").trim();
  return { uf, city };
}

function sortLocale(a, b) {
  return a.localeCompare(b, "pt-BR", { sensitivity: "base" });
}

const raw = fs.readFileSync(INPUT, "utf8");
const lines = raw.split("\n").map(normalizeLine).filter(Boolean);

const pairs = new Set();
const map = new Map(); // uf -> Set(cities)

for (const line of lines) {
  if (line.startsWith("UF,")) continue; // header
  const { uf, city } = parseCsvLine(line);
  if (!uf || !city) continue;

  const key = `${uf}|${city}`;
  if (!pairs.has(key)) pairs.add(key);

  const set = map.get(uf) ?? new Set();
  set.add(city);
  map.set(uf, set);
}

const ufs = Array.from(map.keys()).sort(sortLocale);

// Write compact CSV: state,city
ensureDir(path.dirname(OUT_CSV));
const csvLines = ["state,city"];
for (const uf of ufs) {
  const cities = Array.from(map.get(uf) ?? []).sort(sortLocale);
  for (const city of cities) {
    csvLines.push(`${uf},${city}`);
  }
}
fs.writeFileSync(OUT_CSV, csvLines.join("\n") + "\n", "utf8");

// Write TS map: Record<string, string[]>
const obj = {};
for (const uf of ufs) {
  obj[uf] = Array.from(map.get(uf) ?? []).sort(sortLocale);
}

ensureDir(path.dirname(OUT_TS));
const ts = `/* eslint-disable */\n` +
  `// Auto-generated from ceps.txt. Do not edit by hand.\n` +
  `export const STATE_CITY_MAP = ${JSON.stringify(obj, null, 2)};\n`;
fs.writeFileSync(OUT_TS, ts, "utf8");

console.log(`Wrote ${OUT_CSV}`);
console.log(`Wrote ${OUT_TS}`);
