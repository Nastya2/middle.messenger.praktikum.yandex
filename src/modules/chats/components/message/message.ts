import { Tprops } from "@types";
import Component from "../../../shared/services/component";
import template from "./message.tpm"


export default class Message extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
