# SaaS Heaven

SaaS Heaven is a living archive of failed SaaS projects. Our mission is simple:

**Learn from failure, not just success.**

Every post-mortem on this site includes:

* Honest stats (MRR, users, duration)
* The story of what went wrong
* Lessons learned to guide future founders
* Links to the source code so you can explore, fork, or repurpose

---

## Browse Failures

You can browse all failed startups in the [graveyard](https://saasheaven.space/post-mortems) and read detailed post-mortems.

---

## How to Contribute

We welcome new post-mortems! To submit one:

1. Fork this repo
2. Add a folder under `post-mortems/<slug>/`
3. Include a `data.json` following the [schema](./post-mortems/schema.json)
4. Optionally include a `README.md` with extra context or reflections
5. Open a Pull Request using our [PR template](./.github/PULL_REQUEST_TEMPLATE.md)

**Note:** the `slug` must be lowercase, hyphenated, and unique.

---

## API

SaaS Heaven provides a simple read-only API to fetch post-mortems.

**Get all post-mortems**

```
GET /api/post-mortems
```

**Response**

* 200 OK – returns a list of all post-mortems with metadata

**Example**

```json
{
  "updated_at": "2026-01-09T17:30:00.000Z",
  "count": 12,
  "post_mortems": [
    {
      "slug": "failing-startup",
      "name": "Failing Startup",
      "tagline": "A short-lived saas project",
      "snapshot": {
        "peak_mrr": 1200,
        "total_users": 450,
        "raised": 50000
      },
      "lessons": [
        "focused too much on features, not market",
        "launched too early"
      ]
    }
  ]
}
```

**Get a post-mortem by slug**

```
GET /api/post-mortems/[slug]
```

**Response**

* 200 OK – returns the post-mortem data in JSON
* 404 Not Found – if the slug doesn’t exist

**Example**

```json
GET /api/post-mortems/failing-startup

{
  "slug": "failing-startup",
  "name": "Failing Startup",
  "tagline": "A short-lived SaaS project",
  "snapshot": {
    "peak_mrr": 1200,
    "total_users": 450,
    "raised": 50000
  },
  "lessons": [
    "focused too much on features, not market",
    "launched too early"
  ]
}
```

---

## Mission

We believe founders can learn **faster, smarter, and with less wasted time** by studying real-world failures.

By open-sourcing these stories, we hope to give founders **a shortcut to insight** — avoid mistakes, iterate faster, and build with more awareness.

---

## License

SaaS Heaven content is open-source and available under the MIT license. Feel free to fork, explore, and learn.
