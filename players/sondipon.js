// Define the tracks that have to be played
let track_list = [
  {
    name: "মিনারের সুর কি তুমি শোন না?",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/76rh1ycyrhtldmy4b6jvm/1-minarer-sur.mp3?rlkey=r595nygs0ulbwrgjp0fr7ugsg&st=i3eun23y&dl=1"
  },
  {
    name: "বাতাসেরা কানে কানে বলে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/try8xzd267gzuvftlaifs/2-batasera-kane.mp3?rlkey=wnz6ucufgl3mbzwkdzl5nf353&st=5tp8wzga&dl=1"
  },
  {
    name: "যেই দিকে তাকাই শুধু পাই খোদার",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/vgr4dulfk52u39o5fdfpu/3-zedike-takai.mp3?rlkey=ut11ayotkyhpcp4czuseb63yc&st=n197zo5m&dl=1"
  },
  {
    name: "তুমি কি পথ ভুলেছ?",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/r11z1nyulq1x848r8dg1u/4-tumi-poth-vule.mp3?rlkey=ok6rtjpbcelr9zz9rrmoqtn35&st=9foof915&dl=1"
  },
  {
    name: "দুঃখ সবার পাশে লুকিয়ে থাকে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/ldnq9q5aezc423gkxtmxc/5-dukh-sobar-pashe.mp3?rlkey=9qxg6uk9a6y80myf9xq8qm14v&st=ckbqg5q9&dl=1"
  },
  {
    name: "আমরা হব বীর সেনানী হামজার মতো",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/gnt2buucit0vuy3jk7mlz/6-amra-hobo-bir.mp3?rlkey=3p6bbue5v0kyo0f0vsm6gksiv&st=fommoral&dl=1"
  },
  {
    name: "আমার যত দুঃখ সুখে মাকে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/41jqdm0aof0ucdndofv3e/7-amar-zoto-dukh.mp3?rlkey=vnkyu5xr4u5inuy003ruuirb0&st=xlot9f8l&dl=1"
  },
  {
    name: "এই যে সবুজ বন বনানী পাখির",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/vtu05fgr2zzyc3byc6v2b/8-ei-ze-sobuj.mp3?rlkey=y87r6c3jmj8czczt8gw3sotpe&st=wtgwwv67&dl=1"
  },
  {
    name: "কে আছো এমন দাও মুছে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/6s32qcuh2zup2b7muijrq/9-ke-acho-emon.mp3?rlkey=4w229g93g61g2pyel4nsliikm&st=5uhrt19o&dl=1"
  },
  {
    name: "মুমিনরা তো ভাই ভাই",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/kdzzrosafa2btozkc2iyu/10-muminra-to.mp3?rlkey=6u5vg5xv5brgn7s7a8nzdhd3p&st=l98wvjr5&dl=1"
  },
  {
    name: "আল্লাহু আল্লাহু নামে যা ডুবে মন",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/ml1igz1jsbawjtie8hdrp/11-allahu-name.mp3?rlkey=2h00xwneb96xumxlojibz05o0&st=qj0ih3w0&dl=1"
  },
  {
    name: "রাতের অন্ধকারে তোমাকেই মনে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/z2bssmatx9dgp9wbvh1en/12-rater-ondhokare.mp3?rlkey=uav65rhp6loqryho18jkeumzm&st=twteqgm1&dl=1"
  },
  {
    name: "প্রশংসা তোমার সব দিগন্তে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/0hgyprak388va9e2slxi6/13-proshongsha-tomar.mp3?rlkey=ixdqn5xwunq6knsu5ksemxe2x&st=fib9m2o4&dl=1"
  },
  {
    name: "কি সুখে ঘুমাও তুমি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/l9b5exb5x42y0l0upotpt/14-ki-sukhe-ghumao.mp3?rlkey=skvvyy8mc1jzihxy6u90rz6f1&st=z0xwh7vo&dl=1"
  },
  {
    name: "যখনি গভীর হয় রাতের আঁধার",
    artist: "সাইফুল্লাহ মানছুর",
    album: "সন্দীপন.",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/6abnr9x30dkdlokh8iyuv/15-zokhoni-govir.mp3?rlkey=d85tmdq3x0af92iocpfg63adu&st=ayxxs9gc&dl=1"
  },
];
