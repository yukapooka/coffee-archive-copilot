# v2.0 Photo + Tagging: Schema Draft (not applied)

Draft schema changes for the planned v2.0 photo upload and tagging work, saved for reference during v2 design. They were removed from `prisma/schema.prisma` and `prisma/migrations/` on 2026-10-21 and have **never been applied** to any database.

- `schema.diff`: adds `heroImage`, `suggestedTags`, and `tagsReviewed` to the `Entry` model
- `migration.sql`: the matching migration (originally `20261020072500_add_v2_photo_tagging_fields`)

Open questions before using any of this:

- `Entry` already has a `media Media[]` relation. A hero image may fit better as a flag or reference on `Media` than as a separate `heroImage` string.
- Suggested labels need a review state per label (suggested, accepted, rejected, edited), which a flat `suggestedTags` array plus one `tagsReviewed` flag can't represent.
- Photo storage (Vercel Blob or equivalent) and the vision provider are still undecided.

Regenerate a real migration with `prisma migrate dev` once the design is settled; don't copy `migration.sql` into `prisma/migrations/` as is.
