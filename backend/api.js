const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5050;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: `No masters, no gods, no limits! Karpet Merah website is up and running on port ${port}! 🚀`,
  });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(
    `No masters, no gods, no limits! Karpet Merah website is up and running on port ${port}! 🚀`
  );
});
