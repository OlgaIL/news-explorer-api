const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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

app.use(helmet());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

/** для подключения фронта. для api не нужно */
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(errors()); // обработчик ошибок celebrate
app.use(errHendle);

app.listen(PORT, () => {
  /** Если всё работает, консоль покажет, какой порт приложение слушает */
  console.log(`App listening on port ${PORT}`);
});
