// sympthom for second screening
const g = [
    [`index array number 0`],
      // question 1 - 5
    [`Apa kamu mengalami gejala mata peka terhadap cahaya (fotofobia) ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala terdapat kotoran pada mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala kelopak mata membengkak ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata mengalami iritasi ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala terjadi pembengkakan bundar pada kelopak mata dan tumbuh secara perlahan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 6 - 10
    [`Apa kamu mengalami gejala terbentuk daerah kemerahan/abu-abu di bawah kelopak mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala bulu mata rontok ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata sukar dibuka ketika bangun dipagi hari ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala benjolan pada kelopak mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata terasa panas ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // qustion 11 - 15
    [`Apa kamu mengalami gejala mata seperti kelilipan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata berair ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala nyeri pada tepi kelopak mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala kornea mata tampak keruh ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala konjungtiva meradang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 16 - 20
    [`Apa kamu mengalami gejala tampak bintik nanah berwarna kuning keputihan pada kornea mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala terlihat bentuk-bentuk iregular yang melayang-layang atau kilatan cahaya pada mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala hilangnya fungsi penglihatan pada salah satu mata, yang kemudian menyebar sejalan perkembangan ablasio ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala kesulitan melihat di malam hari atau penglihatan menurun pada malam hari/ruang gelap ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala penurunan ketajaman penglihatan bahkan di siang hari ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 21 - 25
    [`Apa kamu mengalami gejala kemerahan pada skelra ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata menonjol ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala demam ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala bola mata bengkak dan tampak berkabut ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata terasa gatal ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 26 - 30
    [`Apa kamu mengalami gejala mata terasa perih ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala konjungtiva menjadi merah ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala konjungtiva bengkak ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala peradangan mata yang agak menonjol dan berwarna kuning ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata nyeri bila ditekan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 31 - 35
    [`Apa kamu mengalami gejala gangguan penglihatan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala sakit kepala ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala koma ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala kejang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala sakit saat mata digerakkan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 36 - 40
    [`Apa kamu mengalami gejala kehilangan penglihatan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala nyeri di daerah sekitar kantong air mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata mengeluarkan nanah ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala pusing karena lelah ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mengalami mual dan muntah ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 41 - 45
    [`Apa kamu mengalami gejala pupil melebar dan tidak mengecil jika diberi sinar yang terang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala sel batang retina sulit berdaptasi diruang yang remang-remang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala tidak dapat melihat pada lingkungan yang kurang bercahaya ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala gangguan penglihatan pada salah satu mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala garis mata lurus terlihat bergelombang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 46 - 50
    [`Apa kamu mengalami gejala mata tegang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala air mata berlebihan ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata terasa kering ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala benjolan pada mata bagian atas ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala seperti ada benda asing di mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 51 - 55
    [`Apa kamu mengalami gejala nyeri hebat pada mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata merah tidak merata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala bercak merah tidak merata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala palpebra atau kelopak mata bengkak warna biru jingga ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala rasa tidak nyaman pada mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
      // question 56 - 60
    [`Apa kamu mengalami gejala mata meradang ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala mata mempersempit atau perubahan bentuk ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala berbentuk keropeng pada kelopak mata ketika bangun pada siang hari ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala keluar air mata berlebihan (lakrimasi) ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala penglihatan ganda pada salah satu sisi mata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    // question 61 - 65
    [`Apa kamu mengalami gejala lensa mata membengkak ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
    [`Apa kamu mengalami gejala sering ganti kacamata ? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`],
];

export default g;