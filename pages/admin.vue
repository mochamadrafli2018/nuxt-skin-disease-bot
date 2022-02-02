<template>
  <div class="bg-gray-300 quicksand">
    <Navbar/>

    <main className='bg-blue-100 flex flex-col mt-0 poppins'>
      <div className="flex justify-center">
        <div className='col-md-4'>
          <div className='card border-2 rounded shadow-sm'>
            <div className='card-body'>   
              <h4 className='font-bold'>Login Pengguna</h4>
              <hr/>
              <form onSubmit={}>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input 
                    type='email' 
                    className='form-control' 
                    value={email} 
                    placeholder='Masukkan Alamat Email'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <input 
                    type='password' 
                    className='form-control' 
                    value={password} 
                    placeholder='Masukkan Password'
                    />
                </div>
                <div className='d-grid gap-2'>
                  <button onClick={loginHandler} type='submit' className='btn btn-primary'>
                    MASUK
                  </button>
                </div>
                <div className='mt-3'>
                  <p>Belum punya akun? Daftar terlebih dahulu</p>
                </div>
                <div className='d-grid gap-2'>
                  <button onClick={} className='btn btn-outline-primary'>
                    DAFTAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-black text-center text-gray-200">
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
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
