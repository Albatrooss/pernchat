const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/friends');

router.post('/accept/:id', ctrl.accept);
router.post('/:id', ctrl.create);

router.get('/mine', ctrl.mine);
router.get('/pending', ctrl.getPending);

module.exports = router;