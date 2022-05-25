// Define the tracks that have to be played
let track_list = [
  {
    name: "যেথায় হযরত",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/k2ebluxnkw056cq/11-zethay-hazrat.mp3"
	
  },
  {
    name: "মসজিদেরই পাশে আমার",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/z2sb3cependtqik/12-masjider-pashe.mp3"
  },
  {
    name: "ভোর হলো ওঠ",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/8id5gxfzw2zxmof/13-vor-holo-uth.mp3",
  },
  {
    name: "আমি যদি আরব",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/w3ju7xncfa6oh60/14-ami-zdoi-arob.mp3"
  },
  {
    name: "ও মন রমজানের",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/pn8pono8bog11h8/15-o-mon-romjaner.mp3",
  },
  {
    name: "আমার জীবন",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/lnbf2ssp4nk3vzo/16-amar-jibon.mp3"
  },
  {
    name: "হে রাসুল তুমি",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/67dlqjzhv6hirg9/17-he-rasul-tumi.mp3",
  },
  {
    name: "গোলা থরে থরে",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/d8w9hqytt2pt0s4/18-golap-thore.mp3"
  },
  {
    name: "তুমি আছো হৃদয়ের",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/8t5sxaltt239u21/19-tumi-acho-hridoyer.mp3"
  },
  {
    name: "দুদিনের দুনিয়া",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/jhf96yeirgmd5bi/20-dudiner-dunia.mp3",
  },
    {
    name: "পরওয়ার দিগার",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/bfwt4mw1bm9bx5e/21-parwar-digar.mp3"
  },
  {
    name: "আমি অনেক ভরসায়",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/tqst3xa4nvxdv7f/22-ami-one-vorosay.mp3",
  },
  {
    name: "হে প্রিয় হে রাসুল",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/cqupbi01e4303tw/23-he-priyo-he-rasul.mp3"
  },
  {
    name: "এই ভূবনে আর আছে কে",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/u7ecntkpvdqmdb0/24-ei-vubone-ar.mp3"
  },
  {
    name: "আশা দীপ যদি",
    artist: "তারিক মুনাওয়ার",
    album: "গুচ্ছ - ২ ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/ohfostrct2gzw2w/25-asha-dip-zodi.mp3",
  },
];
