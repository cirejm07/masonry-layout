import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
window.$ = $
window.jQuery = $

const app = createApp(App)
app.use(VueLazyLoad, {
  loading: '',
  error: '',
  lifecycle: {
    loading: (el) => {
      //   console.log('loading', el)
    },
    error: (el) => {
      console.log('error', el)
    },
    loaded: (el) => {
      //   console.log('loaded', el)
    },
  },
})

app.use(createPinia())
app.use(router)
app.mount('#app')
