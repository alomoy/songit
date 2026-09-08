# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

আলোময় সঙ্গীত (Alomoy Songit) — a static site for streaming Bengali Islamic/devotional
songs, organized by album. No backend, no build system, no package manager: plain
HTML/CSS/JS served as static files, with Python scripts that *generate* HTML from a
single CSV source of truth. Audio files are hosted externally (Dropbox/Drive links in
the CSV), not stored in this repo.

## Data flow (the core architecture)

`radio/songs.csv` is the single source of truth for every song: columns are
`Song, album, singer, group, writer, album_art, tune, src, genre, subgenre, language,
tags, album_en`. `album_en` is the slug used everywhere to key an album to its
generated files.

**`python3 build_pages.py` is the single generator script for the whole site — run it
whenever songs.csv changes.** It does two things, in order:

1. Syncs `players/<album_en>.html` + `players/<album_en>.js` (one dedicated player
   page per album) from the CSV. A new `album_en` gets a page created once
   (title/description/static SEO track listing generated at creation time only); an
   existing page has its track_list, "now playing" text, and static SEO block
   refreshed from the CSV on every later run — it matches tracks to existing images
   by (name, artist) so manual art picks survive. A page whose `album_en` no longer
   has any CSV rows is deleted (the CSV is the sole source of truth for which albums
   have pages; a manual/hybrid album is made by adding rows with a new `album_en`,
   not by hand-authoring a page).
2. (Re)generates the four main pages from one shared `NAV_ITEMS`/`LOGO_PATH` config,
   so their nav links and logo can't drift out of sync with each other the way they
   used to when each page had its own copy-pasted template:
   - `index.html` — album slider cards, read from the just-synced `players/*.html`
     titles + track counts (not the CSV directly).
   - `albums.html` / `singers.html` — cards/list baked from the CSV directly at
     build time for SEO/crawlability; any client-side JS left on these pages is
     just a live search filter over the already-rendered elements, not a builder.
   - `all-songs.html` — only its shared chrome (nav, logo, head/CSS/player-bar
     markup) is templated here; the song list itself still loads and filters
     client-side from `radio/songs.csv` at runtime (a `?query=` URL param, e.g.
     from a singer card's "সব" link, prefills and runs that search on load).

Player pages are NOT hand-authored beyond first creation — edit `radio/songs.csv` (or,
for one-off page-specific tweaks like Drive links, edit the generated
`players/<slug>.html`/`.js` directly) and re-run `build_pages.py` rather than
duplicating logic by hand. `players/template.html` / `players/template.js` are the
templates the player-page generator in `build_pages.py` is based on — do not wire
them into the site directly.

## Site structure

- `index.html`, `albums.html`, `singers.html`, `all-songs.html` — the four
  main/current pages (per `how-txt`; `search.html` was removed since all-songs.html
  already covers song-level search, and other legacy root HTML files are candidates
  for deletion, not part of the active flow).
- `players/*.html` + `players/*.js` — one generated player page per album (~170
  albums). Shared player behavior/styling lives in `players/style.css` and JS per
  page; each page defines its own `track_list` array.
- `radio/` — has its own smaller header/footer/radio.html experiment plus
  `songs.csv`; not the primary player UI.
- `all/` — an older, unreferenced experimental static generator (`gen_albums.sh` +
  its own `album/`, `css/`, `js/`); not linked from any current page — treat as
  legacy/inactive unless told otherwise.
- `css/`, `js/`, `fonts/`, `images/` — shared site-wide assets (Bootstrap-based CSS,
  jQuery, custom.js/custom.css, header.css).
- `manifest.json` / `sw.js` — PWA manifest + service worker registered across the main
  pages.
- `misc/` — scratch notes, bundled third-party libs (Font Awesome, reveal.js), and
  experiments; not part of the served site.
- `how-txt` — running human-authored TODO/notes list for the site owner; check it for
  current priorities. whenever a point is done, strikethrough it (~~).

## Conventions

- Bengali numerals: user-facing counts/track numbers are rendered in Bengali digits
  (see `bengali_numeral()` / `BENGALI_DIGITS` translate table in the Python scripts —
  reuse this helper rather than reimplementing).
- Album identity: always key albums by `album_en` (the CSV slug), never by the
  Bengali display name, when generating filenames or matching pages to CSV rows.
- Track art: `album_art` in the CSV holds per-track image paths (relative
  `images/...` or full URLs); `build_pages.py`'s player-page generator normalizes/
  falls back to a rotating set of stock images (`PLAYER_STOCK_IMAGES`) for tracks
  with no art. Missing art is filled in by hand in the CSV, not generated/guessed.
- No test suite or build tool — verify changes by opening the affected HTML file(s)
  directly (or via a local static server) in a browser.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8791
```

then visit `http://localhost:8791/index.html` (or any other page).
