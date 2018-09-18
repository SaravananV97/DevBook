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
        count: String,
        users:[{type:Schema.Types.ObjectId,
            ref:"User"}]
    },
    comments:[
        {
        cmnt:String, 
        user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        count: String,
        users:[{type:Schema.Types.ObjectId,
            ref:"User"}]
    }
        }]
});

module.exports = Posts = mongoose.model("Posts",postSchema);