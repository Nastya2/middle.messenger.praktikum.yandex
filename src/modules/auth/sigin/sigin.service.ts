import { url } from "../../shared/consts";
import { HTTPTransport } from "../../shared/services/http/http";

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
            localStorage.setItem("user", res.response);
        }).catch((err) => console.log(err, "err"));
    }


}


// avatar: null
// display_name: null
// email: "address11@yandex.ru"
// first_name: "Kjdjfdjf"
// id: 27214
// login: "fdfdfdf"
// phone: "89118490423"
// second_name: "Kfdjfjjf"