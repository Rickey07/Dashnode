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
`;

const GET_ALL_CONNECTIONS = `
SELECT c.id , c.status , u.username , u.profile_img , u.id , c.sender_id AS sender_id
FROM connection AS c 
JOIN users AS u ON c.receiver_id = u.id
`;

const GET_ALL_CONVERSATIONS = `
SELECT c.id , c.sender_id , u.username , u.id , profile_img
FROM conversation AS c
JOIN users AS u ON u.id = c.receiver_id
`;

const GET_ALL_CHAT_GROUPS = `
SELECT * FROM chat_groups
`

const GET_ALL_GROUP_PARTICIPANT = `
SELECT p.id , u.username , u.profile_img , u.id , 
p.chat_group_id AS chat_group_id
FROM chat_group_participants AS p
JOIN users AS u ON p.participant_id = u.id
`

const GET_ALL_MESSAGES = `
  SELECT * FROM meessages;
`

const allGetQueries = {
  GET_ALL_BLOGS,
  GET_ALL_LIKES,
  GET_ALL_COMMENTS,
  GET_ALL_CONNECTIONS,
  GET_ALL_CONVERSATIONS,
  GET_ALL_CHAT_GROUPS,
  GET_ALL_GROUP_PARTICIPANT,
  GET_ALL_MESSAGES
};

module.exports = allGetQueries;
