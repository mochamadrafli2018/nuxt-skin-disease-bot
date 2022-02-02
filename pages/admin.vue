<template>
  <div class="bg-slate-400 pb-5 quicksand">
    <Navbar/>

    <main>
      <form onSubmit={} class="bg-slate-700 max-w-md mx-auto p-4 rounded-lg text-white">
        <p class='font-bold mb-2 text-3xl'>
          Login Admin
        </p>
        <hr class='my-2'/>
        <div class='flex flex-col my-2'>
          <label>Email</label>
          <input
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Alamat Email'
          />
        </div>
        <div class='flex flex-col my-2'>
          <label>Password</label>
          <input
            class='bg-slate-100 border-2 border-green-500 hover:border-green-600 px-2 py-1 rounded text-black' 
            placeholder='Masukkan Password'
          />
        </div>
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto my-2 px-4 py-2 rounded w-full'>
          MASUK
        </button>
        <p class='mt-2 mb-1'>Belum punya akun? Daftar terlebih dahulu</p>
        <button class='bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-200 text-white mx-auto mt-2 px-4 py-2 rounded w-full'>
          DAFTAR
        </button>
      </form>
    </main>

    <footer class="bg-slate-700 text-center text-gray-200">
      <p>&copy; {{ new Date().getFullYear() }} — Mochamad Rafli Ramadhan</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
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
  padding-top:60px;
  padding-bottom:120px;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
