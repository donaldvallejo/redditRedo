const express = require('express');

// App Setup
const app = express();
require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

// Middleware
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    console.log("hemoo")
    res.render('home')

})

app.get('/posts/new', (req, res) => {
    console.log('posts new test')
    res.render('posts-new')
})


app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});