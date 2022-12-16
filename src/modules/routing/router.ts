import { router } from "../../index";
import { Route } from "./route";
import { authService } from "../../index";

export class Router {
    static instance: Router;
    private routes: Route[] = [];
    private history = window.history;
    private currentRoute: null | Route = null;
    private rootQuery: string = "";
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
        // if(authService.checkAutorization() && (pathname === "/login" || pathname === "/sign-up")) {
        //     router.go("/not-found");
        //     return;
        // }

        // if(!authService.checkAutorization() && pathname !== "/login" && pathname !== "/sign-up" && pathname !== "/") {
        //     router.go("/not-found");
        //     return;
        // }
 
        const route = this.getRoute(pathname);
            
        if (route) {
            if (this.currentRoute) {
                this.currentRoute.leave();
            }
            this.currentRoute = route;
            route.render();
        } else {
            router.go("/not-found");
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