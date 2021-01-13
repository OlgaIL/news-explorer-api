const { celebrate, Joi, Segments } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateUserBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) { return value; }
      return helper.message('Поле email должно быть заполнено корректно');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(8).empty()
      .messages({
        'string.min': 'Минимальная длина поля  password 8 символов',
        'any.required': 'Поле  password должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'any.required': 'Поле Name должно быть заполнено',
      }),
  }),
});

const validateAuthBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) { return value; }
      return helper.message('Поле email должно быть заполнено корректно');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля  password 8 символов',
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

const validateArticleBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'Поле  keyword должно быть заполнено',
    }),

    title: Joi.string().required().messages({
      'any.required': 'Поле  title должно быть заполнено',
    }),

    text: Joi.string().required().messages({
      'any.required': 'Поле  text должно быть заполнено',
    }),

    source: Joi.string().required().messages({
      'any.required': 'Поле source должно быть заполнено',
    }),

    date: Joi.string().required().messages({
      'any.required': 'Поле  date должно быть заполнено',
    }),

    link: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) { return value; }
      return helper.message('Поле link должно быть заполнено корректно');
    })
      .messages({
        'any.required': 'Поле link должно быть заполнено',
      }),

    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) { return value; }
      return helper.message('Поле image должно быть заполнено корректно');
    })
      .messages({
        'any.required': 'Поле image должно быть заполнено',
      }),

  }),

});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helper) => {
      if (ObjectId.isValid(value)) { return value; }
      return helper.message('Некорректный ID');
    }),
  }),
});

module.exports = {
  validateUserBody, validateAuthBody, validateArticleBody, validateId,
};
