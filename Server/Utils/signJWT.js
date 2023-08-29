const jwt = require('jsonwebtoken')

const signJWT = (data) => {
    return new Promise((resolve,reject) => {
        jwt.sign({id:data},process.env.JWT_SECRET,{expiresIn:"48h"},function (err,token) {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = signJWT