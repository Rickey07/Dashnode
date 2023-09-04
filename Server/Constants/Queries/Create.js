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
`;

const CREATE_LIKES_TABLE = `
    CREATE TABLE IF NOT EXISTS likes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        blog_id UUID REFERENCES blogs(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const CREATE_VERIFICATION_CODES_TABLE = `
    CREATE TABLE IF NOT EXISTS verificationcodes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL,
        code INT NOT NULL,
        expiration_time INT NOT NULL
    )
`;

const CREATE_CONNECTIONS_TABLE = `
    CREATE TABLE IF NOT EXISTS connection (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        sender_id UUID NOT NULL
        receiver_id UUID NOT NULL
        status VARCHAR(255) DEFAULT 'Pending'
    )
`;

const CREATE_CONVERSATIONS_TABLE = `
    CREATE TABLE IF NOT EXISTS conversation (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        sender_id UUID NOT NULL,
        receiver_id UUID NOT NULL
    );
`;

const CREATE_CHAT_GROUPS_TABLE = `
    CREATE TABLE IF NOT EXISTS chat_groups (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        profile_img VARCHAR(255),
        admin UUID NOT NULL REFERENCES users(id)
    );
`

const CREATE_CHAT_GROUPS_PARTICIPANTS_TABLE = `
    CREATE TABLE IF NOT EXISTS Chat_Group_Participants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        chat_group_id UUID NOT NULL REFERENCES chat_groups(id)
    );
`

const CREATE_MESSAGES_TABLE = `
    CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        conversation_id UUID NOT NULL REFERENCES conversation(id),
        sender_id UUID NOT NULL,
        reciever_id UUID NOT NULL,
        content TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW()
    );
`

module.exports = {
  CREATE_USERS_TABLE,
  CREATE_BLOGS_TABLE,
  CREATE_COMMENTS_TABLE,
  CREATE_LIKES_TABLE,
  CREATE_VERIFICATION_CODES_TABLE,
  CREATE_CONNECTIONS_TABLE,
  CREATE_MESSAGES_TABLE,
  CREATE_CHAT_GROUPS_PARTICIPANTS_TABLE,
  CREATE_CHAT_GROUPS_TABLE,
  CREATE_CONVERSATIONS_TABLE
};
