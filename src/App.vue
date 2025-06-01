<template>
   <v-app>
      <v-app-bar app color="primary" dark>
         <v-app-bar-nav-icon @click="drawer = !drawer" />
         <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      </v-app-bar>
      <NavigationDrawer :drawer="drawer" @update:drawer="drawer = $event" />
      <v-main>
         <router-view />
      </v-main>
   </v-app>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavigationDrawer from '@/components/NavigationDrawer.vue';

const drawer = ref(true);
const route = useRoute();

const pageTitle = computed(() => {
   return route.meta?.title || 'Board Game Sidekick';
});
</script>
