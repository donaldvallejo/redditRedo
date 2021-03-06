const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// App Setup
const app = express();

// Set db
require('./data/reddit-db');

// Middleware
const exphbs  = require('express-handlebars');

// Use Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    } 
  
    next();
  };
  app.use(checkAuth);

require('./controllers/post.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

app.listen(3000, () => {
    console.log('Reddit Clone listening on port localhost:3000!');
});

module.exports = app;