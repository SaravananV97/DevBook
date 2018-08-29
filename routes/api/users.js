const express = require("express");
const User = require("../../models/users");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//@Routes /api/users/test
//@desc test users page
//@access public
router.get("/test",(req,res) => {
    res.json({weather: "bad"})
});

router.post("/register",(req,res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user)
            res.json({msg:"Email already exists.."}).status(400);
        else{
            const avatar = gravatar.url(req.body.email,{s:200, r: "x",d: "mm"})
            const user = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                avatar
            });
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(user.password,salt,(err,hash) => {
                    if(err)
                        throw err;
                    user.password = hash;
                    user.save()
                    .then(user => res.json(user))
                    .catch(error => console.log(error))
                })
            })
        }
    });

})

module.exports =   router;


