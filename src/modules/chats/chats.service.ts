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

export class ChatsService  {
    public getAllChats(): Promise<TInitChat[]> {
        return http.get(`${url}/chats`, {});
    }

    public createChat(data: TCreateChat): Promise<XMLHttpRequest> {
        const options = {
            data: {
                ...data
            }
        }
        return http.post(`${url}/chats`, options);
    }


}