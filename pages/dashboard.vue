<template>
  <div class="h-screen bg-gradient-to-b from-slate-300 to-slate-400 pb-5 quicksand">
    <div class='bg-slate-900 text-center text-white w-full'>
      Admin Dashboard
    </div>

    <nav class='nav flex flex-row m-0 py-1 px-2 top-0 shadow text-white'>
      <p class='mr-auto font-bold my-auto text-black text-xl'>
        Halo, <span class='font-bold underline'>{{ user.name }}</span>
      </p>
      <button 
        class="ml-auto font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 no-underline my-0 px-3 py-2 rounded-lg"
        @click="logoutHandler"
      >
        Logout
      </button>
    </nav>

    <main>
      <p class='text-2xl text-center text-black'>Dashboard</p>
      <form onSubmit={} class="bg-slate-900 max-w-md mx-auto p-4 rounded-lg text-white">
        <p class='font-bold mb-2 text-2xl'>
          Tambah atau Ubah Data
        </p>
        <hr class='my-2'/>
        <div class='flex flex-col my-2'>
          <label>Rule Base</label>
          <input
            v-model="ruleBase"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Alamat Email'
          />
        </div>
        <div class='flex flex-col mt-2 mb-3'>
          <label>Nama Penyakit</label>
          <input
            v-model="disease"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Password'
          />
        </div>
        <hr class='my-2'/>
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto my-2 px-4 py-2 rounded w-full'
        >
          MASUK
        </button>

        <div v-if="$nuxt.isRuleBaseEmpty">Email harus di isi</div>
        <div v-if="$nuxt.isDiseaseEmpty">Password harus di isi</div>
      </form>
    </main>

    <footer class="bg-slate-900 text-center text-gray-200">
      <p>&copy; {{ new Date().getFullYear() }} — Mochamad Rafli Ramadhan</p>
    </footer>
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
    // created() use to call function when page reload
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      // check token exist or not
      if(!token) { 
        router.push('/login'); 
      }
      // call authorization function
      this.authorization(token);
    }
  },
  methods: {
    // methods used for storing functions
    // user authorization
    async authorization(token) {
      //set axios header with type Authorization + Bearer token
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      await axios.get("http://localhost:5000/api/verify")
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => { 
        this.errorGetUserData = err.message;
      })
    },
    logoutHandler() {
      //remove token from localStorage
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
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
  padding-top:40px;
}
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
