import ChatItem from "./components/chat-item/chat-item";
import Message from "./components/message/message";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./chats.tmp";
import { ChatsService } from "./chats.service";
import ChatItems from "./components/chat-items/chat-items";
const service = new ChatsService();


export class ChatsPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

const chat_item_1 = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!1",
    time: "10:49",
    count: "5",
    event: {
        click: function() {
            console.log("click")
        }
    }
});

const chat_item_2 = new ChatItem({
    name: "Андрей",
    msg: "Друзья, у меня для вас особенный выпуск новостей!2",
    time: "10:49",
    count: "5",
    event: {
        click: function() {
            console.log("click")
        }
    }
});


let chat_items = new ChatItems({chats: [chat_item_1, chat_item_2]});

let chats: ChatItem[] = [];
service.getAllChats().then((res) => {
    res.forEach((chat) => {
        chats.push(new ChatItem({
            name: chat.title,
            msg: "Друзья, у меня для вас особенный выпуск новостей!",
            time: "10:49",
            count: chat.unread_count,
            event: {
                click: function() {
                    console.log("click")
                }
            }
        }));
    });

   setTimeout(() => chat_items.setProps({chats: chats}), 3000);
   // chat_items.setProps({chats: chats});
    console.log(chats, "c");
});



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
    chat_items
};


