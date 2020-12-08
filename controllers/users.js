/* eslint-disable no-console */
const User = require('../models/user');
/** const usersDataPath = path.join(__dirname, '..', 'data', 'users.json'); */

const NotFoundError = require('../errors/not-found-err');
const NoValideDataError = require('../errors/novalid-data-err');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    // console.log(req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else { res.status(200).send(user); }
  } catch (err) {
    if (err.name === 'CastError') next(new NoValideDataError('Не корректный id'));
    next(err);
  }
};

module.exports = {
  getUsers, getUser,
};
