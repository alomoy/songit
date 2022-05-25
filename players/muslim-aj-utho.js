// Define the tracks that have to be played
let track_list = [
  {
    name: "জেগে ওঠো মুসলিম",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/7t2r9w8zirxsefo/01_jege_utho_muslim.mp3"
  },
  {
    name: "ও আমার ফিলিস্তিন",
    artist: "সাইফুল্লাহ মানছুর",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/p7k772is5o2hzrg/02_o_amar_filistin.mp3"
  },
  {
    name: "বিশ্ব বিবেক কোথায়",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/er3sf6lfewbot4q/03_bishwo_bibek.mp3",
  },
    {
    name: "ইহুদী নাসারার বুলেটের",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/bc8y2hvx84cth30/04_ihudi_nasarar_buleter.mp3",
  },
    {
    name: "মাগো আমায়",
    artist: "সাইমুম",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/q7k6600trgf04pg/05_mago_amay.mp3",
  },
    {
    name: "আফগান আমাদের",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/095syam6g687aw7/06_afghan_amader_imaner.mp3"
	
  },
  {
    name: "ফিলিস্তিনি মায়ের",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/hp899s8zzkbhn5c/07_filistini_mayer.mp3"
  },
  {
    name: "পৃথিবীর প্রতিটি জনপদে",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/xt9x984x0qnmfqf/08_prithibir_protiti_jonopode.mp3",
  },
  {
    name: "ঘুমন্ত জননীর",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/bfgtwfg33s32qo5/09_ghumonto_jononir.mp3",
  },
  {
    name: "যুদ্ধে যাবার সময়",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/gte53z8ajbpokmw/10_zuddhe_zabar_somoy.mp3",
  },
    {
    name: "বদরের প্রান্তরে দয়াময়",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/r1lcuaxpepq5eah/11_bodorer_prantore.mp3",
  },
    {
    name: "শহীদের লাশ দেখো",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/zutikkc1f86qihg/12_shahider_lash_dekho.mp3",
  },
    {
    name: "বদরের যুদ্ধ দেখি",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/zpvkiwb5ukzt4f2/13_bodorer_zuddho_dekhi.mp3",
  },
    {
    name: "জিহাদের ময়দান",
    artist: "মশিউর রহমান",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/viaqrfif4xaujmj/14_zihader_moydan.mp3",
  },
    {
    name: "ধর্মের পথে শহীদ",
    artist: "সাইফুল্লাহ মানছুর",
    album: "অ্যালবাম: মুসলিম আজ ওঠো",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/ul81xnlvqi6vqy0/15_dhormer_pothe_shahid.mp3",
  },
];
