<template>
  <div class="bg-gradient-to-b from-slate-300 to-slate-400 quicksand">
  
    <div class='bg-slate-900 text-center text-white w-full'>
      Halo, <span class='font-bold underline'>{{ user.name }}</span>
    </div>

    <nav class='nav flex flex-row m-0 py-1 px-2 shadow text-white'>
      <div class='flex flex-row justify-center space-x-5'>
        <a href="/dashboard">
          <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
            Dashboard
          </p>
        </a>
        <a href="/guide_copy">
          <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
            Panduan
          </p>
        </a>
      </div>
      <button 
        class="mr-auto font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 no-underline my-0 px-3 py-2 rounded-lg"
        @click="logoutHandler"
      >
        Logout
      </button>
    </nav>

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
import axios from 'axios';

export default {
  name: 'IndexPage',
  data () {
    return {
      user:'',
      errorGetUserData:false,
      ruleBase:'',
      disease:'',      
      // validation
      isRuleBaseEmpty:false,
      isDiseaseEmpty:false,
    }
  },
  created () {
    // created() is used to call function when page reload
    if (typeof window !== 'undefined') {
      // check token exist or not
      const token = localStorage.getItem('token');
      if(!token) { 
        this.$router.push('/login');
      }
      // call authorization function
      this.authorization(token);
    }
  },
  methods: {
    // methods used for storing the functions
    // user authorization
    async authorization(token) {
      //set axios header with type Authorization + Bearer token
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      await axios.get("http://localhost:5000/api/verify")
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => { 
        this.errorGetUserData = error.message;
      })
    },
    // log out handler
    logoutHandler() {
      //remove token from localStorage
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    // auto saving screening result
    saveHandler() {
      // 
    }
  },
  watch: {
    // 
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
.nav{
  background-color:transparent;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width:100%;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
