// Define the tracks that have to be played
let track_list = [
  {
    name: "তোমারই জন্য মন কাঁদে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/curvedroad.jpg",
    path: "https://www.dropbox.com/scl/fi/ccg2ccojkeyuhllvt33bw/01-tomari-jonyo-mon-kande.mp3?rlkey=zcgvkysuwvy24jpds7sworvhq&dl=1"
  },
   {
    name: "আঁখির আড়াল হলে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/o5s9kuay10jzrsl4iyy0q/02-ankhir-aral-hole.mp3?rlkey=aietajtbp9ng0536cqykw7lni&dl=1"
  },
  {
    name: "ও রাহীম ও রহমান",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/29759crohzam0r25n1fhn/03-o-rahim-o-rahman.mp3?rlkey=51uwxj389o3y4rg29bhej2dbz&dl=1"
  },
  {
    name: "আজও সেই কুরআন আছে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/6fztzniq82cpc14ugkux3/4-ajo-sei-quran.mp3?rlkey=4xinhzx1gc9hf7fcsfrd80ng3&dl=1"
  },
   {
    name: "ও নদী তুমি বইছো কেন?",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/zu9ty4gisr65k1urxlcrs/05-o-nodi-tumi.mp3?rlkey=elkttzeeie0mpggpt25trq4b8&dl=1"
  },
  {
    name: "হায়রে জীবন",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mtvill.jpg",
    path: "https://www.dropbox.com/scl/fi/7bbo9rnvjf3izeel2ld39/06-hayre-jibon.mp3?rlkey=c3avij00ag2dxw91q1dbjwz1r&dl=1"
  },
   {
    name: "আকাশরে তুই আলো",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/90a7q7b6o8zwhzml6j8da/07-akashre-tui-alo.mp3?rlkey=ijpx4z5rd61pert86zgezhbnw&dl=1"
  },
  {
    name: "যত জ্বালা বিরহের",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/dnas1w3dunpvg68mtels7/08-zoto-jwala-biroher.mp3?rlkey=qqpyvfaoq0cclxsr7xqyc7s6m&dl=1"
  },
   {
    name: "সবারই জীবনে সুখ",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mtvill.jpg",
    path: "https://www.dropbox.com/scl/fi/3p6bzrg5xxt9m9qer4jui/09-sobari-jibone-sukh.mp3?rlkey=tq1h9fxocxhz9vki3p6glssx5&dl=1"
  },
  {
    name: "ঝর্ণা ঝর্ণা ঝর্ণারে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/peytt6vhlsgf3spyp8hse/10-jhorna-jhorna.MP3?rlkey=axn4a547uei1w3rr3dtx1mmy9&dl=1"
  },
   {
    name: "পল্লী গাঁয়ের ঐ",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/curvedroad.jpg",
    path: "https://www.dropbox.com/scl/fi/6xq2kkk5sdx3h79nqmt4b/11-polli-gayenr-oi.MP3?rlkey=rcx2fnrlmsz3yjr3nqi0z56db&dl=1"
  },
  {
    name: "তোমাকেই ভালবেসেছি বলে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/j3iuaa4e6f728ese4at0k/12-tomake0-val-beshechi-bole.mp3?rlkey=h25c054agn0qlsnbqy9sv4m55&dl=1"
  },
   {
    name: "সব হৃদয়ের মালিক",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/fx2clxpid9ghqrntr9jzg/13-sob-hridoyer-malik.mp3?rlkey=98eghyzislrfyv97sy1fgoc4y&dl=1"
  },
  {
    name: "আমাকে শহীদ করে",
    artist: "তারিক মুনাওয়ার",
    album: "তোমারই জন্য মন কাঁদে",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/86c2eyf8pvf01w85wxj5z/14-amake-shahid-kore.MP3?rlkey=hw0cxmpridhxl38qy0rcxjtou&dl=1"
  },
];
