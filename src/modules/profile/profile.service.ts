import store from "../shared/store";
import { url } from "../shared/consts";
import http from "../shared/services/http/http";


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

    public changeUserInfo(data: TUser) {
        const options = {
            data
        }
        http.put(`${url}/user/profile`, options).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public changeUserPassword(data: TUserPassword): Promise<string> {
        const options = {
            data
        }
        return http.put(`${url}/user/password`, options);
    }

    public changeAvatar(data: FormData) {
        const options = {
            data
        }
        http.put(`${url}/user/profile/avatar`, options).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public getAvatar(path: string): Promise<any> {
        return http.get(`${url}/resources/${path}`, {});
    }

    public getUser() {
        return http.get(`${url}/auth/user`, {}).then((res: TUser & TUserAvatar) => {
            store.set("user", res);
            console.log("getUser");
        }).catch((err) => console.log(err, "err"));
    }

}

export default new ProfileService();