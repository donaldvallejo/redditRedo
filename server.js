const express = require('express');

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    console.log("hemoo")
    res.render('home')
    
})



app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});