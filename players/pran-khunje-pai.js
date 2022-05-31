// Define the tracks that have to be played
let track_list = [
  {
    name: "তোমার নামে",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/kkpbvnpqo6z7c0m/1tomar%20name.mp3?dl=1"
  },
  {
    name: "আমি কুরআনের",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/train.jpg",
    path: "https://dl.dropbox.com/s/i3gdatiyub7eugx/2ami%20quraner.mp3?dl=1"
  },
  {
    name: "ওগো মুজাহিদ",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/mount.jpg",
    path: "https://dl.dropbox.com/s/4ve4nbnqk9x6f3r/3ogo%20mujaheed.mp3?dl=1",
  },
    {
    name: "কত ভালবাসি",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/1hox5rgorwuq120/4koto%20valobasi.mp3?dl=1",
  },
    {
    name: "তোমার নামের মধুর",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/tunnel.jpg",
    path: "https://dl.dropbox.com/s/fmh3iv37kx4xjfb/5tomar%20name.mp3?dl=1",
  },
  {
    name: "রব কে তোমার",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/l1h8me6w7k75u0s/6rab%20ke%20tomar.mp3?dl=1"
  },
  {
    name: "মন কেন",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/v07dc6l9bn4ar8q/7mon%20keno.mp3?dl=1",
  },
  {
    name: "আমার মায়ের",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/light.jpg",
    path: "https://dl.dropbox.com/s/wwb638q1i1iqlkw/8amar%20mayer.mp3?dl=1",
  },
  {
    name: "নদীর পানি",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dropbox.com/s/hjsih8qy0tp33y6/9nodir%20pani.mp3?dl=1",
  },
    {
    name: "আমি চোখ",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/45jeu6ga92vdc45/10ami%20chokh.mp3?dl=1",
  },
    {
    name: "আমায় এমন",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/yo4e4eckrlatha6/11amay%20emon.mp3?dl=1",
  },
    {
    name: "এখন তো সময়",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/0gzd68q94d9pifh/12ekhon%20to%20somoy.mp3?dl=1",
  },
    {
    name: "সবুজ দিগন্তে",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/karakoram.jpg",
    path: "https://dl.dropbox.com/s/sa0zy1z9v4s7xty/13%20sobuj%20digonte.mp3?dl=1",
  },
    {
    name: "যারা আল্লাহর",
    artist: "নওশাদ মাহফুজ (টাইফুন শিল্পী গোষ্ঠী) ",
    album: "অ্যালবাম: প্রাণ খুঁজে পাই",
    image: "../images/train.jpg",
    path: "https://dl.dropbox.com/s/aptbd46dd2fhldr/14jara%20allahr.mp3?dl=1",
  },
];
