<template>
   <v-container>
      <h1>Finspan: Setup</h1>
      <p>Configure the game and automaton resources before starting gameplay.</p>
      <v-row class="mt-6">
         <v-col cols="12">
            <v-btn-toggle v-model="difficulty" class="mb-4" mandatory divided>
               <v-btn
                  v-for="d in difficultyOptions"
                  :key="d"
                  :value="d"
                  size="large"
                  variant="outlined"
               >
                  {{ d }}
               </v-btn>
            </v-btn-toggle>
            <div class="text-caption text-grey-darken-1 mt-1">1 = Easiest, 5 = Hardest</div>
         </v-col>
         <v-col cols="12" md="6">
            <v-select v-model="goal1" :items="week1GoalOptions" label="Week 1 Goal" required />
         </v-col>
         <v-col cols="12" md="6">
            <v-select v-model="goal2" :items="week2GoalOptions" label="Week 2 Goal" required />
         </v-col>
         <v-col cols="12" md="6">
            <v-select v-model="goal3" :items="week3GoalOptions" label="Week 3 Goal" required />
         </v-col>
      </v-row>
      <v-btn
         color="primary"
         class="mt-8"
         :to="{
            name: `${NamedRoute.FinspanFundamental}-gameplay`,
            query: { difficulty, goal1, goal2, goal3 },
         }"
      >
         Start Game
      </v-btn>
   </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NamedRoute } from '@/router/routes';
import { EndOfRoundGoal } from './lib/automaton-state';
import { getGoalName } from './lib/endOfWeekGoalDisplay';

const difficulty = ref(2);
const difficultyOptions = [1, 2, 3, 4, 5];

const week1GoalOptions = [
   { title: getGoalName(EndOfRoundGoal.EggsOrYoung), value: EndOfRoundGoal.EggsOrYoung },
   { title: getGoalName(EndOfRoundGoal.SmallFish), value: EndOfRoundGoal.SmallFish },
   { title: getGoalName(EndOfRoundGoal.Fish), value: EndOfRoundGoal.Fish },
   { title: getGoalName(EndOfRoundGoal.Young), value: EndOfRoundGoal.Young },
   { title: getGoalName(EndOfRoundGoal.EachPredatorTag), value: EndOfRoundGoal.EachPredatorTag },
   { title: getGoalName(EndOfRoundGoal.ConsumedFish), value: EndOfRoundGoal.ConsumedFish },
];
const week2GoalOptions = [
   { title: getGoalName(EndOfRoundGoal.RowsOfFish), value: EndOfRoundGoal.RowsOfFish },
   { title: getGoalName(EndOfRoundGoal.YoungW2), value: EndOfRoundGoal.YoungW2 },
   { title: getGoalName(EndOfRoundGoal.FishWithTokens), value: EndOfRoundGoal.FishWithTokens },
   { title: getGoalName(EndOfRoundGoal.EachTheseTags), value: EndOfRoundGoal.EachTheseTags },
   { title: getGoalName(EndOfRoundGoal.Every2Eggs), value: EndOfRoundGoal.Every2Eggs },
   { title: getGoalName(EndOfRoundGoal.MediumFish), value: EndOfRoundGoal.MediumFish },
];
const week3GoalOptions = [
   { title: getGoalName(EndOfRoundGoal.Schools), value: EndOfRoundGoal.Schools },
   { title: getGoalName(EndOfRoundGoal.YoungW3), value: EndOfRoundGoal.YoungW3 },
   { title: getGoalName(EndOfRoundGoal.Every3Eggs), value: EndOfRoundGoal.Every3Eggs },
   { title: getGoalName(EndOfRoundGoal.LargeFish), value: EndOfRoundGoal.LargeFish },
   {
      title: getGoalName(EndOfRoundGoal.FishWithoutTokens),
      value: EndOfRoundGoal.FishWithoutTokens,
   },
   { title: getGoalName(EndOfRoundGoal.IfActivatedCards), value: EndOfRoundGoal.IfActivatedCards },
];

const goal1 = ref(EndOfRoundGoal.EggsOrYoung);
const goal2 = ref(EndOfRoundGoal.RowsOfFish);
const goal3 = ref(EndOfRoundGoal.Schools);
</script>
