// Define the tracks that have to be played
let track_list = [
  {
    name: "আল্লাহ নামের তাসবীহ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/8mgp7e38p22tljrt6toez/Allah-Namer-Tasbih.mp3?rlkey=944ppuyenagcxg3trvkoxvnxs&st=g4twkgvu&dl=0"
  },
   {
    name: "আল্লাহ তুমি আমার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/mmmm3decpgnhupep6eumq/Allah-Tumi-Amar.mp3?rlkey=lrvf9ek3mizmgyqzlfjz3cu9p&st=kvzk5rd3&dl=0"
  },
  {
    name: "আল্লাহু আল্লাহু",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/desert.jpg",
    path: "https://www.dropbox.com/scl/fi/szgnsyr2tihqtdfkeqoxz/Allahu-Allahu-Allah.mp3?rlkey=v02h8vq4jp83je1e1iv6eo92h&st=kp40es75&dl=0"
  },
  {
    name: "আল্লাহু এই নামের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/m0fxub6hs4s2zwzzvl1ik/Allahu-Ei-Namer.mp3?rlkey=rn40x6lukmgapgyq5632reedq&st=98dx5q7x&dl=0"
  },
  {
    name: "হাসনাহেনা ফুটেছে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/1nirw0py1g24fonle283w/Hasnahena-Foteche.mp3?rlkey=rg0mi92yxfk71g035l0rgyq8k&st=baaglsbw&dl=0"
  },
  {
    name: "যেদিকে তাকাই আমি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/chcxr17rh6w80gyn90vjd/Je-Dike-Takai-Ami.mp3?rlkey=bl0795y13kcyqotfcdp52h7l2&st=c0fmabky&dl=0"
  },
   {
    name: "খোদা তোমার নামের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/nw6q8nt2yds6x2ui5lt99/Khoda-Tomar-Gan.mp3?rlkey=pvf0zr33av5eyqmt0xbzm3qlw&st=d2dbfu3o&dl=0"
  },
  {
    name: "লা ইলাহা ইল্লাল্লাহ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/3t7k9gdpzgllzur9a9rw9/La-Ilaha-Illallah.mp3?rlkey=vodxb66vnwzltnf5r116fygm1&st=l3isufg2&dl=0"
  },
   {
    name: "নানা রং ফুলে-ফলে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/ssvkedx47aq17i07yowmm/Nana-Rong-Fole.mp3?rlkey=mrhb5r6h3lt5rvnwjwr5absp6&st=st9jbbft&dl=0"
  },
  {
    name: "ঐ পাহাড় আর ঝর্ণা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/falls.jpg",
    path: "https://www.dropbox.com/scl/fi/y8yjks2q8ibfl9r3tbrrc/Oi-Pahar-Aar-Gachh.mp3?rlkey=lbu956myj01eiff9nvb2tling&st=eqcicbyj&dl=0"
  },
   {
    name: "তোমার নামে যদি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/61h0ndbcapuzmv899grmb/Tomar-Name-Jadi.mp3?rlkey=fzdeosey867o94u1ofy1xiedm&st=09rpp9t3&dl=0"
  },
  {
    name: "তোমার সৃষ্টি যদি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/049lyfqmial4thuhvebn0/Tomar-Sristi-Jadi.mp3?rlkey=w8euj3vldxh8j4970i5yq8sdo&st=8gd0vsha&dl=0"
  },
   {
    name: "তুমি রহমান",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "হামদ",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/8ggr3ls2a1gh2bfuoos7r/Tumi-Rahaman.mp3?rlkey=wlalc6gk18qkibutlke511kg0&st=om8oybsa&dl=0"
  },
];
