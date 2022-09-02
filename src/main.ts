import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueObserveVisibility from 'vue-observe-visibility'

createApp(App).use(router).use(VueObserveVisibility).mount('#app')
