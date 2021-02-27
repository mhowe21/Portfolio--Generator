const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars'
}));

app.set('view engine', 'handlebars');

// configure a request handler
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3030, () => {
    console.log('The web server has started on port 3030');
});

