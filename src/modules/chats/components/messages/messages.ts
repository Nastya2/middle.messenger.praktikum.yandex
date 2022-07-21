import Component from "../../../shared/services/component";
import template from "./messages.tmp"
import { Tprops } from "@types";


export default class Messages extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
