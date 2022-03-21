const express = require('express');

const app = express();
const PORT = 3000;

const root = "public";

app.use(express.static(`${root}`));
app.use(`/auth`, express.static(`${root}`));
app.use(`/sigin`, express.static(`${root}/pages/home/modules/auth/sigin/sigin.html`));
app.use(`/profile`, express.static(`${root}/pages/home/modules/profile/profile.html`));
app.use(`/profile/edit`, express.static(`${root}/pages/home/modules/profile/edit-profile.html`));
app.use(`/profile/edit-password`, express.static(`${root}/pages/home/modules/profile/edit-password.html`));
app.use(`/chats`, express.static(`${root}/pages/home/modules/chats/chats.html`));
app.use(`/error404`, express.static(`${root}/pages/home/modules/errors/error404.html`));
app.use(`/error500`, express.static(`${root}/pages/home/modules/errors/error500.html`));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 