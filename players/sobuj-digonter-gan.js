// Define the tracks that have to be played
let track_list = [
  {
    name: "কী অপরূপ রূপে বানালে মানুষ",
    artist: "আমিরুল মোমেনিন মানিক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/y802k7ybjrmfkf8qa8ucv/01-ki-oporup-rupe-tumi.mp3?rlkey=np7s212tzlbcas4b0y5mc0g9g&st=orrby2s4&dl=1"
  },
  {
    name: "এমন এক গাঁয়ে নিয়ে চল যেথা",
    artist: "নওশাদ মাহফুজ",
    album: "সবুজ দিগন্তের গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/wnbzgz21npr3aj85iqgkk/02-amai-emon-ek-gae.mp3?rlkey=cjn8b5wbyaowrk87xeigtwgku&st=fvkgdgtn&dl=1"
  },
  {
    name: "অশ্রু ঝরালে কি দুঃখ প্রকাশ করা যায়",
    artist: "মাসুদ রানা",
    album: "সবুজ দিগন্তের গান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/47hiqhyp9lxgwa56levtp/03-chokher-osru-jhorale-ki.mp3?rlkey=rkluct8mch6423u2682xqz7bk&st=vv1rz6vh&dl=1"
  },
  {
    name: "এই দুটি চোখ তুমি",
    artist: "জাফর সাদেক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/uohcqlwrrr3ejjtqvyfis/04-ei-duti-chokh-tumi.mp3?rlkey=qi8yx48ch16sh4l019xw39ms6&st=fe9ps7t4&dl=1"
  },
  {
    name: "যদি পৃথিবীর সব জল কালি",
    artist: "আমিরুল মোমেনিন মানিক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/qu9lugns3h4cxbg746rhq/05-zodi-prithibir-sob-jol.mp3?rlkey=gq7owb8ikb5638cnv3a7vy2nk&st=egds4zu8&dl=1"
  },
  {
    name: "কবি ফররুখ আর ডেকে ডেকে",
    artist: "আমিরুল মোমেনিন মানিক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/37eok4z9sacmv88xxy8ed/06-kobi-forrukh-ar-deke-deke.mp3?rlkey=akrbsiknv92meq9jlw4pujteu&st=ry5c89z5&dl=1"
  },
  {
    name: "কত ভালোবাসি মাগো",
    artist: "নওশাদ মাহফুজ",
    album: "সবুজ দিগন্তের গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/guflvbna0becyomdqcdd7/07-koto-valo-basi-mago.mp3?rlkey=ca4hz0vmuxsp18ogkuqfma09o&st=w2kryfee&dl=1"
  },
  {
    name: "নদীর ও কুল ভাঙে ও কুল গড়ে",
    artist: "জাফর সাদেক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/4azwsziwezdx7utkzrtl3/08-nodire-okul-gore.mp3?rlkey=mdzs6ffha5vvbdl26bsng6d9j&st=rt4wymwb&dl=1"
  },
  {
    name: "ওগো শ্রেষ্ঠ রাসুল তুমি",
    artist: "নওশাদ মাহফুজ",
    album: "সবুজ দিগন্তের গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/5g2r75txp3cuylyjxa0e5/09-ogo-sreshto-rasul.mp3?rlkey=ebegqbbhi9jpu8rpwxtkg8ba6&st=mhp04lf7&dl=1"
  },
  {
    name: "ওই আকাশ বাতাস বলো",
    artist: "মাসুদ রানা",
    album: "সবুজ দিগন্তের গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/8r2qdv4teorz2eikix5h2/10-oy-akas-bolo.mp3?rlkey=h0bycb783t3vy8mvwjxqarqfx&st=8g5qp9n0&dl=1"
  },
  {
    name: "শেকড়ের সন্ধানে",
    artist: "আমিরুল মোমেনিন মানিক",
    album: "সবুজ দিগন্তের গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/mur51u91bbzl0tdgxx2i9/11-sekorhir-sondhane.mp3?rlkey=9ebqfylpxv1okd2bqww8kwxme&st=mkq8iks5&dl=1"
  },
];
