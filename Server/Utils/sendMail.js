const nodemailer = require('nodemailer')
const responseHandler = require('./responseHandler')

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"dashnode89@gmail.com",
        pass:"vofoifhxdhqoqhqe"
    }
})

const sendMail = (email,data,subject,res) => {
    const mailOptions = {
        from:"dashnode89@gmail.com",
        to:email,
        subject:subject,
        text:data
    }

    transporter.sendMail(mailOptions,(error,info) => {
        if(error) {
          return responseHandler(res,500,false,{},error)
        } else {
            return responseHandler(res,200,true,{},"Registration Successful Verification Code has been sent to your email")
        }
    })
    
}

module.exports = sendMail