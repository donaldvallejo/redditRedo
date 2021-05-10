const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

// INDEX
app.get('/', (req, res) => {
  var currentUser = req.user;
  // res.render('home', {});
  console.log(req.cookies);
  Post.find({}).lean().populate('author')
  .then(posts => {
      res.render('posts-index', { posts, currentUser });
      // res.render('home', {});
  }).catch(err => {
      console.log(err.message);
  })
})

// CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
    var post = new Post(req.body);
    post.author = req.user._id;
    post.save(function(err, post) {
      return res.redirect(`/`);
    });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

app.get("/posts/:id", function(req, res) {
  // LOOK UP THE POST
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('posts-show', { post })
    }).catch((err) => {
      console.log(err.message)
    })
});

// SUBREDDIT
app.get("/n/:subreddit", function (req, res) {
  var currentUser = req.user;
  Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
      .then(posts => {
          res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
          console.log(err);
      });
});
};