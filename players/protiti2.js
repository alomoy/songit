// Define the tracks that have to be played
let track_list = [
  {
    name: "আমার গানের ভাষা",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/zvqv0qr2t4wizx5/Amar%20ganer.mp3?dl=1"
	
  },
  {
    name: "আন্দোলন সে তো",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/5wwvscoo85c1gdw/andolon_seto_jiboner.mp3?dl=1"
  },
  {
    name: "ধৈর্য্য ধারণ করার",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/8wxkl8pj7mo4p4k/Dhorjo%20dhorar.mp3?dl=1",
  },
  {
    name: "দৃষ্টি তোমার খুলে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/73vjrq5gahuqrn7/dristi%20tomar%20khule.mp3?dl=1"
  },
  {
    name: "এই দূর্যোগে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/92qup3l83utmfg3/ei%20durjuge%20ei.mp3?dl=1",
  },
  {
    name: "এত শহীদ রক্ত",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/x6zw3uoe0ca4p0z/eto%20shahid%20rokto%20dhale~1.mp3?dl=1"
  },
  {
    name: "গান শোনাতে পারি",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/esdav9h2p675j2q/Gan-shonate-pari.mp3?dl=1",
  },
  {
    name: "ঘন দূর্যোগ",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/261tmx1cfeg9el0/Ghono%20durjog.mp3?dl=1"
  },
  {
    name: "যদি কেউ বুঝে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/v2oo23i1w5ouo1e/jodi%20keu%20bujhe.mp3?dl=1"
  },
  {
    name: "কোন সাহসে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/x479k002l0ed5l3/kon%20sahose%20chao.mp3?dl=1",
  },
    {
    name: "পৃথিবী আমার",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/g7rst7728g20e2n/prithibi%20amar%20asol.mp3?dl=1",
  },
    {
    name: "রোদের ভেতর",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/5quj6pijkepjc3m/Roder%20vitor.mp3?dl=1",
  },  
  {
    name: "তোমার সৃষ্টি যদি",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতিতী - ০২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/kuacvt456rlwl8a/tomar%20sristi%20jodi.mp3?dl=1",
  },
];
