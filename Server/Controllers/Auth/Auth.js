const { masterQuery } = require("../../Utils/masterQuery");
const responseHandler = require("../../Utils/responseHandler");
const userModel = require("../../Models/User/User");
const verificationCodeModel = require("../../Models/VerificationCodes/VerificationCode");
const sendMail = require("../../Utils/sendMail");
const generateRandomCode = require("../../Utils/generateRandomCode");

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
      const user = await userModel.getUserByCondition(condition);
      if (user?.length && user[0]?.isverified) {
        return responseHandler(
          res,
          400,
          false,
          {},
          `Account Already Exists with this email!`
        );
      }

      // If there is already registered but not verified.
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
          sendMail(
            userEmail,
            `Your Verfification Code is:- ${verificationCode[0]?.code}`,
            "Verify Yourself",
            res
          );
        } else {
          // Otherwise generate a new Random Code and save it in DB and Send Via Email
          const generatedVerficationCode = generateRandomCode();
          const savedVerificationCode =
            await verificationCodeModel.saveVerificationCode(
              userEmail,
              generatedVerficationCode,
              thirty_minutes_from_now
            );
          sendMail(
            userEmail,
            `Your Verfification Code is:- ${savedVerificationCode[0]?.code}`,
            "Verify Yourself",
            res
          );
        }
      }
      // If there is no user Found
      if (user?.length === 0) {
        const data = await userModel.saveUser(req.body);
        return responseHandler(res, 200, true, data, "Success");
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
}

module.exports = new AuthController();
