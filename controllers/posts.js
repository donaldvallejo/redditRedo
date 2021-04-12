const Post = require('../models/post');

module.exports = (app) => {

app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render('posts-index', { posts });
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    console.log("req.body",req.body)
    const post = new Post(req.body);
    console.log("new post", post)
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
    //   REDIRECT TO THE ROOT
        console.log("post saved", post)
        return res.redirect(`/`);
    })
}); 

app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

};