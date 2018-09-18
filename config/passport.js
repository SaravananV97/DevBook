const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("mongoose").model("User");
const keys = require("../config/keys");
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secret;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, callback) => {
    User.findById(jwt_payload.id)
    .then((user) => {
        if(!user)
          return callback(null,false)
        else
            return callback(null,user)
    })
    .catch(err => console.log(err)); 
    }))

}







