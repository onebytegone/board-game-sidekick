import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { NamedRoute, routes } from './routes';

function makeRoute(name: NamedRoute): RouteRecordRaw[] {
   const config = routes[name];
   const baseRoute: RouteRecordRaw = {
      path: config.path,
      name,
      meta: {
         title: config.pageTitle || config.navTitle,
      },
      component: config.component,
   };
   // If there are children, flatten them as top-level routes
   if (config.children && config.children.length > 0) {
      const childRoutes: RouteRecordRaw[] = config.children.map((child) => ({
         path: `${config.path.replace(/\/$/, '')}/${child.path}`,
         name: `${name}-${child.path}`,
         meta: { title: child.pageTitle },
         component: child.component,
      }));
      return [baseRoute, ...childRoutes];
   }
   return [baseRoute];
}

export const router = createRouter({
   history: createWebHashHistory(),
   routes: [
      ...makeRoute(NamedRoute.Home),
      ...makeRoute(NamedRoute.RftGTheFirstEmperor),
      ...makeRoute(NamedRoute.FinspanFundamental),
      ...makeRoute(NamedRoute.DieRoller),
   ],
});
