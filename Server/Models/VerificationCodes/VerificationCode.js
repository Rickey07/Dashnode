const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery')

class verificationCodeModel {

   async getVerificationCodeByEmail (email) {
        try {
            const queryData = {
                where:{
                    columnName:"email",
                    value:email
                }
            }
            const query = masterQuery("get",queryData,"verificationcodes")
            const data = await executeQuery(query)
            return data
        } catch (error) {
            return error
        }
    }

    async saveVerificationCode (email,code,expiration_time) {
        try {
            const columnsWithValues = {
                email,
                code,
                expiration_time
            }
            const query = masterQuery("create",columnsWithValues,"verificationcodes")
            const data = await executeQuery(query)
            return data
        } catch (error) {
            return error
        }
    }

    async deleteVerificationCode () {
        try {
            const currentTime = new Date().getTime()
            const deletionData = {
                columnName:"expiration_time",
                operator:"<",
                value:currentTime
            }
            const query = masterQuery("delete",deletionData,"verificationcodes")
            const data = await executeQuery(query);
            return data
        } catch (error) {
            return error
        }
    }
}


module.exports = new verificationCodeModel();