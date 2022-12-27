import { url } from "../shared/consts";
import http from "../shared/services/http/http";
import store, { StoreEvent } from "../shared/store";
import { TUser, TUserAvatar } from "../profile/profile.service";

type TSignUp = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

type TSignIn = {
    login: string,
    password: string,
};


export class AuthService  {
    public logout(): Promise<XMLHttpRequest> {
        return http.post(`${url}/auth/logout`, {});
    }

    public checkAutorization(): boolean {
        return !!localStorage.getItem("user_id");
    }

    public signUp(data: TSignUp) {
        const options = {
            data,
        }

        return http.post(`${url}/auth/signup`, options).then(() => {
            return this.getUser();
        }).catch((err) => console.log(err, "err"));
    }

    public getUser() {
        return http.get(`${url}/auth/user`, {}).then((res: TUser & TUserAvatar) => {
            store.set("user", res);
            localStorage.setItem("user_id", JSON.stringify(res.id));
        }).catch((err) => console.log(err, "err"));
    }

    public login(data: TSignIn): Promise<any> {
        const options = {
           data,
        }
        return http.post(`${url}/auth/signin`, options).then(() => {
            store.on(StoreEvent.Updated, () => console.log(store.getState()));
            return this.getUser();
        }).catch((err) => console.log(err, "err"));
    }


}


export default new AuthService();