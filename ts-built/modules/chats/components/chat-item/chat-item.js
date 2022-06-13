import Component from "../../../shared/services/component";
import { compile } from "pug";
import template from "./chat-item.tmp";
export default class ChatItem extends Component {
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
//# sourceMappingURL=chat-item.js.map