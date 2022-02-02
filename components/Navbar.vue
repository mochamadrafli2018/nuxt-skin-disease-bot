<template>
  <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow space-x-5 text-white'>
    <a v-for="(link,index) in links" :key="index" :href="link.url">
      <p class="font-bold bg-green-500 hover:bg-green-600 no-underline my-0 px-3 py-2 rounded-lg">
        {{ link.text }}
      </p>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    links: [
      {text:'Home',url:'/'},
      {text:'Panduan',url:'/guide'},
      {text:'Admin',url:'/admin'},
    ],
  })
}
</script>

<style scoped>
.nav{
  background-color:transparent;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width:100%;
}
</style>