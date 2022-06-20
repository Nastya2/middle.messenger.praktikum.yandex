
import { Tprops } from "@types";
import Component from "../../services/component";
import template from "./error.tmp";


export class Error extends Component {

  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment{
    return this.compile(template, this.props);
  }
}


