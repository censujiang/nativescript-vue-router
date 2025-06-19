import {
    RouterOptions,
    NavigationGuardNext,
} from 'vue-router';

type TargetFrame = string | Frame;

export interface NavigationEntryVue extends NavigationEntry {
    props?: Record<string, any>,
    frame?: TargetFrame,
    resolveOnEvent?: "navigatingTo" | "navigatedTo" | string
}

export type RouteChildren = Route;
export type ErrorCallback = Error | ((...args: any[]) => void);

export type RoutesList = Route[];

export type RouteToCallback = (toRouteItem: Route, options: RouteOptions) => void;

export type RouteBackCallback = (toRouteItem: Route, options: RouteOptions) => void;

export type NSVueRouterHistory = Array<Route['path']>;

export interface NSVueRouterOptions extends RouterOptions {
    routes: RoutesList;
    history?: string;
}

export interface RouteOptions extends NavigationEntryVue {
    /**
     * List of route meta information
     * Can contain a store object with action names as keys and payload as values.
     * These actions will be dispatched once a particular route is navigated to
     */
    meta?: Record<string, any>;
    transition?: any
    context?: any
    clearHistory?:boolean
}

export interface Route extends RouteOptions {
    path: string;
    name?: RouteRecordName | null | undefined;
    component?: Component;
    children?: RouteChildren[];

    beforeEnter?: (to: Route, from: Route, next?: NavigationGuardNext) => void;
}

export interface RouterServiceOptions {
    /**
     * Callback triggered when routeTo/push is invoked
     */
    routeToCallback?: RouteToCallback;

    /**
     * Callback triggered when routeBack/back is invoked
     */
    routeBackCallback?: RouteBackCallback;

    /**
     * Vue Instance
     */
    vm?: any;

    /**
     * NS Frame Instance
     */
    frame?: any;

    /**
     * Path to a route used as a fallback (default route), when user tries to navigate back but no path exists
     */
    routeBackFallbackPath?: string;

    /**
     * Custom logger instance (console by default)
     */
    logger?: Logger | Console | null;
}