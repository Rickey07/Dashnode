const responseHandler = (res,statusCode,status,data,message) => {
    const responseData = {
        status:status,
        statusCode:statusCode,
        message:message,
        data:data
    }
    return res.status(statusCode).json(responseData)
}


module.exports = responseHandler