
//import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit/edit-profile";
//import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";
import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
//import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
//import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";

import { renderDOM } from "./modules/utils/renderDom";

document.addEventListener("DOMContentLoaded", () => {
    let page;
    page = new LoginPage({...LoginComponents});
    // page = new SigInPage({...SigInComponents});

    //page = new EditProfilePage({...EditProfileComponents});

    // page = new ProfilePage({...ProfileComponents});
    // page = new ChatsPage({...ChatsComponents});
    renderDOM(".app", page);
});