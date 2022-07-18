import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit/edit-profile";
import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";
import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";
import { Router } from "./modules/routing/router";
import { AuthService } from "./modules/shared/services/http/auth";

export const authService = new AuthService();

export const router = new Router(".app")
.use("/",  LoginPage, LoginComponents)
.use("/login",  LoginPage, LoginComponents)
.use("/sign-up",  SigInPage, SigInComponents)
.use("/settings",  ProfilePage, ProfileComponents)
.use("/edit-profile",  EditProfilePage, EditProfileComponents)
.use("/messenger",  ChatsPage, ChatsComponents);

// export const router = new Router(".app")
// .use("/messenger",  ChatsPage, ChatsComponents);

router.start();


