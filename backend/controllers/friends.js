const DB = require('../util/db');
const Friend = require('../models/friends');

const create = async (req, res) => {
    if (req.error) return res.status(403).json({
        success: false,
        msg: error.message,
        data: {error}
    })
    if (!req.user) return res.status(403).json({
        success: false,
        msg: 'You must be logged in to get this data',
        data: {}
    });
    try {
        let queryParams = [req.user.id, req.params.id]
        const friendReq = await DB.query(Friend.create.query, queryParams);
        res.json({
            success: true,
            msg: 'Friend request sent',
            data: {
                friendReq: friendReq.rows,
            }
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            success: false,
            msg: 'Something went wrong',
            data: {}
        })
    }
}

const getPending = async (req, res) => {
    if (req.error) return res.status(403).json({
        success: false,
        msg: error.message,
        data: {error}
    })
    if (!req.user) return res.status(403).json({
        success: false,
        msg: 'You must be logged in to get this data',
        data: {}
    });
    try {
        let queryParams = [req.user.id]
        const friendReq = await DB.query(Friend.getPending.query, queryParams);
        res.json({
            success: true,
            msg: 'Pending friend requests',
            data: {
                friendReq: friendReq.rows,
            }
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            success: false,
            msg: 'Something went wrong',
            data: {}
        })
    }
}

const accept = async (req, res) => {
    if (req.error) return res.status(403).json({
        success: false,
        msg: error.message,
        data: {error}
    })
    if (!req.user) return res.status(403).json({
        success: false,
        msg: 'You must be logged in to get this data',
        data: {}
    });
    try {
        const friendReq = await DB.query(Friend.accept.query, [req.user.id, req.params.id]);
        res.json({
            success: true,
            msg: 'Congrats you have a new friend :D',
            data: {
                friendReq: friendReq.rows,
            }
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            success: false,
            msg: 'Something went wrong',
            data: {}
        })
    }
}

const mine = async (req, res) => {
    if (req.error) return res.status(403).json({
        success: false,
        msg: error.message,
        data: {error}
    })
    if (!req.user) return res.status(403).json({
        success: false,
        msg: 'You must be logged in to get this data',
        data: {}
    });
    try {
        const id = req.user.id;
        const friendReq = await DB.query(Friend.mine.query, [id]);
        res.json({
            success: true,
            msg: 'Look at all the friends you have!',
            data: {
                friendReq: friendReq.rows,
            }
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            success: false,
            msg: 'Something went wrong',
            data: {}
        })
    }
}

module.exports = {
    create,
    getPending,
    accept,
    mine,
}