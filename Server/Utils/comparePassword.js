const bcrypt = require('bcrypt')

const comparePassword = (plainPassword,hashPassword) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(plainPassword,hashPassword,function (err,hash) {
            if(err) {
                reject(err)
            } else {
                resolve(hash)   
            }
        })
    })
}

module.exports = comparePassword