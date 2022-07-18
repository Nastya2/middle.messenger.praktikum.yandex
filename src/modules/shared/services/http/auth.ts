import { url } from "../../consts";
import { HTTPTransport } from "../../services/http/http";

const http = new HTTPTransport();


export class AuthService  {
    public logout(): Promise<XMLHttpRequest> {
        return http.post(`${url}/auth/logout`, {});
    }


}
