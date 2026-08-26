// Define the tracks that have to be played
let track_list = [
  {
    name: "তৌহিদেরই মুর্শিদ আমার",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/vla0k8tvaup56jz/03.%20tauhider%20murshid.mp3?dl=1"
  },
  {
    name: "যেথায় হযরত",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/nature.jpg",
    path: "https://dl.dropbox.com/s/k2ebluxnkw056cq/11-zethay-hazrat.mp3"
  },
  {
    name: "মসজিদেরই পাশে আমার",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/trail.jpg",
    path: "https://dl.dropbox.com/s/z2sb3cependtqik/12-masjider-pashe.mp3"
  },
  {
    name: "ভোর হলো ওঠ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/8id5gxfzw2zxmof/13-vor-holo-uth.mp3"
  },
  {
    name: "আমি যদি আরব",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/hillroad.jpg",
    path: "https://dl.dropbox.com/s/w3ju7xncfa6oh60/14-ami-zdoi-arob.mp3"
  },
  {
    name: "ও মন রমজানের",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mtroad.jpg",
    path: "https://dl.dropbox.com/s/pn8pono8bog11h8/15-o-mon-romjaner.mp3"
  },
  {
    name: "আমার জীবন",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/tunnel.jpg",
    path: "https://dl.dropbox.com/s/lnbf2ssp4nk3vzo/16-amar-jibon.mp3"
  },
  {
    name: "হে রাসুল তুমি",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/train.jpg",
    path: "https://dl.dropbox.com/s/67dlqjzhv6hirg9/17-he-rasul-tumi.mp3"
  },
  {
    name: "গোলা থরে থরে",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/sajek.jpg",
    path: "https://dl.dropbox.com/s/d8w9hqytt2pt0s4/18-golap-thore.mp3"
  },
  {
    name: "তুমি আছো হৃদয়ের",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/nature.jpg",
    path: "https://dl.dropbox.com/s/8t5sxaltt239u21/19-tumi-acho-hridoyer.mp3"
  },
  {
    name: "দুদিনের দুনিয়া",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mtroad.jpg",
    path: "https://dl.dropbox.com/s/jhf96yeirgmd5bi/20-dudiner-dunia.mp3"
  },
  {
    name: "পরওয়ার দিগার",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://dl.dropbox.com/s/bfwt4mw1bm9bx5e/21-parwar-digar.mp3"
  },
  {
    name: "আমি অনেক ভরসায়",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mosque.jpg",
    path: "https://dl.dropbox.com/s/tqst3xa4nvxdv7f/22-ami-one-vorosay.mp3"
  },
  {
    name: "হে প্রিয় হে রাসুল",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/nature.jpg",
    path: "https://dl.dropbox.com/s/cqupbi01e4303tw/23-he-priyo-he-rasul.mp3"
  },
  {
    name: "এই ভূবনে আর আছে কে",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/sajek.jpg",
    path: "https://dl.dropbox.com/s/u7ecntkpvdqmdb0/24-ei-vubone-ar.mp3"
  },
  {
    name: "আশা দীপ যদি",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/laptop.jpg",
    path: "https://dl.dropbox.com/s/ohfostrct2gzw2w/25-asha-dip-zodi.mp3"
  },
  {
    name: "সারা জীবন আমি",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/peaa1q5to6rh3gs/26-sara-jibon-ami.mp3?dl=1"
  },
  {
    name: "গান দাও আমার",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/w2zjort6rz1f8sq/27-gan-dao-amay.mp3?dl=1"
  },
  {
    name: "হে খোদা মাফ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/p2tev504m6z8ij9/28-he-khoda-maf.mp3?dl=1"
  },
  {
    name: "আল্লাহ আমার প্রভু",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/q0ie88hnc28t7g1/29-Allah-amar-provu.mp3?dl=1"
  },
  {
    name: "বাজলো কিরে ভোরের",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/5725kyvm126n19d/30-bajlo-kire-vorer.mp3?dl=1"
  },
  {
    name: "মুহাম্মাদের নাম",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/msw87eqwgtjajw0/31-Muhammader-m.mp3?dl=1"
  },
  {
    name: "ইসলামের সওদা",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/k7xhzep7aggjkbh/32-islamer-souda.mp3?dl=1"
  },
  {
    name: "ধর্মের পথে শহিদ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/s/zmh6za282862giv/33-dhormer-pothe.mp3?dl=1"
  },
  {
    name: "সাহারাতে ফুটলো ফুল",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/up4zvlvs673ktsf/34-saharate-futlo.mp3?dl=1"
  },
  {
    name: "এই গরীবের শোনো",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/bp4ia7vsnzm45lx/35-ei-goriber-shono.mp3?dl=1"
  },
  {
    name: "আল্লাহতে যার পূর্ণ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/8qmgh6t93141t7x/36-Allah-te-zar-purno.mp3?dl=1"
  },
  {
    name: "ত্রিভূবনের প্রিয় মুহাম্মাদ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/otcn4ezoziw1yoy/37-trivuboner-priyo.mp3?dl=1"
  },
  {
    name: "রোজ হাশরে আল্লাহ",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/uecpj4ikv3gmt8a/38-roj-hashore-Allah.mp3?dl=1"
  },
  {
    name: "বাজিছে দামামা",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/qdyw32u6khfgwjb/39-bajiche-damama.mp3?dl=1"
  },
  {
    name: "বক্ষে আমার কাবার",
    artist: "তারিক মুনাওয়ার",
    album: "তারিক মুনাওয়ার-০৩",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/s/gciprv4musl0mhx/40-bokkhe-amar-kabar.mp3?dl=1"
  },
  {
    name: "ঝর্ণার পাশে দাঁড়ালে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "তোমাকেই শুধু মনে হয়",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/s/qp0thihc5n853qs/01%20Jharr%20Pashe.mp3?dl=1"
  },
];
