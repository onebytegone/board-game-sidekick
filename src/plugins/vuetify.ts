import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const vuetify = createVuetify({
   theme: {
      defaultTheme: 'dark',
      themes: {
         dark: {
            dark: true,
            colors: {
               primary: '#455a64',
               accent: '#ffc107',
               info: '#B0BEC5',
            },
         },
         light: {
            dark: false,
            colors: {
               primary: '#455a64',
               accent: '#ffc107',
               info: '#B0BEC5',
            },
         },
      },
   },
});
