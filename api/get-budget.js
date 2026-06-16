import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    res.setHeader("Content-Type", "application/json");

    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId || !process.env.NOTION_TOKEN) {
      return res.status(500).json({
        error: "Missing env vars",
        hasToken: !!process.env.NOTION_TOKEN,
        hasDatabaseId: !!databaseId
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return res.status(200).json({
      ok: true,
      count: response.results.length
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const totals = {};

    response.results.forEach(page => {
      const category = page.properties.Category?.select?.name;
      const value = page.properties["Estimated Cost"]?.number || 0;

      if (!category) return;

      totals[category] = (totals[category] || 0) + value;
    });

    res.status(200).json({ totals });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
