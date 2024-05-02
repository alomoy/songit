// Define the tracks that have to be played
let track_list = [
  {
    name: "কাঙ্খিত ঠিকানা",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/u2ngwm0rvri3cjn4bjbv8/0-kangkhito-thikana.mp3?rlkey=1z7ylki1497bkpdhlpp1mwymp&st=86552qoq&dl=1"
  },
   {
    name: "শাহজালালের শাহপরানের",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/m6iuaojov4w843sdpoy7w/1-shah-jalaler.mp3?rlkey=3ragmv5m1lyove8reuzt1jmny&st=jaxzvrnc&dl=1"
  },
  {
    name: "আমার গানের বাণী",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/song.png",
    path: "https://www.dropbox.com/scl/fi/y0aq0dn4p1x56b2ato5fy/2-amar-ganer-bani.mp3?rlkey=45xwlndqrjrh5yqkfkc82bx00&st=j9ppb9b6&dl=1"
  },
  {
    name: "এ ময়দানে কে",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/se4exwzs2uqw9pj41c8cd/3-e-moydane-ke.mp3?rlkey=g2fuuob9b0psgenulm5v7yd2j&st=mnj1p0z9&dl=1"
  },
  {
    name: "নাওয়াও নেই খাওয়াও নেই",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/nhk0k8ijm5m4rf5y0bk60/4-naoa-nei-khaoa.mp3?rlkey=gdvlik6ip7af8snap4l03ughd&st=3tdkkz7q&dl=1"
  },
  {
    name: "দুঃসময়ের মুখোমুখি",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/mtvill.jpg",
    path: "https://www.dropbox.com/scl/fi/2gxznw5baqm46q953knh7/5-dushomoyer-mukhomukhi.mp3?rlkey=3vfj0br1nqltv4sqgkoqwpz4p&st=sspzurxg&dl=1"
  },
   {
    name: "ভয় কী বন্ধু",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/fist.jpg",
    path: "https://www.dropbox.com/scl/fi/yu6emvbrykjnk2jaekbla/7-voy-ki-bondhu.mp3?rlkey=g2jtnc8xld2vpmd5obijqenu2&st=wz2ul9q7&dl=1"
  },
  {
    name: "একটি গানের স্বরলিপি",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/song.png",
    path: "https://www.dropbox.com/scl/fi/gxr5khtkjgev1nev8pwfd/8-ekti-ganer-sworolipi.mp3?rlkey=hd6zzv3zc1z7hdg9168hku5nm&st=nbb1frvs&dl=1"
  },
   {
    name: "নীরব পাহাড় ছুঁয়ে",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/964s01bejjohztsonvphf/9-nirob-pahar.mp3?rlkey=5iu8bg0nzb3jatyl2gw831kml&st=73s0m1ow&dl=1"
  },
  {
    name: "মানুষ যদি না হয়",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/xexwnch9sxu8qlosf9fqo/10-manush-zodi-na.mp3?rlkey=yj49cmxlkwvt8yxbomvwqv5c3&st=hxkxzxwc&dl=1"
  },
   {
    name: "ফেরেশতারা নিমেষহারা",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/moon.jpg",
    path: "https://www.dropbox.com/scl/fi/ry5pcc3bnp3k0h4oj04xn/11-fereshtara-nimesh.mp3?rlkey=o1ju493s7qokjjej8sbe4fywo&st=4bh5j04w&dl=1"
  },
  {
    name: "রহমতের বারিধারা",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/rain.jpg",
    path: "https://www.dropbox.com/scl/fi/armnby7dnozyg93aeghiz/12-rahmater-baridhara.mp3?rlkey=zefabcqc5zl2upne6suvh6sat&st=bz7t2ok8&dl=1"
  },
   {
    name: "কুরআনের হুকুমাত",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "স্বপ্নের মুকুরে",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/hqu180z0edc07chjq7n15/13-quraner-hukumat.mp3?rlkey=424d1gyhm8npoji4gckbp5q1y&st=jgc6ewlo&dl=1"
  },
];
