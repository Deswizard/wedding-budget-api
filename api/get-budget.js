export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    res.status(200).json({
      sample: response.results[0]?.properties
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN
    });

    if (!process.env.NOTION_DATABASE_ID) {
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
      database_id: process.env.NOTION_DATABASE_ID,
    });

    res.status(200).json({
      count: response.results.length,
      firstPageKeys: Object.keys(response.results[0]?.properties || {})
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
