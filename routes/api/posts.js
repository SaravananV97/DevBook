const express = require("express");
const router = express.Router();

//@Routes /api/posts/test
//@desc test posts page
//@access public

router.get("/test",(req,res) => {
    res.json({posts: "Done"});
})
module.exports = router;

