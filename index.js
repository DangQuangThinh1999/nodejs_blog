const express = require("express");
const app = express();
const port = 3000;

app.get("/tintuc", (req, res) => {
  var a = 2;
  var b = 3;
  var c = a + b;
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
