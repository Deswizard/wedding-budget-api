import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      return res.status(500).json({
        error: "Missing NOTION_DATABASE_ID"
      });
    }

    if (!process.env.NOTION_TOKEN) {
      return res.status(500).json({
        error: "Missing NOTION_TOKEN"
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return res.status(200).json({
      count: response.results?.length || 0
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message || "Unknown error"
    });
  }
}
