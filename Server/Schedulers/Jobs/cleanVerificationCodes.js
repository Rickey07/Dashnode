const verficationCodeModel = require('../../Models/VerificationCodes/VerificationCode');

const cleanVerficationCodes = async () => {
    try {
        const data = await verficationCodeModel.deleteVerificationCode();
        return data
    } catch (error) {
        return error
    }
}

module.exports = cleanVerficationCodes