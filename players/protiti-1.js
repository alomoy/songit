// Define the tracks that have to be played
let track_list = [
  {
    name: "হে খোদা মোর হৃদয় হতে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/1q28gp4jpdmvf50sn7t44/he-koda.mp3?rlkey=6n9bgxkei2fdt5ujdxqnm5zrw&dl=1"
  },
  {
    name: "এই দুটি চোখ দিয়েছো বলে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/posp4h36u5i2va49v1966/Ei-duti-chokh.mp3?rlkey=th38sosjb0wp7ook6adk8j7t6&dl=1"
  },
  {
    name: "সে কোন বন্ধু বলো",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mtvill.jpg",
    path: "https://www.dropbox.com/scl/fi/naazvxtfw3wpi87fgl8w3/Se-kon-bondhu.mp3?rlkey=78rdm92tkng8phlp29h7bednb&dl=1",
  },
    {
    name: " না হয় হলো মন",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/c0fzvrzbtyb3jaxi6duyp/Na-hoi-holo.mp3?rlkey=oy7jhjllpwgaxrspjvknr7blw&dl=1",
  },
    {
    name: "এ আকাশ মেঘে ঢাকা রবে না",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/kkgsmsiiknu4ln6v0migb/e-akash-meghe.mp3?rlkey=2djgl8b4fhq1ej70g9fodap6x&dl=1",
  },
    {
    name: "যা কিছু করতে চাও",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/45hqj5j35iyrq4s2ww27y/ja-kichu-korte.mp3?rlkey=1mhkyz8l406gkfxplgp54znsk&dl=1"
  },
    {
    name: "কথায় কাজে মিল দাও প্রভূ",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/o1xew6di25wl9ed3gflhl/Kothai-kaje.mp3?rlkey=jrqb6u8rylrlzjwr2wusfdgbh&dl=1"
  },
  {
    name: "সংগঠনকে ভালোবাসি",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/gtydqj9ulhb51cgzphhv3/songothonke.mp3?rlkey=i65q5qgjv9rkceztaum6mgixr&dl=1"
  },
  {
    name: "কার কতটা ঈমান",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/45pdgmy5x216pk4ms57x4/kar-kotota-eeman.mp3?rlkey=dmdtvhcyham4zw6906p7sd6jv&dl=1",
  },
    {
    name: "আম্মা বলেন ঘর ছেড়ে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/gfwrgcbwrju5ab9c20izf/amma-bolen-ghor.mp3?rlkey=lptbc9ygucsthxixz4lsjl9yh&dl=1",
  },
    {
    name: "আমাকে যখন কেউ",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/fsqsuk3afaa5cmtk7nqmu/amake-jokhon.mp3?rlkey=djvi8cezdna5f3c2w1qw5lrtn&dl=1",
  },
    {
    name: "কী হবে হতাশ হয়ে",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/bmevooay29s5puwfrm671/Ki-hobe.mp3?rlkey=a740tsid6dh8np91tnlb8kl9z&dl=1"
	
  },
    {
    name: "উত্তাপে উজ্জ্বল",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/mtvill.jpg",
    path: "https://www.dropbox.com/scl/fi/94qeu4mo0d47w6onzuw4o/uttape-ujjol.mp3?rlkey=ckp569tzxbzu09k06nm5zzrnj&dl=1",
  },
    {
    name: "চলো মুজাহিদ",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/cyi5ue968ou3owb3290h8/cholo-mujahid.mp3?rlkey=7o047bav5muciseboj9jhvw5t&dl=1",
  },
    {
    name: "এখানে কি কেউ নেই?",
    artist: "মতিউর রহমান মল্লিক",
    album: "অ্যালবাম: প্রতীতি - ০১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/u34g4kbkrpuont36jeizj/ekhane-ki-keu-nei.mp3?rlkey=hbiubk4uiolm3xgtleh7qn60a&dl=1",
  },
];
