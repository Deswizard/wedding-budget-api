# Wedding Budget API

Backend for Wedding Budget Chart (Arken Templates)

## Purpose
Fetches and aggregates estimated costs from a Notion database by category.

## Environment Variables

- NOTION_TOKEN
- NOTION_DATABASE_ID

## Endpoint

GET /api/get-budget

Returns:
{
  "totals": {
    "Catering": 12000,
    "Photography": 3000
  }
}

## Frontend
Used by GitHub Pages budget dashboard.
