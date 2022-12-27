import { Tprops } from "@types";
import Component from "../../services/component";

import template from "./avatar-upload.tmp"


export class AvatarUpload extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


