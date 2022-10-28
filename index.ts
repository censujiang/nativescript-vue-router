import { createRouter, useRouter, useRoute } from "./vue-router.common";
import RouterView from "./router-view";
//export { Route, RouteOptions, RouterServiceOptions } from "./typings/router-service";

function withRouterView(app) {
  app.component("router-view", RouterView);
}

export { createRouter, useRouter, useRoute, RouterView, withRouterView };
