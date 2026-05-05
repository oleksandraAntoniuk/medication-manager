{
  "rewrites": [
    {
      "source": "/ingest/static/:path*",
      "destination": "https://eu.posthog.com/static/:path*"
    },
    {
      "source": "/ingest/decide",
      "destination": "https://eu.posthog.com/decide"
    },
    {
      "source": "/ingest/:path*",
      "destination": "https://eu.posthog.com/:path*"
    }
  ]
}