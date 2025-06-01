import {
   createRouter,
   createWebHashHistory,
   type RouteComponent,
   type RouteRecordRaw,
} from 'vue-router';
import { NamedRoute, routes, type RouteConfig } from './routes';

function makeRoute(name: NamedRoute, component: RouteComponent): RouteRecordRaw {
   const config = routes[name];

   return {
      path: config.path,
      name,
      meta: {
         title: config.pageTitle || config.navTitle,
      },
      component,
   };
}

export const router = createRouter({
   history: createWebHashHistory(),
   routes: [
      makeRoute(NamedRoute.Home, () => import('../pages/HomePage.vue')),
      makeRoute(NamedRoute.DieRoller, () => import('../pages/utilities/DieRoller.vue')),
   ],
});
