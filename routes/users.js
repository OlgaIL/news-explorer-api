const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers, getUser,
} = require('../controllers/users.js');

router.get('/', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getUsers);

router.get('/me', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getUser);

module.exports = router;
