import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const totals = {};
    const categoriesSet = new Set();

    response.results.forEach(page => {
      const category = page.properties.Category?.select?.name;
      const estimated = page.properties["Estimated Cost"]?.number || 0;

      if (!category) return;

      categoriesSet.add(category);
      totals[category] = (totals[category] || 0) + estimated;
    });

    const categories = Array.from(categoriesSet);

    res.status(200).json({
      totals,
      categories
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
