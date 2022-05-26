<template>
  <div class="bg-gradient-to-b from-green-50 to-green-200 h-screen quicksand">
    <div class='bg-green-800 text-center text-white w-full'>
      Skin Disease Screening Chatbot
    </div>
    <Navbar/>
    <main class="mt-3 p-0">
      <ChatbotInterface/>
    </main>    
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
