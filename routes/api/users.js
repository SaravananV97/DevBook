const express = require("express");
const User = require("../../models/users");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = require("../../config/keys").secret;
const passport = require("passport");
//@Routes /api/users/connect
//@desc test users page
//@access public
router.get("/connect", passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req);
    res.json({msg: req.user});
})

router.get("/test",(req,res) => {
    res.json({weather: "bad"})
});

//@Routes /api/users/login
//@desc test users page
//@access public

router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const {errors, isValid} = require("../../validation/login_validation")(req.body);
    if(!isValid)
        res.status(400).json({errors});
    else{
        User.findOne({email}).then((user) => {
        if(!user)
            res.status(404).json({msg:"email doesn't exists"});
        else{
            bcrypt.compare(password,user.password).then((isMatched) => { //(user_entered,db_password_hash)
                if(isMatched){
                    const payload = {id: user._id, password:user.password, name: user.name,email: user.email,avatar: user.avatar}
                    jwt.sign(payload, secretKey,{expiresIn: 24*60*60},(err,token) => {
                        res.json({success:true,
                            jwt: token});
                    } )
                }
                else{
                    res.json({msg:"Invalid password"}); //error msg
                }
            })
        }
    })
}
});

router.post("/register",(req,res) => { // url: api/users/(firstarg_to_post)
    const registerValidation = require("../../validation/register_validation");
    const {error,isValid} = registerValidation(req.body);
    if(!isValid)
        res.status(400).json(error)
    else{
    User.findOne({email: req.body.email}).then((user) => { //returns a promise with a user
        if(user)
            res.json({msg:"Email already exists.."});
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
}
})

module.exports =   router;


