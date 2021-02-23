const path = require("path")
const express = require('express');
const session = require("express-session")
const sequelize = require("sequelize");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3030

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(require("./routes"));

app.listen(PORT, () => console.log(`Live on port: ${PORT}`));


