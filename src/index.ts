import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit-profile/edit-profile";
import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";
import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";
import Router from "./modules/routing/router";
import { ErrorPage } from "./modules/errors/error";
import { EditPasswordPage, Components as EditPasswordComponents} from "./modules/profile/edit-password/edit-password";
import authService from "./modules/auth/auth.service";
import "./styles.scss";

console.log(process.env.NODE_ENV);
window.addEventListener("DOMContentLoaded",  async () => {
    Router
    .use("/",  LoginPage, LoginComponents)
    .use("/login",  LoginPage, LoginComponents)
    .use("/sign-up",  SigInPage, SigInComponents)
    .use("/settings",  ProfilePage, ProfileComponents)
    .use("/edit-profile",  EditProfilePage, EditProfileComponents)
    .use("/edit-password",  EditPasswordPage, EditPasswordComponents)
    .use("/messenger",  ChatsPage, ChatsComponents)
    .use("/not-found",  ErrorPage, []);

    authService.getUser().then(() => {
        if (!Router.getRoute(window.location.pathname) ||  window.location.pathname === "/login"
         || window.location.pathname === "/sign-up" || window.location.pathname === "/") {
            Router.go("/messenger");
        } else {
            Router.go(window.location.pathname);
        }
        Router.start(); 
    }).catch(() => {
        Router.go("/login");
        Router.start();
    });
       
});



