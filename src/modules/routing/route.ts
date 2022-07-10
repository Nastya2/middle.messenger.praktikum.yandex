import { Tprops } from "@types";
import { isEqual } from "../utils/isEqual";
import { renderDOM } from "../utils/renderDom";

type TpropsRoute = {
    rootQuery: string;
}

export class Route {
    private pathname: string = "";
    private blockClass: any;
    private block: any;
    private props:any;
    private propsComponent;
    constructor(pathname: string, view: any, props: TpropsRoute, propsComponent: Tprops) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
        this.propsComponent = propsComponent;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    public match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    public render() {
        if (!this.block) {
            this.block = new this.blockClass(this.propsComponent);
            console.log(this.propsComponent)
            renderDOM(this.props.rootQuery, this.block);
            return;
        }

        this.block.show();
    }
}
