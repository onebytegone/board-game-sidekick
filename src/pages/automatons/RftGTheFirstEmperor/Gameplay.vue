<template>
   <v-container class="fill-height justify-center" max-width="900">
      <v-row>
         <v-col cols="12">
            <h1 class="text-h3 font-weight-bold mb-4">Gameplay</h1>
         </v-col>
         <v-col cols="12">
            <div v-if="!roundStarted">
               <v-btn color="accent" class="mb-8" @click="startTurn">Start Round</v-btn>
            </div>
            <div v-else>
               <v-card outlined class="mb-6">
                  <v-card-title class="font-weight-bold">
                     Automaton Actions
                     <span class="float-right text-caption font-weight-regular"
                        >Round {{ roundNumber }}</span
                     >
                  </v-card-title>
                  <v-card-text>
                     <div v-if="automatonActions.length">
                        <v-list density="compact" class="mb-2">
                           <v-list-item v-for="(action, i) in automatonActions" :key="i">
                              <v-list-item-title>
                                 <span style="font-family: monospace" class="mr-1">{{
                                    action.numeral
                                 }}</span>
                                 {{ action.text }}
                              </v-list-item-title>
                           </v-list-item>
                        </v-list>
                     </div>
                     <div v-else class="text-grey">Actions will appear here each round.</div>
                     <v-alert variant="outlined" class="mt-4 mb-2">
                        At the end of the round, discard the top six cards from the draw pile.
                     </v-alert>
                     <v-btn color="accent" class="mt-6" @click="nextRound">Next Round</v-btn>
                  </v-card-text>
               </v-card>
            </div>
         </v-col>
         <v-col cols="12">
            <v-divider class="my-8" />
         </v-col>
         <v-col cols="12" class="text-center">
            <div class="mb-2">If the draw pile is empty, the game is done.</div>
            <v-btn color="primary" :to="{ name: `${NamedRoute.RftGTheFirstEmperor}-endgame` }"
               >End Game</v-btn
            >
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NamedRoute } from '@/router/routes';
import { useLeaveGuard } from '@/composables/useLeaveGuard';

const actionOptions = [
   { numeral: 'I', text: 'Explore' },
   { numeral: 'I', text: 'Explore' },
   { numeral: 'II', text: 'Develop' },
   { numeral: 'III', text: 'Settle' },
   { numeral: 'IV', text: 'Consume' },
   { numeral: 'IV', text: 'Consume' },
   { numeral: 'V', text: 'Produce' },
];

const automatonActions = ref<{ numeral: string; text: string }[]>([]);
const roundStarted = ref(false);
const roundNumber = ref(1);

function getRandomActions(count: number) {
   const pool = [...actionOptions];
   const result: typeof actionOptions = [];
   for (let i = 0; i < count; i++) {
      if (pool.length === 0) break;
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(idx, 1)[0]);
   }
   // Sort by the order in actionOptions (simplified)
   result.sort((a, b) => actionOptions.indexOf(a) - actionOptions.indexOf(b));
   return result;
}

function startTurn() {
   automatonActions.value = getRandomActions(2);
   roundStarted.value = true;
   roundNumber.value = 1;
}

function nextRound() {
   automatonActions.value = getRandomActions(2);
   roundNumber.value++;
}

useLeaveGuard({
   showPromptBeforeLeavingFn: () => {
      return 'You are in the middle of a game. Are you sure you want to leave?';
   },
   allowedRoutes: [`${NamedRoute.RftGTheFirstEmperor}-endgame`],
});
</script>
