// Define the tracks that have to be played
let track_list = [
  {
    name: "বাগানে কত ফুল",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/garden.jpg",
    path: "https://www.dropbox.com/scl/fi/mtq04rt7menxhkdybubjs/1-bagane-koto-koto.mp3?rlkey=wu01fmqvbd0elgtdx0ogozf5j&st=9krkq4oc&dl=1"
  },
   {
    name: "চালতা পাতার কাজ",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/swjfu7o4imd15xy0953ye/2-chalta-patar.mp3?rlkey=slqif9ra30barzhxeshksalub&st=6bwu5w3h&dl=1"
  },
  {
    name: "ছোট পাখি ছোট তার",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/birds.jpg",
    path: "https://www.dropbox.com/scl/fi/1dntk0ajowdmapwndaond/3-chhoto-pakhi-thote-tar.mp3?rlkey=z9fpp8wsnwgrk6obma8wrvl16&st=fr0h4uak&dl=1"
  },
  {
    name: "দিনটা যেন মোমের",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/scl/fi/07fgrubw21qamdhrk9iqy/4-dinta-jeno-momer.mp3?rlkey=ltdcmc2e4trhxji6nkmoj4lil&st=1hnn40s9&dl=1"
  },
  {
    name: "হে মেহেরবান",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/i0bdn4so97jcbey2i4job/5-he-meherban.mp3?rlkey=ppmi3mglaank3oytcjw2mvq3g&st=ff7woalm&dl=1"
  },
  {
    name: "হলদে ডানার সেই পাখি",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/birds.jpg",
    path: "https://www.dropbox.com/scl/fi/svlptat6uajhpgoyyi8rt/6-holde-danar.mp3?rlkey=05a9nw72lcgc7k1ie4w6i6q1z&st=5efbk48i&dl=1"
  },
   {
    name: "জাগ্রত ছাড়ো ঘুম",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/99bjx91w4b1qcngrxd7jo/7-jagroto-chharo-ghum.mp3?rlkey=mbhpqlrrycymy5nh7neha239m&st=tuhti7cj&dl=1"
  },
  {
    name: "কর্ণফুলী শোনো",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/river.jpg",
    path: "https://www.dropbox.com/scl/fi/f9m8ka9evr50ssz5eupk2/8-kornophuli-kornophuli.mp3?rlkey=m6zoveghcries67y24cr3pqsl&st=ex9pjc03&dl=1"
  },
   {
    name: "নীল ছাতাটা আকাশ",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/rximxnuhbiu9uoykkt0sa/9-nil-chhatata.mp3?rlkey=x3o6hqwwrtp0xpdrahvq3c8m8&st=dzt9hfx4&dl=1"
  },
  {
    name: "নদীরে তুই",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/river.jpg",
    path: "https://www.dropbox.com/scl/fi/2tzduc6bgahpmwho0zmx3/10-nodir-tire-bosot.mp3?rlkey=8800ahtliyt02hxfu0n8gt0ps&st=vro0ryak&dl=1"
  },
   {
    name: "ওরে নিশিগন্ধা",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/flower.jpg",
    path: "https://www.dropbox.com/scl/fi/50velm3gh00u8he63dzu8/11-ore-nishigondha.mp3?rlkey=2n4bhpfurk84r6d37nseo20o6&st=bjcdtvg8&dl=1"
  },
  {
    name: "পদ্মা নদীর পাড়ের",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/river2.jpg",
    path: "https://www.dropbox.com/scl/fi/tg4520ph9rzowff75hq8h/12-padma-nodi-parer-moto.mp3?rlkey=8509ijcnh067nhm3hhsqm03sb&st=yukh0ndy&dl=1"
  },
   {
    name: "সাহস বুকে রাখো",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/tg4520ph9rzowff75hq8h/12-padma-nodi-parer-moto.mp3?rlkey=8509ijcnh067nhm3hhsqm03sb&st=yukh0ndy&dl=1"
  },
  {
    name: "সালাতে বসল না মন",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/rfujpwz5o6l2cwkx4jgq0/14-salate-boslo-na-mon.mp3?rlkey=ho9zcui3ogpmqk9grp3kvzaq1&st=ctounqbx&dl=1"
  },
   {
    name: "সেই সংগ্রামী মানুষের",
    artist: "হাসনাহেনা আফরিন",
    album: "হিজল বনের পাখি",
    image: "../images/horse.jpg",
    path: "https://www.dropbox.com/scl/fi/8sz17h0fopeifdrv64756/15-sei-songrami.mp3?rlkey=ywfu857bibhcpwsvg5sirh999&st=zquc4jr3&dl=1"
  },
];
