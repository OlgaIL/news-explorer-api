const router = require('express').Router();
const { createUser, login } = require('../controllers/auth.js');
const { validateUserBody, validateAuthBody } = require('../middlewares/validation');

router.post('/', validateAuthBody, login);
router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthBody, login);

module.exports = router;
