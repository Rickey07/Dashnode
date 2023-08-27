const { v4: uuidv4 } = require("uuid");

const CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50),
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        role INT NOT NULL DEFAULT 0,
        password_hash VARCHAR(100),
        profile_img VARCHAR(255)
)`;

const CREATE_BLOGS_TABLE = `
    CREATE TABLE IF NOT EXISTS blogs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const CREATE_COMMENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        content TEXT NOT NULL,
        post_id UUID REFERENCES blogs(id),
        author_id UUID REFERENCES users(id),
        parent_comment_id UUID
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`

const CREATE_LIKES_TABLE = `
    CREATE TABLE IF NOT EXISTS likes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        blog_id UUID REFERENCES blogs(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`


module.exports = { CREATE_USERS_TABLE, CREATE_BLOGS_TABLE , CREATE_COMMENTS_TABLE , CREATE_LIKES_TABLE};
