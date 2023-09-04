const { masterQuery } = require("../../Utils/masterQuery");
const responseHandler = require("../../Utils/responseHandler");
const userModel = require("../../Models/User/User");
const verificationCodeModel = require("../../Models/VerificationCodes/VerificationCode");
const sendMail = require("../../Utils/sendMail");
const generateRandomCode = require("../../Utils/generateRandomCode");
const generateHash = require('../../Utils/hashGenerator')
const comparePassword = require('../../Utils/comparePassword');
const signJWT = require("../../Utils/signJWT");

class AuthController {
  async signUp(req, res) {
    const userEmail = req.body.email;
    const condition = {
      where: {
        columnName: "email",
        value: userEmail,
      },
    };
    try {
      // Check if user already exists in the Database
      const user = await userModel.getUserByCondition(condition);

      // If there is user and it is already verified and registered
      if (user?.length && user[0]?.isverified) {
        return responseHandler(
          res,
          400,
          false,
          {},
          `Account Already Exists with this email!`
        );
      }

      // If user is already registered but not verified.
      if (user?.length && user[0]?.isverified === false) {
        const verificationCode =
          await verificationCodeModel.getVerificationCodeByEmail(userEmail);
        const currentTime = new Date().getTime();
        const thirty_minutes_from_now = currentTime + 30 * 60 * 1000;
        // Check if he has made any previous request within 30 minutes
        if (
          verificationCode?.length &&
          verificationCode[0]?.expiration_time > currentTime
        ) {
          const message = `Your Verfification Code is:- ${verificationCode[0]?.code}. Code is valid for 30 minutes.`;
          sendMail(userEmail, message, "Verify Yourself", res);
        } else {
          // Otherwise generate a new Random Code and save it in DB and Send Via Email
          const generatedVerficationCode = generateRandomCode();
          const savedVerificationCode =
            await verificationCodeModel.saveVerificationCode(
              userEmail,
              generatedVerficationCode,
              thirty_minutes_from_now
            );
          const message = `Your Verfification Code is:- ${savedVerificationCode[0]?.code}. Code is valid for 30 minutes.`;
          sendMail(userEmail, message, "Verify Yourself", res);
        }
      }
      // If there is no user Found then save it in the database and send the verification code
      if (user?.length === 0) {
        // Hash the password
        const hashPassword = await generateHash(req.body.password_hash)
        req.body.password_hash = hashPassword
        const data = await userModel.saveUser(req.body);
        if (data?.rows?.length) {
          const generatedVerficationCode = generateRandomCode();
          const savedVerificationCode =
            await verificationCodeModel.saveVerificationCode(
              userEmail,
              generatedVerficationCode,
              thirty_minutes_from_now
            );
          const message = `Your Verfification Code is:- ${savedVerificationCode[0]?.code}. Code is valid for 30 minutes.`;
          sendMail(userEmail, message, "Verify Yourself", res);
        }
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured"
      );
    }
  }

  async verifyRegisteredUser(req, res) {
    const { email, code } = req.body;
    try {
      const registeredUser = await verificationCodeModel.getVerificationCodeByEmail(
        email
      );
      const isCodeValid = code === registeredUser[0]?.code
      if (!registeredUser?.length) {
        return responseHandler(
          res,
          400,
          false,
          {},
          "No User Found with this email"
        );
      }

      if (registeredUser?.length && isCodeValid) {
        
        const conditionsForUpdate = {
          dataForUpdate: {
            isverified: true,
          },
          conditions: {
            columnName: "email",
            operator: "=",
            value: email,
          },
        };
        const updatedUser = await userModel.updateUser(conditionsForUpdate);
        return responseHandler(
          res,
          200,
          true,
          updatedUser,
          "Verfication Successful"
        );
      }

      if (!isCodeValid) {
        return responseHandler(res, 403, false, {}, "Invalid Code");
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured"
      );
    }
  }

  async loginUser(req,res) {
    const {email:userEmail,password} = req.body
    try {
      const condition = {
        where:{
          columnName:"email",
          value:userEmail
        }
      }
      const user = await userModel.getUserByCondition(condition)
      if(!user?.length) {
        const message = "Account does not exists with email ID"
        return responseHandler(
          res,
          403,
          false,
          {},
          message
        );
      }
      
      const isUser = await comparePassword(password,user[0]?.password_hash)
      if(!isUser) {
        return responseHandler(
          res,
          403,
          false,
          {},
          "Incorrect Credentials!"
        );
      }
      
      const token = await signJWT(user[0].id)
      const {email,first_name,last_name,username} = user[0]
      const data = {
        token,
        userDetails:{
          email,
          first_name,
          last_name,
          username
        }
      }
      return responseHandler(
        res,
        200,
        true,
        data,
        "Login Success"
      );
      
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured"
      );
    }
  }
}

module.exports = new AuthController();
