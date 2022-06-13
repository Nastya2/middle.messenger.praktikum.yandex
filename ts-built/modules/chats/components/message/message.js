import Component from "../../../shared/services/component";
import { compile } from "pug";
import template from "./message.tpm";
export default class Message extends Component {
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
//# sourceMappingURL=message.js.map