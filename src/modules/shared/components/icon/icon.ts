import Component from "../../services/component";
import template from "./icon.tmp";
import { Tprops } from "@types";

export default class Icon extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
