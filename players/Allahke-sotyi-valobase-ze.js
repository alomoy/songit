// Define the tracks that have to be played
let track_list = [
  {
    name: "আল্লাহকে সত্যি ভালবাসে যে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "allahu.jpg",
    path: "https://dl.dropbox.com/s/o5kl2dzc2b1lrq3/1allahke%20je%20sotyi.mp3"
  },
  {
    name: "একটি নদী",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/hvyfjobolygqdra/2ekti%20nodi.mp3"
  },
  {
    name: "যতদিন এই দেহে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/6dt061jeo2o371j/3jotodin%20ei.mp3",
  },
    {
    name: "কি যে মধুর লাগে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/rfw8i6krr8w4mhb/4ki%20je%20modhur.mp3",
  },
    {
    name: "ঢেউয়ের পরে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/ryuw2r3knoi3k1d/5dhewer%20pore.mp3",
  },
    {
    name: "আবার প্রাণ ফিরে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/yhytic3i5cdj52c/6abar%20pran.mp3"
	
  },
  {
    name: "আল্লাহ ক্রিয়েটেড",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/cpn5vyfsv4vrix8/7Allah%20created.mp3"
  },
  {
    name: "বাবা তুমি কোথায়",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/xliysc4eoeiw6jw/8baba%20tumi%20kothay.mp3",
  },
  {
    name: "মেঘের চাঁদোয়া",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/e7h6et7y86ddk9f/9megher%20chadowa.mp3",
  },
  {
    name: "তোমার নামের গানে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/hpbiu7yqauf6l7u/10tomar%20name.mp3",
  },
    {
    name: "আল্লাহ নামের তাসবীহ",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/feuytqxeh1heacj/11Allah%20namer.mp3",
  },
    {
    name: "তুমি আড়াল পেতে",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/e78mrrqoalzwyrk/12tumi%20arhal.mp3",
  },
    {
    name: "মা যে আমার",
    artist: "শাহাবুদ্দীন - সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: আল্লাহকে সত্যি ভালবাসে যে",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/xk3930ec6vmtztn/14ma%20je%20amar.mp3",
  },
];
