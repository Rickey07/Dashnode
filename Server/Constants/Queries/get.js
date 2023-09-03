// All get queries are listed here which cannot be executed with masterQuery Function

const GET_ALL_BLOGS = `SELECT b.id , b.title AS title , b.created_at AS "created_at"  , b.content , b.image_url , 
u.username , u.profile_img , u.id AS user_id ,COUNT(l.id) AS likes_count
FROM blogs AS b
LEFT JOIN users AS u ON b.user_id = u.id
LEFT JOIN likes AS l ON l.blog_id = b.id
GROUP BY b.id , u.id`;


const allGetQueries = {
    GET_ALL_BLOGS
}


module.exports = allGetQueries
