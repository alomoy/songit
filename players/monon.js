// Define the tracks that have to be played
let track_list = [
  {
    name: "যখন আমায় ডাকবে না কেউ",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/d76ho1pee5ipc3g7hwtjm/1-zokhon-amay.mp3?rlkey=yd2dbtpcrs6d5qhgknhlxrlf8&st=4ye71q71&dl=1"
  },
  {
    name: "আমাদের নাফরমানি পাপের ফলে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/c5ckq9mg2rbkl1chqnr07/2-amader-naformani.mp3?rlkey=n0gtpqcgs84ovfc6a4e9nrxsc&st=8kl8755l&dl=1"
  },
  {
    name: "আমার এ গান আমার এ সুর",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/tb0i563dick1pfrbsmmgv/3-amar-e-gan.mp3?rlkey=h1w0h57jkgtpr07jaejov2y8c&st=6k359sgx&dl=1"
  },
  {
    name: "আমি গুনাহগার চাহি করুণা",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/olb1hi3yrlonk9pwmhr46/4-ami-gunahgar.mp3?rlkey=i26s7efzxevbm2xyymeqqtqqi&st=zrscpu0l&dl=1"
  },
  {
    name: "আমি যদি হই কভু প্রভাতের",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/e240ldnup624w3qj2wqyw/5-ami-zodi-hoi.mp3?rlkey=f0u4j4fnxiscf4h2w78r541ni&st=sk81ppzj&dl=1"
  },
  {
    name: "এসো না আল্লাহর নামে গান",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/iu06jlgn6y6vc20lek6bu/6-eso-na-Allahr.mp3?rlkey=ec91v4qrd2vhbtw4906jamn3q&st=lw0g0azd&dl=1"
  },
  {
    name: "হে করুণার আধার তুমি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/xokrkp0q6bltziwu4p7iv/7-he-korunar-adhar.mp3?rlkey=h8vu535y7327e58zmwnm8wzy4&st=wcf9rm4r&dl=1"
  },
  {
    name: "হতাশার কথা তুমি বলো না",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/6evjy79znwpavxhek7emg/8-hotashar-kotha-tumi.mp3?rlkey=dqywez1s158jvvqqnrnksqgzv&st=h5ylthti&dl=1"
  },
  {
    name: "এক মুহূর্তের নাই ভরসা ওরে",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/fqlv00om9sqna5o3d86pl/9-ek-muhurter.mp3?rlkey=8064poz6aduzzvkis6t38yzb8&st=flftln0m&dl=1"
  },
  {
    name: "জনতার সাগরে বলে যেতে চাই",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/yxp7yp63d2mk0r6b48nxp/10-jonotar-sagore.mp3?rlkey=4rvnva1phbmndnybhk6mfnap0&st=xx9n63hb&dl=1"
  },
  {
    name: "যার কাছে প্রিয় বেশি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/1id7bde99l9ppt3qryzn5/11-zar-kache-priyo.mp3?rlkey=qhclyb1uvxh3yvcvnl66wknaz&st=d6j43ylp&dl=1"
  },
  {
    name: "নামাজ হলে শুদ্ধ সহী",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/1tlffcutijxnrqatq0565/12-namaj-hole-sahi.mp3?rlkey=0w1oqdp5jqvs7wko1livufddg&st=siktgoep&dl=1"
  },
  {
    name: "নিরাশাতে আশা তুমি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/kczru58b48zxlenllqtnk/13-nirashate-asha.mp3?rlkey=4zkb0brspw30rf4cjx2w6njqc&st=7wfg0dk4&dl=1"
  },
  {
    name: "তোমাকে স্মরণ করতে দেখেছি",
    artist: "সাইফুল্লাহ মানছুর",
    album: "মনন",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/iabnz9bz2lgbofwl28593/14-tomake-smoron.mp3?rlkey=p6z91xgps04k6cp14nzxv20ai&st=x3eisuf9&dl=1"
  },
];
