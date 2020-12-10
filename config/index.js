require('dotenv').config();

const { NODE_ENV, JWT_SECRET, BD_HOST_NAME = 'mongodb://localhost:27017/newsdb' } = process.env;
const SALT_ROUND = 10;

module.exports = {
  SALT_ROUND,
  JWT_SECRET,
  NODE_ENV,
  BD_HOST_NAME,
};
