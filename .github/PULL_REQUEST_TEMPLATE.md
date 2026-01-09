# Add a New Post-Mortem

Thank you for contributing! Please follow this checklist to ensure your submission works correctly.

1. Basic Info
- Slug (lowercase, hyphenated, unique):
- Name of the Startup:
- Tagline:

2. Files Included
Your submission should include:
- post-mortems/<slug>/data.json
- post-mortems/<slug>/README.md (optional)

- [ ] data.json matches the JSON schema in schema.json
- [ ] All required fields (slug, name, snapshot, author, death, tech_stack, story, links) are filled
- [ ] Optional README.md included for extra context

3. Notes
- Keep numbers honest but optional (null if unknown)
- Lessons learned should be an ordered list
- “Death reason” should be clear and specific

4. Checklist
- [ ] I’ve validated data.json against schema.json
- [ ] Slug is unique
- [ ] I’ve previewed the story locally (if possible)
