const express = require('express');
const auth = require('../util/auth');
const router = express.Router();
const ctrl = require('../controllers/users');

router.post('/', ctrl.addUser);
router.post('/login', ctrl.login);
router.post('/signup', ctrl.signup);

router.get('/', ctrl.getAll);
router.get('/me', auth, ctrl.me);
router.get('/:id', ctrl.getOne);
// router.get('/me', ctrl.getAll);

router.put('/:id', ctrl.updateOne);
router.delete('/:id', ctrl.deleteOne);

module.exports = router;