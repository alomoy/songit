// Define the tracks that have to be played
let track_list = [
  {
    name: "জীবন নামের ছোট্ট ঘুড়ি উড়ছে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/k60fkzcithg4izq131p4f/01-jibon-namer-chotto-ghuri.mp3?rlkey=zud84t790uvwun2qzqitsq2ud&st=k878ubko&dl=1"
  },
  {
    name: "অপরূপ মহিমা নেই তুলনা আল্লাহ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/af4o8xyrp7z3e055krfac/02-oporup-mohima.mp3?rlkey=gmitop4swetow9hchu17nxgze&st=a2gmy573&dl=1"
  },
  {
    name: "মা আমিনার কোলে মুহাম্মাদ রাসুল (সা)",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/tme1fsxvlbwg2s7iwqdul/03-ma-ameenar-khule-elen.mp3?rlkey=zhehnvraclb0iswopqx4odua3&st=5b4x9yzi&dl=1"
  },
  {
    name: "মন ভুলানো রূপে ভরা প্রিয় দেশ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/v4oew22ci30axjvsvq5yg/04-mon-bhulano-rupe.mp3?rlkey=qb61zlp7qxtxn7l9jnp2esciy&st=rbo79t0t&dl=1"
  },
  {
    name: "হামালতুল হুব্বাতিল কালবি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/plw2dqm8g8e0wzypjgmor/05-hamaltul-hubbi.mp3?rlkey=2v2mhklugwwrdt8ffbo9kog46&st=rb8y51d4&dl=1"
  },
  {
    name: "নিজের তরে চাও ভাল যা পরের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/as8tr646otbv4cffhbojd/06-nijer-tore-jao-bhalo.mp3?rlkey=bo24tipglxujhepffb1wwikqm&st=1cy855nk&dl=1"
  },
  {
    name: "দিনের আলোয় সূর্য হাসে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/q308g2joq3mn6njhnhe61/07-diner-alo-surjo-hase.mp3?rlkey=9l8bu3wcgqfszmw8xfgx1vs73&st=djft9416&dl=1"
  },
  {
    name: "আল্লাহ তুমি অপরূপ নেই তুলনা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/d0joxzs1dy0lby4ocjyob/08-allah-tumi-oporup.mp3?rlkey=o01ge4d4eposxpxs0oqu75mtw&st=qf9xzj7z&dl=1"
  },
  {
    name: "আকাশ সুন্দর নদীও সুন্দর",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/b4hqau1vmbsge0t77e81x/09-akash-sundor.mp3?rlkey=zt3mv9n01xqdvv2df4gh4zdvg&st=vzprshgw&dl=1"
  },
  {
    name: "ফেরেশতারা পাগলপারা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/l942u3ufdusb26bnjnbpa/10-frestara.mp3?rlkey=tcq58kdzc8wynf7l0g8t2gy81&st=ofzuep6n&dl=1"
  },
  {
    name: "মদার মদার মু",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/2f2r9npseq64wlca1q990/11-modar-modar-mu.mp3?rlkey=spd6xyhx76x6fwb4s7yzal7em&st=vujeew5s&dl=1"
  },
  {
    name: "আমার ই দেশ সোনার বাংলাদেশ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/yckzq5rkjngz0cjqvu9ma/12-amar-desh.mp3?rlkey=r9bytft2n603wy3z3yqizvghe&st=hs0mz245&dl=1"
  },
  {
    name: "এই জীবন আর দুনিয়াদারী ফাঁকি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/0tlx7e4btgo82in5ky0r6/13-ei-jibon-ar-duniyadari.mp3?rlkey=eufg7gxjgj5pnyjp5ehyxq9eg&st=rlyy67n5&dl=1"
  },
  {
    name: "নামে তোমার মধু আছে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "জীবন নামের ছোট্ট ঘুড়ি",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/xhay5xh2cd1roczbxjso1/14-name-tomar-modhu-ache.mp3?rlkey=5gbyt81s246rjn7cbgxdkqr51&st=hub6i507&dl=1"
  },
];
