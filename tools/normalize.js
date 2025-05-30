const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

// Input/output file paths
const inputPath = path.join(__dirname, "data", "JEOPARDY.csv");
const outputPath = path.join(__dirname, "data", "JEOPARDY_clean.json");

// Step 1: Read the CSV
const fileContent = fs.readFileSync(inputPath, "utf-8");

// Step 2: Parse CSV
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

console.log(records[0]);

// Step 3: Filter and transform
const filtered = records
  .filter((row) => row.Round === "Jeopardy!")
  .map((row) => ({
    Category: row.Category,
    Value: row.Value,
    Question: row.Question,
    Answer: row.Answer,
  }));

// Step 4: Write to JSON
fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2), "utf-8");
