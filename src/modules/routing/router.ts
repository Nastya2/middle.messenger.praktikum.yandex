import { Route } from "./route";
import authService from "../auth/auth.service";

export class Router {
    static instance: Router;
    private routes: Route[] = [];
    private history = window.history;
    private currentRoute: null | Route = null;
    private rootQuery = "";
    constructor(rootQuery: string) {
        if (!Router.instance) {
            this.rootQuery = rootQuery;
            Router.instance = this;
        } 
        return Router.instance;
    }

    public use(pathname: string, block: any, props: any) {
        const route = new Route(pathname, block, {rootQuery: this.rootQuery}, props);
        this.routes.push(route);
        return this; 
    }

    public start() {
       window.onpopstate = (event: any) => {
        console.log(event.currentTarget.location.pathname, "start event");
        this.onRoute(event.currentTarget.location.pathname);
      };
      console.log(window.location.pathname, "start");
      this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string): void {
        let route = this.getRoute(pathname);
        if(authService.checkAutorization() && (pathname === "/login" || pathname === "/sign-up")) {
            route = this.getRoute("/messenger");
            window.location.href = "/messenger";
        }

        if(!authService.checkAutorization() && pathname !== "/login" && pathname !== "/sign-up" && pathname !== "/") {
            route = this.getRoute("/login");
            window.location.href = "/login";
        }
        
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