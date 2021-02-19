const Friends = {
    create: {
        query: `
            INSERT INTO friends(
                creator_id,
                friend_id,
                accepted
            )
            VALUES(
                $1,
                $2,
                0
            )
            RETURNING *;
        `,
        params: [
            'creatorId',
            'friendId',
        ]
    },
    getPending: {
        query: `
            SELECT
            f.friends_id,
            u.user_id,
            u.username,
            u.first_name,
            u.last_name,
            u.email,
            f.created_at
            FROM friends f
            LEFT JOIN users u ON u.user_id = f.creator_id
            WHERE friend_id = $1
            AND accepted = 0;
        `,
    },
    accept: {
        query: `
            UPDATE friends 
            SET
            accepted = 1,
            updated_at = now()
            WHERE friend_id = $1
            AND friends_id = $2
            RETURNING *;
        `,
    },
    mine: {
        query: `
            SELECT 
            (CASE WHEN f.creator_id = $1 THEN u2.user_id ELSE u1.user_id END) AS user_id,
            (CASE WHEN f.creator_id = $1 THEN u2.username ELSE u1.username END) AS username,
            (CASE WHEN f.creator_id = $1 THEN u2.first_name ELSE u1.first_name END) AS firstName,
            (CASE WHEN f.creator_id = $1 THEN u2.last_name ELSE u1.last_name END) AS lastName,
            (CASE WHEN f.creator_id = $1 THEN u2.email ELSE u1.email END) AS email
            FROM friends f
            LEFT JOIN users u1 ON f.creator_id = u1.user_id
            LEFT JOIN users u2 ON f.friend_id = u2.user_id
            WHERE accepted = 1
            AND (creator_id = $1
            OR friend_id = $1);
        `,
        params: [
            'id',
            'id',
            'id',
        ]
    }
}

module.exports = Friends;