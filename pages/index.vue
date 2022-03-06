<template>
  <div class="bg-gradient-to-b from-slate-300 to-slate-400 quicksand">
    
    <div class='bg-slate-900 text-center text-white w-full'>
      Eye-Screening Form
    </div>

    <Navbar/>

    <main class="max-w-4xl mx-auto mt-8 px-2">
      <p class="font-semibold text-black my-2 lg:text-3xl md:lg:text-3xl sm:text-2xl text-center leading-7">
        Web App Skrining Penyakit Mata berbasis Form
      </p>
      <!-- Form -->
      <div class="bg-slate-900 mt-5 px-6 pb-3 overflow-hidden rounded-lg">
        <p class="my-2 text-xl text-center text-white">
          Pilih Beberapa Gejala Penyakit Mata di Bawah ini
        </p>
        <hr class="my-2"/>
        <Form/>
      </div>
    </main>
    
    <Footer/>
    
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    // component data
    icons: [
      {
        logo:'mdi-github',
        link:'https://www.github.com/mochamadrafli2018'
      },
      {
        logo:'mdi-email',
        link:'https://mail.google.com/mail/?view=cm&fs=1&to=mochamadrafli2018@mail.ugm.ac.id'
      },
      {
        logo:'mdi-linkedin',
        link:'https://www.linkedin.com/in/mochamad-rafli-ramadhan'
      },
      {
        logo:'mdi-instagram',
        link:'https://www.instagram.com/rafli.r.rmdhn'
      },
    ],
  }),
  methods: {
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
