import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const page = response.results[0];

    res.status(200).json({
      propertyKeys: Object.keys(page.properties),
      rawProperties: page.properties
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
