import ChatItem from "./components/chat-item/chat-item";
import { Tprops } from "@types";
import Component from "../shared/services/component";
import tmp from "./chats.tmp";
import { ChatsService } from "./chats.service";
import ChatItems from "./components/chat-items/chat-items";
import AddChatDialog from "./components/add-chat-dialog/add-chat";
import {input_name_chat, button_close, label_name_chat} from "./components/add-chat-dialog/add-chat";
import { Button } from "../shared/components/button/button";
import {AddUserDialog, input_name_user, label_name_user, button_close_add_user, error_add_user, closeAddUser} from "./components/add-user-dialog/add-user";
import HeaderChat from "./components/header-chat/header-chat";
import { Link } from "../shared/components/link/link";
import { router } from "../../index";
import { WSTransport, WSTransportEvents } from "../shared/services/wss";
import { Input } from "../shared/components/input/input";
import Message from "./components/message/message";
import Messages from "./components/messages/messages";
import AddUserIcon from "./components/add-user/add-user";
import { DeleteUserDialog, input_name_user_delete, button_close_user_delete, label_name_user_delete, error_user_delete, closeDeleteUser } from "./components/delete-user-dialog/delete-user-dialog";
import DeleteUserIcon from "./components/delete-user/delete-user";
import Icon from "../shared/components/icon/icon";


const service = new ChatsService();

export class ChatsPage extends Component {
    constructor(props: Tprops) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

let usersOpenChat = "";
let infoUsersOpenChat: {login: string, user_id: number}[];
let chat_id_active: number | null = null;
let chat_items = new ChatItems({chats: []});
let chats_id: number[] = [];
let sockets: {socket: WSTransport, chat_id: number, messages: Message[]}[] = [];
let chats_token:{token: string, chat_id: number}[] = [];

const linkProfile = new Link({
    text: "Профиль",
    event: {
        click: function() {
            router.go("/settings");
        }
    }
});

const addChatIcon = new Icon({
    event: {
        click: function() {
            const d = dialog_add_chat.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    },
    classes: "add_chat"
});

const input_msg = new Input({
    text: "Сообщение",
    input_type: "text",
    input_name:"msg",
    event: {
        change: function() {
            const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
            updateInputMsg(msg);
        }
    }
});

function updateInputMsg(value: string): void {
    input_msg.setProps({ 
        text: "Сообщение",
        input_type: "text",
        input_name:"msg",
        value: value,
        event: {
            change: function() {
                const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
                updateInputMsg(msg);
            }
        }
    });
}

const btnSubmit = new Button({
    text: 'Отправить',
    classes: 'btn',
    event: {
        click: function() {
            const msg = (input_msg.getContent().lastChild as HTMLInputElement).value;
            const socket_active = sockets.find((socket) => socket.chat_id === chat_id_active);

            if (socket_active && msg) {
                socket_active.socket.send(msg, "message");
                updateInputMsg("");
            }
            
        }
    },

});

const all_messages = new Messages({messages: []});

const add_user_icon = new AddUserIcon({
    event: {
        click: function() {
            const d = dialog_add_user.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    }
});

const delete_user_icon = new DeleteUserIcon({
    event: {
        click: function() {
            const d = dialog_delete_user.getContent().lastChild as HTMLDialogElement;
            d?.showModal();
        }
    }
});

const headerChat = new HeaderChat({
    name: usersOpenChat,
    input_msg,
    btnSubmit,
    all_messages,
    add_user_icon,
    delete_user_icon
});

function updateHeaderChat(): void {
    headerChat.setProps({
        name: usersOpenChat,
        input_msg,
        btnSubmit,
        all_messages,
        add_user_icon,
        delete_user_icon
    });

    setScrollPosition();
}

const button_action_add_chat = new Button({
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
            if(res.length && chat_id_active) {
                const data2 = {
                    users: [res[0].id],
                    chatId: chat_id_active
                };
                service.addUsersToChat(data2).then(() => getUsersChatAndUpdate(data2.chatId, true));
            } else {
                error_add_user.setProps({error: "Пользователь не найден"});
                setTimeout(() => error_add_user.setProps({error: ""}), 2000);
            }
          });
        }
    },
});

const button_action_user_delete = new Button({
    text: 'Удалить',
    classes: 'btn',
    event: {
        click: function() {
          const value = (input_name_user_delete.getContent().lastChild as HTMLInputElement).value;
          const user = infoUsersOpenChat.find((user) => user.login.trim() === value);
          if (user && chat_id_active) {
            const data = {users: [user.user_id], chatId: chat_id_active}
            service.deleteUsers(data).then(() => {
                if (chat_id_active) {
                    getUsersChatAndUpdate(chat_id_active);
                    closeDeleteUser();
                }
            });
          } else {
            error_user_delete.setProps({error: "Пользователь не найден"});
            setTimeout(() => error_user_delete.setProps({error: ""}), 2000);
          }
         
        }
    },
});

const dialog_add_chat = new AddChatDialog({input_name_chat, button_close, label_name_chat, button_action_add_chat});
const dialog_add_user = new AddUserDialog({error_add_user, input_name_user, label_name_user, button_close_add_user, button_action_add_user});
const dialog_delete_user = new DeleteUserDialog({error_user_delete, input_name_user_delete, label_name_user_delete, button_close_user_delete, button_action_user_delete});


function getAllChatsAndUpdate() {
    service.getAllChats().then((chats) => {
        chats_id = chats.map((chat) => chat.id);

       const all_chats = chats.map((chat) => {
            return new ChatItem({
                name: chat.title,
                msg: chat.last_message,
                time: "10:49",
                count: chat.unread_count,
                event: {
                    click: function() {
                        chat_id_active = chat.id;
                        getUsersChatAndUpdate(chat.id);
                        updateChat();
                    }
                }
        })});

        chat_items.setProps({chats: all_chats});
        getTokenChat();
    });
}

function updateChat(): void {
    const active_msg = sockets.find((msg) => msg.chat_id === chat_id_active);
    console.log(active_msg)
    if (active_msg) {
        all_messages.setProps({messages: [...active_msg.messages]});
        updateHeaderChat();
    }
}


function getUsersChatAndUpdate(chat_id: number, add_user?: boolean): void {
    service.getUsersChat(chat_id).then((res) => {
        infoUsersOpenChat = res.map((user) => ({login: user.login, user_id: user.id}));
        usersOpenChat = res.map((user) => {
            return user.login;
        }).join(",");
        updateHeaderChat();
        if (add_user) {
            closeAddUser();
        }
    });
}

function getTokenChat(): void {
    let promise: Promise<{token: string, chat_id: number}>[] = [];
    chats_id.forEach((id) => {
        promise.push(service.getToken(id).then((res) => {
            return {
                chat_id: id,
                token: res.token
            }
        }));
    });

    Promise.all(promise).then((res) => {
        chats_token = res;
        connectSockets();
    })
}

function connectSockets() {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
        chats_token.forEach((token) => {
            if(sockets.find((s) => s.chat_id === token.chat_id)) {
                return;
            }
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user_id}/${token.chat_id}/${token.token}`, token.chat_id);
            socket.connect().then(() => {
                sockets.push({socket: socket, chat_id: token.chat_id, messages: []});
                subSocket(socket);
            });
        });
    }
}

function subSocket(socket: WSTransport) {
    const socketMessage = sockets.find((soc) => soc.chat_id === socket.id);
        socket.on(WSTransportEvents.Message, (data: any) => {
            console.log(data, "kdkdk")
            if (Array.isArray(data)) {
                data.reverse();
                data.forEach((d) => {
                    if (socketMessage) {
                        socketMessage.messages.push(createMsg(d));
                    }
                });
            } else {
                if (socketMessage) {
                    socketMessage.messages.push(createMsg(data));
                }
            }
    
            updateChat();
        });
}


function createMsg(data: {user_id: number, time: string, content: string}): Message {
    if(String(data.user_id) === localStorage.getItem("user_id")) {
        return new Message({
            text: data.content,
            time: new Date(Date.parse(data.time)),
            class_position: "msg_from"
        });
    } else {
       return new Message({
            text: data.content,
            time: new Date(Date.parse(data.time)),
            class_position: "msg_to"
        });
    }
}

if(window.location.pathname === "/messenger" && service.checkAutorization()) {
    getAllChatsAndUpdate(); 
}


function setScrollPosition():void {
    const block_msgs = document.querySelector(".right-chats__msg");
    if (block_msgs) {
        block_msgs.scrollTop = block_msgs.scrollHeight;
    }
}

export const Components = {
    chat_items,
    dialog_add_chat,
    addChatIcon,
    dialog_add_user,
    headerChat,
    linkProfile,
    dialog_delete_user
};



