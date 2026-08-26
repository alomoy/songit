// Define the tracks that have to be played
let track_list = [
  {
    name: "ফোটা ফুল অলি যেমন",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/z8wanedj84shgvagvqsn6/1-fota-ful-oli.mp3?rlkey=v2tn07d4533we30kxodonxbtw&st=4v6w1iwe&dl=1"
  },
  {
    name: "গালি দিয়ে কথাবার্তা মুনাফিক",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/o4r9dqgrhh2kcvfvs26uw/3-gali-diye-kotha.mp3?rlkey=dwlvbg5nyxsb1qtm10pjgx0bo&st=o2c3yrj1&dl=1"
  },
  {
    name: "নিয়ম মতো চলার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/bm7qbwmxlt18h21e264ip/2-niyom-moto-cholar.mp3?rlkey=djpja1plbx3idjdkz84myq4xe&st=xjnjrp5k&dl=1"
  },
  {
    name: "স্বাধীনতা এনেছি রাখব",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/tdwcy1cabi44yqkazncvq/4-swadhinota-enechi.mp3?rlkey=0n3twi8pmqo3gytqz1m1if2jx&st=ileblzjl&dl=1"
  },
  {
    name: "বৃষ্টি মুখর সময় প্রভুর",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/3impbvh9k8o5ifep7qnu5/5-brihti-mukhor.mp3?rlkey=jbx4li2kawe2ryc92m9m3zxun&st=xaxyrtv5&dl=1"
  },
  {
    name: "নজরানা দেই এদিন তোমার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/0gawq0imnlzrj2ifbxt2o/6-nojrana-dei.mp3?rlkey=2nzye758cp6jwknh7z7qtykn1&st=3f457rsa&dl=1"
  },
  {
    name: "গাছগাছালি পাখপাখালি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/dd4f5cegcopaxjfl16qbt/7-gach-gachali.mp3?rlkey=gywbugreid0s15lyo3hrpf3k0&st=soa4s9cr&dl=1"
  },
  {
    name: "রং বেরং এর রং মাখিয়ে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/dy98j0joflm8z9h9slg9u/8-rong-berong-er-rong.mp3?rlkey=swp9ifp7ebknem7aak0kfcxeo&st=o3vlr613&dl=1"
  },
  {
    name: "আম ফুল জাম ফুল",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/k3caxrwvp9ez2u1t1k01c/9-am-ful-jam-ful.mp3?rlkey=amel7yeagp4s039ee0r588dp4&st=c15dvr2u&dl=1"
  },
  {
    name: "রাতের কোলে ঘুমিয়ে পূর্ণিমা চাঁদ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/lz5uve2rfzxbq7gqbmrn3/10-rater-kole-ghum.mp3?rlkey=euoc0fc7eyqvhv84w16p64e6g&st=wofnercf&dl=1"
  },
  {
    name: "হলুদ শাড়ী পরে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/e9h05r5fj58pssx8ptqvj/12-holud-shari-pore.mp3?rlkey=5lz70b1ymjq00mxm90h23z1wu&st=chgkjsmb&dl=1"
  },
  {
    name: "রাসুল বলেন পুণ্য করো",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/0sxj1ogy3oa27322a7001/11-rasul-bolen-purno.mp3?rlkey=il8jphgj6frygtqe36magj38v&st=cvbzaf8g&dl=1"
  },
  {
    name: "সূর্য ওঠার আগে আগে ওঠো",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/ben0t254yuiom4s5znf00/14-surjo-uthar-age.mp3?rlkey=plh4yxjp9qk5vvutimadplfvi&st=07y4yq53&dl=1"
  },
  {
    name: "কী নিয়ে আজ গর্ব বাহাদুরি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/f76qk8xfzets0y8m6fsko/13-ki-niye-aj-gorbo.mp3?rlkey=9em26yamo8pixj2o9emaxk3fj&st=rpw9qrez&dl=1"
  },
  {
    name: "পরের জন্য করলে কিছু",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/2zko9vzoi51y06j6na14q/15-porer-jonyo-korle.mp3?rlkey=3xqm152k78dyfrdwmi2xm2acb&st=fzpslhy8&dl=1"
  },
  {
    name: "নিজের দাঁতটা নিজে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/scl/fi/jyg5t1l5bxmkgfq73w2zz/16-nijer-danta-nijei.mp3?rlkey=a2ykmumus2o4defsy2hntyez0&st=1hmggqm7&dl=1"
  },
  {
    name: "উষর ধরায় এলে দূর আরশের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "নিয়ম মতো চলে‌‌‌‌‌‌‌‌‌া",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/t9hf993u3gx6nxmhjcio1/17-ushor-dhoray-ele.mp3?rlkey=518n9dmtdkl0ntx2l2lsbmkw2&st=76179fgp&dl=1"
  },
];
