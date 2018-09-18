const express = require("express");
const Profile = require("../../models/profile")
const router = express.Router()
const passport = require("passport");
//@Routes /api/profile/test
//@desc test profile page
//@access public
const isEmpty = require("../../validation/is_empty");
router.get("/test",(req,res) => {
    res.json({"profile":"Done"});
});

//@Routes /api/profile/
//@desc Delete an experience detail in user's profile
//@access protected

router.delete("/:userid",passport.authenticate("jwt",{session: false}),(req,res) => {
    Profile.findOneAndRemove({user:req.params.userid})
    .then((msg) =>{
        if(msg)
            res.json({success: true})
        else
            res.json({msg:"can't find that user"})
    })
    .catch((err) => res.json({msg: err}));
})

//@Routes /api/profile/experience/:expid
//@desc Delete an experience detail in user's profile
//@access protected
router.delete("experience/:expid",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOne({user:req.user.id})
    .then((profile) => {
        const index = profile.experience.map((exp) => exp.id).indexOf(req.params.expid)
        profile.experience.splice(index,1);
        profile.save()
        .then((prof) => {
            res.json(prof)
        })
        .catch(err => {msg: err})
    })
    .catch(err => {msg:err})
});


//@Routes /api/profile/education/:expid
//@desc Delete an education in user's profile
//@access protected

router.delete("education/:eduid",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOne({user:req.user.id})
    .then((profile) => {
        const index = profile.education.map((exp) => exp.id).indexOf(req.params.eduid)
        profile.education.splice(index,1);
        profile.save()
        .then((prof) => {
            res.json(prof)
        })
        .catch(err => {msg: err})
    })
    .catch(err => {msg:err})
});


router.post("/addeducation",passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req);
    Profile.findOne({user: req.user.id})
    .then((profile) => {
        if(profile){
        req.body.to = !isEmpty(req.body.to)?req.body.to:"";
        const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                field:req.body.field,
                from: req.body.from,
                to: req.body.to,
                description:req.body.description
            }
        console.log(profile);
        profile.education.unshift(newEducation);
        console.log(profile)
        profile.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({err,msg: "cannot save"});
        })
    }
    else{
        res.json({msg:"The profile with the given id is not found!"})
    }  
    })
    .catch((err) => {
        res.json({err,msg: "cannot add"});
    })
    
})

router.post("/addexperience",passport.authenticate("jwt",{session:false}),(req,res) => {
    console.log(req.user.id)
    Profile.findOne({user: req.user.id})
    .then((profile) => {
        if(profile){
        req.body.to = !isEmpty(req.body.to)?req.body.to:"";
        const newExperience = {
                position: req.body.position,
                company: req.body.company,
                field:req.body.field,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description
            }
        console.log(profile);
        profile.experience.unshift(newExperience);
        console.log(profile)
        profile.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({err,msg: "cannot save"});
        })
    }
    else{
        res.json({msg:"The profile with the given id is not found!"})
    }  
    })
    .catch((err) => {
        res.json({err,msg: "cannot add"});
    })
})

router.get("/all",(req,res) => {
    Profile.find().populate("user",["name"])
    .then((profiles) => {
        res.json(profiles)
    }).catch((err) => {
        res.json(err);
    });
});

router.get("/",passport.authenticate("jwt",{session: false}),(req,res) => {
    console.log(req.user.id);
    Profile.findOne({user: req.user.id}).populate("user",["name","avatar"])
    .then((profile) => {
    if(profile)
        res.json(profile)
    else
        res.json({msg:"This profile does not exist"})
    })
    .catch((err) => {
        res.json(err)
    })
})
router.get("/users/:id",passport.authenticate("jwt",{session: false}), (req,res) => {

    Profile.findOne({user : req.params.id})
    .populate("user",["name","avatar"])
    .then((profile) => {
        if(profile)
            res.json(profile);
        else
            res.status(404).json({msg: "there is no profile matching this id"})
    })
    .catch((err) => {
        res.json(err);
    })
})

router.get("/handle/:handle",passport.authenticate("jwt",{session: false}), (req,res) => {

    const handle = req.params.handle;
    Profile.findOne({handle})
    .populate("user",["name","avatar"])
    .then((profile) => {
        if(profile)
            res.json(profile);
        else
            res.status(404).json({msg: "there is no profile matching this handle"})
    })
    .catch((err) => {
        res.json(err);
    })
})


router.post("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    const {errors, isValid} = require("../../validation/profile_validation")(req.body);
    if(isValid){
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle;
    profileFields.education = req.body.education;
    profileFields.experience = req.body.experience;
    if(req.body.about) profileFields.about = req.body.about;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.about) profileFields.about = req.body.about;
    if(req.body.skills != "undefined")
        profileFields.skills = req.body.skills.split(",")
    profileFields.social = {}
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    Profile.findOne({user:req.user.id})
        .then((profile) => {
           if(profile){
                Profile.findOneAndUpdate({user:req.user.id},{ $set: profileFields}, {new: true}).then((profile) => {
                    res.json(profile)       
                });
           }
         else{
                Profile.findOne({handle:profileFields.handle})
                .then((error) =>{
                    if(error)
                        res.status(400).json({msg: "This handle already exists!"})
                    else
                        new Profile(profileFields).save().then((profile) => {
                            res.json(profile)
                        })
                })
            }
        })
    }
    else{
        res.json(errors);
    }
    });
module.exports = router;
