import Component from "../../../shared/services/component";
import template from "./add-chat.tmp";
import { Tprops } from "@types";

export default class AddChatIcon extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
