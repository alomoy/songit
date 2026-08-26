// Define the tracks that have to be played
let track_list = [
  {
    name: "অযুত তারার ঐ যে আকাশ",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/u5ltsvfkyw1arqsjntud4/1-ojut-tarar-oi-ze-akash.mp3?rlkey=7mpy40edgl8v2qoaph4cwphhy&st=bwpv5jb9&dl=1"
  },
  {
    name: "দিকে দিকে আজ হায়েনা",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/lzsbvcz4dz0931echa6ye/2-dike-dike-aj-hayena.mp3?rlkey=kfg6q6uq0kijwn9ou5trp5crr&st=wqacorir&dl=1"
  },
  {
    name: "কোন কাননের বুলবুলি সে",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/c0a7r7uqeqwwphxkdpz1k/3-kon-kanoner-bulbuli.mp3?rlkey=4ino84kmwwu2fghwrxq1mmi80&st=pii2yvl9&dl=1"
  },
  {
    name: "এই পৃথিবীর মানচিত্রে সবুজ দেশ",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/k2u3uoqd5tlei7ueveogz/4-ei-prithibir-manchitre.mp3?rlkey=9pp6o7zh8f9rzqg43o0793jes&st=d8qogo1s&dl=1"
  },
  {
    name: "মাগো আমায় আর ডেকো না",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/35e9x8m29vn9xoqedskhr/5-mago-amay-ar.mp3?rlkey=7anyda3catjdojvor7emkgby7&st=yscktncj&dl=1"
  },
  {
    name: "অবুজ মন নিয়ে একটি সবুজ ছেলে",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/asj3m4tepic5n1ljj7c4b/6-obujh-mon-niye.mp3?rlkey=y7z9b69oqtxvdh1h3j7qp78jm&st=er0u6tee&dl=1"
  },
  {
    name: "জীবন মানে নয় খেলা করা",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/46c1wc51spr332z1psrux/7-jibon-mane-noy.mp3?rlkey=r28lj6lp3x0sq83bv3fw1y7lc&st=tq3wiskf&dl=1"
  },
  {
    name: "তুমি আল্লাহ মাবুদ তুমি যে প্রভু",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/ouvyr6dv94k67gwtra6ly/8-tumi-allah-mabud.mp3?rlkey=xc06a52hjcck38gpam7yajcfh&st=2mrr2e1c&dl=1"
  },
  {
    name: "শুধু মনে পড়ে মা তোমাকে",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/nkz553jkdatwo8rocekhs/9-shudhu-mone-ma.mp3?rlkey=dqhiqfmb4ee34z76d2ajtgh0n&st=j53p2sc2&dl=1"
  },
  {
    name: "সত্য সে হোক যত ভয়ানক ভয়াবহ",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/lnwr6bx0ogs4sljhfxfrq/10-sotyo-se-hok.mp3?rlkey=lcfdr52p3m3zz2uax8n0mffac&st=lufbvys6&dl=1"
  },
  {
    name: "রাসুলের সাহাবারা চলেছিল যে পথে",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/wzq30upqgjcw99l5vhz6e/11-rasuler-sahabara.mp3?rlkey=dc81mr46i0f03tmsvnam1i6ef&st=c645tood&dl=1"
  },
  {
    name: "চোখের পানি আজও শুকায়নি",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/gik4gccdce19jlthbrvua/12-cokher-pani.mp3?rlkey=1s0z0moimb65bsltpxw1w1pzn&st=ua0kty5z&dl=1"
  },
  {
    name: "প্রভু শেষ বিদায় যেন তোমার পথে",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/4hn8spcec9ft4ime7ez9u/13-provu-shesh-biday.mp3?rlkey=05xut03unjg1qzd1xgcpiwv2l&st=ojbcrmzk&dl=1"
  },
  {
    name: "A new day – new light will come",
    artist: "",
    album: "জান্নাতের নিশান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/5pe0opxm9yzytrz0xq8h3/14-a-new-day.mp3?rlkey=dulvs0hh4puk49ija9qu5awcf&st=d9jvm0s9&dl=1"
  },
];
