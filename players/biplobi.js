// Define the tracks that have to be played
let track_list = [
  {
    name: "আগামীর সকালটা আমাদের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/k8ujp11726bdx3layyp7q/agami-sokalta.mp3?rlkey=dc9ex6xd5b7otle8qbyzxpbhy&st=qx692z55&dl=1"
  },
  {
    name: "আগুনের ফুলকিরা এসো",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/8zwhatmjvifoev482rzif/agooner-foolkira.mp3?rlkey=m6m94abape06dmb1or47p9ras&st=58g2ooy9&dl=1"
  },
  {
    name: "একটুখানি আঘাত খেয়ে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/94m545y3rlzouhfoy8gof/Aktukhani.mp3?rlkey=54twpdjazz0ah30oyechwcren&st=b6y3kuel&dl=1"
  },
  {
    name: "আল্লাহর রঙে যে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/hc8kdya6kmabet12xijef/Allaher-Range-1.mp3?rlkey=r4q7ibonam32pmmgo2wb3af3r&st=huwuylea&dl=1"
  },
  {
    name: "আলকুরআনের সৈনিকেরা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/bq4zrp67ntub5qkqfc0p7/alquraner-soinik.mp3?rlkey=8xfa0darsqmngavlp6r819ng0&st=g5n3y3n3&dl=1"
  },
  {
    name: "আমায় একটি ভাঙা কলম",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/kiqwu09cy3ibw2rxeewwv/amay-ekti-vanga.mp3?rlkey=harzc3434xhrfg6yfkvl2nuno&st=3jg7los5&dl=1"
  },
  {
    name: "আমি হারবো না কোনদিন",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/klvsf49j6h83pnv9oiu2o/ami-harbo-na.mp3?rlkey=9jzx9bekasp7tm34ba76m4k08&st=chyseqv4&dl=1"
  },
  {
    name: "এ কেমন রাজ্য রাজার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/wr8y8ve74s7mh6xnox1rz/e-kemon-rajyo.mp3?rlkey=ep5eq1042m27m5blqjolvxhai&st=jn95b96v&dl=1"
  },
  {
    name: "এক পা দু পা করিয়া",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/t9id5fkm8ywjdqg148odo/ek-pa-dupa.mp3?rlkey=58uwquyket173ak2j0ej57vf0&st=au1rqd0n&dl=1"
  },
  {
    name: "হে নাবিক সিন্দাবাদ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/og6kiv71uh3bckmr3sxjh/He-Nabik-Sindabad.mp3?rlkey=6b2ni56uvvy1atqce0vpk3yjl&st=ge71zj9y&dl=1"
  },
  {
    name: "ইনকিলাবের অস্ত্র মোদের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/pqz8w4knc3posj5nzbssi/Inkilaber-Osro-Moder.mp3?rlkey=mf9ssi6rfkn8grqtswe2wcetu&st=werdk2qt&dl=1"
  },
  {
    name: "ইসলাম শিখলি না রে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/uolwxcrjzik83pc9csuym/Islam-Shikhlee-Nare.mp3?rlkey=ukbs91vdoi61unhdwk022tdj1&st=kzgxeo7b&dl=1"
  },
  {
    name: "ইসলামের জয়যাত্রা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/q5d6dbbeyb9a8vkm88gd7/Islamer-Joy-Jatra-Ke-Ache-Thekai.mp3?rlkey=8aowarb62rw0z3rewu5ndjpqa&st=uf16jv2j&dl=1"
  },
  {
    name: "ইতিহাস থেকে মোরা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/305klsxj9era07jwi3jet/Itihash-theke.mp3?rlkey=0s5yvjmt1ots23ovg1j9wzwx5&st=fhvzwfdy&dl=1"
  },
  {
    name: "কেউ না করুক আমি করব কাজ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/lssovglxi6wvtgitc2lic/Kew-Na-Korook-Ami-Korbo-Kaj.mp3?rlkey=s7an2mwunns2cskszs22bzbcn&st=ikx4yl5n&dl=1"
  },
  {
    name: "কোনো এক দিন কলেমার পতাকা",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/scl/fi/epchnmkn3b3qkangvwzo1/kono-ek-din.mp3?rlkey=u07281kt70z1kx0o0pcakoxge&st=nexqw3om&dl=1"
  },
  {
    name: "মুসলিম আমি সংগ্রামী",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/f0t5rdcxfp0rlwu8r0txe/Muslim-Ami.mp3?rlkey=lqwdzbca13imh4zlb7i53h7vv&st=616vi653&dl=1"
  },
  {
    name: "নোঙ্গর তোলো তোলো",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/p8ccbpuxt7vvvqhwkmhd0/nongor-tolo.mp3?rlkey=nl560kssywritope65rfdawi5&st=bsb718hk&dl=1"
  },
  {
    name: "রাত কেটেছে স্বপ্নে বিভোর",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/gvcbixr8u3740r17geboj/Raat-Keteche.mp3?rlkey=rheem4hfl7rdeid21v5kwr2gu&st=1r8vdxeu&dl=1"
  },
  {
    name: "আঁধার চিরে আনব",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/dlpfhe3xej6ubtuom1h0s/adhar-chire.mp3?rlkey=vhvzjg0kypkjyrf88s5tjgky6&st=n9wfh9t1&dl=1"
  },
  {
    name: "এই হাতে ও হাত",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/xq17kwcotqbv2blso9fna/Ai-Hate-O.mp3?rlkey=25l32cfewaxxh9bfnbyg1w41a&st=6ws0y0iq&dl=1"
  },
  {
    name: "আজ নয় কাল - ১",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/ys4ancx0rl0wdyn4x0mtd/Aj-Noi-Kal-1.mp3?rlkey=jehnoo4aqcxmfpl0fgb3wk35x&st=obrv5jkj&dl=1"
  },
  {
    name: "আজ নয় কাল – ২",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/ys4ancx0rl0wdyn4x0mtd/Aj-Noi-Kal-1.mp3?rlkey=jehnoo4aqcxmfpl0fgb3wk35x&st=obrv5jkj&dl=1"
  },
  {
    name: "আজকের এই পৃথিবীতে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/bduo52n1lotqxzp03lakq/ajker-ei-prithibite.mp3?rlkey=5kmid0nqau8jxzlhqwts0bf5o&st=yfv79v4c&dl=1"
  },
  {
    name: "এক দল ভালো মানুষের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/05pbmqi3kkvcevmo8p0vq/Ak-Dol-Valo.mp3?rlkey=pm976ppmplx56kzs13nf2npvt&st=8okzsz1m&dl=1"
  },
  {
    name: "একজন শহীদের ফোঁটা রক্ত",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/h9r7dby90e6n0381kobi0/Akjon-Shahider.mp3?rlkey=g6p0sdo09rjwczi3nu1pmrxli&st=uubjrmez&dl=1"
  },
  {
    name: "আল্লাহর রাহে যাদের জীবন",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/e30jh508to5mvbvddsz71/Allaher-rahe.mp3?rlkey=63d3dol7oi9kr7vv69iby9axl&st=srwsprfw&dl=1"
  },
  {
    name: "আল্লাহু আকবর তাকবীর",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/7gmfmm3efgn0qfcll2rbz/Allahu-Akbar-Takbir.mp3?rlkey=tw93q4ji04iyd3tbhrybwnwoz&st=t38mjx2m&dl=1"
  },
  {
    name: "আল কুরআনের পথ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mosque.jpg",
    path: "https://www.dropbox.com/scl/fi/eqhm7n8vt5k0zs7xpfox9/Alquraner-Poth.mp3?rlkey=fn3wfq0tkabqyk8shits00ce8&st=uuaq7vw0&dl=1"
  },
  {
    name: "আমাদের বিজয় যদি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/npumg9egg30rahh8r8rrr/amader-bijoy.mp3?rlkey=8om164vv9ripqdaw1lyt9qq2x&st=9mwdwobz&dl=1"
  },
  {
    name: "আমাদের প্রত্যয় একটাই",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/70unhq7i8krjjmmmau6ka/amader-prottoy.mp3?rlkey=yilnnsviptcl67qaw9oyzwrd4&st=jm1bqdk9&dl=1"
  },
  {
    name: "আমাদের সামনে নাকি অন্ধকারের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/laptop.jpg",
    path: "https://www.dropbox.com/scl/fi/1vwojomoluln9u84369c8/amader-samne.mp3?rlkey=w6tl130txt4hy0f8oex21yjl8&st=slrk6df4&dl=1"
  },
  {
    name: "আমি বলব কি সমাজের",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mount.jpg",
    path: "https://www.dropbox.com/scl/fi/khpwh1ui35fcosonv0z4c/ami-bolbo.mp3?rlkey=4q4fxu4xs9utz4vagdbt4t29y&st=ttho1kju&dl=1"
  },
  {
    name: "আমরা ছিলাম আমরা আছি",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/9bz4aup3h5u3ll6txeuh9/amra-chilam.mp3?rlkey=cnwup72uywkkul8k2twjcmx7v&st=yo4h7q8y&dl=1"
  },
  {
    name: "আমরা হব বীর",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/trail.jpg",
    path: "https://www.dropbox.com/scl/fi/397r2t9hnxmw960bxsd4a/amra-hobo-bir.mp3?rlkey=iy5w13to42essgdf5sk0adpzz&st=6x51wnox&dl=1"
  },
  {
    name: "আমরা জেগেছি জাগাব এবার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/karakoram.jpg",
    path: "https://www.dropbox.com/scl/fi/liq5ad7lbg1hlia8oyo1n/amra-jegechi.mp3?rlkey=4rp29himz1xwttjha33fddurm&st=s6lllxif&dl=1"
  },
  {
    name: "আর হতাশা নয় নয় নয়",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/hillroad.jpg",
    path: "https://www.dropbox.com/scl/fi/1bx3xypl490k3pz84u1yv/Ar-Hotasha-Noi.mp3?rlkey=nesanbohl5ss4ki0o9rr1hiw0&st=2r3kj5os&dl=1"
  },
  {
    name: "এসো এক জামাতে খোদার",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/7zz6y2sjbd9efu9o9eom8/Asho-Ak-Jamate.mp3?rlkey=san69l7m737yoy19meqkflzk4&st=jr99lbua&dl=1"
  },
  {
    name: "আজ যত প্রয়োজন",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/tunnel.jpg",
    path: "https://www.dropbox.com/scl/fi/vdqegpu75evlnspvj8zqk/Az-Joto-Proyojon-Gun-Gazaler.mp3?rlkey=9ey0oeluqvcaie4qo34mgwl03&st=rxktgapc&dl=1"
  },
  {
    name: "এই জনতার মিছিল",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/train.jpg",
    path: "https://www.dropbox.com/scl/fi/kdr7uxfccr1ufpi8qji1e/ei-jonotar.mp3?rlkey=37ffriefqbhejlrgxx0z3nsjc&st=eytppq2i&dl=1"
  },
  {
    name: "হে মুজাহিদ হে মুজাহিদ",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/sajek.jpg",
    path: "https://www.dropbox.com/scl/fi/ql8wxjbqhqf79dzk10s5h/he-mujaheed.mp3?rlkey=gamwpiift3rikkponmuifq1ox&st=csaf51u2&dl=1"
  },
  {
    name: "ইসলাম ছাড়া মানি না",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/nature.jpg",
    path: "https://www.dropbox.com/scl/fi/bolkas458nop2x7e3hlvy/Islam-chara.mp3?rlkey=xhiy6e9bdkotab7e2x7pc57sw&st=r6u6yw6c&dl=1"
  },
  {
    name: "আমাদের রুখতে যাবে",
    artist: "সাইমুম শিল্পীগোষ্ঠী",
    album: "বাছাইকৃত বিপ্লবী গান",
    image: "../images/mtroad.jpg",
    path: "https://www.dropbox.com/scl/fi/8vs7jeno4fx0grp0xmaac/amader-rukhtey.mp3?rlkey=lf0uekzikch5kb5wyaqn0wsvo&st=a0vywm7v&dl=1"
  },
];
