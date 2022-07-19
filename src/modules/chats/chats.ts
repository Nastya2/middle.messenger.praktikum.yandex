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
import {AddUserDialog, input_name_user, label_name_user, button_close_add_user} from "./components/add-user-dialog/add-user";
import HeaderChat from "./components/header-chat/header-chat";
import { Link } from "../shared/components/link/link";
import { router } from "../../index";

const service = new ChatsService();

export class ChatsPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

let selectedChatId = 0;
let usersOpenChat = "";

const headerChat = new HeaderChat({
    name: usersOpenChat
});

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

const button_action_add_user = new Button({
    text: 'Добавить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_user.getContent().lastChild as HTMLInputElement).value;
          const data1 = {
            login: value
          };

          service.searchUser(data1).then((res) => {
            if(res.length) {
                const data2 = {
                    users: [res[0].id],
                    chatId: selectedChatId
                };
                service.addUsersToChat(data2).then(() => getAllChatsAndUpdate);
            }
          });
        }
    },
});

const dialog = new AddChatDialog({input_name_chat, button_close, label_name_chat, button_action});
const dialog_add_user = new AddUserDialog({input_name_user, label_name_user, button_close_add_user, button_action_add_user});

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
                        // const d = dialog_add_user.getContent().lastChild as HTMLDialogElement;
                        // selectedChatId = chat.id;
                        // d?.showModal();
                        //service.getChat(chat.id).then((res) => console.log(res, "ldld"))
                        service.getUsersChat(chat.id).then((res) => {
                            usersOpenChat = res.map((user) => {
                                return user.login;
                            }).join(",");
                            headerChat.setProps({name: usersOpenChat})
                        });
                    }
                }
        })});

        chat_items.setProps({chats: all_chats});
    });
}

const linkProfile = new Link({
    text: "Профиль",
    event: {
        click: function() {
            router.go("/settings");
        }
    }
});


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
    addChatIcon,
    dialog_add_user,
    headerChat,
    linkProfile
};


