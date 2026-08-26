// Define the tracks that have to be played
let track_list = [
  {
    name: "শোনো মহারাজ",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/00r6ohknze2087jhe6i99/shono-moharaj.mp3?rlkey=kqnxlt3kmt7ybzrecx6err0bd&st=q8vwu9a6&dl=1"
  },
  {
    name: "শুধু আয়নাতে",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/z93w40yhqwsat4vcrab2r/shduhu-aynate.mp3?rlkey=f0oxu6yylsz32qmqqw7ivxc8h&st=3ler7tdt&dl=1"
  },
  {
    name: "মামু খালি আছে যার",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/3a1qwrxbohp7e62yixcfo/mamu-khalu.mp3?rlkey=rzjpmd4drh71o6hol68ovntte&st=0yqezmia&dl=1"
  },
  {
    name: "জীবনের শ্রেষ্ঠ",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/2ud33innkm3zogqnbuu9z/jiboner-shrestho.mp3?rlkey=iq0952txsg46agc154j636abo&st=9malliko&dl=1"
  },
  {
    name: "জীবনের খেলাঘর",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/86xg5g7t6wzb3pgxsev4r/jiboner-khelaghor.mp3?rlkey=ad66tj5tkp6dpa658pqo5eqt1&st=duq64x8s&dl=1"
  },
  {
    name: "প্যারোডি গান",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/qhr3wpebhmy3n0h7ptvhw/parody-song.mp3?rlkey=srrf19ky7w0limm9q3dg9rb4i&st=5lqig4vm&dl=1"
  },
  {
    name: "হে নামাজী",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/djjgw735brd3e1st1zcf3/he-namaji-somaj.mp3?rlkey=9ri4o33vnqhmqdlnseby5tpkb&st=rvtc4t5k&dl=1"
  },
  {
    name: "হায়রে আকাশ কান্দে",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/moss3upm0qlnw3te7oqt9/hayre-akash-kande.mp3?rlkey=qh8szewabrt4rejiukdd85c92&st=o7gsvpgj&dl=1"
  },
  {
    name: "ফুটপাথে পড়ে থাকা",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/22tzi1phxgjkl527sfbt4/futpathe-pore-thaka.mp3?rlkey=h4s738thgyviy3hvg7w3j7cm4&st=hd95zlj1&dl=1"
  },
  {
    name: "এমন জীবন করো",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/dlf76yo1xnzdc42i4bsjn/emon-jibon-koro.mp3?rlkey=vnqpjgj556m9jq15h4chb5ibv&st=30s9exr4&dl=1"
  },
  {
    name: "এমন একটি সমাজের",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/qs9yo4mm4vmx7x9cpsl8q/emon-ekti-somajer.mp3?rlkey=lr9dbgxfjn2md8zhsovd8fuil&st=5ag9hkcq&dl=1"
  },
  {
    name: "একটি কল্যাণ রাষ্ট্রের",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/0lcnezfijpbj2uwxjtktw/ekti-kolyan-rashtrer.mp3?rlkey=eqgi2f20x068h1ljwpnj5en7q&st=7tr04orh&dl=1"
  },
  {
    name: "এই জীবন তো থাকবে না",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/flhv2cryvnoyaox79t67h/ei-jibon-to-thakbe-na.mp3?rlkey=j49rcovjpz0txhhz3akv36hma&st=91t4ysme&dl=1"
  },
  {
    name: "এই সুজলা সুফলা",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/hgu6nt1vol2h4avpj26al/ei-sujola-sufola.mp3?rlkey=uh9uq7yzdlp57w4otx1u4z772&st=ubm7g2u0&dl=1"
  },
  {
    name: "এই সংসার মায়ের",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/2aqjoacpn5zqn9c38frjn/e-songsar-mayer-moton.mp3?rlkey=hhvn1fvy0qv7dhrt5d2oxdw67&st=dc8qd9fc&dl=1"
  },
  {
    name: "দিন যায় মাস",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/scl/fi/r7kyblcg4gfeydt2y9h3i/din-zay-mas-zay.mp3?rlkey=3faeh2ueueoobcq23hokyfxie&st=7nw3o6pa&dl=1"
  },
  {
    name: "চলো ভাঙতে চলি",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/3ftaogoca80jvwy91yq7v/cholo-vangte.mp3?rlkey=ej6f0f4idg5zvhwxo9zjmocx4&st=0km5r7wf&dl=1"
  },
  {
    name: "চোখ মুদিলেই",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/7n376hnvwo5u0khegsqu7/chokh-mudilei.mp3?rlkey=vwjwsmv4zifr1444o5nwzy69q&st=iqwgvu9b&dl=1"
  },
  {
    name: "চাঁদ অভু বলে না",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/eykyeia4xcvzpiapgkwoz/chand-kovu-bole-na.mp3?rlkey=c1gxp2mwyukx02jtamv6hqduy&st=lmrzgmbn&dl=1"
  },
  {
    name: "বিবেকের কাছে তুমি",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/prdsgpyfdfeiwh87g520d/bibeker-kache.mp3?rlkey=lruccpvlmoo579og8fxaye4af&st=srr2vaje&dl=1"
  },
  {
    name: "আমি বলব কি সমাজের",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/00mgk7l9ndgm1u1lklzdx/ami-bolbo-ki-somoajr-kotha-2.mp3?rlkey=qs1w7bumkvzivw3ad5q32fvme&st=kbi720p9&dl=1"
  },
  {
    name: "আমি বলব কি সমাজের ২",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/00mgk7l9ndgm1u1lklzdx/ami-bolbo-ki-somoajr-kotha-2.mp3?rlkey=qs1w7bumkvzivw3ad5q32fvme&st=kbi720p9&dl=1"
  },
  {
    name: "আল্লাহর ভয় রাখলে বুকে",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/piwlpt1t4yp8cp80jhp4f/allahr-voy-rakhle.mp3?rlkey=mnixkklmfzoxer5tzfuw79mfl&st=8z95qubl&dl=1"
  },
  {
    name: "আল্লাহ তুমি ছাড়া",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/rpcs05ua1aq9p8fio6rto/allah-tumi-chara.mp3?rlkey=fsh835ecmxbpwj7qx6eote8q1&st=lp7rn8jg&dl=1"
  },
  {
    name: "আল কুরআনের সৈনিকরো",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/hhy1xth18y9ykkruq18mc/al-quraner-soinikera.mp3?rlkey=8gyt1xi0hmmyrn7emeadxy4na&st=icetlemf&dl=1"
  },
  {
    name: "আজকের পৃথিবীতে শান্তি",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/8kjnmv7d36tizx51ntcqe/ajker-prithibite.mp3?rlkey=j6ku9jensieo8pqxfxw2yz79q&st=d0huh4ku&dl=1"
  },
  {
    name: "আইলোরে ডিশ অ্যান্টিনা",
    artist: "আবুল কাশেম",
    album: "আবুল কাশেম-গুচ্ছ ১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/3y3ok2kn4o38lo9xd7iwe/ailore-dish.mp3?rlkey=hknywp1hrqt121omqgs5m8npx&st=o868wvnx&dl=1"
  },
];
