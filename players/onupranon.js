// Define the tracks that have to be played
let track_list = [
  {
    name: "আমি তোমার মতন",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/3xqr98s667nmuae/01-Ami%20Tomar%20Moton%20Apon%20Kore%20.mp3"
  },
  {
    name: "আমরা একটা নতুন সমাজ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/train.jpg",
    path: "https://dl.dropbox.com/s/08s61fyvg4ns80h/02-Amra%20Ekta%20Notun%20Shomaj%20.mp3"
  },
  {
    name: "এসো আল্লাহর পথে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/mount.jpg",
    path: "https://dl.dropbox.com/s/fnn3sxfibluzefc/03-Esho%20Allahr%20Pothe%20Esho%20Rasuler%20Pothe%20.mp3",
  },
    {
    name: "গোলামীর বিরুদ্ধে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/tcv2b6m6qmu9hhf/04-Golamir%20Biruddhe%20.mp3",
  },
    {
    name: "হে ঘুমন্ত মানুষ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/tunnel.jpg",
    path: "https://dl.dropbox.com/s/v2r89m12x6gayby/05-He%20Gumonto%20Manush%20Jago.mp3",
  },
    {
    name: "হে রাসুল বুঝি না",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/mount.jpg",
    path: "https://dl.dropbox.com/s/wsvgx5ryegy08at/06-He%20Rasul%20Bujhina%20Ami%20.mp3"
	
  },
  {
    name: "মাগো তোমায় দিলাম",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/yyhbni5zekbv08k/07-Mago%20Tomay%20Dilam%20Kothay%20.mp3"
  },
  {
    name: "মুসলিম আজ ওঠো",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/5gl52gqsz3530ic/08-Muslim%20Aj%20Utho%20Jago%20.mp3",
  },
  {
    name: "সালাম বীরজোয়ান",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/2ybha1pkp9whhud/09-Salam%20Birjoyan%20Shohid%20Noujoyan%20.mp3",
  },
  {
    name: "সালাম সালাম হাজার",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/oowyskm5bzyoc5d/10-Salam%20Salam%20Hajar%20Salam%20He%20Priyo%20.mp3",
  },
    {
    name: "শাহজালালের শাহ মাখদুমের",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/tunnel.jpg",
    path: "https://dl.dropbox.com/s/fzuef1dtjrsg7ck/11-Shah%20jalaler%20Shah%20Makhdumer.mp3",
  },
    {
    name: "সকল ব্যথার বোঝা",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/8o6c6isx2g7iaun/12-Shokol%20Bethar%20Boja%20Boite%20Pare.mp3",
  },
    {
    name: "সত্যের এ পথে চলো",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/tunnel.jpg",
    path: "https://dl.dropbox.com/s/pbxx20va27vpvqm/13-sotye-%20e-pothe.mp3",
  },
    {
    name: "সত্যের সংগ্রামে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/8qrv42keemev3yr/14-Sotyer%20songrame%20Fota%20Full%20.mp3",
  },
    {
    name: "তোরা চাসনে কিছু",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/train.jpg",
    path: "https://dl.dropbox.com/s/uo8ddwupjh6h46g/15-Tora%20Chashne%20Kichu.mp3",
  },
];
