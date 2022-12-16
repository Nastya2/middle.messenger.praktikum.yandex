import { url } from "../../consts";
import { HTTPTransport } from "../../services/http/http";
import { router } from "../../../../index";

type TsignUp = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

type TsignIn = {
    login: string,
    password: string,
};

const http = new HTTPTransport();


export class AuthService  {
    public logout(): Promise<XMLHttpRequest> {
        return http.post(`${url}/auth/logout`, {});
    }

    public checkAutorization(): boolean {
        return !!localStorage.getItem("user_id");
    }

    public signUp(data: TsignUp) {
        const options = {
            data,
        }

        return http.post(`${url}/auth/signup`, options).then(() => {
            this.getUser();
        }).catch((err) => console.log(err, "err"));
    }

    public getUser() {
        http.get(`${url}/auth/user`, {}).then((res) => {
            localStorage.setItem("user_id", JSON.stringify(res.id));
            router.go("/messenger");
        }).catch((err) => console.log(err, "err"));
    }

    public login(data: TsignIn): Promise<any> {
        const options = {
           data,
        }
        return http.post(`${url}/auth/signin`, options).then(() => {
            this.getUser();
        }).catch((err) => console.log(err, "err"));
    }


}