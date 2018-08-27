const express = require("express");

const router = express.Router();

//@Routes /api/users/test
//@desc test users page
//@access public

router.get("/test",(req,res) => {
    res.json({weather: "bad"})
});

module.exports = router;


