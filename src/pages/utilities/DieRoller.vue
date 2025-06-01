<template>
   <v-container class="pa-4" style="max-width: 400px; margin: auto">
      <h1 class="mb-4 text-center">Dice Roller</h1>
      <v-select v-model="selectedDie" :items="diceOptions" label="Select Die" class="mb-4" />
      <v-btn color="primary" @click="rollDie">Roll</v-btn>
      <div v-if="result !== null" class="mt-4 text-center">
         <h2>Result: {{ result }}</h2>
      </div>
   </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const diceOptions = [
   { title: 'd6', value: 6 },
   { title: 'd8', value: 8 },
   { title: 'd10', value: 10 },
   { title: 'd12', value: 12 },
   { title: 'd20', value: 20 },
];

const selectedDie = ref(6);
const result = ref<number | null>(null);

function rollDie() {
   result.value = Math.floor(Math.random() * selectedDie.value) + 1;
}
</script>

<style scoped>
.text-center {
   text-align: center;
}
</style>
