import { getCurrentInstance, h } from "vue";

const RouterView = {
  props: {
    defaultRoute: {
      type: String,
      default: "/app",
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
    globalProperties.$router.setCurrentRoute(defaultRoute);
    return () => {
      return h(defaultRoute.component, { props: props.defaultRouteProps });
    };
  },
};

export default RouterView;
