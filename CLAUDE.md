# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

আলোময় সঙ্গীত (Alomoy Songit) — a static site for streaming Bengali Islamic/devotional
songs, organized by album. No backend, no build system, no package manager: plain
HTML/CSS/JS served as static files, with Python scripts that *generate* HTML from a
single CSV source of truth. Audio files are hosted externally (Dropbox/Drive links in
the CSV), not stored in this repo.

# Main Files

index.html, all-songs.html, albums.html, singers.html, stat.html and albums at players/*html
Don't change any other html unless mentioned, so usually 'all pages' would mean these. 

## Data flow (the core architecture)

`radio/songs.csv` is the single source of truth for every song: columns are
`Song, album, singer, group, writer, album_art, tune, src, genre, subgenre, language,
tags, album_en`. `album_en` is the slug used everywhere to key an album to its
generated files.

**`python3 build_pages.py` is the single generator script for the whole site — run it
whenever songs.csv changes.** It does two things, in order:

1. Syncs `players/<album_en>.html` (one dedicated player page per album) from the
   CSV via `build_player_html()`/`write_player_page()` — fully regenerated from
   scratch every run (no separate `.js` file, no merge with the existing page; the
   CSV is the only source of truth). The page shares all-songs.html's whole
   design/list/search/player machinery (`ALL_SONGS_TEMPLATE` with the hero/script
   blocks swapped, same as index.html) rather than a bespoke template — every
   track's data is baked straight into its `<li data-*>`, search-filtered instead
   of dropdown-filtered (there's nothing to filter by within one album), and
   art just rotates through the same stock set every song list uses (no
   per-track curation to preserve). Since the page now lives one directory below
   site root, every root-relative asset/page reference `ALL_SONGS_TEMPLATE` carries
   gets fixed up with a `../` prefix (or `prefix="../"` passed to `render_nav()`).
   A page whose `album_en` no longer has any CSV rows is deleted (the CSV is the
   sole source of truth for which albums have pages; a manual/hybrid album is made
   by adding rows with a new `album_en`, not by hand-authoring a page). Any leftover
   `players/<slug>.js` from before this migration is cleaned up by `sync_players()`.
2. (Re)generates the five main pages from one shared `NAV_ITEMS`/`LOGO_PATH` config,
   so their nav links and logo can't drift out of sync with each other the way they
   used to when each page had its own copy-pasted template:
   - `index.html` — the homepage; derived from `ALL_SONGS_TEMPLATE` in
     `build_index_html()` (same head/CSS/nav/`#player-root` markup+JS as
     all-songs.html, so the player can't drift between the two pages) but with
     its hero, song-list-wrap, and trailing script swapped out for a lighter
     version: no baked `<li>`s, no filters — instead the inline script fetches
     `radio/songs.csv` client-side on load and renders a fresh random 20 songs
     each visit, with a "সব XX টি গান দেখুন" link to all-songs.html for the
     full archive. all-songs.html itself is unchanged (still fully baked at
     build time with the search/filter UI) — see how-txt item 4.
   - `stat.html` — big-icon site-wide stats (albums/singers/groups/songs), computed
     client-side from `radio/songs.csv` on load, same as the old homepage's stats
     strip used to be (that strip was moved here from index.html).
   - `albums.html` / `singers.html` — cards/list baked from the CSV directly at
     build time for SEO/crawlability; any client-side JS left on these pages is
     just a live search filter over the already-rendered elements, not a builder.
     `albums.html` also has a "অ্যালবাম ব্রাউজ করুন" auto-scrolling album-art
     slider appended below the main grid (`.fcard`/`.fgrid`/`featured_card_html()`
     — the old homepage's slider, moved here) — kept visually/DOM-distinct from the
     main grid's `.card` elements so the main grid's search filter doesn't touch it.
   - `all-songs.html` — every song is baked into a `<li data-*>` (name, artist,
     album, filter/search fields) at build time, sorted alphabetically, plus all
     five filter dropdowns' `<option>` lists; the inline script only filters/
     reorders/shuffles these already-rendered elements and feeds visible ones to
     the player — it doesn't fetch or parse `songs.csv` itself. A `?query=` URL
     param (e.g. from a singer card's "সব" link) prefills and runs that search.
   - `sitemap.xml` / `robots.txt` — regenerated every run from the same page list
     (the 5 main pages + every `players/*.html`).

Player pages are NOT hand-authored — edit `radio/songs.csv` and re-run
`build_pages.py`; a hand edit to a `players/<slug>.html` file is silently
overwritten on the next run (unlike before this migration, there's no more
merge-with-existing step preserving anything). `players/template.html` /
`players/template.js` are leftover reference templates from the old
per-track-JS-array generator — no longer wired into generation at all, kept
only as historical reference.

## Site structure

- `index.html`, `albums.html`, `singers.html`, `all-songs.html`, `stat.html` — the
  five main/current pages (per `how-txt`; `search.html` was removed since
  all-songs.html already covers song-level search, and other legacy root HTML files
  are candidates for deletion, not part of the active flow). `index.html` shows a
  client-fetched random 20 songs with a link to all-songs.html for the full list
  (per how-txt item 1/4); `stat.html` holds the stats strip that used to live on
  the homepage, with its cards linking to albums.html/singers.html/all-songs.html
  (no page yet for the শিল্পীগোষ্ঠী/group count).
- `players/*.html` — one generated player page per album (~84 albums), built
  from `ALL_SONGS_TEMPLATE` like all-songs.html/index.html rather than a
  separate template. Shared player engine is `players/main.js` (one file for
  every album page, driven by a `track_list` array built client-side from the
  page's own baked `<li data-*>` elements — no more per-album `.js` file).
  `players/style.css` still carries player-bar-specific styling.
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
- Track art: none of the song-list pages (all-songs.html, index.html, or player
  pages) do per-track art curation anymore — every song list just rotates through
  `ALL_SONGS_STOCK_IMAGES` by position. `album_art` still exists as a CSV column
  and is documented as a future per-track override point, but nothing currently
  reads it when baking `<li>`s (`song_li_html()`) — see how-txt item 15's "Future
  work" note on album/song art.
- No test suite or build tool — verify changes by opening the affected HTML file(s)
  directly (or via a local static server) in a browser.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8791
```

then visit `http://localhost:8791/index.html` (or any other page).
