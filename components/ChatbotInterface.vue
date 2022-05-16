<template>
  <div class='border-2 mx-auto max-w-3xl overflow-hidden p-0 rounded-xl hover:border-green-500 shadow-lg'>
    <div class='mx-0 mb-0 w-100 rounded'>
      <h4 class='bg-green-700 mb-0 p-1 w-100 opensans rounded-top text-center text-white text-xl'>
        Chat Bot Sistem Pakar
      </h4>
      <div 
        id='messages'
        ref='messagesScroll'
        class='bg-chat h-96 max-h-96 mx-0 px-2 py-1 w-100 overflow-y-scroll'
      >
        <!--*Chat will be append in here-->
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
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/4'
      >
        <p class='text-white'>Skrining</p>
      </button>
      <button 
        type='submit' 
        value='Submit' 
        @click='handleNextScreening'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/4'
      >
        <p class='text-white'>Lanjut</p>
      </button>
      <button 
        type='submit' 
        value='Submit' 
        @click='handleYes'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/4'
      >
        <p class='text-white'>Ya</p>
      </button>
      <button 
        type='submit'
        value='Submit'
        @click='handleNo'
        class='bg-green-700 hover:bg-green-800 mx-1 px-2 py-2 rounded-full text-white w-1/4'
      >
        <p class='text-white'>Tidak</p>
      </button>
    </div>
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
  </div>
</template>

<script>
import axios from 'axios';
import AddChat from './AddChat.js';
import AddChatWhenBrowserReload from './AddChatWhenBrowserReload.js';
import Compare from './Compare.js';
import {prompts,replies,alternative,coronavirus,} from '../data/PromptsAndReplies.js';
import s from './main-sympthom.js'
import g from './sympthom.js'

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
    diagnoseResult:'',
    messagesScroll:null,
    ruleBaseBefore:'',
    ruleBase: [
      [''],
      // Algorithm for Red Eyes 
      // consist of 7 + 5 + 1 + 6 = 19 diseases
      [s[0],s[1],s[3],'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut'],
      [s[0],s[1],'Sindroma Mata Kering atau Uveitis Kronis'],
      [s[0],s[6],'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis'],
      [s[0],s[8],'Perdarahan Subkonjungtiva'],
      [s[0],s[9],'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis'],
      // Algorithm for Decreasing Eye Sight only for Normal Eye Color (Not Red)
      // consist of 8 + 3 + 11 = 22 diseases
      [s[1],s[3],s[11],'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria'],
      [s[1],s[5],s[10],'Tumor, Strabismus atau Ophthalmopathy Thyroid'],
      [s[1],s[5],'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'],
      ['end of first screening'],
      // 16 specific eye disease out of 41 diseases
      // index = [10][0] -/ 2 diseases - Algorithm for 'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut' yang perlu pemeriksaan fisik lebih lanjut untuk mengetahui tekanan mata'
      [s[6],g[1],g[12],g[25],g[26],'Keratitis Pungtata Superfisialis'],
      [s[6],g[59],'Endoftalmitis (Infecius atau Non-Infecius)'],
      [g[1],g[12],g[49],g[56],g[57],'Uveitis (akut atau posterior)'],
      [g[23],g[32],g[33],g[34],'Trombosis Sinus Kavernosus'],
      ['end of second screening'],
      // index = [15][0] - 3 diseases - Algorithm for 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis'
      [g[1],g[9],g[12],g[25],'Hordeolum'],
      [g[1],g[12],g[25],g[58],'Konjungtivitis'],
      [g[1],g[59],'Episkelritis (Nodular atau Diffuse)'],
      ['end of second screening'],
      // index = [19][0] - 2 Diseases - Algortihm for 'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis'
      [g[1],g[3],g[7],g[8],g[10],g[25],'Blefaritis'],
      [g[10],g[25],g[27],g[28],'Konjungtivitis Alergi'],
      ['end of second screening'],
      // index = [22][0] - 2 Diseases - Algorithm for 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria'
      [g[17],g[46],'Abalsi Retina'],
      [g[35],g[36],'Optic Neuritis (Papillitis, Retrobulbar neuritis atau Neuroretinitis)'],
      ['end of second screening'],
      // index = [25][0] - 4 diseases - Algortihm for 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
      [s[6],g[1],g[19],g[20],g[60],g[62],'Katarak'],
      [s[7],g[44],g[45],'Degenerasi Macula'],  
      [g[17],'Retinopati Diabetika'],
      [g[19],'Retinitis Pigmentosa'],
      ['end of second screening'],
    ]
  }),
  created() {
    this.openingChat();
    // create a ref 
    const el = this.$refs.messagesScroll;
    if (el) {
      this.$ref.messagesScroll.scrollIntoView({ behavior: "smooth" })
    }
    // messageScroll.current.addEventListener('DOMNodeInserted', event => {
      // const { currentTarget: target } = event;
      // target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    // });
  },
  methods: {
    scrollToElement() {
      //const el = this.$refs.scrollToMe;
      //if (el) {
        //el.scrollIntoView({ behavior: "smooth" });
      //}
    },
    openingChat() {
      // opening chat message will be appear when browser reload
      setTimeout(() => {
        AddChatWhenBrowserReload(`Halo, ini adalah bot EyeScreening, Untuk memulai skrining penyakit mata ketikan atau tekan tombol <strong>mulai</strong>.`);
      },1000)
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
    handleNextScreening() {
      this.Output('lanjut') // input = 'lanjut'
      this.chatInput='' // return empty form after user press the button
      this.inputNow='lanjut'
      this.inputBefore=this.inputNow
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
      let reply;
      input = input.toLowerCase()
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
      if (Compare(prompts, replies, input)) {
        reply = Compare(prompts, replies, input);
      } 
      else if (input.match(/terima kasih/gi)) {
        reply = 'Sama-sama'
      }
      // Check if input contains `coronavirus`
      else if (input.match(/(corona|covid|virus)/gi)) {
        reply = coronavirus[Math.floor(Math.random() * coronavirus.length)];
      }
      // Screening Eye Disease
      else if (input.match(/(y|ya|t|tidak|mulai|tes|test|skrining|lanjut)/gi)) {
        reply = this.Screening(input)[0];
      }
      // If all else fails: random alternative
      else {
        reply = alternative[Math.floor(Math.random() * alternative.length)];
      }
      // Add chat
      AddChat(input, reply);
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
    Screening(input) {
      let reply;
      if (input === 'mulai' || input === 'tes'|| input === 'test'  || input === 'skrining') {
        // re-empty
        this.diagnoseResult=''
        this.lastValueWhenUserResponYes=''; 
        this.lastValueWhenUserResponNo='';
        this.allYesReply=[]; 
        this.totalSympthomWhenUserResponYes=[];
        this.totalSympthomWhenUserResponNo=[];
        this.ruleBaseBefore='';
        this.replyBefore=input;
        // reply
        reply = this.ruleBase[1][0]; this.i=1; this.j=0;
      }
      else if (input === 'lanjut') {
        if (this.replyBefore === 'mulai' || this.replyBefore === 'tes'|| this.replyBefore === 'test'  || this.replyBefore === 'skrining') {
          reply = 'Jawab <strong>ya/tidak</strong> terlebih dahulu.'
        }
        else {
          // re-empty
          this.lastValueWhenUserResponYes='';
          this.lastValueWhenUserResponNo='';
          this.allYesReply=[]; 
          this.totalSympthomWhenUserResponYes=[];
          this.totalSympthomWhenUserResponNo=[];
          this.replyBefore='lanjut';
          if (this.ruleBaseBefore === 'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut') {
            reply = this.ruleBase[10][0]; 
            this.i=10; this.j=0;
            this.diagnoseResult=''
          }
          if (this.ruleBaseBefore === 'Sindroma Mata Kering atau Uveitis Kronis') {
            reply = `Silahkan konsultasikan penyakit mata <strong>Sindroma Mata Kering atau Uveitis Kronis</strong> dengan dokter spesialis mata`;
            this.diagnoseResult=reply;
          }
          if (this.ruleBaseBefore === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis') {
            reply = this.ruleBase[15][0]; this.i=15; this.j=0; 
            this.diagnoseResult=''
          }
          if (this.ruleBaseBefore === 'Perdarahan Subkonjungtiva') {
            reply = `Silahkan konsultasikan penyakit mata <strong>Perdarahan Subkonjungtiva</strong> dengan dokter spesialis mata`;
            this.diagnoseResult=reply;
          }
          if (this.ruleBaseBefore === 'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis') {
            reply = this.ruleBase[19][0]; this.i=19; this.j=0; 
            this.diagnoseResult=''
          }
          if (this.ruleBaseBefore === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria') {
            reply = this.ruleBase[22][0]; this.i=22; this.j=0; 
            this.diagnoseResult=''
          }
          if (this.ruleBaseBefore === 'Tumor, Strabismus atau Ophthalmopathy Thyroid') {
            reply = 'Diagnosis Tumor, Strabismus atau Ophthalmopathy Thyroid lebih lanjut perlu dilakukan dengan pemeriksaan oleh dokter spesialis mata';
            this.diagnoseResult=reply;
          }
          if (this.ruleBaseBefore === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa') {
            reply = this.ruleBase[25][0]; this.i=25; this.j=0; 
            this.diagnoseResult=''
          }
        }
      }
      // if (input !== 'mulai' || input !== 'tes'|| input !== 'test'  || input !== 'skrining' || input !== 'lanjut')
      else {
        // diagnose result is not '', return diagnose result.
        if (this.diagnoseResult !== '') {
          reply = this.diagnoseResult;
        }
        // diagnose result is ''
        else if (this.diagnoseResult === '') {
          if (
            this.replyBefore === 'mulai' || this.replyBefore === 'tes' || 
            this.replyBefore === 'test' || this.replyBefore === 'skrining' ||
            this.replyBefore === 'lanjut'
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
                this.check='if'
                reply = this.ruleBase[this.i][this.j+1]; 
                this.j=this.j+1;
              }
              // if this.ruleBase[this.i][this.j+1] is the last value in [this.i] array
              else if (this.ruleBase[this.i][this.j+1] === this.ruleBase[this.i][this.ruleBase[this.i].length - 1]) {
                if (this.inputNow === 'tidak') {
                  this.check='else tidak'
                  // 1st screening
                  if (
                    this.ruleBase[this.i][this.j+1] === 'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut' ||
                    this.ruleBase[this.i][this.j+1] === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' ||
                    this.ruleBase[this.i][this.j+1] === 'Sindroma Mata Kering atau Uveitis Kronis' ||
                    this.ruleBase[this.i][this.j+1] === 'Perdarahan Subkonjungtiva' ||
                    this.ruleBase[this.i][this.j+1] === 'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis' ||
                    this.ruleBase[this.i][this.j+1] === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' ||
                    this.ruleBase[this.i][this.j+1] === 'Tumor, Strabismus atau Ophthalmopathy Thyroid' ||
                    this.ruleBase[this.i][this.j+1] === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                  ) {
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>${this.totalSympthomWhenUserResponYes[this.totalSympthomWhenUserResponYes.length-1]} gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponYes}</strong>. 
                    Ketik atau tekan lanjut untuk melanjutkan skrining kedua.`
                    this.diagnoseResult=reply;
                    this.ruleBaseBefore=this.ruleBase[this.i][this.j+1];
                    this.replyBefore='';
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      this.UpdateScreeningResult()
                    }
                  }
                  // 2nd screening
                  else {
                    if (this.j === 0) {
                      reply = `Melalui skrining dicurigai kamu mengalami <strong>1 gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponYes}</strong>. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply;
                      this.replyBefore='';
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        this.UpdateScreeningResult()
                      }
                    }
                    else {
                      reply = `Melalui skrining dicurigai kamu mengalami <strong>${this.totalSympthomWhenUserResponYes[this.totalSympthomWhenUserResponYes.length-1]} gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponYes}</strong>. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply;
                      this.replyBefore='';
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        this.UpdateScreeningResult()
                      }
                    }
                  }
                }
                if (this.inputNow === 'ya') {
                  // 1st screening
                  if (
                    this.ruleBase[this.i][this.j+1] === 'Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut' ||
                    this.ruleBase[this.i][this.j+1] === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' ||
                    this.ruleBase[this.i][this.j+1] === 'Sindroma Mata Kering atau Uveitis Kronis' ||
                    this.ruleBase[this.i][this.j+1] === 'Perdarahan Subkonjungtiva' ||
                    this.ruleBase[this.i][this.j+1] === 'Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah, Konjungtivitis Alergi atau Konjungtivitis Kronis' ||
                    this.ruleBase[this.i][this.j+1] === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' ||
                    this.ruleBase[this.i][this.j+1] === 'Tumor, Strabismus atau Ophthalmopathy Thyroid' ||
                    this.ruleBase[this.i][this.j+1] === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                  ) {
                    this.check='else ya'
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>${this.totalSympthomWhenUserResponYes[this.totalSympthomWhenUserResponYes.length-1]} gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponYes}</strong>. 
                    Ketik atau tekan lanjut untuk melanjutkan skrining kedua.`
                    this.diagnoseResult=reply;
                    this.ruleBaseBefore=this.ruleBase[this.i][this.j+1];
                    this.replyBefore='';
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      this.UpdateScreeningResult()
                    }
                  }
                  // 2nd screening
                  else {
                    if (this.j === 0) {
                      reply = `Melalui skrining dicurigai kamu mengalami <strong>1 gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponYes}</strong>. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply;
                      this.replyBefore='';
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        this.UpdateScreeningResult()
                      }
                    }
                    else {
                      reply = `Melalui skrining dicurigai kamu mengalami <strong>${this.totalSympthomWhenUserResponNo[this.totalSympthomWhenUserResponNo.length-1]} gejala</strong> dari penyakit mata <strong>${this.lastValueWhenUserResponNo}</strong>.
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply;
                      this.replyBefore='';
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        this.UpdateScreeningResult()
                      }
                    }
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
                    reply = `Apa kamu yakin tidak mengalami gejala penyakit mata yang ditanyakan oleh bot? 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    this.diagnoseResult=reply;
                  }
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if user's eyes are not red (normal) and eye vision is normal
                    if (arr[findIndexInArray+1] === 'end of first screening') {
                      reply = `Apa kamu yakin tidak mengalami gejala <b>mata merah</b> atau <b>penglihatan menurun?</b> 
                      Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                      this.diagnoseResult=reply;
                    }
                    else if (arr[findIndexInArray+1] === 'end of second screening') {
                      reply = `Apa kamu yakin tidak mengalami gejala-gejala yang ditanyakan oleh bot? 
                      Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                      this.diagnoseResult=reply;
                    }
                    else if (
                      arr[findIndexInArray+1] !== 'end of first screening' || 
                      arr[findIndexInArray+1] !== 'end of second screening'
                      ) {         
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu hanya menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa dipastikan penyakit mata yang tepat hanya dari 1 gejala tersebut. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || this.ruleBase[this.i][this.j-1] !== this.ruleBase[this.i+1][this.j-1]
                  else {
                    reply = `Kamu hanya menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa dipastikan penyakit mata yang tepat hanya dari 1 gejala tersebut. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || this.ruleBase[this.i+1][this.j-2] === undefined
                  else {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    } 
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  else {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
                  }
                }
                else if (this.j === 4) { // worked
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  else {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  // this.ruleBase[this.i+1][this.j-5] === undefined ||
                  else {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
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
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        this.diagnoseResult=reply; 
                        this.replyBefore=''; 
                        this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                      Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
                    }
                  }
                  // if this.ruleBase[this.i+1][this.j-1] === undefined || 
                  // this.ruleBase[this.i+1][this.j-2] === undefined ||
                  // this.ruleBase[this.i+1][this.j-3] === undefined ||
                  // this.ruleBase[this.i+1][this.j-4] === undefined ||
                  // this.ruleBase[this.i+1][this.j-5] === undefined ||
                  // this.ruleBase[this.i+1][this.j-6] === undefined ||
                  else {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
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
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Melalui skrining dicurigai kamu mengalami <strong>${this.allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${this.ruleBase[this.i+1][this.ruleBase[this.i+1].length-1]}</strong>. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      this.diagnoseResult=reply; 
                      this.replyBefore=''; 
                      this.ruleBaseBefore=ruleBase[i+1][j];
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
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${this.allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    this.diagnoseResult=reply; 
                    this.replyBefore=''; 
                    this.ruleBaseBefore=ruleBase[i+1][j];
                  }
                }
            }
          }
          // if user type or press 'y' / 't' / 'ya' / 'tidak', 
          // but not press 'mulai' / 'tes' / 'test' / 'skrining' / 'lanjut' before
          else {
            if (input === 'y' || input === 'ya' || input === 't' || input === 'tidak') {
              reply = `Ketik atau tekan <strong>mulai</strong> untuk skrining penyakit mata`
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
