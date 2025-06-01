<template>
   <v-card class="mb-4">
      <v-card-title>Automaton's Resources</v-card-title>
      <v-card-text>
         <v-row>
            <v-col cols="12" sm="6" md="4">
               <div>
                  Eggs: {{ eggs.value }}
                  <span
                     v-if="eggs.delta && eggs.delta !== 0"
                     :class="{ 'text-success': eggs.delta > 0, 'text-error': eggs.delta < 0 }"
                     >({{ eggs.delta > 0 ? '+' : '' }}{{ eggs.delta }})</span
                  >
               </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
               <div>
                  Young: {{ young.value }}
                  <span
                     v-if="young.delta && young.delta !== 0"
                     :class="{ 'text-success': young.delta > 0, 'text-error': young.delta < 0 }"
                     >({{ young.delta > 0 ? '+' : '' }}{{ young.delta }})</span
                  >
               </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
               <div>
                  Schools: {{ schools.value }}
                  <span
                     v-if="schools.delta && schools.delta !== 0"
                     :class="{ 'text-success': schools.delta > 0, 'text-error': schools.delta < 0 }"
                     >({{ schools.delta > 0 ? '+' : '' }}{{ schools.delta }})</span
                  >
               </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
               <div>
                  Achievement Markers: {{ achievementMarkers.value }}
                  <span
                     v-if="achievementMarkers.delta && achievementMarkers.delta !== 0"
                     :class="{
                        'text-success': achievementMarkers.delta > 0,
                        'text-error': achievementMarkers.delta < 0,
                     }"
                     >({{ achievementMarkers.delta > 0 ? '+' : ''
                     }}{{ achievementMarkers.delta }})</span
                  >
               </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
               <div>
                  Cards Drawn: {{ cardsDrawn.value }}
                  <span
                     v-if="cardsDrawn.delta && cardsDrawn.delta !== 0"
                     :class="{
                        'text-success': cardsDrawn.delta > 0,
                        'text-error': cardsDrawn.delta < 0,
                     }"
                     >({{ cardsDrawn.delta > 0 ? '+' : '' }}{{ cardsDrawn.delta }})</span
                  >
               </div>
            </v-col>
         </v-row>
         <v-row>
            <v-col cols="12">
               <span class="text-h6 mt-6 mb-0">Score: {{ score }}</span>
            </v-col>
         </v-row>
      </v-card-text>
   </v-card>
</template>

<script setup lang="ts">
interface ResourceWithDelta {
   value: number;
   delta?: number;
}

defineProps<{
   eggs: ResourceWithDelta;
   young: ResourceWithDelta;
   schools: ResourceWithDelta;
   achievementMarkers: ResourceWithDelta;
   cardsDrawn: ResourceWithDelta;
   score?: number;
}>();
</script>

<style scoped>
.score-banner {
   background: var(--v-theme-primary-lighten4, #e3f2fd);
   border-radius: 8px;
   color: var(--v-theme-primary-darken2, #1976d2);
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>
