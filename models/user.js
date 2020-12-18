const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const validator = require('validator');
const AuthError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Ошибка в email адресе',
      isAsync: false,
    },
    /* validate: {
      validator(v) {  return /^([a-z0-9\-\.])+@([a-z0-9\-]+\.)+([a-z]{2,6})$/gi.test(v);  },
      message: 'Ошибка в email адресе',
    }, */

  },

  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [8, 'Минимальная длина "password" 8 символов'],
    select: false,
  },

  name: {
    type: String,
    default: 'Имя пользователя',
    minlength: [2, 'Минимальная длина "name" 2 символа'],
    maxlength: [30, 'Максимальная длина "name" 30 символа'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
