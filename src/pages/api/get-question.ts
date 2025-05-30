// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  any: string;
};

let cachedData: any | null = null;

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

    res.status(200).json(cachedData.slice(0, 10));
  } catch (err) {
    res.status(500).json({ error: "Failed to load or parse CSV" });
  }
}
