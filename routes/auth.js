/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { createUser, login } = require('../controllers/auth.js');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    // pattern(RegExp('^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6})(\/.*)*$')),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),

  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
