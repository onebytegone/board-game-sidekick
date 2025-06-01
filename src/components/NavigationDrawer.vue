<template>
   <v-navigation-drawer v-model="drawerProxy" app :clipped="$vuetify.display.mdAndUp">
      <v-list>
         <v-list-item
            v-for="item in items"
            :key="item.title"
            :active="route.path === item.to"
            link
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
         />
      </v-list>
   </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { routes } from '@/router/routes';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ drawer: boolean }>();
const emit = defineEmits(['update:drawer']);

const drawerProxy = computed({
   get: () => props.drawer,
   set: (val: boolean) => emit('update:drawer', val),
});

const route = useRoute();

const items = Object.entries(routes).map(([key, route]) => ({
   title: route.navTitle || route.pageTitle || key,
   icon: route.icon,
   to: route.path,
}));
</script>

<style scoped>
/* Add custom styles as needed */
</style>
