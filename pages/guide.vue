<template>
  <div class="h-screen bg-gradient-to-b from-green-50 to-green-200 pb-5 quicksand">
    
    <div class='bg-green-800 text-center text-white w-full'>
      Panduan Melakukan Skrining
    </div>

    <Navbar class='z-20'/>
    
    <main class='max-w-4xl mx-auto lg:mt-8 md:mt-5 mt-3 lg:px-8 md:px-6 px-4'>
      <v-expansion-panels class="pb-5 px-6 z-10">
        <v-expansion-panel v-for="(item,index) in guides" :key="index" 
        class='my-1 rounded'>
          <v-expansion-panel-header class='bg-green-900'>
            <p class='font-bold text-left text-lg text-white underline'>
              {{ item.title }}
            </p>
          </v-expansion-panel-header>
          <v-expansion-panel-content class='bg-green-700 py-2 text-white'>
            <p>{{ item.text }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </main>
    
    <footer class="bg-green-900 text-center text-gray-200 z-20">
      <p>&copy; {{ new Date().getFullYear() }} — Mochamad Rafli Ramadhan</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'GuidePage',
  data: () => ({
    guides: [
      {
        title:'Panduan untuk Skrining Penyakit Kulit',
        text:`Untuk memulai skrining penyakit kulit, pilih gejala-gejala yang di alami pada form, kemudian tekan atau klik tombol submit pada bagian bawah form.`
      },
      {
        title:'Catatan Penting',
        text:`Hasil skrining dari sistem pakar ini tidak bisa dijadikan sebagai keputusan akhir diagnosis penyakit kulit anda.
        Hasil skrining tersebut bisa anda gunakan untuk konsultasi dengan dokter spesialis kulit untuk diagnosis lebih lanjut.`
      },
    ],
  })
}
</script>

<style scoped>
footer{
  position:fixed;
  bottom:0;
  width:100%;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
