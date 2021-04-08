const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// App Setup
const app = express();

// Set db
require('./data/reddit-db');

// Middleware
const exphbs  = require('express-handlebars');

// Use Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Add after body parser initialization!
app.use(expressValidator());

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

require('./controllers/posts.js')(app);

app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});