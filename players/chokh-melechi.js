// Define the tracks that have to be played
let track_list = [
  {
    name: "আমাদের নেই কোনো",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/ntvhp84du2j49v6/07_amader_nei_kono.mp3"
	
  },
  {
    name: "আমার মায়ের",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/w429qgniiazzfs3/10_amar_mayer_chokhe.mp3"
  },
  {
    name: "বাতিলের আঘাতে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/mfksx1atc4d0m1k/02_batiler_aghate.mp3",
  },
  {
    name: "দ্বীনের পথে",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/nfd2i5d6z6d3cw8/4diner%20pothe%20chola.mp3",
  },
  {
    name: "খোদার জন্য",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/6u2i4hgexzuifxp/05khodar%20jonno.mp3",
  },
  {
    name: "মালেক তোমার",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/8hf4c648pza30y3/11_malek_tomar_rokte.mp3"
  },
  {
    name: "মালেকের স্বপ্নেরা",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/4vss2tdf1zw290f/03maleker_swapnera.mp3"
  },
  {
    name: "মরুঝড় সাইমুম",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/65ogbght7st9eo4/8morojhor%20saimum.mp3",
  },
    {
    name: "নতুন সূর্য",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/093l8d4yz26pk7v/9notun%20surjo%20uthbere.mp3",
  },
    {
    name: "প্রাণের ভেতর",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/0ij2588m77vpx6y/6praner%20vetor%20pran.mp3",
  },  
  {
    name: "শিল্পী তো এক",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/flwxowzgyyv984u/1shilpito%20ak%20tumi.mp3",
  },
    {
    name: "সত্যের কথকতা",
    artist: "প্রবাহ সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: চোখ মেলেছি ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/d4yxg8q6e3tb74f/12sotter%20kotokotha.mp3",
  },
];
