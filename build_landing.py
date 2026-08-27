import glob
import html
import json
import re

import os

ROOT = os.path.dirname(os.path.abspath(__file__))


def normalize_image(img):
    if img.startswith("http"):
        return img
    filename = re.sub(r'^(\.\./)?images/', '', img)
    return "images/" + filename


def esc(s):
    return html.escape(s, quote=True)


BENGALI_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def bengali_numeral(n):
    return str(n).translate(BENGALI_DIGITS)


def load_albums():
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


def card_html(a):
    return f'''      <a class="card" href="players/{a['slug']}.html" data-search="{esc((a['album'] + ' ' + a['singer']).lower())}">
        <div class="card-art">
          <img src="{esc(a['image'])}" alt="{esc(a['album'])}" loading="lazy" onerror="this.onerror=null;this.src='images/alomoy.png';this.classList.add('fallback');">
        </div>
        <div class="card-body">
          <div class="card-title">{esc(a['album'])}</div>
          <div class="card-singer">{esc(a['singer'])}</div>
          <div class="card-count">{esc(bengali_numeral(a['count']))}টি গান</div>
        </div>
      </a>'''


def main():
    albums = load_albums()
    cards = "\n".join(card_html(a) for a in albums)

    html_out = TEMPLATE.replace("{{CARDS}}", cards)
    with open(f"{ROOT}/index.html", "w", encoding="utf-8") as f:
        f.write(html_out)
    print(f"Wrote index.html with {len(albums)} albums")


TEMPLATE = r'''<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>আলোময় সঙ্গীত — সকল প্লেলিস্ট</title>
<meta name="description" content="আলোময় সঙ্গীতের সকল অ্যালবাম ও প্লেলিস্ট এক জায়গায় — বাছাই করুন এবং শুনুন।">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
<link rel="stylesheet" href="css/header.css">
<link rel="icon" href="favicon.ico">

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
    gap: 12px;
    max-width: 700px;
    margin: 0 auto;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--panel);
    border: 1px solid var(--panel-border);
    border-radius: 14px;
    padding: 10px 18px;
    backdrop-filter: blur(10px);
  }

  .stat-box i {
    font-size: 1.1rem;
    background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-box .stat-number {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
  }

  .stat-box .stat-label {
    font-size: 0.78rem;
    color: var(--text-dim);
  }

  .search-row {
    max-width: 480px;
    margin: 34px auto 0;
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

  .count-line {
    text-align: center;
    color: var(--text-dim);
    font-size: 0.8rem;
    margin-top: 14px;
  }

  .slider-wrap {
    position: relative;
    margin-top: 34px;
  }

  .grid {
    display: flex;
    overflow-x: auto;
    gap: 18px;
    padding: 4px 4px 14px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--accent-a) transparent;
  }

  .grid::-webkit-scrollbar {
    height: 6px;
  }

  .grid::-webkit-scrollbar-thumb {
    background: var(--panel-border);
    border-radius: 999px;
  }

  .slider-arrow {
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

  .slider-arrow:hover {
    border-color: var(--accent-a);
    background: rgba(53, 230, 255, 0.12);
  }

  .slider-arrow.prev { left: -6px; }
  .slider-arrow.next { right: -6px; }

  @media (max-width: 700px) {
    .slider-arrow { display: none; }
  }

  .card {
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

  .card:hover {
    transform: translateY(-6px);
    border-color: var(--accent-a);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(53, 230, 255, 0.25), 0 0 26px rgba(176, 107, 255, 0.25);
  }

  .card-art {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(53, 230, 255, 0.15), rgba(176, 107, 255, 0.15));
    margin-bottom: 12px;
  }

  .card-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-art img.fallback {
    object-fit: contain;
    padding: 22%;
    opacity: 0.8;
  }

  .card-title {
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-singer {
    font-size: 0.78rem;
    color: var(--text-dim);
    margin-bottom: 6px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-count {
    font-size: 0.72rem;
    color: var(--accent-a);
    margin-top: auto;
  }

  .no-results {
    text-align: center;
    color: var(--text-dim);
    padding: 60px 0;
    display: none;
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
    <a href="index.html" class="active">হোম</a>
    <a href="singers.html">শিল্পী তালিকা</a>
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
    <h1 class="tagline">আপনার পছন্দের <span class="accent">সঙ্গীত</span> খুঁজে নিন</h1>
    <div class="stats-strip" id="stats-strip">
      <div class="stat-box"><i class="fas fa-record-vinyl"></i><span class="stat-number" id="stat-albums">-</span><span class="stat-label">অ্যালবাম</span></div>
      <div class="stat-box"><i class="fas fa-user"></i><span class="stat-number" id="stat-singers">-</span><span class="stat-label">শিল্পী</span></div>
      <div class="stat-box"><i class="fas fa-users"></i><span class="stat-number" id="stat-groups">-</span><span class="stat-label">শিল্পীগোষ্ঠী</span></div>
      <div class="stat-box"><i class="fas fa-music"></i><span class="stat-number" id="stat-songs">-</span><span class="stat-label">গান</span></div>
    </div>

    <div class="search-row">
      <i class="fa fa-search"></i>
      <input type="text" id="search-input" placeholder="অ্যালবাম বা শিল্পীর নাম লিখুন..." autocomplete="off">
    </div>
    <div class="count-line" id="count-line"></div>
  </header>

  <main>
    <div class="slider-wrap">
      <button type="button" class="slider-arrow prev" id="slider-prev" aria-label="আগের অ্যালবাম"><i class="fa fa-chevron-left"></i></button>
      <div class="grid" id="album-grid">
{{CARDS}}
      </div>
      <button type="button" class="slider-arrow next" id="slider-next" aria-label="পরের অ্যালবাম"><i class="fa fa-chevron-right"></i></button>
    </div>
    <div class="no-results" id="no-results">কোনো প্লেলিস্ট পাওয়া যায়নি।</div>
  </main>
</div>

<footer>
  &copy; আলোময় সঙ্গীত — <a href="albums.html">সকল অ্যালবাম দেখুন</a>
</footer>

<script>
  function toggleMenu() {
    document.querySelector(".topnav .menu").classList.toggle("show");
  }

  const searchInput = document.getElementById('search-input');
  const cards = Array.from(document.querySelectorAll('.card'));
  const noResults = document.getElementById('no-results');
  const countLine = document.getElementById('count-line');
  const totalCount = cards.length;

  function updateCount(visible) {
    countLine.textContent = visible === totalCount
      ? ''
      : `${convertToBanglaNumber(visible)} / ${convertToBanglaNumber(totalCount)}টি প্লেলিস্ট`;
  }

  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
      const match = !q || card.dataset.search.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    noResults.style.display = visible === 0 ? 'block' : 'none';
    updateCount(visible);
  });

  const albumGrid = document.getElementById('album-grid');
  const sliderPrev = document.getElementById('slider-prev');
  const sliderNext = document.getElementById('slider-next');
  const scrollByCard = () => (cards[0] ? cards[0].getBoundingClientRect().width + 18 : 200) * 2;

  sliderPrev.addEventListener('click', () => albumGrid.scrollBy({ left: -scrollByCard(), behavior: 'smooth' }));
  sliderNext.addEventListener('click', () => albumGrid.scrollBy({ left: scrollByCard(), behavior: 'smooth' }));

  // Slowly auto-scroll the slider to the left, looping back to the start,
  // and pause while the pointer is over it so it's easy to browse by hand.
  let autoScrollPaused = false;
  albumGrid.addEventListener('mouseenter', () => { autoScrollPaused = true; });
  albumGrid.addEventListener('mouseleave', () => { autoScrollPaused = false; });
  albumGrid.addEventListener('touchstart', () => { autoScrollPaused = true; }, { passive: true });
  albumGrid.addEventListener('touchend', () => { autoScrollPaused = false; });

  setInterval(function () {
    if (!autoScrollPaused && albumGrid.scrollWidth > albumGrid.clientWidth) {
      if (albumGrid.scrollLeft + albumGrid.clientWidth >= albumGrid.scrollWidth - 1) {
        albumGrid.scrollLeft = 0;
      } else {
        albumGrid.scrollLeft += 1;
      }
    }
  }, 16);

  // Song stats are computed live from the CSV on each visit, so they never
  // drift out of sync the way a build-time snapshot would.
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
'''

if __name__ == "__main__":
    main()
