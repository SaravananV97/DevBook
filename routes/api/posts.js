const express = require("express");
const router = express.Router();
const passport = require("passport")
const multer = require("multer");
const Post = require("../../models/posts")
//@Routes /api/posts/test
//@desc test posts page
//@access public

router.get("/test",(req,res) => {
    res.json({posts: "Done"});
})
const uploading = multer({dest: "C:\\Users\\Saravanan\\Pictures\\DevBook\\Posts\\Images"})
//@Routes /api/posts/
//@desc test create posts
//@access public

router.post("/",uploading.single("avatar"),passport.authenticate("jwt",{session: false}),(req,res) => {
    const newPost = {}
    newPost.user = req.user.id;
    if(req.file){
        newPost.image = {}
        newPost.image.path = req.file.path
        newPost.image.contentType = req.file.mimetype
    }
    if(req.body.post) newPost.post = req.body.post
    const NewPost = new Post(newPost);
    NewPost.save()
    .then((post) => res.json(post))
    .catch((err) => res.json({msg:err}))
})

//@Routes /api/posts/
//@desc test get posts
//@access protected

router.get("/:post_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findOne({_id: req.params.post_id})
    .populate("user",["name"])
    .then((post) => {
        console.log(post)
        if(post)
            res.json(post)
        else
            res.json({msg: "Post with this Id is not Found"})
    })
    .catch((err) => res.json(err));
})

//@Routes /api/posts/
//@desc test get posts
//@access public

router.delete("/:post_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findOneAndRemove({_id: req.params.post_id})
    .then((msg) => {
        res.json({msg})
    })
    .catch((err) => res.json(err));
})

module.exports = router;

