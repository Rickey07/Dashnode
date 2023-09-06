const Like = require('../../Models/Likes/Like')
const responseHandler = require('../../Utils/responseHandler')
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const { GET_ALL_LIKES } = require('../../Constants/Queries/get');

class LikesController {

    async getLikes (req,res) {
        try {
            const {filtering} = req.query
            let query = GET_ALL_LIKES
            if(filtering.length) {
                const whereQuery = parseFilteringToQuery(` WHERE`,filtering)
                query+=whereQuery
            }
            const result = await Like.getLikes(query)
            if(result?.detail) {
                return responseHandler(res,403,false,{},result?.detail)
            } else {
                return responseHandler(res,200,true,result,"Likes Fetch Success!")
            }
            
        } catch (error) {
            return responseHandler(
                res,
                500,
                false,
                {},
                "Internal Server Error Occured!"
              );
        }
    }

    async createLike (req,res) {
        try {
            const data = {
                "blog_id":req.params.blog_id,
                ...req.body
            }
            const result = await Like.createLike(data)
            if(result?.detail) {
                return responseHandler(res,403,false,{},result?.detail)
            } else {
                return responseHandler(res,200,true,result,"Post Liked Successfull")
            }
        } catch (error) {
            return responseHandler(
                res,
                500,
                false,
                {},
                "Internal Server Error Occured!"
              );
        }
  
    }

    async deleteLike (req,res) {
        try {
            const data = {
                columnName:"id",
                operator:"=",
                value:req.params.id
            }
            const result = await Like.deleteLike(data)
            if(result?.detail) {
                return responseHandler(res,403,false,{},result?.detail)
            } else {
                return responseHandler(res,200,true,result,"Post DisLiked!")
            }
        } catch (error) {
            return responseHandler(
                res,
                500,
                false,
                {},
                "Internal Server Error Occured!"
              );
        }
    }

}


module.exports = new LikesController()