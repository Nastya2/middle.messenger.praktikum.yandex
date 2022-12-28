import Component from "../../../shared/services/component";
import template from "./add-user.tmp";
import { Tprops } from "@types";

export default class AddUserIcon extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
