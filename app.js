const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');

const { BD_HOST_NAME } = require('./config/index.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRout = require('./routes/users.js');
const articleRout = require('./routes/articles.js');
const errorRout = require('./routes/error.js');
const authRouter = require('./routes/auth.js');

const auth = require('./middlewares/auth.js');
const errHendle = require('./middlewares/error.js');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

// подключаемся к серверу mongo mongodb://localhost:27017/mestodb
mongoose.connect(BD_HOST_NAME, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/** можно попробовать без bodyParser установки */
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
/** для подключения фронта. для api не нужно */
// app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger); // подключаем логгер запросов

/** код для проверки и ревью */
/*
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

// роуты, не требующие авторизации,
// например, регистрация и логин
app.use('/', authRouter);

// авторизация
app.use(auth);

app.use('/users', userRout);
app.use('/articles', articleRout);
app.all('*', errorRout);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errHendle);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
