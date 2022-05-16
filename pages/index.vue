<template>
  <div class="bg-gradient-to-b from-green-50 to-green-200 h-screen quicksand">    
    <div class='bg-green-900 text-center text-white w-full'>
      Eye-Screening Chatbot
    </div>
    <Navbar/>
    <main class="mt-3 p-0">
      <ChatbotInterface/>
    </main>    
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
</style>
