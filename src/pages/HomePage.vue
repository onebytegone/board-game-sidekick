<template>
   <v-container class="fill-height justify-center" max-width="900">
      <div>
         <v-img class="mb-4" height="180" src="@/assets/logo.svg?url" />

         <div class="mb-8 text-center">
            <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
            <h1 class="text-h2 font-weight-bold">Board Game Sidekick</h1>
         </div>

         <v-row>
            <v-col v-for="link in links" :key="link.href" cols="12" sm="6">
               <v-card
                  class="py-4"
                  color="surface-variant"
                  :href="link.href"
                  :prepend-icon="link.icon"
                  rounded="lg"
                  :title="link.title"
                  variant="tonal"
               />
            </v-col>
         </v-row>

         <p class="text-center text-body-2 font-weight-light mt-8">
            This is not an official app produced by any of the publishers of the games mentioned on
            this site. Board Game Sidekick has no official connection to any of the games mentioned.
         </p>
      </div>
   </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NamedRoute } from '@/router/routes';

const router = useRouter();
const links = [
   {
      href: router.resolve({ name: NamedRoute.DieRoller }).href,
      icon: 'mdi-dice-multiple',
      title: 'Die Roller',
   },
];
</script>
