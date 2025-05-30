const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

const allowedValues = ["$100", "$200", "$300", "$400", "$500"];

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

// Step 3: Filter and transform
const filtered = records
  .filter(
    (row) => row.Round === "Jeopardy!" && allowedValues.includes(row.Value)
  )
  .map((row) => ({
    Category: row.Category,
    Value: row.Value,
    Question: row.Question,
    Answer: row.Answer,
  }));

// Step 4: Group by category
const groupedByCategory = {};
for (const item of filtered) {
  if (!groupedByCategory[item.Category]) {
    groupedByCategory[item.Category] = [];
  }
  groupedByCategory[item.Category].push(item);
}

// Step 5: Keep only categories that have all 5 values
const validCategories = Object.entries(groupedByCategory).filter(
  ([_, questions]) => {
    const valuesSet = new Set(questions.map((q) => q.Value));
    return allowedValues.every((val) => valuesSet.has(val));
  }
);

let flatted = {};
validCategories.forEach((category) => {
  flatted[category[0]] = {};
  for (const item of category[1]) {
    if (!flatted[category[0]][item.Value]) {
      flatted[category[0]][item.Value] = [];
    }
    flatted[category[0]][item.Value].push(item);
  }
});

// Step 5: Write to JSON
fs.writeFileSync(outputPath, JSON.stringify(flatted, null, 2), "utf-8");
