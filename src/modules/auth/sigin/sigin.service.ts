import { url } from "../../shared/consts";
import { HTTPTransport } from "../../shared/services/http/http";
import { router } from "./../../../index";

const http = new HTTPTransport();

type TsignUp = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  };

export class SignInService  {
    public signUp(data: TsignUp) {
        const options = {
            data: data,
        }

        return http.post(`${url}/auth/signup`, options).then(() => {
            this.getUser();
        }).catch((err) => console.log(err, "err"));
    }

    public getUser() {
        http.get(`${url}/auth/user`, {}).then((res) => {
            console.log(res.response);
            localStorage.setItem("user", res.response);
            router.go("/messenger");
        }).catch((err) => console.log(err, "err"));
    }


}


// avatar: null
// display_name: null
// email: "address12@yandex.ru"
// first_name: "Nastya"
// id: 315
// login: "nastya30166"
// phone: "89118472812"
// second_name: "Dementeva"
// 7825882L


// email: "address55555@yandex.ru"
// first_name: "Sss"
// login: "sss"
// password: "1234567L"
// password_repeat: "1234567L"
// phone: "89178328712"
// second_name: "Sss"

// avatar: null
// display_name: null
// email: "address55555@yandex.ru"
// first_name: "Sss"
// id: 832
// login: "sss"
// phone: "89178328712"
// second_name: "Sss"


// email: "address12221@yandex.ru"
// first_name: "Kkkkk"
// login: "kkkk"
// password: "1234567Q"
// password_repeat: "1234567Q"
// phone: "89177482921"
// second_name: "Kkkkk"
// id: 862