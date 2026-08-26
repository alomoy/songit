// Define the tracks that have to be played
let track_list = [
  {
    name: "এই দেশ শাহজালালের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত-১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/90syyp1bay5d94dftt3aj/ei-desh-shahjalaler.mp3?rlkey=artm21ar30evhl32nrkh23zkl&st=06x4ccuz&dl=1"
  },
  {
    name: "চলুন বদলে ফেলি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত-১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/6zun4cyw9l0hv79k9a74l/cholun_bodle_feli.mp3?rlkey=t5uq3l87eyxii7722yy3m94w4&st=wc17fews&dl=1"
  },
  {
    name: "তুমি আসমানে থাকো",
    artist: "ওবায়দুল্লাহ তারেক",
    album: "বাছাইকৃত-১",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/g783nyd43r1uk9dggl03y/Tumi_asmane_obaydullah.mp3?rlkey=f6b11g2fu9uikgnm3wtdv080m&st=ao2hz00j&dl=1"
  },
  {
    name: "ইকরা কালামাল্লাহ",
    artist: "Ahmed Bukhatir",
    album: "বাছাইকৃত-১",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/uinceqx7pfxe7lyujja64/iqra-kalamallah.mp3?rlkey=ypy29sx9qfo5axhqfjycyl8ym&st=wlxjroq4&dl=1"
  },
  {
    name: "আমাকে দাও সে ঈমান",
    artist: "মতিউর রহমান মল্লিক",
    album: "বাছাইকৃত-১",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/9ln5rkhd8af93zzhfz3ey/amake-dao-sei.mp3?rlkey=badtxav7sh3k1p5osdoocs4z6&st=ipjj0f7i&dl=1"
  },
  {
    name: "আমি কাবা ঘরের",
    artist: "ওবায়দুল্লাহ তারেক",
    album: "বাছাইকৃত-১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/dmz7xjxhc3vmvfahdbsho/ami_kaba_ghorer.mp3?rlkey=gxq1jlhosd05u2mnyb1b6y4g6&st=eyn99ss1&dl=1"
  },
  {
    name: "দুনিয়া সুন্দর মানুষ সুন্দর",
    artist: "",
    album: "বাছাইকৃত-১",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/3knwiqjl5i9wocgqoyiln/dunia_sundor.mp3?rlkey=czj4dp0d40u0ct46uqxi4ua8w&st=d6d4rfk8&dl=1"
  },
  {
    name: "এই সুন্দর সুনীল আকাশ",
    artist: "",
    album: "বাছাইকৃত-১",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/l1g1c187a8cwx1jt94tju/ei-sundor-sunil-akash.mp3?rlkey=lldhyxmvb9a5dn5wz3wkm19u3&st=c3yi1cqu&dl=1"
  },
  {
    name: "একটি পাখি বসল ডালে",
    artist: "",
    album: "বাছাইকৃত-১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/ga3sbwt7cax2go1daawr5/ekti_pakhi_boslo.mp3?rlkey=kgkltp8fdxobgkr4dpaq4bu1r&st=k0hiz0fd&dl=1"
  },
  {
    name: "মাছরাঙা দেখেছো কি",
    artist: "জাইমা নূর",
    album: "বাছাইকৃত-১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/4y7lbdzmx33te7o1u1iz9/machranga-dekhecho.mp3?rlkey=atwh7gi94iznxa5qommb9t6vy&st=ddpeb7kn&dl=1"
  },
  {
    name: "মাঝে মাঝে ডুবে যাই ভুল",
    artist: "",
    album: "বাছাইকৃত-১",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/q4wm7zkk6ku63hwnoz9he/Majhe-majhe-vul-kolorob?rlkey=e8431fkh45115uqax3s6i90yy&st=diwkco4u&dl=1"
  },
  {
    name: "মনের মাঝে একটাই",
    artist: "মশিউর রহমান",
    album: "বাছাইকৃত-১",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/h3dtsop8mu7j8magxm9ym/moner-majhe-ektai-swopno.mp3?rlkey=lcevvbub6ei0fpgswvd4qsg8h&st=afu95vgv&dl=1"
  },
  {
    name: "নেই কেহ নেই",
    artist: "মশিউর রহমান",
    album: "বাছাইকৃত-১",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/n4wa714v22fd203gd9ljl/nei-keho-nei-Allah-chara.mp3?rlkey=ghaulejzi5eozi8q0wqnun6r7&st=lln9qo1r&dl=1"
  },
  {
    name: "ঐ নীলিমায় বলো কে আছে",
    artist: "মশিউর রহমান",
    album: "বাছাইকৃত-১",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/m6j9g44owfyxopa24lnso/oi-nilimay-bolo.mp3?rlkey=3ztkp0x6d404duapzx69vn93z&st=2r5i7gfv&dl=1"
  },
  {
    name: "কুরআনকে বুঝে পড়লে",
    artist: "",
    album: "বাছাইকৃত-১",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/bulhcq6dlpbxp0m93ee3t/quranke-bujhe-porle.mp3?rlkey=8u1l7fbuuww4m1rufebd393lq&st=nfjtm2rg&dl=1"
  },
  {
    name: "সে কোন বন্ধু বলো",
    artist: "সিয়াম",
    album: "বাছাইকৃত-১",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/scl/fi/gfo4oe60rap9fbrifknip/Se-Kon-Bondhu-bolo-siyam.mp3?rlkey=546rb651ctd4rt3hx1ru181sj&st=ysdatll4&dl=1"
  },
];
