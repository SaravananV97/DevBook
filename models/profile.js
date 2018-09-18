const mongoose = require("mongoose");
const userModel = require("./users");
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    user:{
       type: Schema.Types.ObjectId,
       ref: "User"
    },
    handle:{
        type: String,
        max: 40,
        required: true
    },
    about:{
        type:String
    },
    website:{
        type: String
    },
    location:{
        type:String
    },
    status:{
        required:true,
        type:String
    },
    position:String,
    skills:{
        type:[String],
        required:true
    },
     education:[{
         school:{
             type:String,
                required: true
            },
         degree:{
             type:String,
             required:true
         },
         field:{
             type:String,
             required:true
         },
         from:{
             type:String,
             required:true
         },    
         to:String,
         description:String
     }],
     experience:[{
        company:{
            type:String,
               required: true
           },
        location:String,
        position:{
            type:String,
            required:true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String
        },    
        description:String
    }],
     gitusername:{
         type:String
     },
     bio:{
         name: {type: String},
         age:String,
         phone: String
     },
     social:{
         linkedin:String,
         facebook:String,
         twitter:String
     }
});
module.exports = profileModel = mongoose.model("profileModel",profileSchema);
