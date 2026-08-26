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
          <div class="card-count">{esc(str(a['count']))}টি গান</div>
        </div>
      </a>'''


def main():
    albums = load_albums()
    cards = "\n".join(card_html(a) for a in albums)

    html_out = TEMPLATE.replace("{{CARDS}}", cards).replace("{{COUNT}}", str(len(albums)))
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
    font-family: 'Open Sans', 'Noto Sans Bengali', 'Helvetica Neue', Arial, sans-serif;
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

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 22px;
  }

  .brand img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15), 0 0 24px rgba(53, 230, 255, 0.35);
  }

  .brand-text { text-align: left; }

  .brand-title {
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .brand-subtitle {
    font-size: 0.8rem;
    color: var(--text-dim);
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

  nav.top-links {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 28px;
    flex-wrap: wrap;
  }

  nav.top-links a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.85rem;
    padding: 9px 18px;
    border-radius: 999px;
    background: var(--panel);
    border: 1px solid var(--panel-border);
    transition: border-color .2s, background .2s;
  }

  nav.top-links a:hover {
    border-color: var(--accent-a);
    background: rgba(53, 230, 255, 0.08);
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 18px;
    margin-top: 34px;
  }

  .card {
    display: flex;
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
    <a href="index.html"><img src="images/alomoy.png" alt="Alomoy Sangeet Logo"></a>
    <div class="company-info">
      <strong>আলোময় সঙ্গীত</strong><br>
      <em>সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</em>
    </div>
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
    <div class="brand">
      <img src="images/alomoy.png" alt="আলোময় সঙ্গীত">
      <div class="brand-text">
        <div class="brand-title">আলোময় সঙ্গীত</div>
        <div class="brand-subtitle">সুস্থ সংস্কৃতি চর্চার দীপ্ত প্রত্যয়</div>
      </div>
    </div>
    <h1 class="tagline">আপনার পছন্দের <span class="accent">প্লেলিস্ট</span> খুঁজে নিন</h1>
    <p class="sub">{{COUNT}}টি অ্যালবাম থেকে বেছে নিন — প্রতিটি সঙ্গীত এক ক্লিকেই।</p>

    <nav class="top-links">
      <a target="_blank" href="playlists.html">সব প্লেলিস্ট</a>
      <a target="_blank" href="search.html">সার্চ</a>
      <a target="_blank" href="singers.html">শিল্পী</a>
      <a target="_blank" href="latest.html">সর্বশেষ</a>
    </nav>

    <div class="search-row">
      <i class="fa fa-search"></i>
      <input type="text" id="search-input" placeholder="অ্যালবাম বা শিল্পীর নাম লিখুন..." autocomplete="off">
    </div>
    <div class="count-line" id="count-line"></div>
  </header>

  <main>
    <div class="grid" id="album-grid">
{{CARDS}}
    </div>
    <div class="no-results" id="no-results">কোনো প্লেলিস্ট পাওয়া যায়নি।</div>
  </main>
</div>

<footer>
  &copy; আলোময় সঙ্গীত — <a href="playlists.html">সকল প্লেলিস্ট দেখুন</a>
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
      : `${visible} / ${totalCount}টি প্লেলিস্ট`;
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
</script>

</body>
</html>
'''

if __name__ == "__main__":
    main()
