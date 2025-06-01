import { reactive } from 'vue';

export type ResourceWithDelta = { value: number; delta?: number };
export type AutomatonResourcesWithDelta = {
   eggs: ResourceWithDelta;
   young: ResourceWithDelta;
   schools: ResourceWithDelta;
   achievementMarkers: ResourceWithDelta;
   cardsDrawn: ResourceWithDelta;
};

export enum ActionId {
   Card1 = 1,
   Card2 = 2,
   Card3 = 3,
   Card4 = 4,
   Card5 = 5,
   Card6 = 6,
   Card7 = 7,
}

export enum AutomatonPhase {
   PlayerTurn = 'player-turn',
   AutomatonTurn = 'automaton-turn',
   EndOfWeek = 'end-of-week',
   GameEnd = 'game-end',
}

export enum AutomatonPromptType {
   DrawCard = 'draw-card',
   GameEnd = 'game-end',
   EndOfWeek = 'end-of-week',
}

// Enum for end-of-round goals
export enum EndOfRoundGoal {
   // Week 1
   EggsOrYoung = 'eggs-or-young',
   SmallFish = 'small-fish',
   Fish = 'fish',
   Young = 'young',
   EachPredatorTag = 'each-predator-tag',
   ConsumedFish = 'consumed-fish',
   // Week 2
   RowsOfFish = 'rows-of-fish',
   YoungW2 = 'young-w2',
   FishWithTokens = 'fish-with-tokens',
   EachTheseTags = 'each-these-tags',
   Every2Eggs = 'every-2-eggs',
   MediumFish = 'medium-fish',
   // Week 3
   Schools = 'schools',
   YoungW3 = 'young-w3',
   Every3Eggs = 'every-3-eggs',
   LargeFish = 'large-fish',
   FishWithoutTokens = 'fish-without-tokens',
   IfActivatedCards = 'if-activated-cards',
}

export const EndOfRoundGoalPoints: Record<EndOfRoundGoal, { medium: number; hard: number }> = {
   // Week 1
   [EndOfRoundGoal.EggsOrYoung]: { medium: 3, hard: 6 },
   [EndOfRoundGoal.SmallFish]: { medium: 2, hard: 5 },
   [EndOfRoundGoal.Fish]: { medium: 2, hard: 6 },
   [EndOfRoundGoal.Young]: { medium: 0, hard: 4 },
   [EndOfRoundGoal.EachPredatorTag]: { medium: 0, hard: 2 },
   [EndOfRoundGoal.ConsumedFish]: { medium: 0, hard: 2 },
   // Week 2
   [EndOfRoundGoal.RowsOfFish]: { medium: 0, hard: 3 },
   [EndOfRoundGoal.YoungW2]: { medium: 1, hard: 5 },
   [EndOfRoundGoal.FishWithTokens]: { medium: 3, hard: 6 },
   [EndOfRoundGoal.EachTheseTags]: { medium: 2, hard: 5 },
   [EndOfRoundGoal.Every2Eggs]: { medium: 0, hard: 3 },
   [EndOfRoundGoal.MediumFish]: { medium: 0, hard: 2 },
   // Week 3
   [EndOfRoundGoal.Schools]: { medium: 0, hard: 2 },
   [EndOfRoundGoal.YoungW3]: { medium: 3, hard: 8 },
   [EndOfRoundGoal.Every3Eggs]: { medium: 0, hard: 3 },
   [EndOfRoundGoal.LargeFish]: { medium: 1, hard: 3 },
   [EndOfRoundGoal.FishWithoutTokens]: { medium: 3, hard: 7 },
   [EndOfRoundGoal.IfActivatedCards]: { medium: 4, hard: 6 },
};

export type AutomatonState = {
   week: number;
   round: number;
   difficulty: number;
   actionsAvailable: ActionId[]; // 1-7, one removed per week
   resources: AutomatonResourcesWithDelta;
   log: string[];
   prompts: AutomatonPrompt[];
   phase: AutomatonPhase;
   endOfRoundGoals: {
      1: EndOfRoundGoal;
      2: EndOfRoundGoal;
      3: EndOfRoundGoal;
   };
   endOfWeekScores?: { [week: number]: number };
};

export type AutomatonPrompt = {
   type: AutomatonPromptType;
   message: string;
};

export const initialAutomatonState = (
   difficulty: number,
   endOfRoundGoals?: { 1: EndOfRoundGoal; 2: EndOfRoundGoal; 3: EndOfRoundGoal },
) => {
   const state = reactive<AutomatonState>({
      week: 1,
      round: 1,
      difficulty,
      actionsAvailable: [
         ActionId.Card1,
         ActionId.Card2,
         ActionId.Card3,
         ActionId.Card4,
         ActionId.Card5,
         ActionId.Card6,
         ActionId.Card7,
      ],
      resources: {
         eggs: { value: 0, delta: 0 },
         young: { value: 0, delta: 0 },
         schools: { value: 0, delta: 0 },
         achievementMarkers: { value: 0, delta: 0 },
         cardsDrawn: { value: 0, delta: 0 },
      },
      log: [],
      prompts: [],
      phase: AutomatonPhase.PlayerTurn,
      endOfRoundGoals: endOfRoundGoals || {
         1: EndOfRoundGoal.EggsOrYoung,
         2: EndOfRoundGoal.RowsOfFish,
         3: EndOfRoundGoal.Schools,
      },
   });
   removeWeeklyAction(state);
   return state;
};

export function removeWeeklyAction(state: AutomatonState, rng = Math): void {
   if (state.actionsAvailable.length > 6) {
      const idx = Math.floor(rng.random() * state.actionsAvailable.length);
      state.actionsAvailable.splice(idx, 1);
   }
}

export function resetActionsForNewWeek(state: AutomatonState): void {
   state.actionsAvailable = [
      ActionId.Card1,
      ActionId.Card2,
      ActionId.Card3,
      ActionId.Card4,
      ActionId.Card5,
      ActionId.Card6,
      ActionId.Card7,
   ];
   removeWeeklyAction(state);
}

function updateResource(resource: ResourceWithDelta, amount: number) {
   resource.value = (resource.value ?? 0) + amount;
   resource.delta = (resource.delta ?? 0) + amount;
}

function removeAchievementMarker(state: AutomatonState) {
   if (state.difficulty !== 1 && state.week !== 4 && state.resources.achievementMarkers.value > 0) {
      updateResource(state.resources.achievementMarkers, -1);
      state.log.push('Removed an achievement marker.');
   }
}

function addAchievementMarker(state: AutomatonState) {
   if (state.difficulty !== 1 && state.week !== 4) {
      updateResource(state.resources.achievementMarkers, 1);
      state.log.push('Added an achievement marker.');
   }
}

function promptDrawCard(state: AutomatonState, prompts?: AutomatonPrompt[]) {
   updateResource(state.resources.cardsDrawn, 1);
   const msg = 'Draw a card. You get any "All Players" benefits.';
   state.log.push('Prompt: ' + msg);
   if (prompts) {
      prompts.push({ type: AutomatonPromptType.DrawCard, message: msg });
   }
}

function convertYoungToSchool(state: AutomatonState) {
   if (state.resources.young.value >= 3) {
      updateResource(state.resources.young, -3);
      updateResource(state.resources.schools, 1);
      state.log.push('Converted 3 young to 1 school.');
   }
}

function convertEggsToYoung(state: AutomatonState) {
   const eggsToConvert = Math.min(4, state.resources.eggs.value);
   if (eggsToConvert > 0) {
      updateResource(state.resources.eggs, -eggsToConvert);
      updateResource(state.resources.young, eggsToConvert);
      state.log.push(`Converted ${eggsToConvert} eggs to young.`);
   }
}

function gainEggs(state: AutomatonState) {
   updateResource(state.resources.eggs, 2);
   state.log.push('Gained 2 eggs.');
}

// Action logic as a map
const actionMap: Record<
   ActionId,
   ((state: AutomatonState, prompts?: AutomatonPrompt[]) => void)[]
> = {
   [ActionId.Card1]: [addAchievementMarker, promptDrawCard],
   [ActionId.Card2]: [addAchievementMarker, promptDrawCard],
   [ActionId.Card3]: [convertEggsToYoung, gainEggs],
   [ActionId.Card4]: [removeAchievementMarker, convertYoungToSchool, convertEggsToYoung, gainEggs],
   [ActionId.Card5]: [addAchievementMarker, convertYoungToSchool, convertEggsToYoung, gainEggs],
   [ActionId.Card6]: [removeAchievementMarker, promptDrawCard],
   [ActionId.Card7]: [removeAchievementMarker, convertYoungToSchool, convertEggsToYoung, gainEggs],
};

function calculateWeekGoalPoints(state: AutomatonState) {
   const week = state.week;
   if (week > 3) return { goal: undefined, points: 0, difficultyLabel: '' };
   const goal = state.endOfRoundGoals[week as 1 | 2 | 3];
   const pointsMap = EndOfRoundGoalPoints[goal];
   let points = 0;
   let difficultyLabel = '';
   if (state.difficulty === 2 || state.difficulty === 3) {
      points = pointsMap.medium;
      difficultyLabel = 'medium';
   } else if (state.difficulty === 4 || state.difficulty === 5) {
      points = pointsMap.hard;
      difficultyLabel = 'hard';
   }
   return { goal, points, difficultyLabel };
}

function storeEndOfWeekScore(state: AutomatonState) {
   const { goal, points } = calculateWeekGoalPoints(state);
   if (!state.endOfWeekScores) state.endOfWeekScores = {};
   if (goal) state.endOfWeekScores[state.week] = points;
}

function checkEndOfWeekOrGame(state: AutomatonState) {
   const log: string[] = [];
   const prompts: AutomatonPrompt[] = [];
   if (state.round === 6) {
      if (state.week === 4) {
         const msg = 'Game over! Final scoring may now be performed.';
         prompts.push({ type: AutomatonPromptType.GameEnd, message: msg });
         log.push(msg);
         state.phase = AutomatonPhase.GameEnd;
         state.log.push(...log);
         state.prompts = prompts;
         return;
      } else {
         storeEndOfWeekScore(state);
         // Use the locked-in score from state.endOfWeekScores for the current week
         const weekScore = state.endOfWeekScores ? state.endOfWeekScores[state.week] : undefined;
         const goal = state.endOfRoundGoals[state.week as 1 | 2 | 3];
         const msg =
            `End of week ${state.week}: Perform end-of-week scoring now.` +
            (goal ? `\nGoal: ${goal} = ${weekScore ?? 0} points.` : '');
         prompts.push({ type: AutomatonPromptType.EndOfWeek, message: msg });
         log.push(msg.replace('\n', ' '));
         state.phase = AutomatonPhase.EndOfWeek;
         state.prompts = prompts;
      }
   } else {
      state.round++;
      state.phase = AutomatonPhase.PlayerTurn;
      state.prompts = [];
   }
   state.log.push(...log);
}

function automatonTurn(state: AutomatonState) {
   const available = state.actionsAvailable;
   if (available.length === 0) {
      state.log.push('No actions available.');
      state.prompts = [];
      return;
   }
   const idx = Math.floor(Math.random() * available.length);
   const actionId = available[idx];
   state.actionsAvailable.splice(idx, 1);
   // Log which action card was used
   state.log.push(`Automaton used Action Card ${actionId}.`);
   performAction(state, actionId);
}

export function advanceTurn(state: AutomatonState) {
   for (const key of Object.keys(state.resources) as (keyof AutomatonResourcesWithDelta)[]) {
      state.resources[key].delta = 0;
   }
   if (state.phase === AutomatonPhase.PlayerTurn) {
      state.phase = AutomatonPhase.AutomatonTurn;
      automatonTurn(state);
      return;
   }
   if (state.phase === AutomatonPhase.AutomatonTurn) {
      checkEndOfWeekOrGame(state);
      return;
   }
   if (state.phase === AutomatonPhase.EndOfWeek) {
      storeEndOfWeekScore(state);
      state.round = 1;
      state.week++;
      if (state.week <= 4) {
         resetActionsForNewWeek(state);
         state.resources.achievementMarkers.value = 0;
         state.resources.achievementMarkers.delta = 0;
      }
      state.phase = AutomatonPhase.PlayerTurn;
      state.log.push(`Week ${state.week} begins.`);
      return;
   }
}

export function performAction(state: AutomatonState, actionId: ActionId): void {
   const prompts: AutomatonPrompt[] = [];
   const ops = actionMap[actionId];
   const logStart = state.log.length;
   if (ops) {
      for (const op of ops) {
         op(state, prompts);
      }
   } else {
      state.log.push('Unknown action.');
   }
   // Prefix each log entry with week/round
   const prefix = `[Week ${state.week}, Round ${state.round}]`;
   const newLogEntries = state.log.slice(logStart).map((entry) => `${prefix} ${entry}`);
   // Replace the last N log entries with prefixed versions
   state.log.splice(logStart, newLogEntries.length, ...newLogEntries);
   state.prompts = prompts;
}

// Calculate and return total score breakdown for the automaton (can be called at any time)
export function calculateTotalScore(state: AutomatonState): {
   week1: number;
   week2: number;
   week3: number;
   fish: number;
   eggs: number;
   young: number;
   schools: number;
   total: number;
} {
   const difficulty = state.difficulty;
   const scores = state.endOfWeekScores || {};
   const week1 = scores[1] ?? 0;
   const week2 = scores[2] ?? 0;
   const week3 = scores[3] ?? 0;
   const fish =
      difficulty <= 2 ? state.resources.schools.value * 3 : state.resources.schools.value * 4;
   const eggs = Math.floor(state.resources.eggs.value / 2);
   const young = state.resources.young.value;
   const schools =
      difficulty <= 2 ? state.resources.schools.value * 5 : state.resources.schools.value * 6;
   const total = week1 + week2 + week3 + fish + eggs + young + schools;
   return { week1, week2, week3, fish, eggs, young, schools, total };
}

// Player turn resource mutation helpers
export function playerAddEgg(state: AutomatonState) {
   updateResource(state.resources.eggs, 1);
}

export function playerAddFourEggs(state: AutomatonState) {
   updateResource(state.resources.eggs, 4);
}

export function playerRemoveEgg(state: AutomatonState) {
   if (state.resources.eggs.value > 0) {
      updateResource(state.resources.eggs, -1);
   }
}
