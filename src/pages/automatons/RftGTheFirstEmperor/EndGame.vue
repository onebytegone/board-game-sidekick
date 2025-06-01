<template>
   <v-container class="fill-height justify-center" max-width="900">
      <v-row>
         <v-col cols="12">
            <h1 class="text-h3 font-weight-bold mb-4">End Game</h1>
         </v-col>
         <v-col cols="12">
            <div class="mb-4">
               Tally your victory points from all sources (tableau,&nbsp;VP chips, etc.).
            </div>
         </v-col>
         <v-col cols="12">
            <v-table class="mb-6">
               <thead>
                  <tr>
                     <th>Score</th>
                     <th>Legacy</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>&gt;60&nbsp;VP</td>
                     <td>Your people forever applaud your remarkable wisdom.</td>
                  </tr>
                  <tr>
                     <td>50&nbsp;VP</td>
                     <td>
                        You are remembered as a great leader who brought everyone to new heights of
                        achievement.
                     </td>
                  </tr>
                  <tr>
                     <td>40&nbsp;VP</td>
                     <td>
                        You are remembered as a good leader, who reigned during an historic time.
                     </td>
                  </tr>
                  <tr>
                     <td>35&nbsp;VP</td>
                     <td>
                        Everyone remembers you as the first emperor, but not necessarily that you
                        did anything.
                     </td>
                  </tr>
                  <tr>
                     <td>25&nbsp;VP</td>
                     <td>
                        You are remembered in trivia games. Most people get the questions about you
                        wrong.
                     </td>
                  </tr>
                  <tr>
                     <td>&lt;24&nbsp;VP</td>
                     <td>
                        A few people have heard your name, but they frequently mix you up with a
                        folk singer who was born 100 years earlier.
                     </td>
                  </tr>
               </tbody>
            </v-table>
         </v-col>
         <v-col cols="12">
            <v-btn color="accent" class="mt-8" :to="{ name: NamedRoute.RftGTheFirstEmperor }"
               >Back to Start</v-btn
            >
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
import { NamedRoute } from '@/router/routes';
</script>
