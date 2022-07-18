import ChatItem from "./components/chat-item/chat-item";
//import Message from "./components/message/message";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./chats.tmp";
import { ChatsService } from "./chats.service";
import ChatItems from "./components/chat-items/chat-items";
import AddChatDialog from "./components/add-chat-dialog/add-chat";
import AddChatIcon from "./components/add-chat/add-chat";
import {input_name_chat, button_close, label_name_chat} from "./components/add-chat-dialog/add-chat";
import { Button } from "../shared/components/button/button";

const service = new ChatsService();

export class ChatsPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

export const button_action = new Button({
    text: 'Добавить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_chat.getContent().lastChild as HTMLInputElement).value;
          const data = {
            title: value
          }
          service.createChat(data).then(() => getAllChatsAndUpdate());
        }
    },
});

const dialog = new AddChatDialog({input_name_chat, button_close, label_name_chat, button_action});

const addChatIcon = new AddChatIcon({
    event: {
        click: function() {
            const d = dialog.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    }
});

let chat_items = new ChatItems({chats: []});

function getAllChatsAndUpdate() {
    service.getAllChats().then((chats) => {
       const all_chats = chats.map((chat) => {
            return new ChatItem({
                name: chat.title,
                msg: chat.last_message,
                time: "10:49",
                count: chat.unread_count,
                event: {
                    click: function() {
                        console.log("click")
                    }
                }
        })});

        chat_items.setProps({chats: all_chats});
    });
}


getAllChatsAndUpdate();
//chats = [chat_item_1,chat_item_2 ];

// const chat_item_3 = new ChatItem({
//     name: "Андрей",
//     msg: "Друзья, у меня для вас особенный выпуск новостей!",
//     time: "10:49",
//     count: "5",
//     event: {
//         click: function() {
//             console.log("click")
//         }
//     }
// });

// const msg_to_1 = new Message({
//     text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
//     time: "10:49",
//     class_position: "msg_from"
// });

// const msg_to_2 = new Message({
//     text: "Привет!",
//     time: "14:49",
//     class_position: "msg_to"
// });

// const msg_from_1 = new Message({
//     text: "Привет! Как дела?",
//     time: "15:49",
//     class_position: "msg_from"
// });

// const msg_from_2 = new Message({
//     text: "Ау!",
//     time: "15:58",
//     class_position: "msg_to"
// });

export const Components = {
    chat_items,
    dialog,
    addChatIcon
};


