<template>
  <div class="bg-gray-300 quicksand">
    <Navbar/>
    
    <main class="max-w-4xl mx-auto pb-5 sm:px-6 lg:px-8">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item,index) in guides" :key="index">
          <v-expansion-panel-header class='text-2xl'>
            {{ item.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ item.text }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </main>

    <footer class="bg-black text-center text-gray-200">
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
        title:'Panduan Umum',
        text:'Untuk memulai skrining penyakit mata, pilih gejala-gejala yang di alami.{""}'
      },
      {
        title:'Daftar Penyakit Mata',
        text:''
      },
      {
        title:'Catatan Penting',
        text:''
      },
    ],
  })
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
footer{
  position:fixed;
  bottom:0;
  width:100%;
}
main{
  padding-top:60px;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
