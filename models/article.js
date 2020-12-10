/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

  keyword: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: Date.now,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6})(\/.*)*$/gi.test(v);
      },
      message: 'Ошибка в пути к файлу источника текста статьи',
    },

  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6})(\/.*)*$/gi.test(v);
      },
      message: 'Ошибка в пути к файлу изображения',
    },

  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('article', articleSchema);
