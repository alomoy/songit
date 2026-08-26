// Define the tracks that have to be played
let track_list = [
  {
    name: "বাবা মানে হাজার বিকেল",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/tstdpvkh79g8pnltpnplp/01-baba-mane-hajar-bikel?rlkey=4w3xsc75af9vi4cryvlva6jsz&st=ijckd0ga&dl=1"
  },
  {
    name: "আমার একটা মন ছিল",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/i450d9o8ffhr15m5wydhm/02-amar-ekta-mon-chilo-mp3?rlkey=k00s18fgvgh93vfw22j3cya7b&st=ux1tc3l2&dl=1"
  },
  {
    name: "আমার চোখে ভাইয়া তুমি তারা",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/8g9xc8xs7co7fi156deuo/03-amar-chokhe-vaia.mp3?rlkey=9hite8uee12l2w9e312k4v6w0&st=ghrk04ck&dl=1"
  },
  {
    name: "কার চোখে এত মায়া",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/iylz2wh80nywwkmd59w4v/04-kar-chokhe-eto-maya.mp3?rlkey=7oxo5vlgx1eljduce2nz0zz44&st=1srg2f05&dl=1"
  },
  {
    name: "আমি বহু দূরগামী",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/aigvvx807hifrkeiqjhzt/05ami-bohu-dur-gami.mp3?rlkey=o01ank9tznfnxm8r1b79fckao&st=iw5gwh53&dl=1"
  },
  {
    name: "বড় বড় পরিভার ভেঙে",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/8o2wl1yosa159p4f4kxd6/06-boro-boro-poribar.mp3?rlkey=pir2d8feae8opqs6sqqdod7xt&st=nwryvqgv&dl=1"
  },
  {
    name: "হিজল বনে পালিয়ে গেছে",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/hlmhcb53nnvig5zzu6oyq/07-hijol-bone.mp3?rlkey=q568lxck2pu36lenpb834xj0y&st=71pidasv&dl=1"
  },
  {
    name: "যেখানেই থাকি আমি যেভাবে",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/qt9tls8bjby7wejs93gby/08-zekhanei-thaki-ami.mp3?rlkey=c9nxwk3quctyirg7dyvhk6qea&st=87iuockr&dl=1"
  },
  {
    name: "ভাবতে যখন বসি",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/veo87iufjkgxy03lals24/09-vabte-zokhon-boshi.mp3?rlkey=jt32630ismow9i1ne7ujvd1o3&st=yka03tqt&dl=1"
  },
  {
    name: "আমলের মাস এলো",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/52vjqduru947d12h98nht/10-amoler-mash-elo.mp3?rlkey=nafx5kkht97quh9xalervkkd8&st=vveo38g7&dl=1"
  },
  {
    name: "তোমাদের মাঝে আর গাইব না",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/z05m6lotxsin7p2ay3oe3/tomader-majhe-ar.mp3?rlkey=oof3pl9yzwixjgz2c2x7mjepj&st=q6frx7bj&dl=1"
  },
  {
    name: "দুয়ারে আইসাছে পালকি",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/p6r7eoy8iyvmoldpkrb5g/duare-aisache.mp3?rlkey=cey0g44h4lllkgcfgmh0qfovd&st=05wpj3rm&dl=1"
  },
  {
    name: "মাছরাঙা দেখেছো কি",
    artist: "জাইমা নূর",
    album: "জাইমা নূর বাছাইকৃত – ০১",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/d9k528okzvuvl8t0oji5d/machranga-dekhecho.mp3?rlkey=5ei9ocxmaijv4w6kg8wl73xb8&st=cahxuzp7&dl=1"
  },
];
