// Define the tracks that have to be played
let track_list = [
  {
    name: "ধর্মের পথে শহীদ যাহারা",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/wzb3op04oq1j4a9xm2b2k/01.Dhormer-pothe-shohid-jahara.mp3?rlkey=fl6ev782325evfajbzh6xs6wx&st=s7xxwgvz&dl=1"
  },
  {
    name: "তুমি ছাড়া এই পৃথিবী অর্থহীন",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/w1zw6ptdtfpjbnv66t3mf/02.Tumi-chara-ei-prithibi-orthohin.mp3?rlkey=bn0m636e5s8lfgf9zjzyxxa7s&st=ykqtokui&dl=1"
  },
  {
    name: "গরীব দুঃখীর সবার তিনি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/dm92icalt3i6nu4a2j4uv/03.Gorib-dukhir-sobar-tini.mp3?rlkey=7l3u6wukkwd671mc5su7n8m7s&st=d8jai6t0&dl=1"
  },
  {
    name: "শহীদী মরণ দিও",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/qg90dtdzn14brw5z0mr69/04.Shohidi-moron-diyo-amake.mp3?rlkey=od97ychwymjq3z11th5rzpaad&st=v92a52uw&dl=1"
  },
  {
    name: "জীবন তরী বাইতে গিয়ে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/40jx9b6albjziiub9pvdk/05.Jibon-tori-baite-giye.mp3?rlkey=7xyo5h95a3wjppl42ef185y6m&st=ax8o53cz&dl=1"
  },
  {
    name: "আজ আছি তো কালকে নাই",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/cpo0k7swxmflm42ugeqbu/06.Aj-achito-kalke-nai.mp3?rlkey=29fgnpn5jzm3k0v928344lez6&st=rto1cpx7&dl=1"
  },
  {
    name: "আল্লাহ আমার রব এই",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/c7vpr3q2ln2m7tvv36tye/07.Allah-amar-rob-ei-robi-amar-sob.mp3?rlkey=qv1vlfwpv0pg1n56zy07r96na&st=x705be6k&dl=1"
  },
  {
    name: "ও আকাশ তোমার নীলের",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/gqzgdydm2stiz2zoyj0ew/08.O-Akash-tomar-nilero-simana.mp3?rlkey=hytl5ps32k9mvu9z3j7io49pb&st=6t27egrg&dl=1"
  },
  {
    name: "নদীর মাঝে নৌকা চালাই",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/huuq7qmliek5jzkrr63na/09.Nodir-majhe-nouka-chalai.mp3?rlkey=aorrdb7br0e66mluaygjmlpgi&st=2534n9ph&dl=1"
  },
  {
    name: "বলো তো কার ইশারায়",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/oqbjcb39g4wty3nfrbdzc/10.Boloto-kar-isharay-golap.mp3?rlkey=0wovnly8uufz1u0ndvxknhgbl&st=68tg3v3q&dl=1"
  },
  {
    name: "এইতো জীবন",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/e1jx543xuu40rkhll1y57/11.Eito-jibon-cheye-na-paoyar.mp3?rlkey=91zu35kcrbj4rue3z8el6llyh&st=jqvgc22g&dl=1"
  },
  {
    name: "জীবনের খেলা ঘর",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/hlgx0zami0kuas2dmvb7g/12.Jiboneri-khela-ghor.mp3?rlkey=rlhcsscf0fk32dyb09vjohwtg&st=9ifxm7bu&dl=1"
  },
  {
    name: "জীবনের সাত রং খুঁজে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "উত্তরণ",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/r0vx8gov98yxl6lsw6rbm/13.Jiboner-shat-rong-khuje.mp3?rlkey=6t6tmoiyxp3tcm60m2udvmu64&st=feto3onv&dl=1"
  },
];
