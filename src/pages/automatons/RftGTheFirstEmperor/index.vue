<template>
   <v-container class="fill-height justify-center" max-width="900">
      <v-row>
         <v-col cols="12">
            <h1 class="text-h2 font-weight-bold mb-2">The First Emperor</h1>
            <div class="text-h5 font-weight-light mb-4">A Race For the Galaxy solo variant</div>
            <p class="mb-2">
               Many years ago you ascended to the throne where it quickly became apparent that your
               predecessors had left you a fairly decent world, no real poverty, hunger, strife or
               wars. It looked like you would be destined to obscurity in the history books. All of
               that changed within the last year: your scientists believe they have discovered
               Faster-than-light travel. You now stand ready to be the first emperor of a new age
               for mankind. You can now offer your people the stars.
            </p>
            <p class="mb-2">
               But with your failing health you only have a short time to take your people out
               there, develop new technologies and conquer new worlds before your successor takes
               your place. Can you do enough to be remembered or will that honor go to the next in
               your line?
            </p>
         </v-col>
         <v-col cols="12">
            <v-btn
               color="primary"
               class="mt-8"
               :to="{ name: `${NamedRoute.RftGTheFirstEmperor}-setup` }"
            >
               Begin Setup
            </v-btn>
            <p class="mt-8 text-caption text-grey">
               Variant created by David Mitchell. Source:
               <a
                  href="https://boardgamegeek.com/thread/274642/the-first-emperor-a-solo-variant"
                  target="_blank"
                  rel="noopener nofollow"
                  >boardgamegeek.com/thread/274642/the-first-emperor-a-solo-variant</a
               >
            </p>
            <p class="mt-2 text-caption text-grey">
               This is not an official Rio Grande Games app and has no official connection to Race
               for the Galaxy.
            </p>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
import { NamedRoute } from '@/router/routes';
</script>
