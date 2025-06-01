import { EndOfRoundGoal } from './automaton-state';

export const goalNames: Record<EndOfRoundGoal, string> = {
   [EndOfRoundGoal.EggsOrYoung]: 'Eggs and/or Young',
   [EndOfRoundGoal.SmallFish]: 'Small Fish',
   [EndOfRoundGoal.Fish]: 'Fish',
   [EndOfRoundGoal.Young]: 'Young',
   [EndOfRoundGoal.EachPredatorTag]: 'Each Predator Tag',
   [EndOfRoundGoal.ConsumedFish]: 'Consumed Fish',
   [EndOfRoundGoal.RowsOfFish]: 'Rows of Fish',
   [EndOfRoundGoal.YoungW2]: 'Young',
   [EndOfRoundGoal.FishWithTokens]: 'Fish With Tokens',
   [EndOfRoundGoal.EachTheseTags]: 'Each These Tags',
   [EndOfRoundGoal.Every2Eggs]: 'Every 2 Eggs',
   [EndOfRoundGoal.MediumFish]: 'Medium Fish',
   [EndOfRoundGoal.Schools]: 'Schools',
   [EndOfRoundGoal.YoungW3]: 'Young',
   [EndOfRoundGoal.Every3Eggs]: 'Every 3 Eggs',
   [EndOfRoundGoal.LargeFish]: 'Large Fish',
   [EndOfRoundGoal.FishWithoutTokens]: 'Fish Without Tokens',
   [EndOfRoundGoal.IfActivatedCards]: '"If Activated" Cards',
};

export function getGoalName(goal: EndOfRoundGoal): string {
   return goalNames[goal] || String(goal);
}
