const router = require('express').Router();
const {
  getUsers, getUser,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', getUser);

module.exports = router;
