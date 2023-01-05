import { url } from "../shared/consts";
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
        http.post(`${url}/auth/logout`, {}).then(()  => {
            Router.go("/");
        }).catch(() => Router.go("/"));
    }

    public signUp(data: TSignUp) {
        const options = {
            data,
        }

        http.post(`${url}/auth/signup`, options).then(() => {
            this.getUser().then(() =>  Router.go("/messenger"));
        }).catch(() => alert("Не удалось выполнить вход. Попробуйте еще раз."));

    }

    public getUser() {
        return http.get(`${url}/auth/user`, {}).then((user: TUser & TUserAvatar) => store.set("user", user));
    }

    public login(data: TSignIn) {
        const options = {
           data,
        }
        http.post(`${url}/auth/signin`, options).then(() => {
            this.getUser().then(() =>  Router.go("/messenger"));
        }).catch(() => alert("Не удалось выполнить вход. Попробуйте еще раз."));
        
    }


}


export default new AuthService();