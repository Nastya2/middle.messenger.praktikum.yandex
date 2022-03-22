const express = require('express');

const app = express();
const PORT = 3000;
const root = "public";


app.use(express.static(`${root}`));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});