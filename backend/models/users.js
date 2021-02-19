const Users = {
    insert: {
        query: `
            INSERT INTO users(username, first_name, last_name, email, password)
            VALUES($1, $2, $3, $4, $5)
            RETURNING 
            user_id,
            username, 
            first_name, 
            last_name, 
            email;
        `,
        params: [
            'username',
            'firstName',
            'lastName',
            'email',
            'password'
        ]
    },
    getAll: {
        query: `
            SELECT 
            user_id,
            username, 
            first_name, 
            last_name, 
            email
            FROM users;
        `,
    },
    getOne: {
        query: `
            SELECT
            user_id,
            username, 
            first_name, 
            last_name, 
            email,
            FROM users
            WHERE user_id = $1;
        `,
    },
    getLogin: {
        query: `
            SELECT *
            FROM users
            WHERE email = $1;
        `,
    },
    update: {
        query: `
            UPDATE users 
            SET
            username = $1,
            first_name = $2,
            last_name = $3,
            updated_at = now()
            WHERE user_id = $4
            RETURNING 
            user_id,
            username, 
            first_name, 
            last_name, 
            email;
        `,
        params: [
            'username',
            'firstName',
            'lastName',
        ]
    },
    delete: {
        query: `
            DELETE FROM users 
            WHERE user_id = $1
            RETURNING
            user_id,
            username, 
            first_name, 
            last_name, 
            email;
        `,
        params: [
            'userId'
        ],
    }
}

module.exports = Users;