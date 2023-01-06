import { url } from "../shared/consts";
import http from "../shared/services/http/http";

type TCreateChat = {
    title: string;
}

type TInitChat = {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | {time: string, content:string, id: number};
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

    public changeAvatarChat(data: FormData): Promise<TInitChat & TUser> {
        const options = {
            data
        }
        return http.put(`${url}/chats/avatar`, options);
    }

    public getUsersChat(id: number): Promise<TUser[]> {
        return http.get(`${url}/chats/${id}/users`, {});
    }

    public getToken(id: number): Promise<{token: string}> {
        return http.post(`${url}/chats/token/${id}`, {});
    }

    public deleteUsers(data: {users: number[], chatId: number}): Promise<string> {
        const options = {
            data
        }
        return http.delete(`${url}/chats/users`, options);
    }
}

export default new ChatsService();