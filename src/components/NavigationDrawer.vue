<template>
   <v-navigation-drawer v-model="drawerProxy" app :clipped="$vuetify.display.mdAndUp">
      <v-list>
         <v-list-item
            v-for="item in items"
            :key="item.title"
            :active="route.path === item.to"
            link
            :to="item.to"
            :title="item.title"
         >
            <template #prepend>
               <v-icon v-if="item.icon === 'robot-meeple'"><RobotMeeple /></v-icon>
               <v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>
            </template>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { routes } from '@/router/routes';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import RobotMeeple from '@/assets/robot-meeple.svg?component';

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
