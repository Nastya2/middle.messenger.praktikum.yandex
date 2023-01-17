import store from "../shared/store";
import { BASE_URL } from "../shared/consts";
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
        return http.get(`${BASE_URL}/auth/user`, {});
    }

    public changeUserInfo(data: TUser) {
        const options = {
            data
        }
        http.put(`${BASE_URL}/user/profile`, options).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public changeUserPassword(data: TUserPassword): Promise<string> {
        const options = {
            data
        }
        return http.put(`${BASE_URL}/user/password`, options);
    }

    public changeAvatar(data: FormData) {
        const options = {
            data
        }
        http.put(`${BASE_URL}/user/profile/avatar`, options).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public getAvatar(path: string): Promise<any> {
        return http.get(`${BASE_URL}/resources/${path}`, {});
    }

    public getUser() {
        return http.get(`${BASE_URL}/auth/user`, {}).then((res: TUser & TUserAvatar) => {
            store.set("user", res);
        }).catch((err) => console.log(err, "err"));
    }

}

export default new ProfileService();