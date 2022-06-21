import { EditProfilePage, Components as EditProfileComponents } from "./modules/profile/edit/edit-profile";
import { SigInPage, Components as SigInComponents } from "./modules/auth/sigin/sigin";
import { LoginPage, Components as LoginComponents} from "./modules/auth/login/login";
import { ChatsPage, Components as ChatsComponents } from "./modules/chats/chats";
import { ProfilePage, Components as ProfileComponents} from "./modules/profile/profile";

import { renderDOM } from "./modules/utils/renderDom";
import Component from "./modules/shared/services/component";

document.addEventListener("DOMContentLoaded", () => {
    let page: Component;
    switch(document.location.pathname) {
        case "/login":
            page = new LoginPage({...LoginComponents});
            break;
        case "/sigin":
            page = new SigInPage({...SigInComponents});
            break;
        case "/chats":
            page = new ChatsPage({...ChatsComponents});
            break;
        case "/profile":
            page = new ProfilePage({...ProfileComponents});
            break;
        case "/edit-profile":
            page = new EditProfilePage({...EditProfileComponents});
            break;
        default:
            page = new LoginPage({...LoginComponents});
    }

    renderDOM(".app", page);
});
