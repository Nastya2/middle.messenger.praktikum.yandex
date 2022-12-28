import Component from "../../../shared/services/component";
import template from "./chat-items.tmp"
import { Tprops } from "@types";


export default class ChatItems extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
