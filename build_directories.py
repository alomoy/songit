#!/usr/bin/env python3
"""Generate static albums.html and singers.html from radio/songs.csv.

Both pages used to fetch the CSV client-side and build every card/list
item with JS, which meant crawlers that don't execute JS (or execute it
incompletely) saw an empty shell. This bakes the actual album/singer
content into the HTML at build time instead, matching the pattern
build_landing.py already uses for index.html. The client-side script
that's left is just a live search filter over the already-rendered
elements (toggling display via data-search), not a builder of them.

Run this whenever songs.csv changes.
"""

import csv
import html
import os
from urllib.parse import quote

ROOT = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(ROOT, "radio/songs.csv")

BENGALI_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def bengali_numeral(n):
    return str(n).translate(BENGALI_DIGITS)


def esc(s):
    return html.escape(s, quote=True)


def load_rows():
    with open(CSV_PATH, encoding="utf-8") as f:
        return list(csv.DictReader(f))


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
    all_href = f'search.html?query={quote(singer["name"])}'
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
        <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=6760d0c4a0922d001f328006&product=sticky-share-buttons&source=platform" async="async"></script>
    <!-- Link to FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
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
    </style>
</head>

<body>
       <div class="sharethis-sticky-share-buttons"></div>

<div class="topnav" id="myTopnav">
  <div class="logo-section">
    <a href="index.html">
      <img src="images/alomoy.png" alt="Alomoy Sangeet Logo">
      <div class="company-info">
        <strong>আলোময় সঙ্গীত</strong><br>
        <em>সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</em>
      </div>
    </a>
  </div>
  <div class="menu">
    <a href="index.html">হোম</a>
    <a href="singers.html">শিল্পী তালিকা</a>
    <a href="albums.html" class="active">অ্যালবাম তালিকা</a>
    <a href="search.html">সঙ্গীত সার্চ</a>
    <a href="all-songs.html">সব গান</a>
  </div>
  <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
    <i class="fa fa-bars"></i>
  </a>
</div>

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
</body>
</html>
'''

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
        <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=6760d0c4a0922d001f328006&product=sticky-share-buttons&source=platform" async="async"></script>
    <!-- Link to FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
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
       <div class="sharethis-sticky-share-buttons"></div>

<div class="topnav" id="myTopnav">
  <div class="logo-section">
    <a href="index.html">
      <img src="images/alomoy.png" alt="Alomoy Sangeet Logo">
      <div class="company-info">
        <strong>আলোময় সঙ্গীত</strong><br>
        <em>সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</em>
      </div>
    </a>
  </div>
  <div class="menu">
    <a href="index.html">হোম</a>
    <a href="singers.html" class="active">শিল্পী তালিকা</a>
    <a href="albums.html">অ্যালবাম তালিকা</a>
    <a href="search.html">সঙ্গীত সার্চ</a>
    <a href="all-songs.html">সব গান</a>
  </div>
  <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
    <i class="fa fa-bars"></i>
  </a>
</div>

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
'''

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


def main():
    rows = load_rows()

    albums = build_albums(rows)
    cards = "\n".join(album_card_html(a, i + 1) for i, a in enumerate(albums))
    albums_html = (
        ALBUMS_TEMPLATE
        .replace("{{CARDS}}", cards)
        .replace("{{COUNT}}", bengali_numeral(len(albums)))
        .replace("{{FILTER_SCRIPT}}", filter_script(".card"))
    )
    with open(os.path.join(ROOT, "albums.html"), "w", encoding="utf-8") as f:
        f.write(albums_html)
    print(f"Wrote albums.html with {len(albums)} albums")

    singers = build_singers(rows)
    items = "\n".join(singer_card_html(s) for s in singers)
    singers_html = (
        SINGERS_TEMPLATE
        .replace("{{LIST}}", items)
        .replace("{{COUNT}}", bengali_numeral(len(singers)))
        .replace("{{FILTER_SCRIPT}}", filter_script(".singer-card"))
        .replace("{{SORT_SCRIPT}}", SORT_SCRIPT)
    )
    with open(os.path.join(ROOT, "singers.html"), "w", encoding="utf-8") as f:
        f.write(singers_html)
    print(f"Wrote singers.html with {len(singers)} singers")


if __name__ == "__main__":
    main()
