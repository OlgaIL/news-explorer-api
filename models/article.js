const mongoose = require('mongoose');
const { default: validator } = require('validator');

const articleSchema = new mongoose.Schema({

  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
  },

  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
  },

  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
  },

  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },

  date: {
    type: String,
    default: Date.now,
    required: [true, 'Поле "date" должно быть заполнено'],
  },

  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ошибка в пути к файлу источника текста статьи',
      // return /^https?:\/\/([w{3}\.]?)([a-z0-9\-]+\.)+([a-z]{2,6})(\/.*)*$/gi.test(v);
    },

  },

  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ошибка в пути к файлу изображения',
    },

  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
    select: false,
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('article', articleSchema);
