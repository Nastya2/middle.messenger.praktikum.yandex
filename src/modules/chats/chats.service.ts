import { url } from "../shared/consts";
import { HTTPTransport } from "../shared/services/http/http";

const http = new HTTPTransport();

type TCreateChat = {
    title: string;
}

type TInitChat = {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | string;
    title: string;
    unread_count: number;
}

type TUser = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  }

export class ChatsService  {
    public getAllChats(): Promise<TInitChat[]> {
        return http.get(`${url}/chats`, {});
    }

    public createChat(data: TCreateChat): Promise<XMLHttpRequest> {
        const options = {
            data
        }
        return http.post(`${url}/chats`, options);
    }

    public getChat(id: number): Promise<XMLHttpRequest> {
        return http.get(`${url}/chats/${id}/common`, {});
    }

    public searchUser(data: {login: string}): Promise<TUser[]> {
        const options = {
            data
        }
        return http.post(`${url}/user/search`, options);
    }

    public addUsersToChat(data: {users: number[], chatId: number}): Promise<string> {
        const options = {
            data
        }
        return http.put(`${url}/chats/users`, options);
    }

    public getUsersChat(id: number): Promise<TUser[]> {
        return http.get(`${url}/chats/${id}/users`, {});
    }


}