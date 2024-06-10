// Define the tracks that have to be played
let track_list = [
  {
    name: "ঐ ঝর্ণা ধারা",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/falls.jpg",
    path: "https://www.dropbox.com/scl/fi/0kmll3eaqbdivei4o9blb/001.-Oi-jhorna-dhara.mp3?rlkey=xej5pp4bxqim1tuknyk4d2xuf&st=ftjiva0o&dl=1"
  },
   {
    name: "মরুর বুকে",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/desert.jpg",
    path: "https://www.dropbox.com/scl/fi/03rntjhtnaa18p1nggilm/002.-Morur-buke.mp3?rlkey=i9vriwiftmx93jjbt0d0zvg5y&st=z5gyyg73&dl=1"
  },
  {
    name: "ফসল ভরা মাঠে",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/crop.jpg",
    path: "https://www.dropbox.com/scl/fi/ovvg0sadh2v8wgoeysgbq/003.-Foshol-vora.mp3?rlkey=vusuu1v8nmnubcxwlcsl7wc77&st=iorcsy89&dl=1"
  },
  {
    name: "মাগো তুমি",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/mom.jpg",
    path: "https://www.dropbox.com/scl/fi/1n0h6mr7g68t54utjqk6e/004.-Mago-tumi.mp3?rlkey=z27lgafsdjlfgpjbxhqi72lj2&st=ufw8nz4u&dl=1"
  },
  {
    name: "ইয়া আল্লাহ",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/allahu.jpg",
    path: "https://www.dropbox.com/scl/fi/o57uj8gqxt5et0cnw16zo/005.-Ye-ALLAH.mp3?rlkey=35du8y3wk3mgkq47rm309nx1b&st=7sn8g6pw&dl=1"
  },
  {
    name: "কেমন খেলা",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/river.jpg",
    path: "https://www.dropbox.com/scl/fi/rhdsfkzqyo583cjqv9o3c/006.-Kemon-khela.mp3?rlkey=pp3g4pvmhcxhjpv55h4nfabu5&st=bl1ft97s&dl=1"
  },
   {
    name: "নদী তোমার",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/river2.jpg",
    path: "https://www.dropbox.com/scl/fi/t25un6wspp5adbhwm31xa/007.-Nodi-tomar.mp3?rlkey=j2ldd3v6bnad7dtbtdxvk5g35&st=ugjsdh79&dl=1"
  },
  {
    name: "ও আল্লাহ",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/dua.jpg",
    path: "https://www.dropbox.com/scl/fi/1mgjt8a4ts0jxhxkxpjct/008.-Oh-ALLAH.mp3?rlkey=klx1xmlwk1ibbfgafm44fmmym&st=g1qo1oqk&dl=1"
  },
   {
    name: "কাঁদে মাগো তোমার",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/rain.jpg",
    path: "https://www.dropbox.com/scl/fi/0vi61hijtus2dr57vepwp/009.-Kade-mago.mp3?rlkey=i2i1qt4romkomw3625uw7f3wp&st=9hlq0gy0&dl=1"
  },
  {
    name: "আজ কাল পরশু",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/mze177gj1a6whjgl4g8mk/010.-Aj-kal-porshu.mp3?rlkey=gs5vygal2tmt7dq9svznlnl2m&st=5tcpqate&dl=1"
  },
   {
    name: "সেই দিন হারিয়ে",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/7abw64h13vuryriakr4y9/011.-Sei-din.mp3?rlkey=jn252xn76hmhv0pnivdg2fyov&st=q0k8wzsp&dl=1"
  },
   {
    name: "অসীম দিগন্তে",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/9b55q4cyodatnxugv5t6v/012.-Oshim-digonte.mp3?rlkey=8d7i7pkal4zj8ojvklxdsb7cw&st=penowg63&dl=1"
  },
  {
    name: "আর কতকাল চলবে",
    artist: "বিকল্প সাহিত্য সাংস্কৃতিক সংসদ",
    album: "দিশা",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/b7bck6ld5l0doxcn7me8e/013.-Ar-koto-kal.mp3?rlkey=sy7cqr6pa3y6qig4cajw2knz6&st=m2ixb9i6&dl=1"
  },
];
