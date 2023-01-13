import Component from "../../../shared/services/component";
import template from "./chat-item.tmp"
import { Tprops } from "@types";
import { Avatar } from "../../../shared/components/avatar/avatar";
import { BASE_URL } from "../../../shared/consts";


export default class ChatItem extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const chat_avatar = function(avatar: string | null) {
  return new Avatar({
    src_img: avatar ? `${BASE_URL}/resources/${avatar}` : "", 
    alt_img:"Аватар",
    event: {
      click: function() {
        const d = document.querySelector("#change_avatar") as HTMLDialogElement;
        d?.showModal();
      }
    }
});
}
