// Define the tracks that have to be played
let track_list = [
  {
    name: "কি সুন্দর লাগে!",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/yctxpq1xifcm3dv/1-ki-sundor-lage.mp3"
	
  },
  {
    name: "দেশটা আমার",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/aj63ymeysvqiinq/2-deshta-amar.mp3"
  },
  {
    name: "মাঝি রে ...",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/50qnxqmz7pd99a1/3majhire%20o.mp3",
  },
  {
    name: "চরিত্রবান মানুষ ছাড়া",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/k0avr4pzzp3jorr/4-choritroban-manush.mp3",
  },
  {
    name: "পরান পাখি",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/tkkd99gfxvbl33k/5-poran-pakhi.mp3",
  },
  {
    name: "পিছে থেকে খোকা",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/5dmn3kt4x13kusm/6-piche-theke.mp3"
  },
  {
    name: "তার ভালবাসা",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/a11lieiq8y5wkq3/7-tar-valobasa.mp3"
  },
  {
    name: "সত্যের সেনানীরা",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/yogg9gmhesuu8m4/8-sotyer-senanira.mp3",
  },
    {
    name: "ফেব্রুয়ারির একুশ",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/ej188wp3l21txdr/9-februarir-21.mp3",
  },
    {
    name: "ছোট্ট বেলার সেই",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/j50ps8hx7cwiatl/10-chotto-belar.mp3",
  },  
  {
    name: "আমি লাল শোণিত",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/di3nkz75czqpfow/11-ami-lal-shonito.mp3",
  },
    {
    name: "পাবনা শহর",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/bkfdcv6squ9tkwk/12-pabna-shohor.mp3",
  },
      {
    name: "জানো না রে বন্ধু",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/koj6ttw9evf8wpb/13-jano-na-re-bondhu.mp3",
  },
      {
    name: "রুখে দাঁড়াব",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/doyuns7tx4np4fo/14-rukhe-darabo.mp3",
  },
      {
    name: "আজ সবার কাছে",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/ai7lt9p5v18jant/15-aj-sobar-kache.mp3",
  },
      {
    name: "যুদ্ধে যাব",
    artist: "সৃজন সাহিত্য সাংস্কৃতিক সংসদ",
    album: "অ্যালবাম: জীবন পাখি যায় উড়ে ",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://dl.dropbox.com/s/se4y7ki16szajtu/16-zuddhe-zabo.mp3",
  },
];
