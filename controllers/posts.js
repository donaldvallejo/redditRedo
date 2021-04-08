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

};