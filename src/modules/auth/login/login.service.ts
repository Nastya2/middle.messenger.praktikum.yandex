import { url } from "../../shared/consts";
import { HTTPTransport } from "../../shared/services/http/http";

const http = new HTTPTransport();

type Tsigin = {
    login: string,
    password: string,
  };

export class LoginService  {
    public login(data: Tsigin): Promise<XMLHttpRequest> {
        const options = {
           data,
        }
        return http.post(`${url}/auth/sigin`, options);
    }


}
