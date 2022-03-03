<template>
  <div class="h-screen bg-gradient-to-b from-slate-300 to-slate-400 pb-5 quicksand">
    
    <div class='bg-slate-900 text-center text-white w-full'>
      Login User
    </div>

    <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow space-x-5 text-white'>
      <a v-for="(link,index) in links" :key="index" :href="link.url">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          {{ link.text }}
        </p>
      </a>
    </nav>

    <main class="bg-slate-900 max-w-md mx-auto mt-8 lg:p-7 md:p-5 sm:p-5 rounded-xl text-white">
      <form onSubmit={}>
        <h3 class='font-bold text-3xl'>Login Pengguna</h3>
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
        <div v-if="emailEmpty" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >
          Email harus di isi
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
        <div v-if="passwordEmpty" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >
          Password harus di isi
        </div>

        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto lg:my-3 md:my-3 sm:my-2 px-4 py-2 rounded w-full'
          @click='login' type='button'
        >
          MASUK
        </button>
        <!-- Validation -->
        <div v-if="send"
          class="border-2 border-green-300 bg-green-100 p-3 rounded"
        >
          Tunggu sebentar...
        </div>
        <div v-if="errorMessage === 'Request failed with status code 409'"
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Email terdaftar, tapi password salah.
        </div>
        <div v-if="errorMessage === 'Request failed with status code 500'"
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Email tidak terdaftar, silahkan daftar terlebih dahulu.
        </div>
        <!--{{ errorMessage }}-->

        <hr class='my-2'/>
        <p>Belum punya akun? Daftar <a class='font-bold underline' href='/register'>
          di sini</a>
        </p>
      </form>
    </main>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data () {
    return {
      // initial state
      email:'',
      password:'',
      errorMessage:'',
      send:false,
      // validation
      emailEmpty:false,
      passwordEmpty:false,
      // component data
      links: [
        {text:'Home',url:'/'},
        {text:'Daftar',url:'/register'},
        {text:'Masuk',url:'/login'},
      ],
    }
  },
  methods: {
    // user authorization
    async login() {
      if (!this.email) { this.emailEmpty = true; }
      if (!this.password) { this.passwordEmpty = true; }
      else if (this.email && this.password) {
        this.send = true
        // POST request using axios with error handling
        await axios.post("http://localhost:5000/api/login",
          ({
            email: this.email,
            password: this.password,
          })
        ).then(response => {
          // set token on local storage
          (localStorage.setItem('token', response.data.token));
          this.$router.push('/dashboard');
        }).catch(error => {
          this.send = false;
          this.errorMessage = error.message;
        })
      }
    }
  },
  watch: {
    // whenever data in v-model changes, this function will run
    email(val) {
      this.emailEmpty = false;
    },
    password(val) {
      this.passwordEmpty = false;
    },
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
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
