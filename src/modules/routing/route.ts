import { Tprops } from "@types";
import { EventBus } from "../shared/services/event-bus";
import { isEqual } from "../utils/isEqual";
import { renderDOM } from "../utils/renderDom";

type TpropsRoute = {
    rootQuery: string;
}

export enum RouterEvent {
    Leave =  "leave"
}


export class Route extends EventBus {
    private pathname = "";
    private blockClass: any;
    private block: any;
    private props:any;
    private propsComponent;
    constructor(pathname: string, view: any, props: TpropsRoute, propsComponent: Tprops) {
        super();
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
        this.propsComponent = propsComponent;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.leave();
            this.render();
        }
    }

    public leave() {
        this.block = "";
        const container = document.querySelector(".app");
        if (container) {
            container.innerHTML = "";
        }
        this.emit(RouterEvent.Leave, this.pathname);
    }

    public match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    public render() {
        if (!this.block) {
            this.block = new this.blockClass(this.propsComponent);
            renderDOM(this.props.rootQuery, this.block);
            return;
        }
    }
}
