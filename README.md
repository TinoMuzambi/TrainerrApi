# Trainerr API

A small, read-only JSON API for the route data used by the [Trainerr Flutter prototype](https://github.com/TinoMuzambi/trainerr).

## API

`GET /api/routes` accepts:

| Parameter | Default | Limit | Meaning |
| --- | ---: | ---: | --- |
| `page` | `1` | `10000` | One-based result page |
| `perPage` | `10` | `100` | Results per page |
| `line` | — | 80 characters | Exact line name filter |

Example:

```bash
curl 'http://localhost:3000/api/routes?page=1&perPage=20&line=Central%20Line'
```

All mutation and scraper endpoints have been removed. The original scraper wrote to a local filesystem from an unauthenticated public endpoint, disabled TLS verification, and depended on a third-party page structure. That is unsafe and unreliable in a serverless deployment. Timetable ingestion should be a separately authenticated, scheduled job with explicit permission from the source operator.

## Development

Copy `.env.example` to `.env.local` and provide a least-privilege MongoDB connection string.

```bash
npm ci
npm run typecheck
npm run build
npm start
```

The API returns a generic `503` response when the data store is unavailable and does not expose connection details to callers.

## Deployment

- Use Node.js 20 or newer.
- Restrict the database credential to read-only access for the routes collection.
- Configure `MONGO_URI` as a server-side secret; it must never use a `NEXT_PUBLIC_` prefix or `next.config.js` `env` block.
- Confirm the route data is current and authorised before presenting it as a live timetable.

The bundled JSON files are historical ingestion snapshots; MongoDB remains the runtime source of truth.
