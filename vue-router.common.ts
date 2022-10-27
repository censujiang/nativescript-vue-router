import * as Vue from "vue";
import { Frame } from "@nativescript/core/ui/frame";
import { RouterService } from "./router-service";

import {
  NSVueRouterOptions,
  RouterServiceOptions,
} from "./typings/router-service";

import { registerActionDispatcher } from "./router-dispatcher-service";

import routerMixin from "./router-mixin";

const routers = [] as RouterService[];

/**
 * Create router wrapper function
 *
 * @param {NSVueRouterOptions} vueRouterOptions Vue Router compatible options
 * @param {RouterService} routerOptions Router Service options
 * @returns {RouterService} Router Service Instance
 */
export const createRouter = (
  vueRouterOptions: NSVueRouterOptions,
  routerOptions: RouterServiceOptions = {}
) => {
  
  const vm = routerOptions.vm as Vue.App
  const globals = vm.config.globalProperties;
    const router = new RouterService(vueRouterOptions, {
      frame: Frame,
      vm: vm,
      ...routerOptions,
    });
    globals.$routeTo = router.push.bind(router);
    globals.$routeBack = router.back.bind(router);
    globals.$router = router;
    vm.provide('$router', router);
  if (vm.mixin) {
    vm.mixin(routerMixin);
  }

  registerActionDispatcher(router, vm);

  return router;
};

export const useRouter = (routerIndex = 0) => {
  return routers[routerIndex];
};

export const useRoute = (routerIndex = 0) => {
  return routers[routerIndex].getCurrentRoute();
};

export default {
  createRouter,
};
