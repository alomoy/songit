// Define the tracks that have to be played
let track_list = [
  {
    name: "অপরূপ সৃষ্টি তোমার",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/0eyi6pzk3fbg3aa/1oporup%20sristi.mp3?dl=1"
  },
  {
    name: "দুঃখ দিও না মাকে",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/s/i4iu11hvavbi3r7/2dukkho%20diyona%20make.mp3?dl=1"
  },
  {
    name: "আমার ভালবাসা শুধু",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/m3378vati2wpifn/3amar%20valobasa.mp3?dl=1",
  },
    {
    name: "তোমার দয়ার নাই সীমানা",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/sbcn94qr911ybsf/4tomar%20doyar.mp3?dl=1",
  },
    {
    name: "তোমার আপন ঠিকানা",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/s/0a30quj119vztgi/5tomar%20apon%20thikana.mp3?dl=1",
  },
    {
    name: "জীবনের মালিক তুমি",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/k3c1u1ej0v6mio0/6jiboner%20malik%20provu.mp3?dl=1"
	
  },
    {
    name: "কোথা সে মুসলমান",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/jrqassiuujz1cou/7kotha%20se%20musalman.mp3?dl=1"
  },
  {
    name: "আজান শুনে মসজিদে",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/s/pt87053vfqryqd8/8azan%20shune%20masjid.mp3?dl=1"
  },
  {
    name: "শুকরিয়া তোমার",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/o2vohqjfzmd0kvt/10shukriya%20tomar.mp3?dl=1",
  },
    {
    name: "আমার দেশের স্বাধীনতা",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/4162fgmkoxzulhb/9amar%20desher.mp3?dl=1",
  },
    {
    name: "আজকে আমার বুক",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/s/9j8iiulsz8lt0ac/11ajke%20amar%20buk.mp3?dl=1",
  },
    {
    name: "একটি তারার কাছে প্রশ্ন",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/l203kjrh776wv7u/12ekti%20tarar%20kache.mp3?dl=1"
	
  },
    {
    name: "আল হেরাতে ধ্যানে",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/j7t45auruoc8acm/13al%20herate.mp3?dl=1",
  },
    {
    name: "আমার জন্মভূমি",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/b0s98vxt9l0ujmb/14amar%20jonmovumi.mp3?dl=1",
  },
    {
    name: "হেরে যায় যমুনার",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/s/0m5cqo56sf9pqgj/15hera%20zay%20jomunar.mp3?dl=1",
  },
    {
    name: "দুই দিনের দুনিয়ার",
    artist: "রবিউল ইসলাম ফয়সল - প্রত্যাশা সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: নজরানা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/jgsgh5s43qzwp5v/16duin%20diner%20ei.mp3?dl=1"
	
  },
];
