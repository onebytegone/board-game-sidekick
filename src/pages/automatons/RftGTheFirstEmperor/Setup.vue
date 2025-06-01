<template>
   <v-container class="fill-height justify-center" max-width="900">
      <v-row>
         <v-col cols="12">
            <h1 class="text-h3 font-weight-bold mb-4">Setup</h1>
         </v-col>
         <v-col cols="12" class="d-flex flex-column align-items-center">
            <ol class="mb-4 ml-4">
               <li>Randomly pick your home world from the starter worlds.</li>
               <li>Draw the first six cards and discard two.</li>
               <li>Select an action deck for yourself.</li>
               <li>Shuffle the other starter worlds back into the draw pile.</li>
            </ol>
         </v-col>
         <v-col cols="12">
            <v-card color="warning" class="mb-4" variant="tonal">
               <v-card-title class="font-weight-bold">
                  <v-icon start>mdi-alert</v-icon>
                  Special Rule
               </v-card-title>
               <v-card-text>
                  <p class="mb-2">
                     You may only have <strong>one six-cost development card</strong> in play. If
                     you have a six-cost development card and draw another one, you can spend the
                     cost during a development phase to replace the current six-cost card with the
                     new one.
                  </p>
                  <p><em>You are a young empire and need focus.</em></p>
               </v-card-text>
            </v-card>
         </v-col>
         <v-col cols="12">
            <v-btn
               color="primary"
               class="mt-8"
               :to="{ name: `${NamedRoute.RftGTheFirstEmperor}-gameplay` }"
               >Start Game</v-btn
            >
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
import { NamedRoute } from '@/router/routes';
</script>
