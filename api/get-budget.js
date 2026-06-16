import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const page = response.results[0];

    const properties = page.properties;

    const debug = {};

    for (const key in properties) {
      const prop = properties[key];

      if (prop.type === "select") {
        debug[key] = prop.select;
      }

      if (prop.type === "number") {
        debug[key] = prop.number;
      }

      if (prop.type === "title") {
        debug[key] = prop.title;
      }

      if (prop.type === "multi_select") {
        debug[key] = prop.multi_select;
      }
    }

    res.status(200).json(debug);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
