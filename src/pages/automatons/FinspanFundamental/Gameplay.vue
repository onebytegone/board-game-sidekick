<template>
   <v-container>
      <v-toolbar flat class="mb-4 px-2">
         <v-toolbar-title class="text-h4">
            <template v-if="phase === AutomatonPhase.PlayerTurn">Your Turn</template>
            <template v-else-if="phase === AutomatonPhase.AutomatonTurn">Automaton's Turn</template>
            <template v-else-if="phase === AutomatonPhase.EndOfWeek">End of Week</template>
            <template v-else-if="phase === AutomatonPhase.GameEnd">Game Over!</template>
         </v-toolbar-title>
         <v-spacer />
         <v-chip variant="outlined" size="large">
            Week: {{ automatonState.week }} / 4 &nbsp; | &nbsp; Round: {{ automatonState.round }} /
            6
         </v-chip>
      </v-toolbar>
      <FinspanResourceTracker
         class="mb-8"
         :eggs="automatonState.resources.eggs"
         :young="automatonState.resources.young"
         :schools="automatonState.resources.schools"
         :achievement-markers="automatonState.resources.achievementMarkers"
         :cards-drawn="automatonState.resources.cardsDrawn"
         :score="totalScore.total"
      />

      <div v-if="phase === AutomatonPhase.PlayerTurn">
         <div class="mb-4 d-flex flex-wrap align-center">
            <v-btn class="me-2 mb-2" color="primary" @click="addEgg"
               >+1 egg for each "If Activated"</v-btn
            >
            <v-btn class="me-2 mb-2" color="primary" @click="addFourEggs"
               >+4 eggs for each "When Played"</v-btn
            >
            <v-btn class="mb-2" color="error" variant="outlined" @click="removeEgg"
               >-1 egg (Undo)</v-btn
            >
         </div>
         <v-btn color="accent" class="mb-8 mt-8" @click="nextTurn">Perform Automaton's Turn</v-btn>
      </div>

      <div v-else-if="phase === AutomatonPhase.AutomatonTurn">
         <div v-if="automatonState.prompts.length" class="mb-6">
            <v-alert
               v-for="(prompt, idx) in automatonState.prompts"
               :key="idx"
               type="info"
               border="start"
               class="mb-2"
            >
               {{ prompt.message }}
            </v-alert>
         </div>
         <div v-else class="mb-6" style="opacity: 0.7; font-style: italic">
            <v-alert type="info" variant="outlined" class="mb-2" color="grey-lighten-3">
               No actions needed
            </v-alert>
         </div>
         <v-btn color="accent" class="mb-8" @click="nextTurn">
            {{ automatonState.round === 6 ? 'End Week' : 'Next Round' }}
         </v-btn>
      </div>

      <div v-else-if="phase === AutomatonPhase.EndOfWeek">
         <div v-if="automatonState.prompts.length" class="mb-6">
            <v-alert
               v-for="(prompt, idx) in automatonState.prompts"
               :key="idx"
               type="info"
               border="start"
               class="mb-2"
            >
               {{ prompt.message }}
            </v-alert>
         </div>
         <div v-else class="mb-6" style="opacity: 0.7; font-style: italic">
            <v-alert type="info" variant="outlined" class="mb-2" color="grey-lighten-3">
               No actions needed
            </v-alert>
         </div>
         <v-btn color="accent" class="mb-8" @click="nextTurn">Begin Next Week</v-btn>
      </div>

      <div v-else-if="phase === AutomatonPhase.GameEnd">
         <v-alert type="info" class="mb-4">
            Game over! Final scoring may now be performed.
         </v-alert>
         <v-table class="mb-6">
            <thead>
               <tr>
                  <th>Category</th>
                  <th>Detail</th>
                  <th>Points</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Week 1 Achievement</td>
                  <td>{{ getGoalName(automatonState.endOfRoundGoals[1]) }}</td>
                  <td>{{ totalScore.week1 }}</td>
               </tr>
               <tr>
                  <td>Week 2 Achievement</td>
                  <td>{{ getGoalName(automatonState.endOfRoundGoals[2]) }}</td>
                  <td>{{ totalScore.week2 }}</td>
               </tr>
               <tr>
                  <td>Week 3 Achievement</td>
                  <td>{{ getGoalName(automatonState.endOfRoundGoals[3]) }}</td>
                  <td>{{ totalScore.week3 }}</td>
               </tr>
               <tr>
                  <td>Fish</td>
                  <td>{{ automatonState.resources.schools.value }}</td>
                  <td>{{ totalScore.fish }}</td>
               </tr>
               <tr>
                  <td>Eggs</td>
                  <td>{{ automatonState.resources.eggs.value }}</td>
                  <td>{{ totalScore.eggs }}</td>
               </tr>
               <tr>
                  <td>Young</td>
                  <td>{{ automatonState.resources.young.value }}</td>
                  <td>{{ totalScore.young }}</td>
               </tr>
               <tr>
                  <td>Schools</td>
                  <td>{{ automatonState.resources.schools.value }}</td>
                  <td>{{ totalScore.schools }}</td>
               </tr>
               <tr>
                  <td colspan="2"><strong>Total</strong></td>
                  <td>
                     <strong>{{ totalScore.total }}</strong>
                  </td>
               </tr>
            </tbody>
         </v-table>
      </div>

      <v-list v-if="automatonState.log.length > 0" two-line class="mt-6">
         <v-list-subheader>Game Log</v-list-subheader>
         <v-list-item v-for="(entry, idx) in [...automatonState.log].reverse()" :key="idx">
            <v-list-item-content>
               <v-list-item-title>{{ entry }}</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
      </v-list>
   </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FinspanResourceTracker from './components/FinspanResourceTracker.vue';
import {
   initialAutomatonState,
   advanceTurn,
   AutomatonPhase,
   playerAddEgg,
   playerAddFourEggs,
   playerRemoveEgg,
   calculateTotalScore,
} from './lib/automaton-state';
import { useRoute } from 'vue-router';
import { EndOfRoundGoal } from './lib/automaton-state';
import { getGoalName } from './lib/endOfWeekGoalDisplay';
import { useLeaveGuard } from '@/composables/useLeaveGuard';

const route = useRoute();
const difficulty = Number(route.query.difficulty) || 2;
const goal1 = (route.query.goal1 as EndOfRoundGoal) || EndOfRoundGoal.EggsOrYoung;
const goal2 = (route.query.goal2 as EndOfRoundGoal) || EndOfRoundGoal.RowsOfFish;
const goal3 = (route.query.goal3 as EndOfRoundGoal) || EndOfRoundGoal.Schools;
const automatonState = initialAutomatonState(difficulty, { 1: goal1, 2: goal2, 3: goal3 });

const phase = computed(() => automatonState.phase);

const totalScore = computed(() => calculateTotalScore(automatonState));

useLeaveGuard({
   showPromptBeforeLeavingFn: () => {
      // Warn if there is any log or gameplay progress
      if (automatonState.log.length > 0 || automatonState.week > 1 || automatonState.round > 1) {
         return 'Are you sure you want to leave? Your current game progress will be lost.';
      }
      return undefined;
   },
});

function nextTurn() {
   advanceTurn(automatonState);
}

function addEgg() {
   playerAddEgg(automatonState);
}

function addFourEggs() {
   playerAddFourEggs(automatonState);
}

function removeEgg() {
   playerRemoveEgg(automatonState);
}
</script>
