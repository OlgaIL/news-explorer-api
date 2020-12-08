const Card = require('../models/article');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const NoValideDataError = require('../errors/novalid-data-err');
const ConflictError = require('../errors/conflict-err');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner').sort({ createdAt: -1 });
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const ownerObj = await User.findById(req.user._id);
    const card = await Card.create({ owner: ownerObj, ...req.body });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') next(new NoValideDataError('Переданы некорректные данные в метод создания карточки'));
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const cardSelected = await Card.findById(req.params.id);
    if (!cardSelected) throw new NotFoundError('Карточка с введенным id не найдена');
    if (String(cardSelected.owner._id) !== req.user._id) throw new ConflictError('Нет прав на удаление карточки');

    const card = await Card.findByIdAndRemove(req.params.id);
    if (card) { res.status(200).send({ message: 'Карточка удалена' }); }
  } catch (err) {
    if (err.name === 'CastError') next(new NoValideDataError('Не корректный id'));
    next(err);
  }
};

module.exports = { getCards, createCard, deleteCard };
