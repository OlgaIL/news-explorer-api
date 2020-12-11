const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');

const { BD_HOST_NAME, PORT } = require('./config/index.js');

const errHendle = require('./middlewares/error.js');
const routes = require('./routes');

const app = express();
app.use(cors());

// подключаемся к серверу mongo mongodb://localhost:27017/mestodb
mongoose.connect(BD_HOST_NAME, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

/** для подключения фронта. для api не нужно */
// app.use(express.static(path.join(__dirname, 'public')));

/** код для проверки и ревью */
/*
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

app.use(routes);

/* app.use(requestLogger); // подключаем логгер запросов
// роуты, не требующие авторизации,
// например, регистрация и логин
app.use('/', authRouter);
// авторизация
app.use(auth);
app.use('/users', userRout);
app.use('/articles', articleRout);
app.all('*', errorRout);
app.use(errorLogger); // подключаем логгер ошибок
*/

app.use(errors()); // обработчик ошибок celebrate
app.use(errHendle);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
