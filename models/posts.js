const mongoose = require("mongoose");
const userModel = require("./users");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
            type:Date,
            default: new Date()
        },
    post:String,
    image:{
        path: String, contentType: String
    },
    likes:{
        count: {
            type:String,
            default: 0
        },
        users:[{type:Schema.Types.ObjectId,
            ref:"User"}]
    },
    comments:[
        {
        comment:String, 
        user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
        }]
});

module.exports = Posts = mongoose.model("Posts",postSchema);