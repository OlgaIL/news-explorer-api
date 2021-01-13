const router = require('express').Router();
const userRout = require('./users.js');
const articleRout = require('./articles.js');
const errorRout = require('./error.js');
const authRouter = require('./auth.js');

const auth = require('../middlewares/auth.js');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger); // подключаем логгер запросов

// роуты, не требующие авторизации,
// например, регистрация и логин
router.use('/', authRouter);

// авторизация
router.use(auth);

router.use('/users', userRout);
router.use('/articles', articleRout);

router.all('*', errorRout);

router.use(errorLogger); // подключаем логгер ошибок

module.exports = router;
