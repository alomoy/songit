// Define the tracks that have to be played
let track_list = [
  {
    name: "কওতো দেখি",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/z0qx8pn2i68vrjg/01%20Koyto%20Dekhi.mp3?dl=1"
  },
  {
    name: "ভোরের বাতাসে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/s/q3nuhthpg9ki25e/02%20Bhorer%20Batase.mp3?dl=1"
  },
  {
    name: "টাট্টু ঘোড়া",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/3kbzp7fcbf6jzy9/03%20Tattu%20Ghora.mp3?dl=1",
  },
    {
    name: "দে আর অলসো",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/buvsgyo62viu392/04%20They%20Are%20Also.mp3?dl=1",
  },
    {
    name: "আল্লাহ আমার রব",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/s/z95svjnyt6uoqui/05%20Allah%20Amar%20Rab.mp3?dl=1",
  },
    {
    name: "আমরা শিশু",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/s/b672l9ozb50z7kt/06%20Amra%20Shisu.mp3?dl=1"
	
  },
  {
    name: "হাইয়্যা হাইয়্যা",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/a21fnru1i2j3wd3/07%20Hya%20Hyaeya.mp3?dl=1"
  },
  {
    name: "ওরে হুলোরে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/04os9n3is9iu86b/08%20Ore%20Hulore.mp3?dl=1",
  },
  {
    name: "হেরা হতে",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/light.jpg",
    path: "https://www.dropbox.com/s/8jfmy41jseb7zsj/09%20Hera%20Hote.mp3?dl=1",
  },
  {
    name: "আমরা যে চাই",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/s4ybfxt2vj6ga2s/11%20Amra%20Je%20Chai.mp3?dl=1",
  },
    {
    name: "একি অপরূপ",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/yww1t73xdyfo3p5/12%20eki%20Oprup%20Sush.mp3?dl=1",
  },
    {
    name: "আল্লাহ'স ক্রিয়েশন",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/eh2iojgbv0a5kpi/13%20Allah_s%20Creation.mp3?dl=1",
  },
    {
    name: "নিত্য যেথায়",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/cpjzpvg409942gw/14Nityo%20jethay.mp3?dl=1",
  },
    {
    name: "ডু ইউ নো",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/s/epwdcewm26a1mwh/15%20Do%20You%20Know.mp3?dl=1",
  },
    {
    name: "নবী এলেন",
    artist: "সাইমুম শিল্পী গোষ্ঠী",
    album: "অ্যালবাম: বুলবুলিদের গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/s/cj94mey6ov9ztx0/16%20Nobi%20elen.mp3?dl=1",
  },
];
