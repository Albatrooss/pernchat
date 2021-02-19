const DB = require('../util/db');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const SECRET = 'ohhimark';

const addUser = async (req, res) => {
    try {
        const userParams = User.insert.params.map(p => req.body[p]);
        const newUser = await DB.query(User.insert.query, userParams)
        res.json({
            success: true,
            msg: 'Welcome to pernChat!',
            data: {newUser}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const getAll = async (req, res) => {
    try {
        const users = await DB.query(User.getAll.query);
        res.json({
            success: true,
            msg: 'Here ya go!',
            data: {
                users: users.rows
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const getOne = async (req, res) => {
    try {
        const user = await DB.query(User.getOne.query, [req.params.id]);
        res.json({
            success: true,
            msg: 'Here ya go!',
            data: {
                user: user.rows[0],
            }
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const updateOne = async(req, res) => {
    try {
        const userParams = User.update.params.map(p => req.body[p]);
        userParams.push(req.params.id);
        console.log(userParams)
        const updatedUser = await DB.query(User.update.query, userParams);
        res.json({
            success: true,
            msg: 'Successfully updated!',
            data: {
                updatedUser
            }
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const deleteOne = async (req, res) => {
    try {
        const deletedUser = await DB.query(User.delete.query, [req.params.id]);
        res.json({
            success: true,
            msg: 'Successfully updated!',
            data: {
                deletedUser
            }
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await DB.query(User.getLogin.query, [email]);
        if (!user.rows.length) return res.status(404).json({
            success: false,
            msg: 'Email not found',
            data: {},
        });
        if (user.rows[0].password !== password) return res.status(404).json({
            success: false,
            msg: 'Incorrect Password',
            data: {},
        });
        let { user_id, username, first_name, last_name } = user.rows[0]
        const token = jwt.sign({ user: {
            id: user_id,
            username,
            firstName: first_name,
            lastName: last_name,
            email
        }}, SECRET);
        res.json({
            success: true,
            msg: 'Successfully updated!',
            data: {
                token
            }
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const signup = async (req, res) => {
    try {
        const userParams = User.insert.params.map(p => req.body[p]);
        const newUser = await DB.query(User.insert.query, userParams);
        let { user_id, username, first_name, last_name, email } = newUser.rows[0]
        const token = jwt.sign({
            id: user_id,
            username,
            firstName: first_name,
            lastName: last_name,
            email
        }, SECRET);
        res.json({
            success: true,
            msg: 'Welcome to pernChat!',
            data: {
                token
            }
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(500).json({
            success: false,
            msg: 'Something went wrong..',
            data: {error},
        });
    }
}

const me = async (req, res) => {
    if (!req.user) return res.status(403).json({
            success: false,
            msg: 'You must be signed in to access this data',
            data: {},
        });
    res.json({
        success: true,
        data: {user: req.user}
    })
}

module.exports = {
    addUser,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    login,
    signup,
    me,
}