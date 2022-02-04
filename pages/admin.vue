<template>
  <div class="h-screen bg-gradient-to-b from-slate-300 to-slate-400 pb-5 quicksand">
    <div class='bg-slate-900 text-center text-white w-full'>
      Login Admin
    </div>

    <Navbar/>

    <main>
      <form onSubmit={} class="bg-slate-900 max-w-md mx-auto p-4 rounded-lg text-white">
        <p class='font-bold mb-2 text-3xl'>
          Login Admin
        </p>
        <hr class='my-2'/>
        <div class='flex flex-col my-2'>
          <label>Email</label>
          <input
            v-model="email"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Alamat Email'
          />
        </div>
        <div class='flex flex-col mt-2 mb-3'>
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Password'
          />
        </div>
        <hr class='my-2'/>
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto my-2 px-4 py-2 rounded w-full'
          @click='login'
        >
          MASUK
        </button>

        <div v-if="$nuxt.isEmailEmpty">Email harus di isi</div>
        <div v-if="$nuxt.isPasswordEmpty">Password harus di isi</div>
        
        {{ token }}
        {{ errorMessage }}
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
      token:'',
      email:'',
      password:'',
      errorMessage:'',
      selected:'',
      // validation
      isEmailEmpty:false,
      isPasswordEmpty:false,
    }
  },
  methods: {
    // user authorization
    async login() {
      // POST request using axios with error handling
      await axios.post("http://localhost:5000/api/login",{
        email:this.email,
        password:this.password,
      }).then(response => {
        // set token on localStorage
        (localStorage.setItem('token', response.data.token))
        this.$router.push('/admin')
        // this.$nuxt.$options.router.push('/')
        // this.$router.push({ path: this.localePath('/') })
        // redirect('/')
      }).catch(error => {
        this.errorMessage = error.message
      })
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
  padding-top:50px;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
