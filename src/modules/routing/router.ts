import { Route } from "./route";

export class Router {
    static instance: Router;
    private routes: Route[] = [];
    private history = window.history;
    private currentRoute: null | Route = null;
    private rootQuery = "";
    constructor(rootQuery: string) {
        this.rootQuery = rootQuery;
    }

    public use(pathname: string, block: any, props: any) {
        const route = new Route(pathname, block, {rootQuery: this.rootQuery}, props);
        this.routes.push(route);
        return this; 
    }

    public reset() {
        this.currentRoute = null;
        this.routes = [];
    }

    public start() {
       window.onpopstate = (event: any) => {
        this.onRoute(event.currentTarget.location.pathname);
      };
      this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string): void {
        let route = this.getRoute(pathname);
        
        if (route) {
            if (this.currentRoute) {
                this.currentRoute.leave();
            }
            this.currentRoute = route;
            route.render();
        } else {
            if (this.currentRoute) {
                this.currentRoute.leave();
            }
            route = this.getRoute("/not-found");
            this.currentRoute = route || null;
            route?.render();
        }
    }

    public go(pathname: string) {
      this.history.pushState({}, "", pathname);
      this.onRoute(pathname);
    }

    public back() {
      this.history.back();
    }

    public forward() {
       this.history.forward();
    }

    public getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router(".app");