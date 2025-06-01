import App from './App.vue';
import { createApp } from 'vue';
import { vuetify } from '@/plugins/vuetify';
import { router } from '@/router';

const app = createApp(App);

app.use(vuetify).use(router);

app.mount('#app');
