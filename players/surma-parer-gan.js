// Define the tracks that have to be played
let track_list = [
  {
    name: "গ্রামের নওজোয়ান",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/xphwix88748i1auzl1hok/14_gramer_nawjoan.mp3?rlkey=v9rf0z3worv0iyfdv7tq40t7b&st=p5mmrt33&dl=1"
  },
  {
    name: "আইলারে নয়া দামান",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/6xb0gjt5mjd1136379jcn/13_ailare_noya_daman.mp3?rlkey=c3f582obmu9i43hh5yl3ir7k0&st=cpz3p8c0&dl=1"
  },
  {
    name: "ইলেকটরি সাবাশ",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/fwbgsnmezbyutjzs8c67m/12_electori.mp3?rlkey=13i5sfcia8af6ohcekjvis2vn&st=ezjteigu&dl=1"
  },
  {
    name: "সুরমা গাঙর পারো বাড়ি",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/pguam9tfucujg06kklik2/11_surma_gangor.mp3?rlkey=1mo5ondfjqiqrej6ov5r0tmtn&st=zjct48eo&dl=1"
  },
  {
    name: "সিলট পাইলে যেমন তেমন",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/kmw38grw7joj3d88z7qz8/8_sylhet_paile.mp3?rlkey=a1gkdwm58qicqwlnar7q3aqv0&st=87ngyf1f&dl=1"
  },
  {
    name: "মরিলে কান্দিস না",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/w4jah7s0l5xzz6be56req/10_morile_kandis_na.mp3?rlkey=f5k6295rz7lyw5tlddx8143b6&st=zbjll2hn&dl=1"
  },
  {
    name: "মাটিরও পিঞ্জিরার মাঝে বন্দী",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/4uvl6x5v1itqlpa4bfrij/7_matir_pinjira.mp3?rlkey=loyccdy1tui4x7lt8u7li8f46&st=wzd0s247&dl=1"
  },
  {
    name: "গিয়াছিলাম ওয়াশিংটন",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/0qc0ceh471x8eflvhsogj/6-giyachilam_washington.mp3?rlkey=9jcrsr30g63h18ux9o8i31eaj&st=fyio9tbg&dl=1"
  },
  {
    name: "লোকে বলে ঘর বাড়ি বালা না",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/ughwrfecsmjw63ajexaky/5_loke_bole.mp3?rlkey=uwphvzfzjd55all7v2o0ojdk1&st=qx0hit5g&dl=1"
  },
  {
    name: "ও ডাইভার যাইবাইনি",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/e5flqb00lbypitkonv6n6/3_o_driver.mp3?rlkey=iwi67wz1pbe3wqdfk6uo3466t&st=26jezopz&dl=1"
  },
  {
    name: "যে মাটিতে সুরমা কুশিয়ারা",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/6rmh1mrdv5lrp87fwa252/2_ze_matite_sumra.mp3?rlkey=xavmcoqfdtxjc3kckstw2aa3c&st=3xg3xopk&dl=1"
  },
  {
    name: "আমরা দিশারী",
    artist: "দিশারী শিল্পীগোষ্ঠী",
    album: "সুরমা পাড়ের গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/udccckegzzo3ktafhiwyj/1_amra_dishari.mp3?rlkey=efu7494gwd8p1ipgknm16h01j&st=fhuvujwq&dl=1"
  },
];
