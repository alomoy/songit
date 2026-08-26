// Define the tracks that have to be played
let track_list = [
  {
    name: "আমি কি জায়নামাজে নিজেকে",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/i4snaiskqtgmz96uqmpiz/1-ami-ki-jaynamaze.mp3?rlkey=rkf9pwjo2fswotqims6y249ta&st=ncwcz92b&dl=1"
  },
  {
    name: "নবিজী আমার দ্বীন কায়েমের",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/afm5d37ipswq6gg0fcimb/2-nobiji-amar.mp3?rlkey=pkraxu65pzd2dy0v7nvc3b1qw&st=jv1fxx2c&dl=1"
  },
  {
    name: "ক্বু আনফুসাকুম ও আহলিকুম",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/ow5sd79kdad4kv47aopsu/3-kun-anfusakum.mp3?rlkey=p3jrozedveq9f2m8shpxbrmgg&st=9i7j4rwq&dl=1"
  },
  {
    name: "তুমি কি ঈমান এনেছ না দেহ?",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/2icgaeaew0cycmwdgkgib/4-tumi-ki-eeman.mp3?rlkey=1xgx7oxhzzbcw6bh2bgcten93&st=8q0vxuws&dl=1"
  },
  {
    name: "আল্লাহ সুবহানআল্লাহ দমে দমে",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/zyfwnq6wrd41v0smgslww/5-dome-dome-proti.mp3?rlkey=ieyggw7g1zfn4fganr3cw5n94&st=znm7b3pl&dl=1"
  },
  {
    name: "Allah loves too",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/zyjyd6iporpmvc7lhcid2/6-Allah-loves.mp3?rlkey=h66yoywoivwbuwz7c8wnlpdxc&st=aipidykg&dl=1"
  },
  {
    name: "তা মুরুনা বিল মারুফি ওয়া তানহাওনা",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/bhuejenf0msoaks8qeltn/7-tamuruna-bil.mp3?rlkey=3pkqh596hjjid0p4gve016c9z&st=g5frkgnh&dl=1"
  },
  {
    name: "আকাশে নিখিলে তারা জ্বলে",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/xtarr9747scp7mzp1dws7/8-o-amar-allah.mp3?rlkey=h61jwfjf0d7yi771vivuq1yuq&st=lcmh91im&dl=1"
  },
  {
    name: "চারদিকে জ্বলছে আগুন",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/0uzhjijjzfip36g0erfu1/9-caridike-jwolche.mp3?rlkey=tgkol1u81frm04mscobkpsi30&st=j7pht6f7&dl=1"
  },
  {
    name: "Save mujahid’s lives",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/u1pjpd9gwctg59tqstpb5/10-save-mujahid.mp3?rlkey=3hhtdxrwheusl5r5djx5qv56r&st=zbwblqeu&dl=1"
  },
  {
    name: "কুরআন পড়ে দেখো ভাই",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/3byelgxcm2ge14bhyg14u/11-swoyong-nije-bujhe.mp3?rlkey=arvmkqpuqk50qs7lb0evlt2bd&st=9yr8e42b&dl=1"
  },
  {
    name: "হে মানুষ যে পানি পান কর",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/m4hsrpti3xrvte8rxjbwb/12-ei-prithibite.mp3?rlkey=e9jjqcx7f0bcuzsakt56ey1ft&st=faqs7wac&dl=1"
  },
  {
    name: "শহিদী মরণ আমার দাও দয়াময়",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/itf3ycc6zpm8il89zcjvg/13-shohidi-moron.mp3?rlkey=smv661ivtvemki1i8517c2bbp&st=by3yrlqw&dl=1"
  },
  {
    name: "ওয়া তাছিমু বই হাবলিল্লাহি জামিয়া",
    artist: "আবুল কাশেম",
    album: "জযবা",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/vr4ws1w9hegaap2bd5nkz/14-watasimu-bi-habli.mp3?rlkey=wsuxx78mrxlc2q7wx0rd661e6&st=95xnhvpd&dl=1"
  },
];
