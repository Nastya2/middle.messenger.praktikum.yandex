import Component from "../../../shared/services/component";
import template from "./change_avatar_dialog.tmp";
import { Tprops } from "@types";
import { Button } from "../../../shared/components/button/button";
import { Error } from "../../../shared/components/error/error";
import { AvatarUpload } from "../../../shared/components/avatar-upload/avatar-upload";

export class ChangeAvatarDialog extends Component {
  constructor(props: Tprops) {
    super(props);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const chat_avatar_upload = function() {
  return new AvatarUpload({});
}


export const button_close_change_avatar = function() {
  return new Button({
    text: 'Закрыть',
    classes: 'btn',
    event: {
        click: function(e: Event) {
          closeChangeAvatar();
          e.stopPropagation();
        }
    },
  });
}


export const error_user_delete = new Error({
  error: ""
});

export function closeChangeAvatar() {
  const d = document.querySelector("#change_avatar") as HTMLDialogElement;
  d?.close();
}


