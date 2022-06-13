import Component from "../../services/component";
import { compile } from "pug";
import template from "./button.tmp";
export default class Button extends Component {
    constructor(props) {
        super("div", props);
    }
    render() {
        if (!this.fn) {
            this.fn = compile(template);
        }
        return this.fn(this.props);
    }
}
//# sourceMappingURL=button.js.map