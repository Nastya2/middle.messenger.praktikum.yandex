import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit-profile/edit-profile";
import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";
import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";
import { Router } from "./modules/routing/router";
import { AuthService } from "./modules/shared/services/http/auth";
import { ErrorPage } from "./modules/errors/error";

export const authService = new AuthService();

export const router = new Router(".app")
.use("/",  LoginPage, LoginComponents)
.use("/login",  LoginPage, LoginComponents)
.use("/sign-up",  SigInPage, SigInComponents)
.use("/settings",  ProfilePage, ProfileComponents)
.use("/edit-profile",  EditProfilePage, EditProfileComponents)
.use("/messenger",  ChatsPage, ChatsComponents)
.use("/not-found",  ErrorPage, []);


router.start();



