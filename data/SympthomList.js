const question = '`Apa kamu mengalami gejala mata merah'
const yesOrNo = '? ya/tidak'
const sympthom = [
  `Apa kamu mengalami gejala mata merah pada mata ? ya/tidak`, // gejala 0
  `Apa kamu mengalami gejala penglihatan menurun/kabur pada mata ? ya/tidak`, // gejala 1
  `Apa kamu mengalami gejala penglihatan tidak menurun/tidak kabur pada mata ? ya/tidak`, // gejala 2
  `Apa kamu mengalami gejala penglihatan menurun/kabur secara akut (tiba-tiba) pada mata ? ya/tidak`, // gejala 3
  `Apa kamu mengalami gejala penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata ? ya/tidak`, // gejala 4
  `Apa kamu mengalami gejala penglihatan menurun/kabur kronis (berlangung lama) pada mata ? ya/tidak`, // gejala 5
  `Apa kamu mengalami gejala sakit/nyeri pada mata ? ya/tidak`, // gejala 6
  `Apa kamu mengalami gejala tidak sakit/tidak nyeri pada mata ? ya/tidak`, // gejala 7
  `Apa kamu mengalami gejala sakit/nyeri mendadak pada mata ? ya/tidak`, // ? gejala 8
  `Apa kamu mengalami gejala sakit/nyeri pelan-pelan pada mata ? ya/tidak`, // ? gejala 9
  `Apa kamu mengalami gejala distorsi bola mata (bentuk tidak teratur) pada mata ? ya/tidak`, // gejala 10
  `Apa kamu mengalami gejala bentuk bola mata tenang atau normal atau tidak ada distorsi ? ya/tidak` // gejala 11
];

/* 
s[0].sympthom[0], s[0].sympthom[1], s[0].sympthom[2], s[0].sympthom[3], s[0].disease,
s[1].sympthom[0], s[1].sympthom[1], s[1].sympthom[2], s[1].sympthom[3], s[1].sympthom[4], s[1].sympthom[5], s[1].disease,
*/

const s = [
  {
    disease:'Psioriasis',
    sympthom:[
      'Terasa gatal',
      'Ruam Kemerahan',
      'Penebalan kulit',
      'Kulit bersisik',
    ],
    source1: 'https://www.halodoc.com/artikel/inilah-8-jenis-psoriasis-yang-harus-diwaspadai',
    source2: 'https://www.alodokter.com/psoriasis',
  },
  {
    disease:'Vitiligo (Penyakit yang menyebabkan warna kulit memudar)',
    sympthom:[
      'Munculnya bercak hipopigmentasi di tubuh yang awalnya bercak yang muncul berwarna lebih muda dari kulit, kemudian perlahan-lahan memutih',
      'Hilangnya pigmen warna di rambut, janggut, bulu mata, dan alis, sehingga terlihat seperti uban',
      'Hilangnya pigmen warna di bagian hitam mata, bagian dalam mulut dan hidung, serta di area kelamin',
      'Bagian tengah bercak berwarna putih sedangkan tepinya kecokelatan atau kemerahan',
      'Nyeri dan gatal di area kulit yang terkena vitiligo',
      'Timbul ruam di area kulit yang terkena vitiligo setelah terpapar matahari',
    ],
    source:'https://www.alodokter.com/vitiligo'
  },
  {
    disease:'Cacar air',
    sympthom:[
      'Ruam merah di wajah, dada, atau punggung',
      'Demam',
      'Sakit kepala',
      'Kelelahan',
      'Hilang nafsu makan',
    ],
    source:'https://www.alodokter.com/cacar-air'
  },
  {
    disease:'Infeksi HSV 1 atau Herpes Oral (Kelompok virus yang dapat menyebabkan infeksi)',
    sympthom:[
      'Nyeri, gatal, rasa terbakar, atau tertusuk di bibir',
      'Luka lepuh, lenting-lenting kecil, atau sariawan di bibir',
      'Luka lepuh yang terasa nyeri sehingga mengganggu proses makan',
    ],
    source:'https://www.alodokter.com/herpes'
  },
  {
    disease:'Infeksi HSV 2 atau Herpes Genital',
    sympthom:[
      'Pembengkakan pada kulit kelamin atau area di sekitarnya yang terasa gatal, nyeri, dan disertai sensasi terbakar',
      'Luka yang terasa nyeri di kemaluan, bokong, anus, atau paha',
      'Nyeri pada saat buang air kecil (dysuria)',
      'Keluarnya cairan dari vagina',
      'Kulit penis kering, perih, dan gatal'
    ],
    source:'https://www.alodokter.com/herpes'
  },
  {
    disease:'Kusta (Kusta atau lepra disebabkan oleh infeksi bakteri Mycobacterium leprae)',
    sympthom:[
      'Kulit menjadi mati rasa, termasuk kehilangan kemampuan merasakan suhu, sentuhan, tekanan, atau nyeri',
      'Kulit tidak berkeringat (anhidrosis)',
      'Kulit terasa kaku dan kering',
      'Luka yang tidak terasa nyeri di telapak kaki',
      'Bengkak atau benjolan di wajah dan telinga',
      'Bercak yang tampak pucat dan berwarna lebih terang daripada kulit di sekitarnya',
      'Saraf membesar, biasanya di siku dan lutut',
      'Otot melemah, terutama pada otot kaki dan tangan',
      'Alis dan bulu mata hilang permanen',
      'Mata menjadi kering dan jarang mengedip',
      'Mimisan, hidung tersumbat, atau kehilangan tulang hidung',
    ],
    source:'https://www.alodokter.com/kusta'
  },
  {
    disease:'Infeksi jamur Kandida (atau Candidiasis disebabkan oleh infeksi jamur Candida)',
    sympthom:[
      'Bercak putih yang terasa nyeri di dalam mulut atau kerongkongan',
      'Kulit pecah-pecah di sudut bibir',
      'Gatal dan nyeri di vagina yang disertai keputihan',
      'Ruam kulit yang terasa seperti terbakar',
    ],
    source:'https://www.alodokter.com/infeksi-jamur'
  },
  {
    disease:'Infeksi Candida auris (disebabkan oleh jamur Candida auris)',
    sympthom:[
      'Demam',
      'Menggigil',
      'Sepsis',
    ],
    source:'https://www.alodokter.com/infeksi-jamur'
  },
  {
    diasese:'Kurap (infeksi kulit akibat jamur yang hidup di tanah, seperti Microsporum, Epidermophyton, dan Trichophyton)',
    sympthom:[
      'Gatal di kulit',
      'Ruam menyerupai cincin',
      'Kulit kemerahan, bersisik, dan pecah-pecah',
      'Rambut rontok',
    ],
    source:'https://www.alodokter.com/infeksi-jamur'
  },
  {
    disase:'Infeksi jamur mata',
    sympthom:[
      'Mata merah',
      'Nyeri di mata',
      'Penglihatan buram',
      'Mata sensitif terhadap cahaya',
    ],
    source:'https://www.alodokter.com/infeksi-jamur'
  },
  {
    diasease:'Scabies (Kudis atau scabies merupakan penyakit kulit menular yang disebabkan tungau mikroskopis Sarcoptes scabiei)',
    sympthom:[
      'Terasa gatal pada bagian kulit tertentu',
      'Munculnya papula atau lubang-lubang kecil berukuran 0,1-1 cm pada bagan lipatan kulit',
    ],
    source:'https://hellosehat.com/penyakit-kulit/infeksi-kulit/ciri-scabies-gejala-kudis/'
  },
  {
    disease:'Dermatitis Atopik (Eksim)',
    sympthom:[
      'Rasa gatal yang parah terutama di kulit yang tertekuk seperti dalam siku, depan leher, dan belakang lutut',
      'Ruam yang berkerak dan berair jika tergores',
      'Bercak merah, kasar, pecah, atau kulit bersisik'
    ],
    source:'https://hellosehat.com/penyakit-kulit/dermatitis/pengertian-dermatitis/'
  },
  {
    disease:'Dermatitis Kontak (peradangan kulit yang muncul akibat kontak langsung antara kulit dengan zat yang menyebabkan reaksi alergi atau iritasi)',
    sympthom:[
      'Ruam merah atau benjolan',
      'Lepuhan berisi air',
      'Sensasi terbakar dan panas pada ruam',
      'Kulit terasa gatal',
      'Kulit membengkak',
    ],
    source:'https://hellosehat.com/penyakit-kulit/dermatitis/pengertian-dermatitis/'
  },
  {
    diases:'Dermatitis Seboroik',
    sympthom:[
      'Sisik putih seperti ketombe',
      'Sisik kekuningan atau kerak pada kulit kepala, telinga, wajah, dan bagian tubuh lainnya',
      'Kulit merah',
    ],
    source:'https://hellosehat.com/penyakit-kulit/dermatitis/pengertian-dermatitis/'
  }
  // Veruca
  // Varicella
]

export default sympthom;