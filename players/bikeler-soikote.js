// Define the tracks that have to be played
let track_list = [
  {
    name: "বিকেলের সৈকতে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/album/bikeler-soikote.jpg",
    path: "https://www.dropbox.com/scl/fi/o1lbrqsyonr9f0hr99hns/bikeler-soikote.mp3?rlkey=cy90d1138mbavinxcvv9mlm3g&st=ht79rl1h&dl=1"
  },
   {
    name: "জান্নাত লিখে দিও",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/dua.jpg",
    path: "https://www.dropbox.com/scl/fi/4xb2b0ij3stszp7r18npn/zannat-likhe-dio.mp3?rlkey=6giftslm6ttjnu1kb2zzwh42u&st=pp45f5f8&dl=1"
  },
  {
    name: "বহুদিন ধরে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/river2.jpg",
    path: "https://www.dropbox.com/scl/fi/v7pu0wscn4cz75ex9yeu7/bohudin-dhore.mp3?rlkey=cjzsqm16xvxbno9s9bc833tqp&st=hmh0uy5d&dl=1"
  },
  {
    name: "চাইবি কত মন",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/kite.jpg",
    path: "https://www.dropbox.com/scl/fi/kdk9fcmg0emh49pvn18z2/chaybi-koto.mp3?rlkey=gglsuz2yts5qkthqs8d6dlb4t&st=cmrevyob&dl=1"
  },
  {
    name: "হারানো দিনগুলো",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/0tgwz3wrjumf175fomolw/harano-din-gulo.mp3?rlkey=qt17qk43jilrg0ljpsb4vm58f&st=yxqqdup1&dl=1"
  },
  {
    name: "মনকে বলেছি",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/kite.jpg",
    path: "https://www.dropbox.com/scl/fi/9uxshkgvovnn8wa3lide0/mon-ke-bolechi.mp3?rlkey=8t8vlfkrojmrpie2jiqawa78x&st=if7hwh7i&dl=1"
  },
   {
    name: "মরু সাহারায়",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/desert.jpg",
    path: "https://www.dropbox.com/scl/fi/f7rzr2noxm238u10tlhm8/moru-saharay.mp3?rlkey=vekww888lsf3lcavl040gbi06&st=fhkouams&dl=1"
  },
  {
    name: "নীতির বলগা ঘোড়া",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/h4k44pecscthbkpwhzwaw/nitir-bolga-ghorata.mp3?rlkey=4yyv1zdwqaiiizv0sxm5qpi8p&st=q98prluo&dl=1"
  },
   {
    name: "ঐ দেখা যায় মসজিদে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/0gd1iys84pubpy458m43n/oi-dekha-zai.mp3?rlkey=1fr2rrhjojrkvzpkepbzkkmv0&st=ms1blslu&dl=1"
  },
  {
    name: "পৃথিবী যখন ঘোর",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/scl/fi/rruo0y7s9w7w3vatdndit/prithibi-jokhon.mp3?rlkey=w72bdiybpj0dgtrmwd9c02nbh&st=rmx2ez6i&dl=1"
  },
   {
    name: "রাতের আঁধার",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/header.jpg",
    path: "https://www.dropbox.com/scl/fi/ip8kdi5acqk1sa6w5j549/rater-adhar.mp3?rlkey=58qzr0egkm6ingie3he78l8lq&st=6htrm9n5&dl=1"
  },
  {
    name: "আমার এই কণ্ঠে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "বিকেলের সৈকতে",
    image: "../images/microphone.jpg",
    path: "https://www.dropbox.com/scl/fi/w1jsgwmvwgmk5jhrwwqol/amar-ai-konthe.mp3?rlkey=nnfs43mrhych3tebpkoexpzlc&st=s5vnz37t&dl=1"
  },
];
