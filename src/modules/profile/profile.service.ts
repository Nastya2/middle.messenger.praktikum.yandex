import { url } from "../shared/consts";
import { HTTPTransport } from "../shared/services/http/http";

const http = new HTTPTransport();

type TUserPassword = {
    oldPassword: string;
    newPassword: string;
}

export type TUser = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export type TUserAvatar = {
    avatar: string;
}

export class ProfileService  {
    public getUserInfo(): Promise<TUser & TUserAvatar> {
        return http.get(`${url}/auth/user`, {});
    }

    public changeUserInfo(data: TUser): Promise<TUser & TUserAvatar> {
        const options = {
            data
        }
        return http.put(`${url}/user/profile`, options);
    }

    public changeUserPassword(data: TUserPassword): Promise<string> {
        const options = {
            data
        }
        return http.put(`${url}/user/password`, options);
    }

}