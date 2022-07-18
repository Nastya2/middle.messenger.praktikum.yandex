import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit/edit-profile";
import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";

import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";

import { Router } from "./modules/routing/router";


export const router = new Router(".app")
.use("/",  LoginPage, LoginComponents)
.use("/login",  LoginPage, LoginComponents)
.use("/sigin",  SigInPage, SigInComponents)
.use("/profile",  ProfilePage, ProfileComponents)
.use("/edit-profile",  EditProfilePage, EditProfileComponents)
.use("/messenger",  ChatsPage, ChatsComponents);

// export const router = new Router(".app")
// .use("/messenger",  ChatsPage, ChatsComponents);

router.start();


