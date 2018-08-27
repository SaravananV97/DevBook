const express = require("express");

const router = express.Router()

//@Routes /api/profile/test
//@desc test profile page
//@access public


router.get("/test",(req,res) => {

    res.json({"profile":"Done"});

})

module.exports =  router;




