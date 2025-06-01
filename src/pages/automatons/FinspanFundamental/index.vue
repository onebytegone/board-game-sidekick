<template>
   <v-container class="fill-height justify-center" max-width="900">
      <v-row>
         <v-col cols="12">
            <h1 class="text-h2 font-weight-bold mb-2">Finspan Fundamental</h1>
            <div class="text-h5 font-weight-light mb-4">A Finspan solo automaton</div>
            <p class="mb-2">This is the basic automaton for Finspan.</p>
         </v-col>
         <v-col cols="12">
            <v-btn
               color="primary"
               class="mt-8"
               :to="{ name: `${NamedRoute.FinspanFundamental}-setup` }"
            >
               Begin Setup
            </v-btn>
            <p class="mt-8 text-caption text-grey">
               This is not an official Stonemaier Games app and has no official connection to
               Finspan.
            </p>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
import { NamedRoute } from '@/router/routes';
</script>
