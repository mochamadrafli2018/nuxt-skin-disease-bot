# Nuxt.js Portfolio : Form Based Expert System for Eye Disease Screening System

## Build Setup

```bash
# install dependencies
$ npm install
# serve with hot reload at localhost:3000
$ npm run dev
```

## List of Eye Disease in Inference Machine

1. Ablasi Retina
2. Alergi Mata Merah
3. Blefaritis
4. Dakriosistitis
5. Degenerasi Makula
6. Eksoftalmus
7. Endoftalmitis
8. Glaukoma
9. Hordeolum (Stye)
10. Katarak
11. Keratitis Pungtata Superfisialis
12. Keratokonus
13. Kalazion
14. Konjungtivitis
15. Miopi
16. Oftalmia Neonatorium
17. Optic Neuritis
18. Pterygium
19. Retinitis Pigmentosa
20. Retinopati Diabetikum
21. Selulitis Orbitalitas
22. Trakoma
23. Trombosis Sinus Kavernosus
24. Ulkus Kornea
25. Uveitis
26. Xerophtalmania
27. Skleritis

## Deployment

This app was deployed on vercel.

## Next.js (React.js Framework) and Nuxt.js (Vue.js Framework) Similarities Documentation

### 1. Looping inside component

--- in React ---

```bash
data.map((i,index) => (<some JSX>))
```

--- in Vue ---

```bash
<div v-for="(i,index) in data">some HTML</div>
```

### 2. Key for index

--- in React ---

```bash
<div key={}>some HTML</div>
```

--- in Vue ---

```bash
<div :key="">some HTML</div>
```

### 3. Link

--- in React ---

```bash
href=""
```

--- in Vue ---

```bash
:href=""
```

### 4. Validator

--- in React ---

```bash
{isTrue? ({<div>some HTML</div>})}
```

--- in Vue ---

```bash
<div v-if="isTrue">{some HTML}</div>
```

### 5. Input change handler

--- in React ---

```bash
<input value={email} onChange={(e) => {setEmail(e.target.value)}} type=""/>
```

--- in Vue ---

```bash
<input v-model="email" type=""/> 
```

or 

```bash
<input v-on:change="email($event)" :value="email" />
```

or 

```bash
<input :value="email" @input="email = $event" />
```

### 6. Watcher

--- in React ---

```bash
// App.jsx
import React, { useState } from 'react'

export default function App() {
  const [title, setTitle] = useState('');
  const [validation ,setValidation] = useState(false);

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {validation === true && (
        <p className='bg-red-100 text-black'>Input must be filled</p>
      )}
    </div>
  )
}
```

--- in Vue ---

```bash
// App.vue
<template>
  <div>
    <input
      v-model="title"
      placeholder='Input a string'
    />
    <div v-if="titleEmpty" class="border-red-300 text-black">
      Title must be filled
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      titleEmpty = true,
    }
  },
  watch: {
    // whenever data in v-model changes, this function will run
    title: function() {
      this.titleEmpty = false;
    },
  }
  //...
}
</script>
```

### 7. State

--- in React ---

```bash
const [title, setTitle] = useState("");
```

--- in Vue ---

```bash
data(){ return { title:"", } }
```

or

```bash
data: () => ({ title:"", })
```

### 8. Set New Value in a State

--- in React ---

```bash
setTitle('some_string')
```

--- in Vue ---

```bash
this.title = 'some_string'
```

### 9. Passing Data in Component (Props)

--- in React Functional Component

- Parent Component

```bash
import ComponentName from 'ComponentName.js'

export default function App() {
  return (
    <ComponentName title = {"Understanding Props in vuejs"} subtitle = {"Content from props..."}>
  )
)
```

- Child Component

```bash
export default function ComponentName({ title, subtitle }) {
  return (
    <div>
      <p className='text-center'>{ title }</p>
      <p className='text-center'>{ subtitle }</p>
    </div>
  )
)
```

--- in React Class Component

- Parent Component

```bash
import ComponentName from 'ComponentName.js'

class App extends React.Component {
  render() {
    return (
      <ComponentName title = "Understanding Props in reactjs" subtitle = "Content from props...">
    )
  }
)
```

- Child Component

```bash
class ComponentName extends React.Component {
  render() {
    return (
      <div>
        <p className='text-center'>{ this.props.title }</p>
        <p className='text-center'>{ this.props.subtitle }</p>
      </div>
    )
  }
)
export default ComponentName;
```

--- in Vue ---

- Parent Component (Static Value)

```bash
<template>
  <ComponentName title="Understanding Props in vuejs" />
</template>
```

- Parent Component (Dynamic Value)

```bash
<template>
  <ComponentName :title=title />
</template>

<script>
export default {
  data() {
    return {
      title: 'Understanding Props in vuejs'
    }
  },
  //...
}
</script>
```

- Child Component named ComponentName.js

```bash
<template>
  <h3 class='text-center'>{{ title }}</h3>
</template>
```

## List of Reference

1. Create a sticky navbar : https://developer.mozilla.org/en-US/docs/Web/CSS/position

2. Set background color full screen height : https://www.geeksforgeeks.org/how-to-set-a-background-color-to-full-page-using-tailwind-css/

3. Using axios in Nuxt.js : https://axios.nuxtjs.org/options

4. Set v-model in checkbox array : https://www.nicesnippets.com/blog/vue-js-get-checked-value-of-checkbox-if-use-array-as-a-model

5. Using this.$router.push() in Nuxt.js : https://stackoverflow.com/questions/50375244/push-a-route-moving-from-vuejs-to-nuxtjs

6. Using redirect() : https://nuxtjs.org/docs/internals-glossary/context#redirect

7. Save token on local storage using Vue.js : https://stackoverflow.com/questions/64665017/how-to-save-simple-jwt-token-in-local-storage-using-vue-js-vuex-and-django-rest

8. Props in react.js : https://www.freecodecamp.org/news/react-components-jsx-props-for-beginners/

9. Props in vue.js : https://www.freecodecamp.org/news/how-to-use-props-in-vuejs/

## Error Documentation

1. Problem : [Vue warn]: Avoid using non-primitive value as key, use string/number value instead

Solution : https://stackoverflow.com/questions/53420082/vue-warn-avoid-using-non-primitive-value-as-key-use-string-number-value-inst

2. Problem : Classname='' is not working in Nuxt.js

Solution : Using Class='' instead.

3. Problem : bg-color tailwind is not working in Nuxt.js <main> tag

Solution : https://stackoverflow.com/questions/65812581/tailwind-custom-colors-default-not-working

4. Problem : Using checkbox

Solution : https://stackoverflow.com/questions/41001192/setting-a-checkbox-as-checked-with-vue-js

5. Problem : Created(){} in Nuxt.js error, but in Vue.js is not.

Solution : Just delete Created(){} in export default {} inside <script></script>

6. Problem : Cannot read properties of undefined (reading '$axios')

Solution : Delete $axios an replace with axios, also axios need to be imported as follow. Just add import axios from 'axios' inside <script></script>

7. Problem : error: No Output Directory named "dist" found after the Build completed. You can configure the Output Directory in your Project Settings. Learn More: https://vercel.link/missing-public-directory

Solution : https://medium.com/nerd-for-tech/how-to-deploy-a-nuxt-app-on-vercel-from-github-a7d4e9574ef2

8. Problem : Syntax Error: Unexpected token

Solution : Check each pair of curly brackets in the function.

9. Problem : localStorage is not defined in /pages/dashboard.vue

Solution : https://stackoverflow.com/questions/52474208/react-localstorage-is-not-defined-error-showing
