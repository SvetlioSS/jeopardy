// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  any: string;
};

let cachedData: any | null = null;

function getRandomKeys(obj: any, count = 6) {
  const keys = Object.keys(obj);

  // Shuffle the keys array (Fisher-Yates shuffle)
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  // Return first `count` keys (or fewer if not enough keys)
  return keys.slice(0, count);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!cachedData) {
      const filePath = path.join(process.cwd(), "data", "JEOPARDY.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      cachedData = JSON.parse(fileContent);
    }

    res.status(200).json(getRandomKeys(cachedData));
  } catch (err) {
    res.status(500).json({ error: "Failed to load or parse CSV" });
  }
}
