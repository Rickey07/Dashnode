// All get queries are listed here which cannot be executed with masterQuery Function

const GET_ALL_BLOGS = `SELECT b.id , b.title AS title , b.created_at AS "created_at"  , b.content , b.image_url , 
u.username , u.profile_img , u.id AS user_id ,COUNT(l.id) AS likes_count
FROM blogs AS b
LEFT JOIN users AS u ON b.user_id = u.id
LEFT JOIN likes AS l ON l.blog_id = b.id
GROUP BY b.id , u.id ,l.user_id`;


const GET_ALL_LIKES = `
SELECT 
l.id , l.user_id , l.created_at , 
l.blog_id AS blog_id , u.username , u.profile_img 
FROM likes AS l
JOIN users AS u ON l.user_id = u.id
`;

const GET_ALL_COMMENTS = `
SELECT 
	c.content , c.created_at , c.author_id , 
	c.parent_comment_id , u.username , u.profile_img
FROM comments AS c
JOIN users AS u ON u.id = c.author_id
`

const allGetQueries = {
    GET_ALL_BLOGS,
    GET_ALL_LIKES,
    GET_ALL_COMMENTS
}


module.exports = allGetQueries
