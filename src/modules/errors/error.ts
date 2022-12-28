import { Tprops } from "@types";
import Component from "../shared/services/component";
import template from "./error404.tmp";


export class ErrorPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}