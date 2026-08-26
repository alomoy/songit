// Define the tracks that have to be played
let track_list = [
  {
    name: "নানা রং ফুলে ফলে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/cjj2546su9klnbdcta3r5/01-nana-rong-fule.mp3?rlkey=wlz5iww5vszeaqrpic4rmgnuj&st=g97u54bq&dl=1"
  },
  {
    name: "আমি যদি আরব হতাম",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/w7crgn817n9bb0935q2h1/02-ami-zodi-arab-hotam.mp3?rlkey=ng6ivpgr246x20cfi0nocg36e&st=ekllat8o&dl=1"
  },
  {
    name: "ষড় ঋতুর এই দেশে যেখানে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/8koarhuxx05os59c7elo0/03-shoro-hritor-ei-deshe.mp3?rlkey=ob7yvgw5i2zyjtlux0vnbl4n4&st=amhmaubq&dl=1"
  },
  {
    name: "ওরে মাঝির দল",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/1kn7d01ri92tk4o1i2et4/4-ore-majhir-dol.mp3?rlkey=hty4qeiyz0ok222psyhmzwout&st=8qbjjgul&dl=1"
  },
  {
    name: "সুখের জীবন আরাম আয়েশ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/zrr4izy3z3map8f9bezq9/05-sukher-jibon.mp3?rlkey=hc9lxg1fcu2h9ya7c923ipca6&st=gql7vu0f&dl=1"
  },
  {
    name: "তুমি আছো হৃদয়ের গভীরে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/4ani5aj9n67fou8m4995i/06-tumi-acho-hridoyer.mp3?rlkey=o5yj747gfknnc9qyjkp5v6m7c&st=ldipjyvj&dl=1"
  },
  {
    name: "ইতিহাস থেকে মোরা শিখলাম",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/hjj3go315q846t26hugzl/07-itihash-theke-mora.mp3?rlkey=hhpevvghab9310v5z8dl1ncbu&st=ye2x944t&dl=1"
  },
  {
    name: "ও আমার ফিলিস্তিন আবার আসব",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/akv6mx9a028welie58ylc/08-filistin.mp3?rlkey=qqnlkoychpjchqgrnuezkki6c&st=088xdsv5&dl=1"
  },
  {
    name: "তোরা যারে মরণ বলিস",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/8l5braqdph4dzem1jvolz/09-tora-zare-moron.mp3?rlkey=t5jsa9bghbjor2gvfshohaug0&st=ob2t7db0&dl=1"
  },
  {
    name: "ওগো ফুল শিউলি তোমার সাথে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/whcgzqlfwzlqc3lz5755n/10-ogo-ful-shiuli.mp3?rlkey=9st3enwu0qe69pn1crgbahffm&st=pm8464hr&dl=1"
  },
  {
    name: "খোদা তোমার নামেরি গান গাই",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/zuits6dzov69kdtb8ttu3/11-khoda-tomar.mp3?rlkey=fe963qrt2sgemb1mptgh83ouw&st=l81nidg7&dl=1"
  },
  {
    name: "সকাল হলো শোনরে আযান উঠরে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/e0vazsk7hemdi47fstpye/12-sokal-holo.mp3?rlkey=6uxmf5b0vhfwvzf26w4i8b5wl&st=ki6dghol&dl=1"
  },
  {
    name: "তোমার দেয়া এই নীল আসমান",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/9fpw9e8cs15elql3t5soy/13-tomar-deya-ei.mp3?rlkey=66f3kk9yl27qjype9691dp8dp&st=tk28rvqb&dl=1"
  },
  {
    name: "দুই নয়ন খুলিয়া দেখ কুদরতের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "সাইমুম – ৫",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/i93ornjlhhu0fc4dmx8xb/14-dui-noyon.mp3?rlkey=u1qhljt9s3cs51asmmji8b110&st=lifsla4f&dl=1"
  },
];
