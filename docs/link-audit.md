# Link and source audit

Checked on 15 November 2026 against the MusicTag repository baseline `3bfa4a8` and its visible history.

## Cause of the reported broken links

The project previously used the repository and Pages path **the-listening-room**. Commit `1d828a9` changed README, prototype and gallery navigation to **MusicTag**. GitHub repository redirection does not guarantee equivalent redirection for an old GitHub Pages project path.

HTTP checks confirmed:

| URL | Result |
| --- | --- |
| `https://katherine0292.github.io/the-listening-room/prototype/` | **404** |
| `https://katherine0292.github.io/MusicTag/prototype/` | **200** |

GitHub's Pages API confirms publication from `main` at `/`, with the canonical site `https://katherine0292.github.io/MusicTag/`.

The current baseline README already uses `/MusicTag/` for its three demo links; those links should not be described as currently broken solely because an older revision used the previous name. The redesign still sent readers to three separate pages. This update removes those outgoing buttons from the portfolio and replaces them with live embedded experiences and an in-page screen gallery.

## Changes

- One canonical portfolio link in README.
- Repository documentation, media and source references use relative paths.
- The portfolio recreates the hardware study as native HTML/CSS/JS; it does not embed the older webpages. All artwork and the phone-only recording use relative asset paths.
- Full standalone prototype routes remain available separately; the portfolio has no outgoing prototype buttons.
- Asset filename case is preserved; no reliance on case-insensitive local resolution.
- `.nojekyll` remains present so static assets are served without Jekyll transformation.

## Scope of the check

A local audit validates internal Markdown and HTML asset destinations, inline stylesheet image URLs and the final recorded-media set. External project route checks are recorded in `review/remote-links.json`. Literature DOI links are retained as references to the original catalogue; they are not replaced with guessed sources.

The new cover is a new path rather than a destructive overwrite of historic artwork. Original archive files remain available in both existing export formats.
