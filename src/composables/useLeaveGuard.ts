import { onBeforeRouteLeave } from 'vue-router';

/**
 * useLeaveGuard - composable to warn user before leaving a route if needed
 * @param options - object with the following properties:
 *   showPromptBeforeLeavingFn: function that returns a string (message) if prompt is needed, or undefined/empty if not
 *   allowedRoutes: optional array of route names or paths that are allowed to navigate without confirmation
 */
export function useLeaveGuard(options: {
   showPromptBeforeLeavingFn: () => string | undefined;
   allowedRoutes?: Array<string>;
}) {
   const { showPromptBeforeLeavingFn, allowedRoutes = [] } = options;

   onBeforeRouteLeave((to, from, next) => {
      if (
         allowedRoutes &&
         (allowedRoutes.includes(to.name as string) || allowedRoutes.includes(to.path))
      ) {
         next();
         return;
      }
      const message = showPromptBeforeLeavingFn();
      if (message) {
         if (window.confirm(message)) {
            next();
         } else {
            next(false);
         }
      } else {
         next();
      }
   });
}
