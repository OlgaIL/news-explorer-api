/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/articles');
const { validateArticleBody, validateId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateArticleBody, createCard);
router.delete('/:id', validateId, deleteCard);

// router.put('/likes/:id', putLike);

module.exports = router;
