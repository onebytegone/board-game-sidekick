import type { RouteComponent } from 'vue-router';

export enum NamedRoute {
   Home = 'home',
   RftGTheFirstEmperor = 'rftg-the-first-emperor',
   DieRoller = 'die-roller',
   FinspanFundamental = 'finspan-fundamental',
}

export interface RouteConfig {
   path: string;
   navTitle?: string;
   pageTitle?: string;
   icon?: string;
   component: RouteComponent;
   children?: Array<{
      path: string;
      pageTitle: string;
      component: RouteComponent;
   }>;
}

export const routes: Record<NamedRoute, RouteConfig> = {
   [NamedRoute.Home]: {
      path: '/',
      icon: 'robot-meeple',
      navTitle: 'Home',
      component: () => import('../pages/HomePage.vue'),
   },
   [NamedRoute.RftGTheFirstEmperor]: {
      path: `/${NamedRoute.RftGTheFirstEmperor}`,
      pageTitle: 'RftG: The First Emperor',
      icon: 'mdi-rocket-launch',
      component: () => import('../pages/automatons/RftGTheFirstEmperor/index.vue'),
      children: [
         {
            path: 'setup',
            pageTitle: 'Setup',
            component: () => import('../pages/automatons/RftGTheFirstEmperor/Setup.vue'),
         },
         {
            path: 'gameplay',
            pageTitle: 'Gameplay',
            component: () => import('../pages/automatons/RftGTheFirstEmperor/Gameplay.vue'),
         },
         {
            path: 'endgame',
            pageTitle: 'End Game',
            component: () => import('../pages/automatons/RftGTheFirstEmperor/EndGame.vue'),
         },
      ],
   },
   [NamedRoute.FinspanFundamental]: {
      path: `/${NamedRoute.FinspanFundamental}`,
      pageTitle: 'Finspan: Fundamental',
      icon: 'mdi-fish',
      component: () => import('../pages/automatons/FinspanFundamental/index.vue'),
      children: [
         {
            path: 'setup',
            pageTitle: 'Finspan: Setup',
            component: () => import('../pages/automatons/FinspanFundamental/Setup.vue'),
         },
         {
            path: 'gameplay',
            pageTitle: 'Finspan: Fundamental',
            component: () => import('../pages/automatons/FinspanFundamental/Gameplay.vue'),
         },
      ],
   },
   [NamedRoute.DieRoller]: {
      path: `/${NamedRoute.DieRoller}`,
      pageTitle: 'Die Roller',
      icon: 'mdi-dice-multiple',
      component: () => import('../pages/utilities/DieRoller.vue'),
   },
};
