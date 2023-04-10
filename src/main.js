import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { firebaseApp } from './data/firebase';
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'

import App from './App.vue';
import router from './router';

import './assets/bootstrap.css';

console.log(import.meta.env.MODE);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      VueFireFirestoreOptionsAPI(),
      // we will see other modules later on
      // VueFireAuth(),
    ],
});

const mountedApp = app.mount('#app');
console.log(mountedApp);
