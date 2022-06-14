import Component from "../../services/component";
import { compile } from "pug";
import template from "./input.tmp";
export default class Input extends Component {
    constructor(props) {
        super("div", props, props.class_wrap);
    }
    render() {
        if (!this.fn) {
            this.fn = compile(template);
        }
        return this.fn(this.props);
    }
}
//# sourceMappingURL=input.js.map