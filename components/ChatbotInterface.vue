<template>
  <div class='border-2 mx-auto max-w-3xl overflow-hidden p-0 rounded-xl hover:border-green-500 shadow-lg'>
    <div class='mx-0 mb-0 w-100 rounded'>
      <h4 class='bg-green-700 mb-0 p-1 w-100 opensans rounded-top text-center text-white text-xl'>
        Chat Bot Sistem Pakar Penyakit Kulit
      </h4>
      <div
        id='chatContainer'
        class='bg-chat h-96 max-h-96 mx-0 px-2 py-1 w-100 overflow-y-scroll'
        ref='chatContainer'
      >
        <span
          v-for="(item, index) in messageLog" :key=index
        >
          <!-- bot chat -->
          <i v-if="item.sender === 'bot'" class='inline-block bi bi-robot bg-slate-100 border-2 border-green-700 px-2 py-1 rounded-full text-dark text-xl'></i>
          <p v-if="item.sender === 'bot'" class='inline-block bg-slate-100 border-2 border-green-700 ml-1 px-2 py-1 rounded-r-3xl rounded-tl-2xl text-dark w-4/5'>
            {{item.message}}
          </p>
          <!-- user chat -->
          <p v-if="item.sender === 'user'" class='bg-green-600 border-2 border-white my-1 ml-auto px-3 py-2 max-w-7xl rounded-l-3xl rounded-br-2xl text-white w-min'>
            {{item.message}}
          </p>
        </span>
      </div>
      <div class='flex p-2 w-100'>
        <input
          id='input'
          type='text'
          class='border-2 border-green-700 ml-auto px-3 py-2 rounded-full w-4/5'
          v-model='chatInput'
          placeholder='Ketik respon kamu ...'
          @click='handleEnter'
        />
        <button
          type='submit'
          value='Submit'
          @click='handleSubmit'
          class='bg-green-700 hover:bg-green-800 mx-1 py-2 rounded-full w-1/5'
        >
          <p class='text-white'>Kirim</p>
        </button>
      </div>
    </div>
    <div class='flex p-2 mx-1'>
      <button 
        type='submit' 
        value='Submit' 
        @click='handleStartScreening'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/3'
      >
        <p class='text-white'>Skrining</p>
      </button>
      <button 
        type='submit' 
        value='Submit' 
        @click='handleYes'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/3'
      >
        <p class='text-white'>Ya</p>
      </button>
      <button 
        type='submit'
        value='Submit'
        @click='handleNo'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/3'
      >
        <p class='text-white'>Tidak</p>
      </button>
    </div>
    <!--
    <p> check : {{check}} </p>
    <p> chatInput : {{chatInput}} </p>
    <p> inputNow: {{inputNow}} </p>
    <p> inputBefore: {{inputBefore}} </p>
    <p> replyBefore: {{replyBefore}} </p>
    <p> allYesReply: {{allYesReply}} </p>
    <p> i: {{i}} </p>
    <p> j: {{j}} </p>
    <p> lastValueWhenUserResponYes: {{lastValueWhenUserResponYes}} </p>
    <p> lastValueWhenUserResponNo: {{lastValueWhenUserResponNo}} </p>
    <p> totalSympthomWhenUserResponYes: {{totalSympthomWhenUserResponYes}} </p>
    <p> totalSympthomWhenUserResponNo: {{totalSympthomWhenUserResponNo }} </p>
    -->
  </div>
</template>

<script>
import axios from 'axios';
import Compare from './Compare.js';
import {prompts,replies,alternative,coronavirus} from '../data/PromptsAndReplies.js';
import sympthom from '../data/SympthomList.js'

export default {
  data:() => ({
    check:'',
    chatInput:'',
    inputNow:'',
    inputBefore:'',
    replyBefore:'',
    allYesReply:[],
    i:0,
    j:0,
    lastValueWhenUserResponYes:'', 
    lastValueWhenUserResponNo:'',
    totalSympthomWhenUserResponYes:[],
    totalSympthomWhenUserResponNo:[],
    screeningResult:'',
    messagesScroll:null,
    ruleBaseBefore:'',
    ruleBase: [
      // consist of 7 + 5 + 1 + 6 = 19 diseases
      [sympthom[0],sympthom[1],sympthom[3],'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut'],
      [sympthom[0],sympthom[1],'Sindroma Mata Kering atau Uveitis Kronis'],
      [sympthom[0],sympthom[6],'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis'],
      [sympthom[0],sympthom[8],'Perdarahan Subkonjungtiva'],
      [sympthom[0],sympthom[9],'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis'],
      // consist of 8 + 3 + 11 = 22 diseases
      [sympthom[1],sympthom[3],sympthom[11],'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria'],
      [sympthom[1],sympthom[5],sympthom[10],'Tumor, Strabismus atau Ophthalmopathy Thyroid'],
      [sympthom[1],sympthom[5],'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'],
      ['end of first screening']
    ],
    messageLog:[
      {
        sender:'bot',
        message:`Halo, ini adalah bot skrining penyakit kulit, Untuk memulai skrining penyakit kulit ketikan atau tekan tombol mulai`
      }
    ],
  }),
  watch: {
    // Whenever messageLog in data changes, this function will run.
    messageLog: function() {
      // The nextTick() function allows to execute code after we have changed some data and Vue has updated the page to reflect your changes.
      this.$nextTick(() => {
        this.scrollToEnd()
      })
    },
  },
  methods: {
    // Auto scrolls the chat log to the bottom when a new message is received
    scrollToEnd: function() {
      const container = this.$refs.chatContainer;
      /*
      scrollHeight: total container size.
      scrollTop: amount of scroll user has done.
      clientHeight: amount of container a user sees.
      */
      // const container = this.$container.getElementsById('#chatContainer')[0];
      // const container = this.$container.querySelector("#chatContainer");
      // container.scrollTop = container.scrollHeight; // worked
      // container.scrollTo(0, container.scrollHeight); //worked
      container.scroll({ top: container.scrollHeight, behavior: 'smooth' }); // worked
      // container.scrollIntoView({ top : container.scrollHeight, behavior: 'smooth'}); // not working
    },
    // get bot reply after user input chat and button was clicked
    handleSubmit() {
      this.Output(input)
      this.chatInput='' // return empty form after user press the button
    },
    // get bot reply after user input chat and enter was pressed
    handleEnter(event) {
      if (event.key === 'Enter') {
        this.Output(input)
        this.chatInput='' // return empty form after user press enter
      }
    },
    handleStartScreening() {
      this.Output('skrining') // input = 'mulai'
      this.chatInput='' // return empty form after user press button
    },
    handleYes() {
      this.Output('ya') // input = 'ya'
      this.chatInput='' // return empty form after user press button
      this.inputBefore=this.inputNow
      this.inputNow='ya'
    },
    handleNo() {
      this.Output('tidak') // input = 'tidak'
      this.chatInput='' // return empty form after user press button
      this.inputBefore=this.inputNow
      this.inputNow='tidak'
    },
    Output(input) {
      // Add user chat
      this.messageLog = [...this.messageLog, {sender:'user', message:input}]

      input = input
        .toLowerCase()
        .replace(/[^\w\s]/gi, '') // replace unneccessary input from user
        .replace(/[\d]/gi, '')
        .replace(/ a /g, ' ')     // example : 'tell me a story' -> 'tell me story'
        .replace(/i feel /g, '')
        .replace(/whats/g, 'what is')
        .replace(/please /g, '')
        .replace(/ please/g, '')
        .replace(/r u/g, 'are you')
        .replace(/'/g, '')
        .trim(); // remove whitespace from both sides of a string

      let reply;
      if (Compare(prompts, replies, input)) {
        reply = Compare(prompts, replies, input);
        this.messageLog = [...this.messageLog, {sender:'bot', message:reply}]
      } 
      else if (input.match(/terima kasih/gi)) {
        reply = 'Sama-sama'
        this.messageLog = [...this.messageLog, {sender:'bot', message:reply}]
      }
      // Check if input contains `coronavirus`
      else if (input.match(/(corona|covid|virus)/gi)) {
        reply = coronavirus[Math.floor(Math.random() * coronavirus.length)];
        this.messageLog = [...this.messageLog, {sender:'bot', message:reply}]
      }
      // Screening algorithm
      else if (input.match(/(y|ya|t|tidak|mulai|tes|test|skrining)/gi)) {
        reply = this.Screening(input)[0];
        this.messageLog = [...this.messageLog, {sender:'bot', message:reply}]
      }
      // If all else fails: random alternative
      else {
        reply = alternative[Math.floor(Math.random() * alternative.length)];
        this.messageLog = [...this.messageLog, {sender:'bot', message:reply}]
      }
    },
    // auto update screening result when screening result come up
    UpdateScreeningResult() {
      // get user id and screening result from local storage
      const userId = localStorage.getItem("user_id");
      const screening_result = localStorage.getItem("screening_result");
      axios.put(`https://express-mongoose-validator.herokuapp.com/api/users/${userId}`,
        ({
          updatedScreeningResult: screening_result
        })
      )
    },
    // Algorithm for screening system using forward chaining method
    Screening(input) {
      let reply;
      if (input === 'mulai' || input === 'tes'|| input === 'test'  || input === 'skrining') {
        // re-empty
        this.screeningResult=''
        this.lastValueWhenUserResponYes=''; 
        this.lastValueWhenUserResponNo='';
        this.allYesReply=[]; 
        this.totalSympthomWhenUserResponYes=[];
        this.totalSympthomWhenUserResponNo=[];
        this.ruleBaseBefore='';
        this.replyBefore=input;
        // reply
        reply = this.ruleBase[0][0]; 
        this.i=0; 
        this.j=0;
      }
      else {
        // screening result is not '', return screening result.
        if (this.screeningResult !== '') {
          reply = `${this.screeningResult}. Ingin melakukan skrining lagi? tekan tombol mulai atau ketik mulai.`
        }
        // screening result is ''
        else if (this.screeningResult === '') {
          if (
            this.replyBefore === 'mulai' || this.replyBefore === 'tes' || 
            this.replyBefore === 'test' || this.replyBefore === 'skrining'
          ) {
            // the current value is this.ruleBase[this.i][this.j]
            if (input === 'y' || input === 'ya') {
              // save all yes reply before the last value in [this.i] array
              this.allYesReply=[...this.allYesReply, this.ruleBase[this.i][this.j]];
              // make sure there is no same value in array
              this.allYesReply = [...new Set(this.allYesReply)];
              // get total sympthon
              this.totalSympthomWhenUserResponYes=[...this.totalSympthomWhenUserResponYes, this.ruleBase[this.i].length-1]
              // get last value of the array
              this.lastValueWhenUserResponYes=this.ruleBase[this.i][this.ruleBase[this.i].length-1];
              // if this.ruleBase[this.i][this.j+1] is not last value in [this.i] array
              if (this.ruleBase[this.i][this.j+1] !== this.ruleBase[this.i][this.ruleBase[this.i].length - 1]) {
                reply = this.ruleBase[this.i][this.j+1];
                this.j=this.j+1;
              }
              // if this.ruleBase[this.i][this.j+1] is the last value in [this.i] array
              else if (this.ruleBase[this.i][this.j+1] === this.ruleBase[this.i][this.ruleBase[this.i].length - 1]) {
                if (this.inputNow === 'tidak') {
                  reply = `Melalui skrining dicurigai kamu mengalami ${this.totalSympthomWhenUserResponYes[this.totalSympthomWhenUserResponYes.length-1]} gejala dari penyakit kulit ${this.lastValueWhenUserResponYes}. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                  this.screeningResult=reply;
                  this.ruleBaseBefore=this.ruleBase[this.i][this.j+1];
                  this.replyBefore='';
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    this.UpdateScreeningResult()
                  }
                }
                if (this.inputNow === 'ya') {
                  this.check='else ya'
                  reply = `Melalui skrining dicurigai kamu mengalami ${this.totalSympthomWhenUserResponYes[this.totalSympthomWhenUserResponYes.length-1]} gejala dari penyakit kulit ${this.lastValueWhenUserResponYes}. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                  this.screeningResult=reply;
                  this.ruleBaseBefore=this.ruleBase[this.i][this.j+1];
                  this.replyBefore='';
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    this.UpdateScreeningResult()
                  }
                }
              }
            }
            else if (input === 't' || input === 'tidak') {
                if (this.j === 0) {
                  let arr = [''];
                  for (let x=this.i; x < this.ruleBase.length ; x++) {
                    arr.push(this.ruleBase[x][0]) // arr = [g[1],g[1],g[1],g[1],g[1],g[1],g[1],g[1],g[2],g[2],g[2],g[2],g[2],g[2],g[2],g[2],...]
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value of this.ruleBase[this.i][this.j] index in newArr
                  let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                  // last value in this.ruleBase[this.i], case for only g[58] (works)
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Apa kamu yakin tidak mengalami gejala penyakit kulit yang ditanyakan oleh bot? 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    this.screeningResult=reply;
                  }
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if user's eyes are not red (normal) and eye vision is normal
                    if (arr[findIndexInArray+1] === 'end of first screening') {
                      reply = `Apa kamu yakin tidak mengalami gejala mata merah atau penglihatan menurun?
                      Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                      this.screeningResult=reply;
                    }
                    else {         
                      reply = arr[findIndexInArray+1]
                      // find reply in this.ruleBase[this.i][0]
                      for (let x=this.i; x < this.ruleBase.length ; x++) {
                        if (this.ruleBase[x][0] === arr[findIndexInArray+1]) {
                          this.i=x; this.j=0;
                          this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                          this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                          break
                        }
                      }
                    }
                  }
                }
                else if (this.j === 1) { 
                  // check if the value before is same (work)
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined && 
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1]
                  ) {
                    let arr = [''];
                    // push all value in the same j index
                    for (let x=this.i; x < this.ruleBase.length ; x++) {
                      if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                        arr.push(this.ruleBase[x][this.j])
                      }
                    }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1]
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu hanya menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa dipastikan penyakit kulit yang tepat hanya dari 1 gejala tersebut. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined ||
                  // this.ruleBase[this.i][this.j-1] !== this.ruleBase[this.i+1][this.j-1]
                  else {
                    reply = `Kamu hanya menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa dipastikan penyakit kulit yang tepat hanya dari 1 gejala tersebut. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                else if (this.j === 2) { 
                  // check if the two value before is same (work)
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined &&
                    this.ruleBase[this.i+1][this.j-2] !== undefined &&
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1] && 
                    this.ruleBase[this.i][this.j-2] === this.ruleBase[this.i+1][this.j-2]
                  ) {
                    let arr = [''];
                      // push all value in the same j index
                      for (let x=this.i; x < this.ruleBase.length ; x++) {
                        if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                          arr.push(this.ruleBase[x][this.j])
                        }
                      }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined ||
                  // this.ruleBase[this.i+1][this.j-2] === undefined
                  else {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                else if (this.j === 3) {
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined &&
                    this.ruleBase[this.i+1][this.j-2] !== undefined &&
                    this.ruleBase[this.i+1][this.j-3] !== undefined &&
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1] &&
                    this.ruleBase[this.i][this.j-2] === this.ruleBase[this.i+1][this.j-2] && 
                    this.ruleBase[this.i][this.j-3] === this.ruleBase[this.i+1][this.j-3]
                  ) {
                    let arr = [''];
                    // push all value in the same j index
                    for (let x=this.i; x < this.ruleBase.length ; x++) {
                      if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                        arr.push(this.ruleBase[x][this.j])
                      }
                    }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    } 
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  else {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                else if (this.j === 4) {
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined &&
                    this.ruleBase[this.i+1][this.j-2] !== undefined &&
                    this.ruleBase[this.i+1][this.j-3] !== undefined &&
                    this.ruleBase[this.i+1][this.j-4] !== undefined &&
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1] &&
                    this.ruleBase[this.i][this.j-2] === this.ruleBase[this.i+1][this.j-2] && 
                    this.ruleBase[this.i][this.j-3] === this.ruleBase[this.i+1][this.j-3] &&
                    this.ruleBase[this.i][this.j-4] === this.ruleBase[this.i+1][this.j-4]
                  ) {
                    let arr = [''];
                    // push all value in the same j index
                    for (let x=this.i; x < this.ruleBase.length ; x++) {
                      if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                        arr.push(this.ruleBase[x][this.j])
                      }
                    }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  else {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                else if (this.j === 5) {
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined &&
                    this.ruleBase[this.i+1][this.j-2] !== undefined &&
                    this.ruleBase[this.i+1][this.j-3] !== undefined &&
                    this.ruleBase[this.i+1][this.j-4] !== undefined &&
                    this.ruleBase[this.i+1][this.j-5] !== undefined &&
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1] &&
                    this.ruleBase[this.i][this.j-2] === this.ruleBase[this.i+1][this.j-2] && 
                    this.ruleBase[this.i][this.j-3] === this.ruleBase[this.i+1][this.j-3] &&
                    this.ruleBase[this.i][this.j-4] === this.ruleBase[this.i+1][this.j-4] &&
                    this.ruleBase[this.i][this.j-5] === this.ruleBase[this.i+1][this.j-5]
                  ) {
                    let arr = [''];
                    // push all value in the same j index
                    for (let x=this.i; x < this.ruleBase.length ; x++) {
                      if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                        arr.push(this.ruleBase[x][this.j])
                      }
                    }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  // this.ruleBase[this.i+1][this.j-5] === undefined ||
                  else {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                else if (this.j === 6) {
                  if (
                    this.ruleBase[this.i+1][this.j-1] !== undefined &&
                    this.ruleBase[this.i+1][this.j-2] !== undefined &&
                    this.ruleBase[this.i+1][this.j-3] !== undefined &&
                    this.ruleBase[this.i+1][this.j-4] !== undefined &&
                    this.ruleBase[this.i+1][this.j-5] !== undefined &&
                    this.ruleBase[this.i+1][this.j-6] !== undefined &&
                    this.ruleBase[this.i][this.j-1] === this.ruleBase[this.i+1][this.j-1] &&
                    this.ruleBase[this.i][this.j-2] === this.ruleBase[this.i+1][this.j-2] && 
                    this.ruleBase[this.i][this.j-3] === this.ruleBase[this.i+1][this.j-3] &&
                    this.ruleBase[this.i][this.j-4] === this.ruleBase[this.i+1][this.j-4] &&
                    this.ruleBase[this.i][this.j-5] === this.ruleBase[this.i+1][this.j-5] &&
                    this.ruleBase[this.i][this.j-6] === this.ruleBase[this.i+1][this.j-6]
                  ) {
                    let arr = [''];
                    // push all value in the same j index
                    for (let x=this.i; x < this.ruleBase.length ; x++) {
                      if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                        arr.push(this.ruleBase[x][this.j])
                      }
                    }
                    // delete same values in array
                    arr = [...new Set(arr)]
                    // find value index in array
                    let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                    if (arr[findIndexInArray+1] !== undefined) {
                      // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                        this.screeningResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          this.UpdateScreeningResult()
                        }
                      }
                      // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                      if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                        reply = arr[findIndexInArray+1];
                        for (let x=this.i; x < this.ruleBase.length ; x++) {
                          if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                            if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                              this.i=x;
                              this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                              this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                              break
                            }
                          }
                        }
                      }
                    }
                    if (arr[findIndexInArray+1] === undefined) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  // this.ruleBase[this.i+1][this.j-5] === undefined ||
                  // this.ruleBase[this.i+1][this.j-6] === undefined ||
                  else {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
                // for j > 6 
                else {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x=this.i; x < this.ruleBase.length ; x++) {
                    if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                      arr.push(this.ruleBase[x][this.j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(this.ruleBase[this.i][this.j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if this.ruleBase[this.i+1][this.j] is the last value of this.ruleBase[this.i]
                    if (arr[findIndexInArray+1] === this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                      reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Melalui skrining dicurigai kamu mengalami ${this.allYesReply.length} gejala dari penyakit kulit antara ${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                      this.screeningResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        this.UpdateScreeningResult()
                      }
                    }
                    // if this.ruleBase[this.i+1][this.j] is not the last value of this.ruleBase[this.i]
                    if (arr[findIndexInArray+1] !== this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x=this.i; x < this.ruleBase.length ; x++) {
                        if (this.ruleBase[x][this.j-1] === this.ruleBase[this.i][this.j-1]) {
                          if (this.ruleBase[x][this.j] === arr[findIndexInArray+1]) {
                            this.i=x;
                            this.lastValueWhenUserResponNo=this.ruleBase[x][this.ruleBase[x].length-1];
                            this.totalSympthomWhenUserResponNo=[...this.totalSympthomWhenUserResponNo, this.ruleBase[x].length-1];
                            break
                          }
                        }
                      }
                    }
                  }
                  // for i === this.ruleBase.length
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab ya untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit kulit dengan gejala-gejala yang kamu jawab ya. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis kulit terdekat untuk informasi lebih lanjut.`
                    this.screeningResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=this.ruleBase[this.i+1][this.j];
                  }
                }
            }
          }
          // if user type or press 'y' / 't' / 'ya' / 'tidak', 
          // but not press 'mulai' / 'tes' / 'test' / 'skrining' before
          else {
            if (input === 'y' || input === 'ya' || input === 't' || input === 'tidak') {
              reply = `Ketik atau tekan mulai untuk skrining penyakit kulit`
            }
          }
        }
      }
      return [reply];
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.opensans {
  font-family: "Open Sans", Arial, sans-serif;
}
.poppins {
  font-family: Poppins, Arial, Helvetica, sans-serif !important;
}
.quicksand {
  font-family: Quicksand, Arial, sans-serif;
}
.roboto {
  font-family: "Roboto", sans-serif;
}
</style>
