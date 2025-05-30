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
    const { category, value } = req.query;

    if (
      !category ||
      !value ||
      typeof category !== "string" ||
      typeof value !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid category or value" });
    }

    if (!cachedData) {
      const filePath = path.join(process.cwd(), "data", "JEOPARDY.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      cachedData = JSON.parse(fileContent);
    }

    const questions = cachedData[category]?.[value];

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ error: "No questions found for this category and value" });
    }

    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    return res.status(200).json(randomQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to load or parse CSV" });
  }
}
