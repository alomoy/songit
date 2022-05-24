// Define the tracks that have to be played
let track_list = [
  {
    name: "ঝর্ণার পাশে দাঁড়ালে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/s/qp0thihc5n853qs/01%20Jharnar%20Pashe.mp3?dl=1"
  },
  {
    name: "নীল আকাশে লক্ষ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/q4zg9b5mbksqxvz/02%20Nil%20Akashe.mp3?dl=1"
  },
  {
    name: "হাজার নদী মাঠ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/gsl0ry28n4zlmxb/03%20Hajar%20Nody%20Math.mp3?dl=1",
  },
    {
    name: "লক্ষ তারার মাঝে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/1f1t6mkj05z1r97/04%20Lokkho%20Tarar.mp3?dl=1",
  },
    {
    name: "আল কুরআনের পথ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/7n9420oh9h8rtal/05%20Al-Quraner%20Path.mp3?dl=1",
  },
    {
    name: "নামের বড়াই",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/s/bcym5hl8x1oxc9u/06%20Namer%20Borai.mp3?dl=1"
	
  },
  {
    name: "উই দ্য মুসলিম উম্মাহ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/qdfll79znw4mr1a/07%20We%20The%20Muslim.mp3?dl=1"
  },
  {
    name: "আমার রবের দয়ার কথা",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/9y09ruyvppic3zv/08%20Amar%20Rober.mp3?dl=1",
  },
  {
    name: "গল্প বলি শোনো",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/tzjvqmjnf8os2jl/09Golpo%20boli.mp3?dl=1",
  },
  {
    name: "ফিরে ফিরে আসি",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/ejap5ynaq5s29um/10Fire%20fire%20asi%20ei.mp3?dl=1",
  },
    {
    name: "দুঃখীদের প্রিয়জন",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/mb5xxeka94eizsu/12%20Dukhider%20Priyo.mp3?dl=1",
  },
    {
    name: "হাজার দেশের এই পৃথিবী",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/gryjvuir42rhtjf/13Hajar%20desher.mp3?dl=1",
  },
    {
    name: "তাওয়াক্কুল ইয়া আখি",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: অনুপ্রাণন",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://www.dropbox.com/s/rshkmjin6cnxq7d/14%20Tawaqqul%20Ya.mp3?dl=1",
  },
];
