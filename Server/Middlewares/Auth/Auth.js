const expressJWT  = require('express-jwt');

exports.isSignedIn = expressJWT.expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    requestProperty:"auth"
})