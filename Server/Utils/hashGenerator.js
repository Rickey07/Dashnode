const bcrypt = require('bcrypt');
const {PASSWORD_SALT_ROUND} = require('../Constants/Passwords/index')


const generateHash = async (plainPassword) => {
   return new Promise((resolve,reject) => {
    bcrypt.hash(plainPassword,PASSWORD_SALT_ROUND,function (err,hash) {
        if(err) {
            reject(err)
        } else {
            resolve(hash)
        }
    })
   })
}

module.exports = generateHash