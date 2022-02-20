<template>
  <div class="h-screen bg-gradient-to-b from-slate-300 to-slate-400 pb-5 quicksand">
    
    <div class='bg-slate-900 text-center text-white w-full'>
      Login Admin
    </div>

    <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow space-x-5 text-white'>
      <a v-for="(link,index) in links" :key="index" :href="link.url">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          {{ link.text }}
        </p>
      </a>
    </nav>

    <main class="bg-slate-900 max-w-md mx-auto mt-8 lg:p-7 md:p-5 sm:p-3 rounded-xl text-white">
      <form onSubmit={}>
        <h3 class='font-bold mb-2'>Login Pengguna</h3>
        <p>Silahkan login dengan isi data berikut.</p>
        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>Email</label>
          <input
            v-model="email"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Alamat Email'
          />
        </div>
        <!-- Validation -->
        <div v-if="$nuxt.emailEmpty === true" 
          className="border-2 border-red-300 bg-red-100 p-3 rounded"
        >Email harus di isi
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Password'
          />
        </div>
        <!-- Validation -->
        <div v-if="$nuxt.passwordEmpty === true" 
          className="border-2 border-red-300 bg-red-100 p-3 rounded"
        >Password harus di isi
        </div>

        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto lg:my-3 md:my-3 sm:my-2 px-4 py-2 rounded w-full'
          @click='login'
        >
          MASUK
        </button>
        <!-- Validation -->
        <div v-if="$nuxt.send === true" 
          className="border-2 border-red-300 bg-red-100 p-3 rounded"
        >Tunggu sebentar...
        </div>
        <!--<div v-if="$nuxt.errorMessage === Request failed with status code 409">
          Email terdaftar, tapi password salah.
        </div>
        <div v-else-if="$nuxt.errorMessage === Request failed with status code 500">
          Maaf email tidak terdaftar.
        </div>-->
        {{ errorMessage }}
        <hr class='my-2'/>
        <p>Belum punya akun? <a class='font-bold no-underline' href='/registration'>
          Daftar di sini</a>
        </p>
      </form>
    </main>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IndexPage',
  data () {
    return {
      // initial state
      email:'',
      password:'',
      errorMessage:'',
      send:false,
      token:'',
      // validation
      emailEmpty:false,
      passwordEmpty:false,
      // component data
      links: [
        {text:'Home',url:'/'},
        {text:'Daftar',url:'/registration'},
        {text:'Masuk',url:'/login'},
      ],
    }
  },
  methods: {
    // user authorization
    async login() {
      if (!this.email) { this.emailEmpty = true; }
      if (!this.password) { this.passwordEmpty = true; }
      // POST request using axios with error handling
      await axios.post("http://localhost:5000/api/login",
        ({
          email:this.email,
          password:this.password,
        })
      ).then(response => {
        // set token on local storage
        (localStorage.setItem('token', response.data.token));
        this.$router.push('/admin');
        // this.$nuxt.$options.router.push('/')
        // this.$router.push({ path: this.localePath('/') })
      }).catch(error => {
        this.errorMessage = error.message;
      })
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
main{
  padding-top:50px;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
.nav{
  background-color:transparent;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width:100%;
}
</style>
