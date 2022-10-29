import { getCurrentInstance, h } from "vue";

const RouterView = {
  props: {
    defaultRoute: {
      type: String,
      default: "/",
    },
    defaultRouteProps: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const globalProperties =
      getCurrentInstance()?.appContext?.config?.globalProperties;
    const defaultRoute = globalProperties.$router.getRoute(props.defaultRoute);
    if (!defaultRoute) {
      throw new Error(
        `No registered route at path "${props.defaultRoute}" found on current router`
      );
    }
    globalProperties.$router.setCurrentRoute(defaultRoute);

    return () => {
      return h("Frame",
        h(defaultRoute.component, {props: props.defaultRouteProps})
      );
    };
  },
};

export default RouterView;
