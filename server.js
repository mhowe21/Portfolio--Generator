const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3030;

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(require("./routes"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Live on port: ${PORT}`));
});
