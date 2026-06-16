export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const map = {};

    response.results.forEach(page => {
      const category =
        page.properties?.Category?.select?.name || "Uncategorized";

      const value =
        page.properties?.["Estimated Cost"]?.number || 0;

      if (!map[category]) map[category] = 0;
      map[category] += value;
    });

    const chartData = Object.entries(map).map(([category, value]) => ({
      category,
      value
    }));

    res.status(200).json({
      chartData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}export default async function handler(req, res) {
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
