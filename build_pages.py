#!/usr/bin/env python3
"""Generate every CSV-derived page on the site from radio/songs.csv: the
per-album player pages in players/*.html + players/*.js, and the five main
pages (index.html, albums.html, singers.html, all-songs.html, stat.html).

This is the single build script for the whole site — it replaces the old
sync_albums.py (players/*.html/.js), build_landing.py (index.html), and
build_directories.py (albums.html/singers.html), so the shared chrome (nav
links, logo) can't drift out of sync between pages the way it did when each
page had its own copy-pasted template. search.html was dropped from the
site — all-songs.html already covers song-level search — so it is not
generated here and has no nav entry.

Player pages are synced first (see sync_players()) since albums.html's
featured slider reads their titles/art/track-counts back off disk. Sync is
safe to re-run any time: new albums in the CSV get a brand new page
(title/description/static SEO track listing generated once, at creation
time only); existing pages get their track_list and derived fields
(now-playing count, first track, static SEO track list) refreshed from the
CSV, matching track art to the existing page by (name, artist) so manual
art picks survive; anything else on the page (title, meta description,
Drive links, custom edits) is left untouched. A player page whose slug no
longer has any matching CSV rows (album_en renamed or removed) is deleted,
on the assumption the CSV is now the sole source of truth for which albums
have pages — a manual/hybrid album is made by adding rows with a new
album_en, not by hand-authoring a page.

index.html and all-songs.html share one template (render_all_songs_page()):
every song is baked into a <li data-*> at build time (name, artist, album,
filter/search fields), sorted alphabetically, plus all five filter
dropdowns' <option> lists; the inline script only filters/reorders/shuffles
these already-rendered elements and feeds visible ones to the player — it
doesn't fetch or parse songs.csv itself. stat.html is the exception: its
stat numbers are fetched and computed from songs.csv client-side on load,
so they never go stale between CSV changes and the next build.

Run this whenever songs.csv changes.
"""

import csv
import glob
import html
import os
import re
from collections import Counter, defaultdict
from urllib.parse import quote

ROOT = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(ROOT, "radio/songs.csv")
PLAYERS = os.path.join(ROOT, "players")

LOGO_PATH = "images/alomoy-clean.png"

# Matches the domain already used in all-songs.html's existing canonical/OG
# tags. It 301-redirects to https://www.alomoy.net/songit/ in production;
# left as-is here for consistency rather than switching just the sitemap.
SITE_BASE_URL = "https://alomoy.github.io/songit"

# search.html was removed from the site (all-songs.html already covers
# song-level search), so it has no entry here.
NAV_ITEMS = [
    ("index.html", "হোম"),
    ("singers.html", "শিল্পী তালিকা"),
    ("albums.html", "অ্যালবাম তালিকা"),
    ("all-songs.html", "সব গান"),
    ("stat.html", "পরিসংখ্যান"),
]

BENGALI_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def bengali_numeral(n):
    return str(n).translate(BENGALI_DIGITS)


def esc(s):
    return html.escape(s, quote=True)


def load_rows():
    with open(CSV_PATH, encoding="utf-8") as f:
        return list(csv.DictReader(f))


def render_nav(active_href):
    def nav_link(href, label):
        cls = ' class="active"' if href == active_href else ''
        return f'    <a href="{href}"{cls}>{label}</a>'

    links = "\n".join(nav_link(href, label) for href, label in NAV_ITEMS)
    return f'''<div class="topnav" id="myTopnav">
  <div class="logo-section">
    <a href="index.html">
      <img src="{LOGO_PATH}" alt="Alomoy Sangeet Logo">
      <div class="company-info">
        <strong>আলোময় সঙ্গীত</strong><br>
        <em>সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</em>
      </div>
    </a>
  </div>
  <div class="menu">
{links}
  </div>
  <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
    <i class="fa fa-bars"></i>
  </a>
</div>'''


# ---------------------------------------------------------------------------
# players/<album_en>.html + players/<album_en>.js
# ---------------------------------------------------------------------------

PLAYER_STOCK_IMAGES = [
    "mount.jpg", "nature.jpg", "trail.jpg", "karakoram.jpg", "hillroad.jpg",
    "mtroad.jpg", "tunnel.jpg", "train.jpg", "sajek.jpg", "nature.jpg",
    "mtroad.jpg", "mount.jpg", "mosque.jpg", "nature.jpg", "sajek.jpg",
    "laptop.jpg",
]

PLAYER_HTML_TEMPLATE = '''<!DOCTYPE html>
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
        <img src="../{logo}" alt="আলোময় সঙ্গীত" class="site-logo">
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
        <i class="fa fa-redo fa-2x"></i><span class="repeat-badge">১</span>
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
'''.replace("{logo}", LOGO_PATH)

PLAYER_TRACK_OBJ_RE = re.compile(
    r'name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'artist:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'album:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'image:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'path:\s*"((?:[^"\\]|\\.)*)"',
    re.S,
)


def js_str(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def js_unescape(s):
    return s.replace('\\"', '"').replace("\\\\", "\\")


def group_rows_by_album(rows):
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


def build_player_track_list_html(tracks):
    items = []
    for i, t in enumerate(tracks, start=1):
        items.append(
            f'        <li data-track-index="{i-1}">{bengali_numeral(i)}. {esc(t["name"])}</li>'
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
            image = PLAYER_STOCK_IMAGES[stock_i % len(PLAYER_STOCK_IMAGES)]
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
    for m in PLAYER_TRACK_OBJ_RE.finditer(text):
        name, artist, album, image, path = (js_unescape(g) for g in m.groups())
        image_file = image.rsplit("/", 1)[-1]
        tracks.append({"name": name, "artist": artist, "album": album, "image": image_file, "path": path})
    return tracks


def create_player_page(slug, rows):
    tracks = tracks_from_csv_rows(rows)
    album = rows[0]["album"].strip()
    singer_counts = Counter(
        (r["group"].strip() or r["singer"].strip())
        for r in rows if r["group"].strip() or r["singer"].strip()
    )
    singer = singer_counts.most_common(1)[0][0] if singer_counts else ""
    description = make_description(album, singer, len(tracks))

    html_text = PLAYER_HTML_TEMPLATE.format(
        album=esc(album),
        singer=esc(singer),
        description=esc(description),
        track_count=len(tracks),
        first_name=esc(tracks[0]["name"]),
        first_artist=esc(tracks[0]["artist"]),
        track_list_html=build_player_track_list_html(tracks),
        slug=slug,
    )
    with open(os.path.join(PLAYERS, slug + ".html"), "w", encoding="utf-8") as f:
        f.write(html_text)
    with open(os.path.join(PLAYERS, slug + ".js"), "w", encoding="utf-8") as f:
        f.write(build_track_list_js(tracks))


def update_player_page(slug, rows):
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
    new_ol = f'<ol class="track-list-static" aria-label="সকল গানের তালিকা">\n{build_player_track_list_html(new_tracks)}\n    </ol>'
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


def sync_players(rows):
    by_album = group_rows_by_album(rows)
    album_en_lower = set(a.lower() for a in by_album)
    existing = set(f[:-5] for f in os.listdir(PLAYERS) if f.endswith(".html") and f != "template.html")
    existing_lower = set(e.lower() for e in existing)

    deleted = []
    for slug in sorted(existing):
        if slug.lower() not in album_en_lower:
            os.remove(os.path.join(PLAYERS, slug + ".html"))
            os.remove(os.path.join(PLAYERS, slug + ".js"))
            deleted.append(slug)
    deleted_lower = set(d.lower() for d in deleted)

    created, updated, unchanged = [], [], []
    for album_en, album_rows in sorted(by_album.items()):
        slug = album_en.lower()
        if slug not in existing_lower or slug in deleted_lower:
            create_player_page(slug, album_rows)
            created.append(slug)
        else:
            if update_player_page(slug, album_rows):
                updated.append(slug)
            else:
                unchanged.append(slug)

    return {"deleted": deleted, "created": created, "updated": updated, "unchanged": unchanged}


# ---------------------------------------------------------------------------
# index.html
# ---------------------------------------------------------------------------

def normalize_image(img):
    if img.startswith("http"):
        return img
    filename = re.sub(r'^(\.\./)?images/', '', img)
    return "images/" + filename


def load_albums_for_index():
    albums = []
    for f in sorted(glob.glob(f"{ROOT}/players/*.html")):
        if f.endswith("template.html"):
            continue
        slug = f.split("/")[-1][:-5]
        text = open(f, encoding="utf-8").read()
        # Tolerant of the couple of legacy title formats that don't follow
        # the standard "অ্যালবাম: X ~ Y | আলোময় সঙ্গীত" pattern exactly
        # (missing "অ্যালবাম:" prefix, missing "| আলোময় সঙ্গীত" suffix, or
        # a genuinely blank singer).
        title_m = re.search(r'<title>(?:অ্যালবাম:\s*)?(.*?)\s*~\s*(.*?)(?:\s*\|.*)?</title>', text)
        album = title_m.group(1).strip() if title_m and title_m.group(1).strip() else slug
        singer = title_m.group(2).strip() if title_m else ""
        count_m = re.search(r'Playing 1 OF (\d+)', text)
        count = int(count_m.group(1)) if count_m else 0
        js_text = open(f[:-5] + ".js", encoding="utf-8").read()
        img_m = re.search(r'image:\s*"([^"]+)"', js_text)
        image = normalize_image(img_m.group(1)) if img_m else "images/mount.jpg"
        albums.append({"slug": slug, "album": album, "singer": singer, "count": count, "image": image})
    return albums


def featured_card_html(a):
    return f'''      <a class="fcard" href="players/{a['slug']}.html">
        <div class="fcard-art">
          <img src="{esc(a['image'])}" alt="{esc(a['album'])}" loading="lazy" onerror="this.onerror=null;this.src='{LOGO_PATH}';this.classList.add('fallback');">
        </div>
        <div class="fcard-body">
          <div class="fcard-title">{esc(a['album'])}</div>
          <div class="fcard-singer">{esc(a['singer'])}</div>
          <div class="fcard-count">{esc(bengali_numeral(a['count']))}টি গান</div>
        </div>
      </a>'''


def build_stat_html():
    return STAT_TEMPLATE.replace("{{NAV}}", render_nav("stat.html"))


# ---------------------------------------------------------------------------
# albums.html / singers.html
# ---------------------------------------------------------------------------

def build_albums(rows):
    by_album = {}
    for r in rows:
        slug = (r.get("album_en") or "").strip().lower()
        if not slug or slug == "uncat":
            continue
        info = by_album.setdefault(slug, {"name": (r.get("album") or "").strip() or slug, "count": 0})
        info["count"] += 1
    albums = [{"slug": slug, **info} for slug, info in by_album.items()]
    albums.sort(key=lambda a: a["name"])
    return albums


def build_singers(rows):
    by_singer = {}
    for r in rows:
        singer = (r.get("singer") or "").strip()
        slug = (r.get("album_en") or "").strip().lower()
        if not singer or not slug or slug == "uncat":
            continue
        entry = by_singer.setdefault(singer, {"count": 0, "albums": {}})
        entry["count"] += 1
        if slug not in entry["albums"]:
            entry["albums"][slug] = (r.get("album") or "").strip() or slug

    singers = []
    for name, info in by_singer.items():
        albums = sorted(info["albums"].items(), key=lambda kv: kv[1])
        singers.append({"name": name, "count": info["count"], "albums": albums})
    # Default sort is by album count (most first) rather than name: singers
    # with a similar number of albums end up adjacent in the grid, so cards
    # of similar height sit next to each other instead of a very tall
    # many-album card next to a one-album card. Name/song-count sorting are
    # still available client-side via the sort dropdown.
    singers.sort(key=lambda s: (-len(s["albums"]), s["name"]))
    return singers


def album_card_html(album, index):
    return f'''      <a class="card" href="players/{album['slug']}.html" data-search="{esc(album['name'].lower())}">
        <div class="card-index">{bengali_numeral(index)}</div>
        <div class="card-title">{esc(album['name'])}</div>
      </a>'''


def singer_card_html(singer):
    album_items = "".join(
        f'        <li><a href="players/{slug}.html">{esc(name)}</a></li>\n'
        for slug, name in singer["albums"]
    )
    all_href = f'all-songs.html?query={quote(singer["name"])}'
    return f'''    <div class="singer-card" data-search="{esc(singer['name'].lower())}" data-name="{esc(singer['name'])}" data-albums="{len(singer['albums'])}" data-songs="{singer['count']}">
      <div class="singer-name">{esc(singer['name'])}</div>
      <div class="singer-count">{bengali_numeral(singer['count'])}টি গান</div>
      <ul class="singer-albums">
{album_items}        <li class="singer-all"><a href="{all_href}">সব</a></li>
      </ul>
    </div>'''


def filter_script(item_selector):
    return '''
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const cards = Array.from(document.querySelectorAll('SELECTOR_PLACEHOLDER'));
    const noResults = document.getElementById('no-results');
    searchInput.addEventListener('input', function () {
        const q = this.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach(function (card) {
            const match = !q || card.dataset.search.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        noResults.style.display = visible === 0 ? 'block' : 'none';
    });
}
setupSearch();

// Nav
function toggleMenu() {
  var menu = document.querySelector(".topnav .menu");
  menu.classList.toggle("show");
}
'''.replace('SELECTOR_PLACEHOLDER', item_selector)


SORT_SCRIPT = '''
function setupSort() {
    const sortSelect = document.getElementById('sort-select');
    const ascBtn = document.getElementById('sort-asc');
    const descBtn = document.getElementById('sort-desc');
    const list = document.getElementById('singer-list');
    let direction = 'desc';

    const getters = {
        albums: el => Number(el.dataset.albums),
        name: el => el.dataset.name,
        songs: el => Number(el.dataset.songs),
    };

    function compare(a, b) {
        const get = getters[sortSelect.value];
        const va = get(a), vb = get(b);
        let result = sortSelect.value === 'name' ? va.localeCompare(vb, 'bn') : va - vb;
        if (direction === 'desc') result = -result;
        return result || a.dataset.name.localeCompare(b.dataset.name, 'bn');
    }

    function applySort() {
        const cards = Array.from(list.querySelectorAll('.singer-card'));
        cards.sort(compare);
        cards.forEach(card => list.appendChild(card));
        ascBtn.classList.toggle('active', direction === 'asc');
        descBtn.classList.toggle('active', direction === 'desc');
    }

    sortSelect.addEventListener('change', applySort);
    ascBtn.addEventListener('click', function () { direction = 'asc'; applySort(); });
    descBtn.addEventListener('click', function () { direction = 'desc'; applySort(); });
}
setupSort();
'''


def build_albums_html(rows):
    albums = build_albums(rows)
    cards = "\n".join(album_card_html(a, i + 1) for i, a in enumerate(albums))
    slider_cards = "\n".join(featured_card_html(a) for a in load_albums_for_index())
    return (
        ALBUMS_TEMPLATE
        .replace("{{CARDS}}", cards)
        .replace("{{SLIDER_CARDS}}", slider_cards)
        .replace("{{COUNT}}", bengali_numeral(len(albums)))
        .replace("{{FILTER_SCRIPT}}", filter_script(".card"))
        .replace("{{NAV}}", render_nav("albums.html"))
    ), len(albums)


def build_singers_html(rows):
    singers = build_singers(rows)
    items = "\n".join(singer_card_html(s) for s in singers)
    return (
        SINGERS_TEMPLATE
        .replace("{{LIST}}", items)
        .replace("{{COUNT}}", bengali_numeral(len(singers)))
        .replace("{{FILTER_SCRIPT}}", filter_script(".singer-card"))
        .replace("{{SORT_SCRIPT}}", SORT_SCRIPT)
        .replace("{{NAV}}", render_nav("singers.html"))
    ), len(singers)


# ---------------------------------------------------------------------------
# all-songs.html
# ---------------------------------------------------------------------------
# Every song is baked into a <li data-*="..."> at build time (name, artist,
# album, and the filter/search fields), sorted alphabetically by name, so
# the full list is crawlable without running any JS. The inline <script> in
# ALL_SONGS_TEMPLATE only filters/reorders these already-rendered elements
# (search box, the five dropdowns, and a once-per-load shuffle for variety
# on repeat visits) and feeds whichever are currently visible to the
# player -- it never fetches or parses songs.csv itself.

ALL_SONGS_STOCK_IMAGES = [
    "images/mount.jpg", "images/nature.jpg", "images/trail.jpg", "images/karakoram.jpg", "images/hillroad.jpg",
    "images/mtroad.jpg", "images/tunnel.jpg", "images/train.jpg", "images/sajek.jpg", "images/mosque.jpg",
    "images/laptop.jpg",
]


def load_all_songs(rows):
    songs = [r for r in rows if (r.get("Song") or "").strip() and (r.get("src") or "").strip()]
    songs.sort(key=lambda r: r["Song"].strip())
    return songs


def song_tag_link_html(text, href):
    return (
        f'<a class="song-tag" href="{esc(href)}" target="_blank" rel="noopener" '
        f'onclick="event.stopPropagation()">{esc(text)}</a>'
    )


# A small coupler between consecutive pills (song name/group/singer/album)
# so they read as linked cars of one song's info rather than unrelated
# floating chips -- see how-txt item 3.
SONG_LINK_HTML = '<span class="song-link" aria-hidden="true"></span>'

# A dedicated play affordance at the right edge of the info area, since most
# of the row is now taken up by clickable name/tag pills that navigate away
# instead of playing -- see how-txt item 5.
SONG_PLAY_HTML = '<span class="song-play" aria-hidden="true"><i class="fa fa-play"></i></span>'


def song_li_html(song, index):
    name = song["Song"].strip()
    album = (song.get("album") or "").strip()
    singer = (song.get("singer") or "").strip()
    group = (song.get("group") or "").strip()
    genre = (song.get("genre") or "").strip()
    subgenre = (song.get("subgenre") or "").strip()
    artist = group or singer
    image = ALL_SONGS_STOCK_IMAGES[index % len(ALL_SONGS_STOCK_IMAGES)]
    path = (song.get("src") or "").strip()
    album_en = (song.get("album_en") or "").strip().lower()

    search_fields = [
        name, album, singer, group, genre, subgenre,
        song.get("writer") or "", song.get("tune") or "",
        song.get("language") or "", song.get("tags") or "",
    ]
    search_text = " ".join(f for f in search_fields if f).lower()

    parts = [
        f'<a class="song-name" href="all-songs.html?query={quote(name)}" target="_blank" rel="noopener" '
        f'onclick="event.stopPropagation()">{esc(name)}</a>'
    ]
    if group:
        parts.append(song_tag_link_html(group, f"all-songs.html?query={quote(group)}"))
    if singer:
        parts.append(song_tag_link_html(singer, f"all-songs.html?query={quote(singer)}"))
    if album:
        album_href = f"players/{album_en}.html" if album_en and album_en != "uncat" else f"all-songs.html?query={quote(album)}"
        parts.append(song_tag_link_html(album, album_href))
    chained_html = SONG_LINK_HTML.join(parts)

    return (
        f'<li data-name="{esc(name)}" data-artist="{esc(artist)}" data-album="{esc(album)}" '
        f'data-singer="{esc(singer)}" data-group="{esc(group)}" data-genre="{esc(genre)}" '
        f'data-subgenre="{esc(subgenre)}" data-image="{esc(image)}" data-path="{esc(path)}" '
        f'data-search="{esc(search_text)}">'
        f'{chained_html}{SONG_PLAY_HTML}</li>'
    )


def dropdown_options_html(values):
    uniq = sorted(set(v.strip() for v in values if v and v.strip()))
    opts = "".join(f'<option value="{esc(v)}">{esc(v)}</option>' for v in uniq)
    return f'<option value="">সকল</option>{opts}'


def render_all_songs_page(rows, nav_active, page_title, canonical_url):
    songs = load_all_songs(rows)
    items_html = "\n".join(song_li_html(s, i) for i, s in enumerate(songs))
    total_bn = bengali_numeral(len(songs))

    return (
        ALL_SONGS_TEMPLATE
        .replace("{{NAV}}", render_nav(nav_active))
        .replace("{{PAGE_TITLE}}", page_title)
        .replace("{{CANONICAL_URL}}", canonical_url)
        .replace("{{BREADCRUMB_NAME}}", "সব গান")
        .replace("{{SONG_ITEMS}}", items_html)
        .replace("{{TOTAL_COUNT_LINE}}", f"{total_bn} / {total_bn}টি গান")
        .replace("{{ALBUM_OPTIONS}}", dropdown_options_html(s.get("album") for s in songs))
        .replace("{{SINGER_OPTIONS}}", dropdown_options_html(s.get("singer") for s in songs))
        .replace("{{GROUP_OPTIONS}}", dropdown_options_html(s.get("group") for s in songs))
        .replace("{{GENRE_OPTIONS}}", dropdown_options_html(s.get("genre") for s in songs))
        .replace("{{SUBGENRE_OPTIONS}}", dropdown_options_html(s.get("subgenre") for s in songs))
    ), len(songs)


def build_all_songs_html(rows):
    return render_all_songs_page(
        rows, "all-songs.html",
        "আলোময় সঙ্গীত: সব গান",
        f"{SITE_BASE_URL}/all-songs.html",
    )


# index.html is derived from ALL_SONGS_TEMPLATE by swapping out three blocks
# (hero, song-list-wrap, and the trailing script) for a lighter homepage
# version -- everything else (head/CSS incl. the player bar, nav, and the
# #player-root markup/JS wiring) stays byte-identical to all-songs.html so
# the two pages' player behavior can never drift apart. Unlike all-songs.html
# (which bakes every song into the page at build time), the homepage fetches
# songs.csv client-side on load and renders a fresh random 20 each visit,
# with a link to all-songs.html for the full list/search/filters.

_ALL_SONGS_HERO_BLOCK = '''<div class="search-hero">
  <h1 class="tagline">সব <span class="accent">গান</span></h1>
  <div class="search-row">
    <i class="fa fa-search"></i>
    <input type="text" id="search-input" placeholder="গান, শিল্পী বা অ্যালবামের নাম লিখুন..." autocomplete="off">
  </div>
  <div class="count-line" id="count-line">{{TOTAL_COUNT_LINE}}</div>

  <button type="button" class="filter-toggle" id="filter-toggle" aria-expanded="false">
    <i class="fa fa-sliders-h"></i> ফিল্টার
  </button>

  <div class="filter-panel" id="filter-panel">
    <div>
      <label for="albumSelect">অ্যালবাম</label>
      <select id="albumSelect">{{ALBUM_OPTIONS}}</select>
    </div>
    <div>
      <label for="singerSelect">শিল্পী</label>
      <select id="singerSelect">{{SINGER_OPTIONS}}</select>
    </div>
    <div>
      <label for="groupSelect">শিল্পীগোষ্ঠী</label>
      <select id="groupSelect">{{GROUP_OPTIONS}}</select>
    </div>
    <div>
      <label for="genreSelect">বিভাগ</label>
      <select id="genreSelect">{{GENRE_OPTIONS}}</select>
    </div>
    <div>
      <label for="subgenreSelect">উপ-বিভাগ</label>
      <select id="subgenreSelect">{{SUBGENRE_OPTIONS}}</select>
    </div>
  </div>
</div>'''

_ALL_SONGS_LIST_WRAP_BLOCK = '''<div class="song-list-wrap">
  <ol class="song-list" id="song-list">
{{SONG_ITEMS}}
    <li class="song-list-loading" id="no-match-row" style="display:none">কোনো গান পাওয়া যায়নি।</li>
  </ol>
</div>'''

_ALL_SONGS_SCRIPT_BLOCK = '''    <script>
let mainJsLoaded = false;
let searchDebounce = null;
let currentList = [];

const allItems = Array.from(document.querySelectorAll('#song-list li[data-name]'));
const noMatchRow = document.getElementById('no-match-row');
const totalCount = allItems.length;

function convertToBanglaNumber(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(number).split('').map(d => banglaDigits[d] ?? d).join('');
}

function updateCount(visible) {
    document.getElementById('count-line').textContent =
        `${convertToBanglaNumber(visible)} / ${convertToBanglaNumber(totalCount)}টি গান`;
}

function applyFilters() {
    const q = document.getElementById('search-input').value.trim().toLowerCase();
    const selectedAlbum = document.getElementById('albumSelect').value;
    const selectedSinger = document.getElementById('singerSelect').value;
    const selectedGroup = document.getElementById('groupSelect').value;
    const selectedGenre = document.getElementById('genreSelect').value;
    const selectedSubgenre = document.getElementById('subgenreSelect').value;

    const visible = [];
    allItems.forEach(li => {
        const match =
            (!selectedAlbum || li.dataset.album === selectedAlbum) &&
            (!selectedSinger || li.dataset.singer === selectedSinger) &&
            (!selectedGroup || li.dataset.group === selectedGroup) &&
            (!selectedGenre || li.dataset.genre === selectedGenre) &&
            (!selectedSubgenre || li.dataset.subgenre === selectedSubgenre) &&
            (!q || li.dataset.search.includes(q));
        li.style.display = match ? '' : 'none';
        if (match) visible.push(li);
    });

    currentList = visible;
    updateCount(visible.length);
    noMatchRow.style.display = visible.length === 0 ? '' : 'none';
}

function loadPlayer(list, index, autoplay) {
    if (list.length === 0) return;

    const newTrackList = list.map(li => ({
        name: li.dataset.name,
        artist: li.dataset.artist,
        album: li.dataset.album,
        image: li.dataset.image,
        path: li.dataset.path,
    }));

    allItems.forEach(li => li.classList.remove('active'));
    list[index].classList.add('active');

    if (!mainJsLoaded) {
        mainJsLoaded = true;
        window.track_list = newTrackList;
        const script = document.createElement('script');
        script.src = 'players/main.js';
        document.body.appendChild(script);
    } else {
        track_list = newTrackList;
        track_index = index;
        loadTrack(index);
        if (autoplay) playTrack();
    }
}

function playFromList(li) {
    const index = currentList.indexOf(li);
    if (index === -1) return;
    loadPlayer(currentList, index, true);
}

allItems.forEach(li => {
    li.addEventListener('click', () => playFromList(li));
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(applyFilters, 250);
});

const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
filterToggle.addEventListener('click', () => {
    const open = filterPanel.classList.toggle('open');
    filterToggle.classList.toggle('open', open);
    filterToggle.setAttribute('aria-expanded', String(open));
});

['albumSelect', 'singerSelect', 'groupSelect', 'genreSelect', 'subgenreSelect'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyFilters);
});

// A ?query= param (e.g. linked from a singer's "সব" card on singers.html)
// prefills and runs the search instead of the usual shuffle, so that link
// actually lands on a filtered list.
const initialQuery = new URLSearchParams(window.location.search).get('query') || '';
if (initialQuery) {
    searchInput.value = initialQuery;
    applyFilters();
    loadPlayer(currentList, 0, false);
} else {
    // Shuffle the visual order once on load so repeat visits don't always
    // see the same handful of songs first. Every song is still present in
    // the page source regardless of this order -- it's a display-only
    // reorder of already-rendered elements, not a re-render.
    const listEl = document.getElementById('song-list');
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    shuffled.forEach(li => listEl.insertBefore(li, noMatchRow));
    currentList = shuffled;
    updateCount(totalCount);
    loadPlayer(shuffled, 0, false);
}

// Nav
function toggleMenu() {
  var menu = document.querySelector(".topnav .menu");
  menu.classList.toggle("show");
}
    </script>'''


def _index_hero_html(total_bn):
    return f'''<div class="search-hero">
  <h1 class="tagline">আলোময় <span class="accent">সঙ্গীত</span></h1>
  <div class="mini-stats" id="mini-stats">
    <div class="mini-stat"><i class="fas fa-record-vinyl"></i><span class="mini-stat-number" id="mini-stat-albums">-</span><span class="mini-stat-label">অ্যালবাম</span></div>
    <div class="mini-stat"><i class="fas fa-user"></i><span class="mini-stat-number" id="mini-stat-singers">-</span><span class="mini-stat-label">শিল্পী</span></div>
    <div class="mini-stat"><i class="fas fa-users"></i><span class="mini-stat-number" id="mini-stat-groups">-</span><span class="mini-stat-label">শিল্পীগোষ্ঠী</span></div>
    <div class="mini-stat"><i class="fas fa-music"></i><span class="mini-stat-number" id="mini-stat-songs">-</span><span class="mini-stat-label">গান</span></div>
  </div>
  <p class="sub">𝄟 ইসলামী সঙ্গীতের সবচেয়ে বড় অনলাইন ভাণ্ডার। 𝇟 কাজের তালে তালে শুনুন ইসলামী সঙ্গীত। মনকে রাখুন পবিত্র। 𝄤</p>
  <p class="sub">বাছাইকৃত কিছু গান</p>
  <a href="all-songs.html" class="all-songs-link"><i class="fa fa-music"></i> {total_bn}টির সঙ্গীতের সব দেখুন</a>
</div>'''


_INDEX_LIST_WRAP_BLOCK = '''<div class="song-list-wrap">
  <ol class="song-list" id="song-list">
    <li class="song-list-loading" id="loading-row">গান লোড হচ্ছে...</li>
  </ol>
  <a href="all-songs.html" class="all-songs-link all-songs-link-bottom"><i class="fa fa-music"></i> সব গান দেখুন</a>
</div>'''

_INDEX_SCRIPT_BLOCK = r'''    <script>
const RANDOM_SONG_COUNT = 20;
const STOCK_IMAGES = [
  "images/mount.jpg", "images/nature.jpg", "images/trail.jpg", "images/karakoram.jpg", "images/hillroad.jpg",
  "images/mtroad.jpg", "images/tunnel.jpg", "images/train.jpg", "images/sajek.jpg", "images/mosque.jpg",
  "images/laptop.jpg",
];
let mainJsLoaded = false;
let currentList = [];

function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, h, i) => {
            obj[h] = values[i] ? values[i].trim() : '';
            return obj;
        }, {});
    });
}

function convertToBanglaNumber(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(number).split('').map(d => banglaDigits[d] ?? d).join('');
}

function loadPlayer(list, index, autoplay) {
    if (list.length === 0) return;

    const newTrackList = list.map(li => ({
        name: li.dataset.name,
        artist: li.dataset.artist,
        album: li.dataset.album,
        image: li.dataset.image,
        path: li.dataset.path,
    }));

    currentList.forEach(li => li.classList.remove('active'));
    list[index].classList.add('active');

    if (!mainJsLoaded) {
        mainJsLoaded = true;
        window.track_list = newTrackList;
        const script = document.createElement('script');
        script.src = 'players/main.js';
        document.body.appendChild(script);
    } else {
        track_list = newTrackList;
        track_index = index;
        loadTrack(index);
        if (autoplay) playTrack();
    }
}

function playFromList(li) {
    const index = currentList.indexOf(li);
    if (index === -1) return;
    loadPlayer(currentList, index, true);
}

function makeTagLink(text, href) {
    const a = document.createElement('a');
    a.className = 'song-tag';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = text;
    a.addEventListener('click', e => e.stopPropagation());
    return a;
}

function makeSongLink() {
    const s = document.createElement('span');
    s.className = 'song-link';
    s.setAttribute('aria-hidden', 'true');
    return s;
}

function makeSongPlay() {
    const s = document.createElement('span');
    s.className = 'song-play';
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<i class="fa fa-play"></i>';
    return s;
}

fetch('radio/songs.csv')
    .then(r => r.text())
    .then(csvText => {
        const allRows = parseCSV(csvText);
        const uniq = key => new Set(allRows.map(r => r[key]).filter(v => v && v !== 'Uncat')).size;
        document.getElementById('mini-stat-albums').textContent = convertToBanglaNumber(uniq('album_en'));
        document.getElementById('mini-stat-singers').textContent = convertToBanglaNumber(uniq('singer'));
        document.getElementById('mini-stat-groups').textContent = convertToBanglaNumber(uniq('group'));
        document.getElementById('mini-stat-songs').textContent = convertToBanglaNumber(allRows.length);

        const rows = allRows.filter(r => (r.Song || '').trim() && (r.src || '').trim());
        const picked = [...rows].sort(() => Math.random() - 0.5).slice(0, RANDOM_SONG_COUNT);

        const listEl = document.getElementById('song-list');
        const loadingRow = document.getElementById('loading-row');

        picked.forEach((song, i) => {
            const name = song.Song.trim();
            const album = (song.album || '').trim();
            const singer = (song.singer || '').trim();
            const group = (song.group || '').trim();
            const albumEn = (song.album_en || '').trim().toLowerCase();
            const artist = group || singer;
            const image = (song.album_art || '').trim() || STOCK_IMAGES[i % STOCK_IMAGES.length];

            const li = document.createElement('li');
            li.dataset.name = name;
            li.dataset.artist = artist;
            li.dataset.album = album;
            li.dataset.image = image;
            li.dataset.path = song.src.trim();

            const nameLink = document.createElement('a');
            nameLink.className = 'song-name';
            nameLink.href = 'all-songs.html?query=' + encodeURIComponent(name);
            nameLink.target = '_blank';
            nameLink.rel = 'noopener';
            nameLink.textContent = name;
            nameLink.addEventListener('click', e => e.stopPropagation());

            const tagLinks = [];
            if (group) tagLinks.push(makeTagLink(group, 'all-songs.html?query=' + encodeURIComponent(group)));
            if (singer) tagLinks.push(makeTagLink(singer, 'all-songs.html?query=' + encodeURIComponent(singer)));
            if (album) {
                const albumHref = (albumEn && albumEn !== 'uncat')
                    ? `players/${albumEn}.html`
                    : 'all-songs.html?query=' + encodeURIComponent(album);
                tagLinks.push(makeTagLink(album, albumHref));
            }

            li.appendChild(nameLink);
            tagLinks.forEach(a => {
                li.appendChild(makeSongLink());
                li.appendChild(a);
            });
            li.appendChild(makeSongPlay());
            li.addEventListener('click', () => playFromList(li));
            listEl.insertBefore(li, loadingRow);
        });

        loadingRow.style.display = picked.length ? 'none' : '';
        currentList = Array.from(listEl.querySelectorAll('li[data-name]'));
        if (currentList.length) loadPlayer(currentList, 0, false);
    })
    .catch(error => console.error('গান লোডে সমস্যা:', error));

// Nav
function toggleMenu() {
  var menu = document.querySelector(".topnav .menu");
  menu.classList.toggle("show");
}
    </script>'''


def build_index_html(rows):
    total = len(load_all_songs(rows))
    html = (
        ALL_SONGS_TEMPLATE
        .replace(_ALL_SONGS_HERO_BLOCK, _index_hero_html(bengali_numeral(total)))
        .replace(_ALL_SONGS_LIST_WRAP_BLOCK, _INDEX_LIST_WRAP_BLOCK)
        .replace(_ALL_SONGS_SCRIPT_BLOCK, _INDEX_SCRIPT_BLOCK)
        .replace("{{NAV}}", render_nav("index.html"))
        .replace("{{PAGE_TITLE}}", "আলোময় সঙ্গীত — সকল গান শুনুন")
        .replace("{{CANONICAL_URL}}", f"{SITE_BASE_URL}/")
        .replace("{{BREADCRUMB_NAME}}", "হোম")
    )
    return html, total


STAT_TEMPLATE = r'''<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>আলোময় সঙ্গীত — পরিসংখ্যান</title>
<meta name="description" content="আলোময় সঙ্গীতের অ্যালবাম, শিল্পী ও গানের সার্বিক পরিসংখ্যান।">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
<link rel="stylesheet" href="css/header.css">
<link rel="icon" href="favicon.ico">

<!-- PWA -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#060a16">
<link rel="apple-touch-icon" href="{{LOGO}}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="আলোময় সঙ্গীত">
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RN5RYTV144"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RN5RYTV144');
</script>

<style>
  :root {
    --bg: #060a16;
    --bg-2: #0b1224;
    --panel: rgba(255, 255, 255, 0.05);
    --panel-border: rgba(255, 255, 255, 0.09);
    --text: #eaf0ff;
    --text-dim: #9aa7c7;
    --accent-a: #35e6ff;
    --accent-b: #b06bff;
    --accent-c: #ff4fd8;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans Bengali', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif;
    overflow-x: hidden;
  }

  /* Ambient futuristic backdrop: soft glow blobs + a faint moving grid */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .backdrop::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
  }

  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
  }

  .glow-1 { top: -10%; left: -8%; width: 46vw; height: 46vw; background: var(--accent-a); }
  .glow-2 { bottom: -14%; right: -10%; width: 52vw; height: 52vw; background: var(--accent-b); }
  .glow-3 { top: 35%; right: 20%; width: 30vw; height: 30vw; background: var(--accent-c); opacity: 0.22; }

  /* .topnav itself is now styled directly in css/header.css (shared by
     every page that uses it), so no page-specific override is needed here. */

  .wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 20px 80px;
  }

  @media screen and (max-width: 600px) {
    .wrap { padding-top: 70px; }
  }

  header.hero {
    text-align: center;
    padding: 30px 0 44px;
  }

  h1.tagline {
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    line-height: 1.35;
    margin: 0 0 14px;
    font-weight: 700;
  }

  h1.tagline .accent {
    background: linear-gradient(90deg, var(--accent-a), var(--accent-c));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  p.sub {
    color: var(--text-dim);
    max-width: 560px;
    margin: 0 auto;
    font-size: 1rem;
  }

  .stats-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px;
    max-width: 1000px;
    margin: 50px auto 0;
  }

  .stat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: var(--panel);
    border: 1px solid var(--panel-border);
    border-radius: 22px;
    padding: 34px 40px;
    backdrop-filter: blur(10px);
    flex: 1 1 200px;
    text-decoration: none;
    transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
  }

  a.stat-box {
    cursor: pointer;
  }

  a.stat-box:hover {
    transform: translateY(-6px);
    border-color: var(--accent-a);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(53, 230, 255, 0.25), 0 0 26px rgba(176, 107, 255, 0.25);
  }

  .stat-box i {
    font-size: clamp(4.5rem, 9vw, 7.7rem);
    background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-box .stat-number {
    font-size: clamp(2.4rem, 5vw, 4.4rem);
    font-weight: 700;
    color: var(--text);
  }

  .stat-box .stat-label {
    font-size: 1.05rem;
    color: var(--text-dim);
  }

  footer {
    position: relative;
    z-index: 1;
    text-align: center;
    color: var(--text-dim);
    font-size: 0.78rem;
    padding: 30px 20px 50px;
  }

  footer a { color: var(--accent-a); text-decoration: none; }
</style>
</head>
<body>

{{NAV}}

<div class="backdrop">
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="glow glow-3"></div>
</div>

<div class="wrap">
  <header class="hero">
    <h1 class="tagline">আলোময় সঙ্গীতের <span class="accent">পরিসংখ্যান</span></h1>
    <div class="stats-strip" id="stats-strip">
      <a class="stat-box" href="albums.html"><i class="fas fa-record-vinyl"></i><span class="stat-number" id="stat-albums">-</span><span class="stat-label">অ্যালবাম</span></a>
      <a class="stat-box" href="singers.html"><i class="fas fa-user"></i><span class="stat-number" id="stat-singers">-</span><span class="stat-label">শিল্পী</span></a>
      <div class="stat-box"><i class="fas fa-users"></i><span class="stat-number" id="stat-groups">-</span><span class="stat-label">শিল্পীগোষ্ঠী</span></div>
      <a class="stat-box" href="all-songs.html"><i class="fas fa-music"></i><span class="stat-number" id="stat-songs">-</span><span class="stat-label">গান</span></a>
    </div>
  </header>
</div>

<footer>
  &copy; আলোময় সঙ্গীত — <a href="albums.html">সকল অ্যালবাম দেখুন</a>
</footer>

<script>
  function toggleMenu() {
    document.querySelector(".topnav .menu").classList.toggle("show");
  }

  // Stats are computed live from the CSV on each visit, so they never drift
  // out of sync the way a build-time snapshot would.
  function convertToBanglaNumber(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(number).split('').map(d => banglaDigits[d] ?? d).join('');
  }

  function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, h, i) => {
        obj[h] = values[i] ? values[i].trim() : '';
        return obj;
      }, {});
    });
  }

  fetch('radio/songs.csv')
    .then(r => r.text())
    .then(csvText => {
      const rows = parseCSV(csvText);
      const uniq = key => new Set(rows.map(r => r[key]).filter(v => v && v !== 'Uncat')).size;
      document.getElementById('stat-albums').textContent = convertToBanglaNumber(uniq('album_en'));
      document.getElementById('stat-singers').textContent = convertToBanglaNumber(uniq('singer'));
      document.getElementById('stat-groups').textContent = convertToBanglaNumber(uniq('group'));
      document.getElementById('stat-songs').textContent = convertToBanglaNumber(rows.length);
    })
    .catch(error => console.error('পরিসংখ্যান লোডে সমস্যা:', error));
</script>

</body>
</html>
'''.replace("{{LOGO}}", LOGO_PATH)


ALBUMS_TEMPLATE = r'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>আলোময় সঙ্গীত: অ্যালবাম তালিকা</title>
    <link rel="stylesheet" href="css/header.css">
    <script src="js/header.js"></script>
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RN5RYTV144"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RN5RYTV144');
</script>
    <!-- ShareThis removed for now (see how-txt item 51):
    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=6760d0c4a0922d001f328006&product=sticky-share-buttons&source=platform" async="async"></script>
    -->
    <!-- Link to FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="icon" href="favicon.ico">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#060a16">
    <link rel="apple-touch-icon" href="{{LOGO}}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="আলোময় সঙ্গীত">
    <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker.register("sw.js").catch(function () {});
        });
      }
    </script>
    <style>
      :root {
        --bg: #060a16;
        --bg-2: #0b1224;
        --panel: rgba(255, 255, 255, 0.05);
        --panel-border: rgba(255, 255, 255, 0.09);
        --text: #eaf0ff;
        --text-dim: #9aa7c7;
        --accent-a: #35e6ff;
        --accent-b: #b06bff;
        --accent-c: #ff4fd8;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: 'Noto Sans Bengali', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif;
        overflow-x: hidden;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .backdrop::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
      }

      .glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.35;
      }

      .glow-1 { top: -10%; left: -8%; width: 46vw; height: 46vw; background: var(--accent-a); }
      .glow-2 { bottom: -14%; right: -10%; width: 52vw; height: 52vw; background: var(--accent-b); }
      .glow-3 { top: 35%; right: 20%; width: 30vw; height: 30vw; background: var(--accent-c); opacity: 0.22; }

      .wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 100px 20px 80px;
      }

      @media screen and (max-width: 600px) {
        .wrap { padding-top: 70px; }
      }

      header.hero {
        text-align: center;
        padding: 20px 0 40px;
      }

      h1.tagline {
        font-size: clamp(1.6rem, 4vw, 2.6rem);
        line-height: 1.35;
        margin: 0 0 10px;
        font-weight: 700;
      }

      h1.tagline .accent {
        background: linear-gradient(90deg, var(--accent-a), var(--accent-c));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      p.sub {
        color: var(--text-dim);
        max-width: 560px;
        margin: 0 auto;
        font-size: 1rem;
      }

      .search-row {
        max-width: 480px;
        margin: 26px auto 0;
        position: relative;
      }

      .search-row input {
        width: 100%;
        padding: 14px 18px 14px 46px;
        border-radius: 14px;
        border: 1px solid var(--panel-border);
        background: var(--panel);
        color: var(--text);
        font-size: 0.95rem;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }

      .search-row input:focus {
        border-color: var(--accent-a);
        box-shadow: 0 0 0 3px rgba(53, 230, 255, 0.15);
      }

      .search-row i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-dim);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 30px;
      }

      .card {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: var(--text);
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 16px;
        padding: 16px 18px;
        backdrop-filter: blur(10px);
        transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        border-color: var(--accent-a);
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(53, 230, 255, 0.25), 0 0 26px rgba(176, 107, 255, 0.25);
      }

      .card-index {
        font-size: 0.72rem;
        color: var(--accent-a);
        margin-bottom: 6px;
      }

      .card-title {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.3;
      }

      .no-results {
        text-align: center;
        color: var(--text-dim);
        padding: 60px 0;
        display: none;
      }

      .featured-albums {
        margin-top: 50px;
      }

      .featured-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0 0 16px;
        text-align: center;
      }

      .featured-slider-wrap {
        position: relative;
      }

      .fgrid {
        display: flex;
        overflow-x: auto;
        gap: 18px;
        padding: 4px 4px 14px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: var(--accent-a) transparent;
      }

      .fgrid::-webkit-scrollbar {
        height: 6px;
      }

      .fgrid::-webkit-scrollbar-thumb {
        background: var(--panel-border);
        border-radius: 999px;
      }

      .fslider-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--panel-border);
        background: rgba(6, 10, 22, 0.75);
        backdrop-filter: blur(10px);
        color: var(--text);
        cursor: pointer;
        z-index: 2;
        transition: border-color .2s, background .2s;
      }

      .fslider-arrow:hover {
        border-color: var(--accent-a);
        background: rgba(53, 230, 255, 0.12);
      }

      .fslider-arrow.prev { left: -6px; }
      .fslider-arrow.next { right: -6px; }

      @media (max-width: 700px) {
        .fslider-arrow {
          width: 34px;
          height: 34px;
          font-size: 0.85rem;
        }
        .fslider-arrow.prev { left: 2px; }
        .fslider-arrow.next { right: 2px; }
      }

      .fcard {
        display: flex;
        flex: 0 0 190px;
        flex-direction: column;
        text-decoration: none;
        color: var(--text);
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 18px;
        padding: 14px;
        backdrop-filter: blur(10px);
        transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
      }

      .fcard:hover {
        transform: translateY(-6px);
        border-color: var(--accent-a);
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(53, 230, 255, 0.25), 0 0 26px rgba(176, 107, 255, 0.25);
      }

      .fcard-art {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 12px;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(53, 230, 255, 0.15), rgba(176, 107, 255, 0.15));
        margin-bottom: 12px;
      }

      .fcard-art img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .fcard-art img.fallback {
        object-fit: contain;
        padding: 22%;
        opacity: 0.8;
      }

      .fcard-title {
        font-size: 0.92rem;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 4px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .fcard-singer {
        font-size: 0.78rem;
        color: var(--text-dim);
        margin-bottom: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .fcard-count {
        font-size: 0.72rem;
        color: var(--accent-a);
        margin-top: auto;
      }
    </style>
</head>

<body>
       <!-- ShareThis removed for now (see how-txt item 51): <div class="sharethis-sticky-share-buttons"></div> -->

{{NAV}}

<div class="backdrop">
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="glow glow-3"></div>
</div>

<div class="wrap">
  <header class="hero">
    <h1 class="tagline">সকল <span class="accent">অ্যালবাম</span></h1>
    <p class="sub" id="count-line">{{COUNT}}টি অ্যালবাম থেকে বেছে নিন</p>
    <div class="search-row">
      <i class="fa fa-search"></i>
      <input type="text" id="search-input" placeholder="অ্যালবাম বা শিল্পীর নাম লিখুন..." autocomplete="off">
    </div>
  </header>

  <section class="featured-albums">
    <h2 class="featured-title">অ্যালবাম ব্রাউজ করুন</h2>
    <div class="featured-slider-wrap" id="featured-slider-wrap">
      <button type="button" class="fslider-arrow prev" id="featured-slider-prev" aria-label="আগের অ্যালবাম"><i class="fa fa-chevron-left"></i></button>
      <div class="fgrid" id="featured-grid">
{{SLIDER_CARDS}}
      </div>
      <button type="button" class="fslider-arrow next" id="featured-slider-next" aria-label="পরের অ্যালবাম"><i class="fa fa-chevron-right"></i></button>
    </div>
  </section>

  <main>
    <div class="grid" id="album-grid">
{{CARDS}}
    </div>
    <div class="no-results" id="no-results">কোনো অ্যালবাম পাওয়া যায়নি।</div>
  </main>
</div>

    <script>
{{FILTER_SCRIPT}}
    </script>

    <script>
      const featuredGrid = document.getElementById('featured-grid');
      const featuredSliderWrap = document.getElementById('featured-slider-wrap');
      const featuredPrev = document.getElementById('featured-slider-prev');
      const featuredNext = document.getElementById('featured-slider-next');
      const featuredCards = Array.from(featuredGrid.children);
      const featuredScrollByCard = () => (featuredCards[0] ? featuredCards[0].getBoundingClientRect().width + 18 : 200) * 2;

      function animateFeaturedScrollBy(delta, duration) {
        const start = featuredGrid.scrollLeft;
        const startTime = performance.now();
        function step(now) {
          const t = Math.min(1, (now - startTime) / duration);
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          featuredGrid.scrollLeft = start + delta * eased;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      featuredPrev.addEventListener('click', () => animateFeaturedScrollBy(-featuredScrollByCard(), 320));
      featuredNext.addEventListener('click', () => animateFeaturedScrollBy(featuredScrollByCard(), 320));

      let featuredAutoScrollPaused = false;
      featuredSliderWrap.addEventListener('mouseenter', () => { featuredAutoScrollPaused = true; });
      featuredSliderWrap.addEventListener('mouseleave', () => { featuredAutoScrollPaused = false; });
      featuredSliderWrap.addEventListener('touchstart', () => { featuredAutoScrollPaused = true; }, { passive: true });
      featuredSliderWrap.addEventListener('touchend', () => { featuredAutoScrollPaused = false; });

      setInterval(function () {
        if (!featuredAutoScrollPaused && featuredGrid.scrollWidth > featuredGrid.clientWidth) {
          if (featuredGrid.scrollLeft + featuredGrid.clientWidth >= featuredGrid.scrollWidth - 1) {
            featuredGrid.scrollLeft = 0;
          } else {
            featuredGrid.scrollLeft += 1;
          }
        }
      }, 16);
    </script>
</body>
</html>
'''.replace("{{LOGO}}", LOGO_PATH)


SINGERS_TEMPLATE = r'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>আলোময় সঙ্গীত: শিল্পী তালিকা</title>
    <link rel="stylesheet" href="css/header.css">
    <script src="js/header.js"></script>
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RN5RYTV144"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RN5RYTV144');
</script>
    <!-- ShareThis removed for now (see how-txt item 51):
    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=6760d0c4a0922d001f328006&product=sticky-share-buttons&source=platform" async="async"></script>
    -->
    <!-- Link to FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="icon" href="favicon.ico">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#060a16">
    <link rel="apple-touch-icon" href="{{LOGO}}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="আলোময় সঙ্গীত">
    <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker.register("sw.js").catch(function () {});
        });
      }
    </script>
    <style>
      :root {
        --bg: #060a16;
        --bg-2: #0b1224;
        --panel: rgba(255, 255, 255, 0.05);
        --panel-border: rgba(255, 255, 255, 0.09);
        --text: #eaf0ff;
        --text-dim: #9aa7c7;
        --accent-a: #35e6ff;
        --accent-b: #b06bff;
        --accent-c: #ff4fd8;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: 'Noto Sans Bengali', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif;
        overflow-x: hidden;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .backdrop::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
      }

      .glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.35;
      }

      .glow-1 { top: -10%; left: -8%; width: 46vw; height: 46vw; background: var(--accent-a); }
      .glow-2 { bottom: -14%; right: -10%; width: 52vw; height: 52vw; background: var(--accent-b); }
      .glow-3 { top: 35%; right: 20%; width: 30vw; height: 30vw; background: var(--accent-c); opacity: 0.22; }

      .wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 100px 20px 80px;
      }

      @media screen and (max-width: 600px) {
        .wrap { padding-top: 70px; }
      }

      header.hero {
        text-align: center;
        padding: 20px 0 40px;
      }

      h1.tagline {
        font-size: clamp(1.6rem, 4vw, 2.6rem);
        line-height: 1.35;
        margin: 0 0 10px;
        font-weight: 700;
      }

      h1.tagline .accent {
        background: linear-gradient(90deg, var(--accent-a), var(--accent-c));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      p.sub {
        color: var(--text-dim);
        max-width: 560px;
        margin: 0 auto;
        font-size: 1rem;
      }

      .search-row {
        max-width: 480px;
        margin: 26px auto 0;
        position: relative;
      }

      .search-row input {
        width: 100%;
        padding: 14px 18px 14px 46px;
        border-radius: 14px;
        border: 1px solid var(--panel-border);
        background: var(--panel);
        color: var(--text);
        font-size: 0.95rem;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }

      .search-row input:focus {
        border-color: var(--accent-a);
        box-shadow: 0 0 0 3px rgba(53, 230, 255, 0.15);
      }

      .search-row i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-dim);
      }

      .sort-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 14px;
        font-size: 0.85rem;
        color: var(--text-dim);
      }

      .sort-row select {
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid var(--panel-border);
        background: var(--bg-2, #0b1224);
        color: var(--text);
        font-size: 0.85rem;
        font-family: inherit;
        cursor: pointer;
      }

      .sort-direction {
        display: flex;
        gap: 4px;
      }

      .sort-dir-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding: 0;
        border-radius: 8px;
        border: 1px solid var(--panel-border);
        background: var(--bg-2, #0b1224);
        color: var(--text-dim);
        cursor: pointer;
        transition: border-color .2s, color .2s, background .2s;
      }

      .sort-dir-btn:hover {
        border-color: var(--accent-a);
        color: var(--text);
      }

      .sort-dir-btn.active {
        border-color: var(--accent-a);
        color: var(--accent-a);
        background: rgba(53, 230, 255, 0.12);
      }

      .singer-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
        margin-top: 30px;
      }

      .singer-card {
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 16px;
        padding: 16px 20px;
        backdrop-filter: blur(10px);
        transition: border-color .22s ease, box-shadow .22s ease;
      }

      .singer-card:hover {
        border-color: var(--accent-a);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(53, 230, 255, 0.2);
      }

      .singer-name {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .singer-count {
        font-size: 0.78rem;
        color: var(--accent-a);
        margin-bottom: 12px;
      }

      .singer-albums {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .singer-albums li {
        font-size: 0.82rem;
        padding-left: 14px;
        position: relative;
      }

      .singer-albums li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--accent-a);
      }

      .singer-albums a {
        text-decoration: none;
        color: var(--text);
        transition: color .2s;
      }

      .singer-albums a:hover {
        color: var(--accent-a);
        text-decoration: underline;
      }

      .singer-albums li.singer-all {
        margin-top: 4px;
        font-weight: 700;
      }

      .singer-albums li.singer-all a {
        color: var(--accent-a);
      }

      .no-results {
        text-align: center;
        color: var(--text-dim);
        padding: 60px 0;
        display: none;
      }
    </style>
</head>

<body>
       <!-- ShareThis removed for now (see how-txt item 51): <div class="sharethis-sticky-share-buttons"></div> -->

{{NAV}}

<div class="backdrop">
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="glow glow-3"></div>
</div>

<div class="wrap">
  <header class="hero">
    <h1 class="tagline"><span class="accent">শিল্পী</span> তালিকা</h1>
    <p class="sub" id="count-line">মোট শিল্পী: {{COUNT}}</p>
    <div class="search-row">
      <i class="fa fa-search"></i>
      <input type="text" id="search-input" placeholder="শিল্পীর নাম লিখুন..." autocomplete="off">
    </div>
    <div class="sort-row">
      <label for="sort-select">সাজান:</label>
      <select id="sort-select">
        <option value="albums" selected>অ্যালবাম সংখ্যা</option>
        <option value="name">নাম</option>
        <option value="songs">গান সংখ্যা</option>
      </select>
      <div class="sort-direction">
        <button type="button" id="sort-asc" class="sort-dir-btn" title="ঊর্ধ্বক্রম" aria-label="Ascending">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
        <button type="button" id="sort-desc" class="sort-dir-btn active" title="নিম্নক্রম" aria-label="Descending">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
        </button>
      </div>
    </div>
  </header>

  <main>
    <div class="singer-list" id="singer-list">
{{LIST}}
    </div>
    <div class="no-results" id="no-results">কোনো শিল্পী পাওয়া যায়নি।</div>
  </main>
</div>

    <script>
{{FILTER_SCRIPT}}
{{SORT_SCRIPT}}
    </script>
</body>
</html>
'''.replace("{{LOGO}}", LOGO_PATH)


ALL_SONGS_TEMPLATE = r'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="আলোময় সঙ্গীত অনলাইনে ইসলামী সঙ্গীত শোনার শীর্ষ ওয়েবসাইট। অনলাইন প্লেলিস্ট অন করে কাজের ফাঁকে বা অবসর সময়ে বসে বসে গান শোনার অনন্য সাইট এটি। রয়েছে দেশবরেণ্য শিল্পীদের সঙ্গীত। মেন্যু থেকে শিল্পী, শিল্পীগোষ্ঠী বা বিভাগ বাছাই করুন। করতে পারবেন সার্চও।">
    <meta name="robots" content="index, follow">
    <title>{{PAGE_TITLE}}</title>
    <!-- ShareThis removed for now (see how-txt item 51):
    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=6760d0c4a0922d001f328006&product=sticky-share-buttons&source=platform" async="async"></script>
    -->
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="players/style.css">
    <link rel="canonical" href="{{CANONICAL_URL}}">
    <!-- Open Graph Meta Tags -->
<meta property="og:title" content="আলোময় সঙ্গীত  -  অনলাইন সঙ্গীত প্লেয়ার">
<meta property="og:description" content="অনলাইন প্লেলিস্ট অন করে কাজের ফাঁকে বা অবসর সময়ে বসে বসে গান শোনার অনন্য সাইট এটি">
<meta property="og:type" content="website">
<meta property="og:url" content="{{CANONICAL_URL}}">
<meta property="og:image" content="https://alomoy.github.io/songit/images/bg/alomoy_banner.jpg">
<meta property="og:locale" content="bn_BD">
<meta property="og:site_name" content="আলোময় সঙ্গীত">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<!-- PWA -->
<link rel="icon" href="favicon.ico">
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#060a16">
<link rel="apple-touch-icon" href="{{LOGO}}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="আলোময় সঙ্গীত">
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RN5RYTV144"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RN5RYTV144');
</script>

<style>
    * { box-sizing: border-box; }

    /* header.css's body sets a fixed background image + flex centering meant
       for the old light pages; this page reuses the dark player theme
       instead, so override those specifically rather than editing the
       shared stylesheet. */
    body {
        background: var(--bg);
    }

    .search-hero {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        padding: 90px 20px 10px;
        text-align: center;
    }

    .search-hero .tagline {
        font-size: clamp(1.4rem, 4vw, 2.2rem);
        margin: 0 0 18px;
        font-weight: 700;
    }

    .search-hero .tagline .accent {
        background: linear-gradient(90deg, var(--accent-a), var(--accent-c));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .search-hero .search-row {
        position: relative;
        max-width: 480px;
        margin: 0 auto;
    }

    .search-hero .search-row input {
        width: 100%;
        padding: 14px 18px 14px 46px;
        border-radius: 14px;
        border: 1px solid var(--panel-border);
        background: var(--panel);
        color: var(--text);
        font-size: 0.95rem;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
    }

    .search-hero .search-row input:focus {
        border-color: var(--accent-a);
        box-shadow: 0 0 0 3px rgba(53, 230, 255, 0.15);
    }

    .search-hero .search-row i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-dim);
    }

    .filter-toggle {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 14px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1px solid var(--panel-border);
        background: var(--panel);
        color: var(--text-dim);
        font-size: 0.85rem;
        cursor: pointer;
        transition: border-color .2s, color .2s;
    }

    .filter-toggle:hover,
    .filter-toggle.open {
        border-color: var(--accent-a);
        color: var(--text);
    }

    .filter-panel {
        max-width: 700px;
        margin: 14px auto 0;
        display: none;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 16px;
        padding: 16px;
        backdrop-filter: blur(10px);
    }

    .filter-panel.open {
        display: flex;
    }

    .filter-panel div {
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: left;
        flex: 1 1 150px;
    }

    .filter-panel label {
        font-size: 0.72rem;
        color: var(--text-dim);
    }

    .filter-panel select {
        padding: 9px 10px;
        border-radius: 10px;
        border: 1px solid var(--panel-border);
        background: var(--bg-2, #0b1224);
        color: var(--text);
        font-size: 0.88rem;
        font-family: inherit;
        cursor: pointer;
    }

    .count-line {
        margin-top: 12px;
        color: var(--accent-a);
        font-size: 0.85rem;
        min-height: 1.2em;
    }

    .search-hero .sub {
        color: var(--text-dim);
        margin: 0 0 16px;
        font-size: 0.95rem;
    }

    .all-songs-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 22px;
        border-radius: 999px;
        border: 1px solid var(--panel-border);
        background: var(--panel);
        color: var(--accent-a);
        text-decoration: none;
        font-size: 0.9rem;
        transition: border-color .2s, color .2s;
    }

    .all-songs-link:hover {
        border-color: var(--accent-a);
        color: var(--accent-c);
    }

    .mini-stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        max-width: 560px;
        margin: 22px auto 0;
    }

    .mini-stat {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 12px;
        padding: 8px 14px;
        backdrop-filter: blur(10px);
    }

    .mini-stat i {
        font-size: 1rem;
        background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .mini-stat-number {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text);
    }

    .mini-stat-label {
        font-size: 0.75rem;
        color: var(--text-dim);
    }

    #player-root {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 15;
        height: auto;
        min-height: 0;
        width: 100%;
        margin: 0;
        padding: 5px 16px calc(5px + env(safe-area-inset-bottom, 0px));
        background: rgba(6, 10, 22, 0.92);
        backdrop-filter: blur(14px);
        border-top: 4px solid;
        border-image: linear-gradient(90deg, #ffd60a, #ff3b30) 1;
        box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.45);
        justify-content: center;
        gap: 2px;
        /* Half the base icon scale from players/style.css so the buttons
           row (the tallest part of this bar) takes about half the height
           on desktop/tablet, where there's no "icons too small" problem
           and no need for the bar to span the full width. */
        --icon-unit: min(0.5px, 0.08vw);
    }

    /* On phones, prioritize icon size over bar height (there's plenty of
       vertical room on a tall phone screen): the buttons row spans ~96%
       of the viewport width here, same as players/*.html, even though
       that makes this fixed bottom bar taller than the desktop/tablet
       version above. */
    @media (max-width: 600px) {
        #player-root {
            --icon-unit: 0.2vw;
        }
    }

    #player-root .details {
        margin-top: 0;
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        column-gap: 6px;
        row-gap: 0;
        width: 100%;
    }

    #player-root .track-album {
        display: none;
    }

    #player-root .track-name {
        font-size: 1rem;
    }

    #player-root .track-artist {
        font-size: 0.8rem;
    }

    /* Continuous ticker for the name+artist, always running (see
       updateMarquee() in players/main.js) rather than only when it
       overflows -- .marquee-track holds the real name/artist plus an
       identical aria-hidden copy back to back; looping the scroll by
       exactly 50% of the track's own width (it's always exactly twice
       one item's width) lands it back on an identical-looking copy, so
       the repeat is seamless with no jump. */
    #player-root .marquee-wrap {
        overflow: hidden;
        width: 100%;
        max-width: 480px;
        -webkit-mask-image: linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent);
        mask-image: linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent);
    }

    #player-root .marquee-track {
        display: inline-flex;
        white-space: nowrap;
        width: max-content;
        animation: player-marquee-loop linear infinite;
        animation-duration: var(--marquee-duration, 12s);
    }

    #player-root .marquee-item {
        display: inline-flex;
        align-items: baseline;
        column-gap: 6px;
        padding-right: 48px;
    }

    @keyframes player-marquee-loop {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }

    #player-root .now-playing {
        font-size: 0.78rem;
    }

    #player-root .slider_container {
        width: 100%;
        max-width: 480px;
    }

    #player-root .current-time,
    #player-root .total-duration {
        padding: 4px;
    }

    #player-root #download-link {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: calc(15 * var(--icon-unit)) calc(20 * var(--icon-unit));
    }

    #player-root #download-link i {
        font-size: calc(32 * var(--icon-unit));
    }

    .song-list-wrap {
        position: relative;
        z-index: 1;
        max-width: 700px;
        margin: 0 auto;
        padding: 0 20px calc(210px + env(safe-area-inset-bottom, 0px));
    }

    .all-songs-link-bottom {
        display: flex;
        justify-content: center;
        margin: 20px auto 0;
        width: fit-content;
    }

    .song-list {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--panel-border);
        border-radius: 16px;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .song-list li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0;
        padding: 12px 16px;
        cursor: pointer;
        color: var(--text-dim);
        font-size: 0.9rem;
        border-bottom: 1px solid var(--panel-border);
        transition: background .15s, color .15s;
    }

    .song-list li:last-child {
        border-bottom: none;
    }

    .song-list li.song-list-loading {
        cursor: default;
        text-align: center;
        color: var(--text-dim);
        background: none;
    }

    .song-list li.song-list-loading:hover {
        background: none;
        color: var(--text-dim);
    }

    .song-list li:nth-child(odd) {
        background: rgba(255, 255, 255, 0.02);
    }

    .song-list li:nth-child(even) {
        background: rgba(255, 255, 255, 0.045);
    }

    .song-list li:hover {
        background: rgba(53, 230, 255, 0.1);
        color: var(--text);
    }

    .song-list li.active {
        background: rgba(53, 230, 255, 0.16);
        color: var(--accent-a);
        font-weight: 700;
    }

    .song-list .song-name,
    .song-list .song-tag {
        display: inline-block;
        padding: 5px 14px;
        border-radius: 999px;
        border: 1px solid var(--panel-border);
        background: rgba(255, 255, 255, 0.04);
        text-decoration: none;
        white-space: nowrap;
        transition: border-color .15s, background .15s, color .15s;
    }

    .song-list .song-name:hover,
    .song-list .song-tag:hover {
        border-color: var(--accent-a);
        background: rgba(53, 230, 255, 0.12);
        color: var(--accent-a);
    }

    .song-list .song-name {
        color: var(--text);
        font-weight: 600;
    }

    .song-list li.active .song-name {
        color: var(--accent-a);
        border-color: var(--accent-a);
    }

    .song-list .song-tag {
        color: var(--text-dim);
        font-size: 0.8rem;
        font-weight: 400;
    }

    /* The coupler between consecutive pills -- like linked train cars --
       shows the song name/group/singer/album pills belong to one song,
       instead of reading as unrelated floating chips. */
    .song-list .song-link {
        display: inline-block;
        width: 14px;
        height: 2px;
        margin: 0 -1px;
        border-radius: 2px;
        background: var(--panel-border);
        flex-shrink: 0;
        transition: background .15s;
    }

    .song-list li:hover .song-link {
        background: rgba(53, 230, 255, 0.4);
    }

    .song-list li.active .song-link {
        background: var(--accent-a);
    }

    /* A dedicated play affordance at the right edge of the row, since most
       of the row is now taken up by name/tag pills that navigate away
       instead of playing. */
    .song-list .song-play {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-left: auto;
        border-radius: 50%;
        border: 1px solid var(--panel-border);
        background: rgba(255, 255, 255, 0.04);
        color: var(--text-dim);
        font-size: 0.72rem;
        flex-shrink: 0;
        transition: border-color .15s, background .15s, color .15s;
    }

    .song-list li:hover .song-play {
        border-color: var(--accent-a);
        background: rgba(53, 230, 255, 0.12);
        color: var(--accent-a);
    }

    .song-list li.active .song-play {
        border-color: var(--accent-a);
        background: var(--accent-a);
        color: var(--bg);
    }
</style>

    <!-- Schema Markup -->

    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "আলোময় সঙ্গীত",
  "url": "{{CANONICAL_URL}}",
  "description": "অনালাইনে শুনুন ইসলামী সঙ্গীত।",
  "inLanguage": "bn",
  "about": {
    "@type": "MusicGroup",
    "name": "আলোময় সঙ্গীত",
    "genre": "বাংলা ইসলামী সঙ্গীত"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "{{BREADCRUMB_NAME}}",
        "item": "{{CANONICAL_URL}}"
      }
    ]
  }
}
</script>

</head>
<body>
  <!-- ShareThis removed for now (see how-txt item 51): <div class="sharethis-sticky-share-buttons"></div> -->

{{NAV}}

<div class="search-hero">
  <h1 class="tagline">সব <span class="accent">গান</span></h1>
  <div class="search-row">
    <i class="fa fa-search"></i>
    <input type="text" id="search-input" placeholder="গান, শিল্পী বা অ্যালবামের নাম লিখুন..." autocomplete="off">
  </div>
  <div class="count-line" id="count-line">{{TOTAL_COUNT_LINE}}</div>

  <button type="button" class="filter-toggle" id="filter-toggle" aria-expanded="false">
    <i class="fa fa-sliders-h"></i> ফিল্টার
  </button>

  <div class="filter-panel" id="filter-panel">
    <div>
      <label for="albumSelect">অ্যালবাম</label>
      <select id="albumSelect">{{ALBUM_OPTIONS}}</select>
    </div>
    <div>
      <label for="singerSelect">শিল্পী</label>
      <select id="singerSelect">{{SINGER_OPTIONS}}</select>
    </div>
    <div>
      <label for="groupSelect">শিল্পীগোষ্ঠী</label>
      <select id="groupSelect">{{GROUP_OPTIONS}}</select>
    </div>
    <div>
      <label for="genreSelect">বিভাগ</label>
      <select id="genreSelect">{{GENRE_OPTIONS}}</select>
    </div>
    <div>
      <label for="subgenreSelect">উপ-বিভাগ</label>
      <select id="subgenreSelect">{{SUBGENRE_OPTIONS}}</select>
    </div>
  </div>
</div>

<div class="song-list-wrap">
  <ol class="song-list" id="song-list">
{{SONG_ITEMS}}
    <li class="song-list-loading" id="no-match-row" style="display:none">কোনো গান পাওয়া যায়নি।</li>
  </ol>
</div>

<div class="player" id="player-root">
  <div class="buttons">
    <div class="repeat-track" onclick="toggleRepeat()" title="Repeat: All">
      <i class="fa fa-redo fa-2x"></i><span class="repeat-badge">১</span>
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
    <div class="current-time">০০:০০</div>
    <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()">
    <div class="total-duration">০০:০০</div>
    <div class="volume-track">
      <div class="volume-icon" onclick="toggleVolumeSlider(event)"><i class="fa fa-volume-up fa-2x"></i></div>
      <div class="volume_popup">
        <input type="range" min="0" max="100" value="99" class="volume_slider" onclick="event.stopPropagation()" onchange="setVolume()">
      </div>
    </div>
    <a id="download-link" href="" download class="btn btn-primary btn-lg"><i class="fa fa-solid fa-download"></i></a>
  </div>
  <div class="details">
    <div class="track-album">Track Album</div>
    <div class="marquee-wrap" id="marquee-wrap">
      <div class="marquee-track" id="marquee-track">
        <span class="marquee-item">
          <span class="track-name">Track Name</span>
          <span class="track-artist">Track Artist</span>
        </span>
        <span class="marquee-item" aria-hidden="true">
          <span class="track-name track-name-dup"></span>
          <span class="track-artist track-artist-dup"></span>
        </span>
      </div>
    </div>
  </div>
  <div class="now-playing">Playing x OF of y</div>
</div>

    <script>
let mainJsLoaded = false;
let searchDebounce = null;
let currentList = [];

const allItems = Array.from(document.querySelectorAll('#song-list li[data-name]'));
const noMatchRow = document.getElementById('no-match-row');
const totalCount = allItems.length;

function convertToBanglaNumber(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(number).split('').map(d => banglaDigits[d] ?? d).join('');
}

function updateCount(visible) {
    document.getElementById('count-line').textContent =
        `${convertToBanglaNumber(visible)} / ${convertToBanglaNumber(totalCount)}টি গান`;
}

function applyFilters() {
    const q = document.getElementById('search-input').value.trim().toLowerCase();
    const selectedAlbum = document.getElementById('albumSelect').value;
    const selectedSinger = document.getElementById('singerSelect').value;
    const selectedGroup = document.getElementById('groupSelect').value;
    const selectedGenre = document.getElementById('genreSelect').value;
    const selectedSubgenre = document.getElementById('subgenreSelect').value;

    const visible = [];
    allItems.forEach(li => {
        const match =
            (!selectedAlbum || li.dataset.album === selectedAlbum) &&
            (!selectedSinger || li.dataset.singer === selectedSinger) &&
            (!selectedGroup || li.dataset.group === selectedGroup) &&
            (!selectedGenre || li.dataset.genre === selectedGenre) &&
            (!selectedSubgenre || li.dataset.subgenre === selectedSubgenre) &&
            (!q || li.dataset.search.includes(q));
        li.style.display = match ? '' : 'none';
        if (match) visible.push(li);
    });

    currentList = visible;
    updateCount(visible.length);
    noMatchRow.style.display = visible.length === 0 ? '' : 'none';
}

function loadPlayer(list, index, autoplay) {
    if (list.length === 0) return;

    const newTrackList = list.map(li => ({
        name: li.dataset.name,
        artist: li.dataset.artist,
        album: li.dataset.album,
        image: li.dataset.image,
        path: li.dataset.path,
    }));

    allItems.forEach(li => li.classList.remove('active'));
    list[index].classList.add('active');

    if (!mainJsLoaded) {
        mainJsLoaded = true;
        window.track_list = newTrackList;
        const script = document.createElement('script');
        script.src = 'players/main.js';
        document.body.appendChild(script);
    } else {
        track_list = newTrackList;
        track_index = index;
        loadTrack(index);
        if (autoplay) playTrack();
    }
}

function playFromList(li) {
    const index = currentList.indexOf(li);
    if (index === -1) return;
    loadPlayer(currentList, index, true);
}

allItems.forEach(li => {
    li.addEventListener('click', () => playFromList(li));
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(applyFilters, 250);
});

const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
filterToggle.addEventListener('click', () => {
    const open = filterPanel.classList.toggle('open');
    filterToggle.classList.toggle('open', open);
    filterToggle.setAttribute('aria-expanded', String(open));
});

['albumSelect', 'singerSelect', 'groupSelect', 'genreSelect', 'subgenreSelect'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyFilters);
});

// A ?query= param (e.g. linked from a singer's "সব" card on singers.html)
// prefills and runs the search instead of the usual shuffle, so that link
// actually lands on a filtered list.
const initialQuery = new URLSearchParams(window.location.search).get('query') || '';
if (initialQuery) {
    searchInput.value = initialQuery;
    applyFilters();
    loadPlayer(currentList, 0, false);
} else {
    // Shuffle the visual order once on load so repeat visits don't always
    // see the same handful of songs first. Every song is still present in
    // the page source regardless of this order -- it's a display-only
    // reorder of already-rendered elements, not a re-render.
    const listEl = document.getElementById('song-list');
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    shuffled.forEach(li => listEl.insertBefore(li, noMatchRow));
    currentList = shuffled;
    updateCount(totalCount);
    loadPlayer(shuffled, 0, false);
}

// Nav
function toggleMenu() {
  var menu = document.querySelector(".topnav .menu");
  menu.classList.toggle("show");
}
    </script>
</body>
</html>
'''.replace("{{LOGO}}", LOGO_PATH)


# ---------------------------------------------------------------------------
# sitemap.xml / robots.txt
# ---------------------------------------------------------------------------
# With ~90 URLs (the 4 main pages plus one per album) and no other page on
# the site linking to literally every player page, a sitemap is the only
# complete map of the site a crawler has -- otherwise discovery depends
# entirely on it following links transitively from index.html/albums.html.

def build_sitemap():
    player_slugs = sorted(
        f[:-5] for f in os.listdir(PLAYERS)
        if f.endswith(".html") and f != "template.html"
    )
    urls = ["", "albums.html", "singers.html", "all-songs.html", "stat.html"]
    urls += [f"players/{slug}.html" for slug in player_slugs]

    entries = "\n".join(
        f"  <url><loc>{esc(f'{SITE_BASE_URL}/{path}' if path else f'{SITE_BASE_URL}/')}</loc></url>"
        for path in urls
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</urlset>\n"
    ), len(urls)


def build_robots_txt():
    return (
        "User-agent: *\n"
        "Allow: /\n"
        f"Sitemap: {SITE_BASE_URL}/sitemap.xml\n"
    )


def main():
    rows = load_rows()

    sync_summary = sync_players(rows)
    print(
        f"players/: {len(sync_summary['deleted'])} deleted, "
        f"{len(sync_summary['created'])} created, "
        f"{len(sync_summary['updated'])} updated, "
        f"{len(sync_summary['unchanged'])} unchanged"
    )
    for slug in sync_summary["deleted"]:
        print(f"  - {slug}")
    for slug in sync_summary["created"]:
        print(f"  + {slug}")
    for slug in sync_summary["updated"]:
        print(f"  ~ {slug}")

    index_html, n_songs_idx = build_index_html(rows)
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
        f.write(index_html)
    print(f"Wrote index.html with {n_songs_idx} songs")

    albums_html, n_albums = build_albums_html(rows)
    with open(os.path.join(ROOT, "albums.html"), "w", encoding="utf-8") as f:
        f.write(albums_html)
    print(f"Wrote albums.html with {n_albums} albums")

    singers_html, n_singers = build_singers_html(rows)
    with open(os.path.join(ROOT, "singers.html"), "w", encoding="utf-8") as f:
        f.write(singers_html)
    print(f"Wrote singers.html with {n_singers} singers")

    all_songs_html, n_songs = build_all_songs_html(rows)
    with open(os.path.join(ROOT, "all-songs.html"), "w", encoding="utf-8") as f:
        f.write(all_songs_html)
    print(f"Wrote all-songs.html with {n_songs} songs")

    with open(os.path.join(ROOT, "stat.html"), "w", encoding="utf-8") as f:
        f.write(build_stat_html())
    print("Wrote stat.html")

    sitemap_xml, n_urls = build_sitemap()
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print(f"Wrote sitemap.xml with {n_urls} URLs")

    with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(build_robots_txt())
    print("Wrote robots.txt")


if __name__ == "__main__":
    main()
