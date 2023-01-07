import { BASE_URL } from "../shared/consts";
import http from "../shared/services/http/http";
import store from "../shared/store";
import  Router from "../routing/router";
import { TUser, TUserAvatar } from "modules/profile/profile.service";

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
    public logout(){
        http.post(`${BASE_URL}/auth/logout`, {}).then(()  => {
            Router.go("/");
        }).catch(() => Router.go("/"));
    }

    public signUp(data: TSignUp) {
        const options = {
            data,
        }

        http.post(`${BASE_URL}/auth/signup`, options).then(() => {
            this.getUser().then(() =>  Router.go("/messenger"));
        }).catch(() => alert("Не удалось выполнить вход. Попробуйте еще раз."));

    }

    public getUser() {
        return http.get(`${BASE_URL}/auth/user`, {}).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public login(data: TSignIn) {
        const options = {
           data,
        }
        http.post(`${BASE_URL}/auth/signin`, options).then(() => {
            this.getUser().then(() =>  Router.go("/messenger"));
        }).catch(() => alert("Не удалось выполнить вход. Попробуйте еще раз."));
        
    }


}


export default new AuthService();