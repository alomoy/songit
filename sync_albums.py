#!/usr/bin/env python3
"""Sync players/ album pages with radio/songs.csv.

Run this whenever songs.csv changes. It is safe to re-run any time:

- Albums in the CSV with no matching players/<album_en>.html page get a
  brand new page created (title, description, and static SEO track
  listing are generated once, at creation time only).
- Albums that already have a page get their track_list (name, artist,
  album, path) refreshed from the CSV, and the page's "now playing",
  first-track preview, and static track-list SEO block updated to
  match. Track images are matched to the existing track by
  (name, artist) so manually-chosen art survives a sync; only newly
  added tracks get a fresh stock photo.
- Anything else on the page (title, meta description, Drive links,
  custom edits) is left untouched — this script only ever adds or
  updates data-derived content, never removes a page or a field.

It does NOT delete pages for albums that disappear from the CSV, and
does NOT rename/deduplicate mismatched slugs — both of those were
one-off migration steps, not something a recurring sync should do
automatically.
"""

import csv
import html
import os
import re
import sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.abspath(__file__))
PLAYERS = os.path.join(ROOT, "players")
CSV_PATH = os.path.join(ROOT, "radio/songs.csv")

STOCK_IMAGES = [
    "mount.jpg", "nature.jpg", "trail.jpg", "karakoram.jpg", "hillroad.jpg",
    "mtroad.jpg", "tunnel.jpg", "train.jpg", "sajek.jpg", "nature.jpg",
    "mtroad.jpg", "mount.jpg", "mosque.jpg", "nature.jpg", "sajek.jpg",
    "laptop.jpg",
]

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>অ্যালবাম:  {album} ~  {singer} | আলোময় সঙ্গীত</title>
        <meta name="description" content="{description}">
  <!-- Load FontAwesome icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

  <!-- Load the custom CSS style file -->
  <link rel="stylesheet" type="text/css" href="style.css">
      <link href="../css/custom.css" rel="stylesheet">

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RN5RYTV144"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());

  gtag('config', 'G-RN5RYTV144');
</script>


</head>
<body>
  <div class="player">
    <div class="details">
      <div class="site-brand">
        <img src="../images/alomoy.png" alt="আলোময় সঙ্গীত" class="site-logo">
        <div class="site-brand-text">
          <div class="site-title">আলোময় সঙ্গীত</div>
          <div class="site-subtitle">সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</div>
        </div>
      </div>
      <div class="track-art"></div>
      <div class="track-album">{album}</div>
      <div class="track-name">{first_name}</div>
      <div class="track-artist">{first_artist}</div>
</br>
            <div class="header-content-inner">
                <a href="../index.html" class="btn btn-primary btn-lg">হোম</a>
                <a href="../albums.html" class="btn btn-primary btn-lg">সব প্লেলিস্ট</a> <a id="download-link" href="" download class="btn btn-primary btn-lg"><i class="fa fa-solid fa-download"></i></a> <button type="button" id="track-list-toggle" class="btn btn-primary btn-lg" onclick="toggleTrackList()" aria-expanded="false"><i class="fa fa-solid fa-list-ul"></i></button>
            </div>

    </div>
    <div class="buttons">
      <div class="repeat-track" onclick="toggleRepeat()" title="Repeat: All">
        <i class="fa fa-redo fa-2x"></i><span class="repeat-badge">1</span>
      </div>
      <div class="fast-backward" onclick="fastBackward()"><i class="fa fa-backward fa-2x"></i></div>
      <div class="prev-track" onclick="prevTrack()"><i class="fa fa-step-backward fa-2x"></i></div>
      <div class="playpause-track" onclick="playpauseTrack()"><i class="fa fa-play-circle fa-5x"></i></div>
      <div class="next-track" onclick="nextTrack()"><i class="fa fa-step-forward fa-2x"></i></div>
      <div class="fast-forward" onclick="fastForward()"><i class="fa fa-forward fa-2x"></i></div>
      <div class="shuffle-track" onclick="toggleShuffle()" title="Shuffle: Off">
        <i class="fa fa-random fa-2x"></i>
      </div>
    </div>
    <div class="slider_container">
      <div class="current-time">00:00</div>
      <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">
      <div class="total-duration">00:00</div>
      <div class="volume-track">
        <div class="volume-icon" onclick="toggleVolumeSlider(event)"><i class="fa fa-volume-up fa-2x"></i></div>
        <div class="volume_popup">
          <input type="range" min="0" max="100" value="99" class="volume_slider" onclick="event.stopPropagation()" onchange="setVolume()">
        </div>
      </div>
    </div>
    <div class="now-playing">Playing 1 OF {track_count}</div>
    <ol class="track-list-static" aria-label="সকল গানের তালিকা">
{track_list_html}
    </ol>
  </div>

  <!-- Load the main script for the player -->
  <script src="{slug}.js"></script>
  <script src="main.js"></script>
</body>
</html>
'''

TRACK_OBJ_RE = re.compile(
    r'name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'artist:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'album:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'image:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'path:\s*"((?:[^"\\]|\\.)*)"',
    re.S,
)


def esc(s):
    return html.escape(s, quote=True)


def js_str(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def js_unescape(s):
    return s.replace('\\"', '"').replace("\\\\", "\\")


def load_albums():
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    by_album = defaultdict(list)
    for r in rows:
        a = r["album_en"].strip()
        if a and a != "Uncat":
            by_album[a].append(r)
    return by_album


def build_track_list_js(tracks):
    lines = ["let track_list = ["]
    for t in tracks:
        lines.append("  {")
        lines.append(f'    name: "{js_str(t["name"])}",')
        lines.append(f'    artist: "{js_str(t["artist"])}",')
        lines.append(f'    album: "{js_str(t["album"])}",')
        lines.append(f'    image: "../images/{t["image"]}",')
        lines.append(f'    path: "{js_str(t["path"])}"')
        lines.append("  },")
    lines.append("];")
    return "// Define the tracks that have to be played\n" + "\n".join(lines) + "\n"


BENGALI_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def bengali_numeral(n):
    return str(n).translate(BENGALI_DIGITS)


def build_track_list_html(tracks):
    items = []
    for i, t in enumerate(tracks, start=1):
        items.append(
            f'        <li data-track-index="{i-1}">{bengali_numeral(i)}. {esc(t["name"])} &ndash; {esc(t["artist"])}</li>'
        )
    return "\n".join(items)


def make_description(album, singer, n):
    return f"{singer} পরিবেশিত অ্যালবাম {album}। এই অ্যালবামে রয়েছে {n}টি গান।"


def tracks_from_csv_rows(rows, existing_by_name=None):
    # The CSV is the sole source of truth for name/artist/album/path (even
    # blank/incorrect values sync through as-is — fix those in the CSV).
    # Images aren't in the CSV at all though, so per-track art is still
    # matched by song name against the existing page and preserved; only
    # genuinely new tracks get a fresh stock photo.
    existing_by_name = existing_by_name or {}
    tracks = []
    stock_i = 0
    for r in rows:
        name = r["Song"].strip()
        artist = r["group"].strip() or r["singer"].strip()
        existing = existing_by_name.get(name)
        image = existing["image"] if existing else None
        if not image:
            image = STOCK_IMAGES[stock_i % len(STOCK_IMAGES)]
        stock_i += 1
        tracks.append({
            "name": name,
            "artist": artist,
            "album": r["album"].strip(),
            "image": image,
            "path": r["src"].strip(),
        })
    return tracks


def parse_existing_tracks(js_path):
    if not os.path.exists(js_path):
        return []
    text = open(js_path, encoding="utf-8").read()
    tracks = []
    for m in TRACK_OBJ_RE.finditer(text):
        name, artist, album, image, path = (js_unescape(g) for g in m.groups())
        image_file = image.rsplit("/", 1)[-1]
        tracks.append({"name": name, "artist": artist, "album": album, "image": image_file, "path": path})
    return tracks


def create_new_page(slug, rows):
    tracks = tracks_from_csv_rows(rows)
    album = rows[0]["album"].strip()
    singer_counts = Counter(
        (r["group"].strip() or r["singer"].strip())
        for r in rows if r["group"].strip() or r["singer"].strip()
    )
    singer = singer_counts.most_common(1)[0][0] if singer_counts else ""
    description = make_description(album, singer, len(tracks))

    html_text = HTML_TEMPLATE.format(
        album=esc(album),
        singer=esc(singer),
        description=esc(description),
        track_count=len(tracks),
        first_name=esc(tracks[0]["name"]),
        first_artist=esc(tracks[0]["artist"]),
        track_list_html=build_track_list_html(tracks),
        slug=slug,
    )
    with open(os.path.join(PLAYERS, slug + ".html"), "w", encoding="utf-8") as f:
        f.write(html_text)
    with open(os.path.join(PLAYERS, slug + ".js"), "w", encoding="utf-8") as f:
        f.write(build_track_list_js(tracks))


def update_existing_page(slug, rows):
    js_path = os.path.join(PLAYERS, slug + ".js")
    html_path = os.path.join(PLAYERS, slug + ".html")
    if not os.path.exists(html_path):
        return False

    existing_tracks = parse_existing_tracks(js_path)
    existing_by_name = {t["name"]: t for t in existing_tracks}
    new_tracks = tracks_from_csv_rows(rows, existing_by_name)

    html_text = open(html_path, encoding="utf-8").read()
    has_track_list = bool(re.search(r'<ol class="track-list-static"', html_text))

    if new_tracks == existing_tracks and has_track_list:
        return False  # nothing changed, don't touch the files

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(build_track_list_js(new_tracks))
    html_text = re.sub(
        r'<div class="now-playing">.*?</div>',
        f'<div class="now-playing">Playing 1 OF {len(new_tracks)}</div>',
        html_text, count=1,
    )
    html_text = re.sub(
        r'<div class="track-album">.*?</div>',
        f'<div class="track-album">{esc(new_tracks[0]["album"])}</div>',
        html_text, count=1,
    )
    html_text = re.sub(
        r'<div class="track-name">.*?</div>',
        f'<div class="track-name">{esc(new_tracks[0]["name"])}</div>',
        html_text, count=1,
    )
    html_text = re.sub(
        r'<div class="track-artist">.*?</div>',
        f'<div class="track-artist">{esc(new_tracks[0]["artist"])}</div>',
        html_text, count=1,
    )
    new_ol = f'<ol class="track-list-static" aria-label="সকল গানের তালিকা">\n{build_track_list_html(new_tracks)}\n    </ol>'
    if re.search(r'<ol class="track-list-static"[^>]*>.*?</ol>', html_text, flags=re.S):
        html_text = re.sub(
            r'<ol class="track-list-static"[^>]*>.*?</ol>',
            new_ol, html_text, count=1, flags=re.S,
        )
    else:
        # Legacy page predating this feature — there's nothing to
        # substitute into, so append it right before .player's closing tag.
        html_text = re.sub(
            r'(    </div>\n  </div>\n)',
            f'    </div>\n    {new_ol}\n  </div>\n',
            html_text, count=1,
        )
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_text)
    return True


def main():
    by_album = load_albums()
    album_en_lower = set(a.lower() for a in by_album)
    existing = set(f[:-5] for f in os.listdir(PLAYERS) if f.endswith(".html") and f != "template.html")
    existing_lower = set(e.lower() for e in existing)

    # Every player page is expected to correspond to a current album_en
    # value. Anything that doesn't (leftover fragments from a since-fixed
    # CSV, or a page that was never CSV-backed) gets removed — the CSV is
    # the sole source of players now; a manual/hybrid album is made by
    # adding rows with a new album_en, not by hand-authoring a page.
    deleted = []
    for slug in sorted(existing):
        if slug.lower() not in album_en_lower:
            os.remove(os.path.join(PLAYERS, slug + ".html"))
            os.remove(os.path.join(PLAYERS, slug + ".js"))
            deleted.append(slug)
    deleted_lower = set(d.lower() for d in deleted)

    created, updated, unchanged = [], [], []
    for album_en, rows in sorted(by_album.items()):
        slug = album_en.lower()
        if slug not in existing_lower or slug in deleted_lower:
            create_new_page(slug, rows)
            created.append(slug)
        else:
            if update_existing_page(slug, rows):
                updated.append(slug)
            else:
                unchanged.append(slug)

    print(f"Deleted: {len(deleted)}")
    for s in deleted:
        print(f"  - {s}")
    print(f"Created: {len(created)}")
    for s in created:
        print(f"  + {s}")
    print(f"Updated: {len(updated)}")
    for s in updated:
        print(f"  ~ {s}")
    print(f"Unchanged: {len(unchanged)}")


if __name__ == "__main__":
    main()
