export enum NamedRoute {
   Home = 'home',
   DieRoller = 'die-roller',
}

export interface RouteConfig {
   path: string;
   navTitle?: string;
   pageTitle?: string;
   icon?: string;
}

export const routes: Record<NamedRoute, RouteConfig> = {
   [NamedRoute.Home]: {
      path: '/',
      icon: 'robot-meeple',
      navTitle: 'Home',
   },
   [NamedRoute.DieRoller]: {
      path: `/${NamedRoute.DieRoller}`,
      pageTitle: 'Die Roller',
      icon: 'mdi-dice-multiple',
   },
};
