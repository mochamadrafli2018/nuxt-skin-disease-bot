<template>
  <div class="quicksand">
    <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-6 md:space-x-4 space-x-2 text-white z-20'>
      <a href="/" v-if="tokenEmpty === true">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          Home
        </p>
      </a>
      <a href="/" v-if="tokenEmpty === false">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          Dashboard
        </p>
      </a>
      <a href="/guide" v-if="tokenEmpty === false || tokenEmpty === true">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          Panduan
        </p>
      </a>
      <a href="/register" v-if="tokenEmpty === true">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          Register
        </p>
      </a>
      <a href="/login" v-if="tokenEmpty === true">
        <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
          Masuk
        </p>
      </a>
      <button
        v-if="tokenEmpty === false"
        class="mr-auto font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 no-underline my-0 px-3 py-2 rounded-lg"
        @click="logoutHandler"
      >
        Keluar
      </button>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppPage",
  data () {
    return {
      tokenEmpty: true,
    }
  },
  components: {
  },
  created () {
    // created() is used to call function when page reload
    if (typeof window !== 'undefined') {
      // check token exist or not
      const token = localStorage.getItem('token');
      if(!token) { 
        this.tokenEmpty = true;
      }
      else {
        this.tokenEmpty = false;
      }
      // call authorization function
    }
  },
  methods: {
    // log out handler
    logoutHandler() {
      //remove token from localStorage
      localStorage.removeItem('token');
      this.$router.push('/login');
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