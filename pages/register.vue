<template>
  <div class="lg:h-full md:h-screen h-screen bg-gradient-to-b from-green-50 to-green-200 pb-9 quicksand">
    
    <div class='bg-green-800 text-center text-white w-full'>
      Registrasi User
    </div>

    <Navbar class='z-20'/>

    <main class="bg-green-900 max-w-md mx-auto mt-8 lg:p-7 md:p-5 p-5 rounded-xl text-white">
      <form onSubmit={}>
        <h3 class='font-bold lg:text-2xl md:text-2xl text-xl'>Registrasi Pengguna Baru</h3>
        <p>Mohon isi data berikut dengan benar.</p>

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
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

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
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

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
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
        <div v-if="passwordIsTooShort" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Password terlalu pendek (minimal 8 karakter)
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
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
        <div v-if="!passwordConfirmationMatch" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Password tidak sama
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
          <label>Jenis kelamin</label>
          <select
            v-model="gender"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black w-1/2'
          >
            <option value='male'>Laki-laki</option>
            <option value='female'>Perempuan</option>
          </select>
        </div>

        <div class='flex flex-col lg:my-3 md:my-3 my-2'>
          <label>
          <input 
            type="checkbox"
            value="user"
            v-model='isChecked'
          /> Saya mendaftar sebagai pengguna baru
          </label>
        </div>
        <!-- Validation -->
        <div v-if="isChecked === false" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Klik pernyataan di atas
        </div>
        
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto lg:my-3 md:my-3 my-2 px-4 py-2 rounded w-full'
          @click='register' 
          type='button'
        >
          DAFTAR
        </button>
        <!-- Validation -->
        <div v-if="send === true" 
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Tunggu sebentar...
        </div>
        <div v-if="errorMessage === 'Request failed with status code 409'"
          class="border-2 border-red-300 bg-red-100 p-3 rounded text-black"
        >Email sudah terdaftar, silahkan masuk <a class='font-bold underline' href='/login'>
          di sini</a>.
        </div>

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
  name: 'RegisterPage',
  data () {
    return {
      // initial state
      name:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      gender: 'male',
      role:'member',
      errorMessage:'',
      send: false,
      // validation input
      nameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,
      passwordIsTooShort: false,
      passwordConfirmationEmpty: false,
      passwordConfirmationMatch: true,
      isChecked: true,
    }
  },
  methods: {
    register() {
      // to prevent auto refresh browser when button was clicked
      // e.preventDefault(); or type='button' in <button>
      if (this.nameEmpty === false && this.emailEmpty === false && this.passwordEmpty === false) {
        axios.post("http://localhost:5000/api/register",
          ({
            name:this.name,
            email:this.email,
            password:this.password,
            gender:this.gender,
            role:this.role
          })
        ).then(response => {
          this.send = true;
          this.$router.push('/login');
        }).catch(error => {
          this.send = false;
          this.errorMessage = error.message;
        })
      }
    }
  },
  watch: {
    // whenever data in v-model changes, this function will run
    name: function(value) {
      if (value === '') { this.nameEmpty = true; }
      if (value !== '') { this.nameEmpty = false; }
    },
    email: function(value) {
      if (value === '') { this.emailEmpty = true; }
      if (value !== '') { this.emailEmpty = false; }
    },
    password(value) {
      if (value === '') {
        this.passwordEmpty = true; 
        this.passwordIsTooShort = false;
      }
      if (value !== '' && value.length < 8) { 
        this.passwordEmpty = false;
        this.passwordIsTooShort = true;
      }
      if (value !== '' && value.length >= 8) { 
        this.passwordEmpty = false;
        this.passwordIsTooShort = false;
      }
    },
    passwordConfirmation(value) {
      if (value === '') {
        this.passwordConfirmationEmpty = true;
        this.passwordConfirmationMatch = true;
      }
      if (value !== '' && value !== this.password) {
        this.passwordConfirmationEmpty = false;
        this.passwordConfirmationMatch = false;
      }
      if (value !== '' && value === this.password) {
        this.passwordConfirmationEmpty = false;
        this.passwordConfirmationMatch = true;
      }
    },
    isChecked(val) {
      if (this.isChecked === true) { this.role = 'member';}
      if (this.isChecked === false) { this.role = '';}
    }
  },
}
</script>

<style scoped>
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