<template>
  <nav class='nav flex flex-row justify-center m-0 py-1 px-0 top-0 shadow space-x-5 text-white'>
    <a href="/guide_copy">
      <p class="font-bold bg-green-500 hover:bg-green-600 focus:bg-green-700 no-underline my-0 px-3 py-2 rounded-lg">
        {{ text }}
      </p>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
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