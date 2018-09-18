const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
mongoose.connect(db,{ useNewUrlParser: true } ).then(() => {
    console.log("Successfully Connected");
}).catch((err) => {
    console.log(err.message);
})
app.use(passport.initialize());
require("./config/passport")(passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/posts",posts);
app.get("/",(req,res) => {
    res.send("Hello World");
});
app.listen(port,() => {
    console.log(`Listening on Port.. ${port}`);
});

module.exports = app