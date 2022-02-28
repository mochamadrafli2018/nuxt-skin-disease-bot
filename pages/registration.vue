<template>
  <div class="bg-gradient-to-b from-slate-300 to-slate-400 pb-9 quicksand">
    
    <div class='bg-slate-900 text-center text-white w-full'>
      Registrasi User
    </div>

    <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow space-x-5 text-white'>
      <a v-for="(link,index) in links" :key="index" :href="link.url">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          {{ link.text }}
        </p>
      </a>
    </nav>

    <main class="bg-slate-900 max-w-md mx-auto mt-8 lg:p-7 md:p-6 sm:p-5 rounded-xl text-white">
      <form onSubmit={}>
        <h3 class='font-bold text-3xl'>Registrasi Pengguna Baru</h3>
        <p>Mohon isi data berikut dengan benar.</p>

        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>Nama</label>
          <input
            v-model="name"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black'
            placeholder='Masukkan Nama'
          />
        </div>
        <!-- Validation -->
        <div v-if="nameEmpty" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Nama harus di isi
        </div>

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
        <div v-if="passwordEmpty" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Password harus di isi
        </div>
        
        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>Konfirmasi password</label>
          <input
            type="password"
            v-model="passwordConfirmation"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black'
            placeholder='Konfirmasi Password'
          />
        </div>
        <!-- Validation -->
        <div v-if="passwordConfirmationEmpty" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Konfirmasi password harus di isi
        </div>
        <!-- Validation -->
        <div v-if="passwordConfirmationMatch" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Password tidak sama
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>Jenis kelamin</label>
          <select
            v-model="gender"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black w-1/2'
          >
            <option value='male'>Laki-laki</option>
            <option value='female'>Perempuan</option>
          </select>
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 sm:my-2'>
          <label>
          <input 
            type="checkbox"
            value="user"
            v-model='checkRole'
          /> Saya mendaftar sebagai pengguna baru
          </label>
        </div>
        <!-- Validation -->
        <div v-if="roleNotChecked" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Klik pernyataan di atas
        </div>
        
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto lg:my-3 md:my-3 sm:my-2 px-4 py-2 rounded w-full'
          @click='registration'
        >
          MASUK
        </button>
        <!-- Validation -->
        <div v-if="send" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Tunggu sebentar...
        </div>
        <div v-if="errorMessage === 'Request failed with status code 409'">
          Email terdaftar, tapi password salah.
        </div>
        <div v-else-if="errorMessage === 'Request failed with status code 500'">
          Maaf email tidak terdaftar.
        </div>
        {{ checkRole }}
        <hr class='my-2'/>
        <p>Sudah punya akun? Masuk <a class='font-bold underline' href='/login'>
          di sini</a>
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
      name:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      gender:'male',
      checkRole:false,
      errorMessage:'',
      role:'',
      send:false,
      // validation
      nameEmpty:false,
      emailEmpty:false,
      passwordEmpty:false,
      passwordConfirmationEmpty:false,
      passwordConfirmationMatch:false,
      roleNotChecked:false,
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
    async registration(e) {
      e.preventDefault();
      // validation after button was clicked
      if (!this.name) { this.nameEmpty = true; }
      if (!this.email) { this.emailEmpty = true; }
      if (!this.password) { this.passwordEmpty = true; }
      if (!this.passwordConfirmation) { this.passwordConfirmationEmpty = true; }
      if (this.passwordConfirmation !== this.password) { this.passwordConfirmationMatch = true; }
      if (this.checkRole === false) { this.roleNotChecked = true; }
      // POST request using axios with error handling
      else if (
        this.name && this.email && this.password && this.passwordConfirmation 
        && this.passwordConfirmation === this.password && this.checkRole
      ) {
        if (this.checkRole === true) { this.role = 'user'; }
        await axios.post("http://localhost:5000/api/registration",
          ({
            name:this.name,
            email:this.email,
            password:this.password,
            gender:this.gender,
            role:this.role
          })
        ).then(response => {
          this.send = true;
          this.$router.push('/dashboard');
          // redirect('/')
        }).catch(error => {
          this.errorMessage = error.message;
        })
      }
    }
  },
  watch: {
    // whenever data in v-model changes, this function will run
    name: function() {
      this.nameEmpty = false;
    },
    email: function() {
      this.emailEmpty = false;
    },
    password(val) {
      this.passwordEmpty = false;
    },
    passwordConfirmation(val) {
      this.passwordConfirmationEmpty = false;
      this.passwordConfirmationMatch = false;
    },
    checkRole(val) {
      this.roleNotChecked = false;
    }
  },
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
