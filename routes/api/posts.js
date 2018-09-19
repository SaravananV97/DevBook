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

//@Routes /api/posts/comment/:post_id
//@desc test create posts
//@access protected


router.post("/comment/:post_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findOne({_id:req.params.post_id})
    .then((post) => {
        if(post){
            let comment = req.body.comment;
            console.log(comment);
            let l = post.comments.length;
            post.comments[l] = {comment, user: req.user.id}
            const newPost = new Post(post);
            newPost.save()
            .then((post) => res.json(post))
            .catch((err) => res.json(err))
        }
        else
            res.status(404).json({msg: "post not found"})
    }).catch(err => res.json(err)) 
});

//@Routes /api/posts/deletecmnt/:post_id/:cmnt_id
//@desc test create posts
//@access protected


router.delete("/comment/:post_id/:cmnt_id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Post.findOne({_id:req.params.post_id})
    .then((post) => {
        if(post){
            let index = 0;
            let f = false;
            let l = post.comments.length;
            for(let i = 0; i< l; i++){
                if(post.comments[i]._id == req.params.cmnt_id){
                    index = i;
                    f = true;
                }
            }
            if(f){
                post.comments.splice(index,1);
                post.save()
                .then((post) => res.json(post))
                .catch((err) => res.json(err))
            }
            else{
                res.status(404).json({msg: "That comment not found"})
            }
        }
        else
            res.status(404).json({msg: "post not found"})
    }).catch(err => res.json(err)) 
});


//@Routes /api/posts/like/:post_id
//@desc test create posts
//@access protected

router.post("/like/:post_id",passport.authenticate("jwt",{session:false}),(req,res) => {

    Post.findOne({_id:req.params.post_id})
    .then((post) => {
        if(post){
            let l = parseInt(post.likes.count);
            if(l === 0){
                post.likes.users[l] = req.user.id;
                console.log(post.likes.users);
                post.likes.count = l + 1;
                const newPost= new Post(post);
                newPost.save()
                .then((post) => {
                    res.json(post)
                })
                .catch((err) => res.json(err)) 
            }
            else{
            let f = false
            for(let i = 0; i<l; i++){
                if( post.likes.users[i]._id == req.user.id){
                    f = true
                    break;
                }
            }
            if(f)
                res.json({msg: "user already liked the post"})   
            else{
                    post.likes.users[l] = req.user.id;
                    post.likes.count = l + 1;
                    const newPost = new Post(post);
                    newPost.save()
                    .then((post) => {
                        res.json(post)
                    })
                    .catch((err) => res.json(err)) 
                }
        }
    }
});
});


//@Routes /api/posts/like/:post_id
//@desc test create posts
//@access protected

router.post("/dislike/:post_id",passport.authenticate("jwt",{session:false}),(req,res) => {

    Post.findOne({_id:req.params.post_id})
    .then((post) => {
        if(post){
            let l = parseInt(post.likes.count);
            let f = false
            let index = 0
            for(let i = 0; i<l; i++){
                if( post.likes.users[i]._id == req.user.id){
                    f = true
                    index = i;
                    break;
                }
            }
            if(f){
                post.likes.users.splice(index, 1);
                post.likes.count = l-1;
                post.save()
                .then(post => res.json(post))
                .catch(err => res.json(err))
            }
            else{
                res.json({msg: "Not liked yet"})
        }
    }
});
});

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

